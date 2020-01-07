const db = require("../utils/db");
const config = require('../config/default.json');

module.exports = {
    getProduct: id =>
        db.load(`SELECT SP.ID, SP.TENSANPHAM , SP.GIA, SP.GIAMUANGAY, SP.NGAYDANG, SP.NGAYHETHAN, SP.BUOCGIA, SP.TUDONGGIAHAN, SP.LUONDUOCDAUGIA, SP.IDNGUOIBAN,
                        SELLER.TENTAIKHOAN AS SELLER,SELLER.TONGDIEMDANHGIA AS DIEMSELLER, 
                        SP.MOTADAI, SP.SOLANDUOCDAUGIA AS SOLAN, SP.IDNGUOITHANGDAUGIA AS ID_NG_THANG, LOAICAP1.TENLOAI AS LOAI1, LOAICAP2.TENLOAI AS LOAI2
                FROM SANPHAM SP JOIN NGUOIDUNG SELLER ON SP.IDNGUOIBAN = SELLER.ID
                                 JOIN LOAICAP2 ON SP.IDLOAI = LOAICAP2.ID
                                 JOIN LOAICAP1 ON LOAICAP1.ID = LOAICAP2.IDLoaiCap1
                WHERE SP.ID = '${id}'`),
    getImage: id =>
        db.load(`select hinh.imgurl
                from sanpham sp join hinhanh hinh on sp.id = hinh.idsanpham
                where sp.id = '${id}'`),
    getBiddingHistory: id =>
        db.load(`select ndg.id as id_ndg,ndg.tentaikhoan, ndg.hoten,ndg.tongdiemdanhgia as diemndg, ctdg.thoigiandaugia as thoigian, ctdg.gia, ctdg.MaxGia as max
                  from chitietdaugia ctdg join nguoidung ndg on ctdg.idnguoidaugia = ndg.id
                  where idsanpham = '${id}'
                  order by ctdg.gia desc, ctdg.thoigiandaugia asc`),

    // route list                  
    countProductByCat: async id => {
        const rows = await db.load(`SELECT count(*) AS total FROM SANPHAM SP 
                                    WHERE SP.IDLoai = ${id}`);
        return rows[0].total;
    },
    getProductByCat: (id, idND, offset) => {
        const guest = `SELECT L2.TenLoai, SP.ID, SP.TenSanPham, SP.Gia as GiaBanDau, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, SP.MainImg, CT.IDNguoiDauGia, CT.Gia, ND.TenTaiKhoan
                                ,(
                                    CASE
                                        WHEN SP.NgayDang BETWEEN DATE_SUB(NOW(), INTERVAL 3 DAY) AND NOW() THEN 1
                                        ELSE 0
                                    END
                                ) AS isNew
                    FROM LOAICAP2 L2 LEFT JOIN SANPHAM SP ON L2.ID = SP.IDLoai
                    LEFT JOIN CHITIETDAUGIA CT ON CT.IDSanPham = SP.ID
                    LEFT JOIN NGUOIDUNG ND ON CT.IDNguoiDauGia = ND.ID
                    WHERE L2.ID = ? AND (CT.Gia IS NULL OR (CT.Gia = (
                                                                        SELECT MAX(CT2.Gia) 
                                                                        FROM CHITIETDAUGIA CT2 WHERE CT2.IDSanPham = SP.ID
                                                                    ) AND CT.ThoiGianDauGia = (
																		SELECT MIN(CT3.ThoiGianDauGia) 
                                                                        FROM CHITIETDAUGIA CT3
																		WHERE CT3.IDSanPham = SP.ID AND CT3.Gia = (
                                                                        SELECT MAX(CT4.Gia) 
                                                                        FROM CHITIETDAUGIA CT4 WHERE CT4.IDSanPham = SP.ID
                                                                    )
																	)))
                    ORDER BY SP.NgayDang DESC, SP.TenSanPham ASC
                    LIMIT ? OFFSET ?`;

        const user = `SELECT L2.TenLoai, SP.ID, SP.TenSanPham, SP.Gia as GiaBanDau, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, SP.MainImg, CT.IDNguoiDauGia, CT.Gia, ND.TenTaiKhoan
                            ,(
                                CASE
                                    WHEN EXISTS
                                    (
                                        SELECT *
                                        FROM SANPHAMYEUTHICH SPYT
                                        WHERE SP.ID = SPYT.IDSanPham AND ND2.ID = SPYT.IDNguoiDung
                                    ) THEN 1
                                    ELSE 0
                                END
                            ) AS isFavorite
                            ,(
                                CASE
                                    WHEN SP.NgayDang BETWEEN DATE_SUB(NOW(), INTERVAL 3 DAY) AND NOW() THEN 1
                                    ELSE 0
                                END
                            ) AS isNew
                    FROM LOAICAP2 L2 LEFT JOIN SANPHAM SP ON L2.ID = SP.IDLoai
                    LEFT JOIN CHITIETDAUGIA CT ON CT.IDSanPham = SP.ID
                    LEFT JOIN NGUOIDUNG ND ON CT.IDNguoiDauGia = ND.ID
                    CROSS JOIN NGUOIDUNG ND2
                    WHERE L2.ID = ? AND ND2.ID = ? AND (CT.Gia IS NULL OR (CT.Gia = (
                                                                        SELECT MAX(CT2.Gia) 
                                                                        FROM CHITIETDAUGIA CT2 WHERE CT2.IDSanPham = SP.ID
                                                                    ) AND CT.ThoiGianDauGia = (
																		SELECT MIN(CT3.ThoiGianDauGia) 
                                                                        FROM CHITIETDAUGIA CT3
																		WHERE CT3.IDSanPham = SP.ID AND CT3.Gia = (
                                                                        SELECT MAX(CT4.Gia) 
                                                                        FROM CHITIETDAUGIA CT4 WHERE CT4.IDSanPham = SP.ID
                                                                    )
																	)))
                    ORDER BY SP.NgayDang DESC, SP.TenSanPham ASC
                    LIMIT ? OFFSET ?`;
        if (idND == -1) {
            return db.loadSafe(guest, [id, config.paginate.limit, offset]);
        } else {
            return db.loadSafe(user, [id, idND, config.paginate.limit, offset]);
        }
    },

    getPersonalListByID: (type, id, offset) => {
        var head = `SELECT SP.ID, SP.TenSanPham, SP.Gia as GiaBanDau, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, 
                           SP.MainImg, CT.IDNguoiDauGia, CT.Gia, ND.TenTaiKhoan, SP.IDNguoiBan, SP.IDNguoiThangDauGia
                            ,(
                                CASE
                                    WHEN EXISTS
                                    (
                                        SELECT *
                                        FROM SANPHAMYEUTHICH SPYT
                                        WHERE SP.ID = SPYT.IDSanPham AND ND2.ID = SPYT.IDNguoiDung
                                    ) THEN 1
                                    ELSE 0
                                END
                            ) AS isFavorite
                            ,(
                                CASE
                                    WHEN SP.NgayDang BETWEEN DATE_SUB(NOW(), INTERVAL 3 DAY) AND NOW() THEN 1
                                    ELSE 0
                                END
                            ) AS isNew
                            `;
        var diff;
        switch (type) {
            case 0: // watch
                diff = `FROM SANPHAMYEUTHICH YT LEFT JOIN SANPHAM SP ON YT.IDSanPham = SP.ID
                        LEFT JOIN CHITIETDAUGIA CT ON CT.IDSanPham = SP.ID
                        LEFT JOIN NGUOIDUNG ND ON CT.IDNguoiDauGia = ND.ID
                        CROSS JOIN NGUOIDUNG ND2
                        WHERE YT.IDNguoiDung = ${id} AND ND2.ID = ${id}`;
                break;
            case 1: // Ongoing
                diff = `FROM CHITIETDAUGIA CT3 LEFT JOIN SANPHAM SP ON CT3.IDSanPham = SP.ID
                        LEFT JOIN CHITIETDAUGIA CT ON CT.IDSanPham = SP.ID
                        LEFT JOIN NGUOIDUNG ND ON CT.IDNguoiDauGia = ND.ID
                        CROSS JOIN NGUOIDUNG ND2
                        WHERE CT3.IDNguoiDauGia = ${id} AND SP.NgayHetHan > NOW() AND ND2.ID = ${id}`;
                break;
            case 2: // won
                diff = `, DG.DiemDanhGia
                        FROM  SANPHAM SP 
                        LEFT JOIN CHITIETDAUGIA CT ON CT.IDSanPham = SP.ID
                        LEFT JOIN NGUOIDUNG ND ON CT.IDNguoiDauGia = ND.ID
                        LEFT JOIN CHITIETDANHGIA DG ON DG.IDNguoiDanhGia = ${id} AND DG.IDNguoiDuocDanhGia = SP.IDNguoiBan AND DG.IDSanPham = SP.ID
                        CROSS JOIN NGUOIDUNG ND2
                        WHERE SP.IDNguoiThangDauGia = ${id} AND ND2.ID = ${id}`;
                break;
            case 3: // upload
                diff = `FROM  SANPHAM SP 
                        LEFT JOIN CHITIETDAUGIA CT ON CT.IDSanPham = SP.ID
                        LEFT JOIN NGUOIDUNG ND ON CT.IDNguoiDauGia = ND.ID
                        CROSS JOIN NGUOIDUNG ND2
                        WHERE SP.IDNguoiBan = ${id} AND ND2.ID = ${id}`;
                break;
            case 4: // sold
                diff = `,DG.DiemDanhGia
                        FROM  SANPHAM SP 
                        LEFT JOIN CHITIETDAUGIA CT ON CT.IDSanPham = SP.ID
                        LEFT JOIN NGUOIDUNG ND ON CT.IDNguoiDauGia = ND.ID
                        LEFT JOIN CHITIETDANHGIA DG ON DG.IDNguoiDanhGia = ${id} AND DG.IDNguoiDuocDanhGia = SP.IDNguoiThangDauGia AND DG.IDSanPham = SP.ID
                        CROSS JOIN NGUOIDUNG ND2
                        WHERE SP.IDNguoiBan = ${id} AND SP.NgayHetHan <= NOW() AND ND2.ID = ${id}`;
                break;
        }
        var foot = ` AND (CT.Gia IS NULL OR (CT.Gia = (
                                                                        SELECT MAX(CT2.Gia) 
                                                                        FROM CHITIETDAUGIA CT2 WHERE CT2.IDSanPham = SP.ID
                                                                    ) AND CT.ThoiGianDauGia = (
																		SELECT MIN(CT3.ThoiGianDauGia) 
                                                                        FROM CHITIETDAUGIA CT3
																		WHERE CT3.IDSanPham = SP.ID AND CT3.Gia = (
                                                                        SELECT MAX(CT4.Gia) 
                                                                        FROM CHITIETDAUGIA CT4 WHERE CT4.IDSanPham = SP.ID
                                                                    )
																	)))
                    ORDER BY SP.NgayDang DESC
                    LIMIT ${config.paginate.limit} OFFSET ${offset}`;
        var query = head + diff + foot;
        return db.load(query);
    },

    countWatchListbyID: async id => {
        const rows = await db.load(`SELECT count(*) AS total FROM SANPHAMYEUTHICH YT 
                                    WHERE YT.IDNguoiDung = ${id}`);
        return rows[0].total;
    },

    countOngoingListbyID: async id => {
        const rows = await db.load(`SELECT count(*) AS total 
                                    FROM CHITIETDAUGIA CT LEFT JOIN SANPHAM SP ON CT.IDSanPham = SP.ID
                                    WHERE CT.IDNguoiDauGia = ${id} AND SP.NgayHetHan > NOW()`);
        return rows[0].total;
    },

    countWonListbyID: async id => {
        const rows = await db.load(`SELECT count(*) AS total FROM SANPHAM SP 
                                    WHERE SP.IDNguoiThangDauGia = ${id}`);
        return rows[0].total;
    },

    countUploadListbyID: async id => {
        const rows = await db.load(`SELECT count(*) AS total FROM SANPHAM SP 
                                    WHERE SP.IDNguoiBan = ${id}`);
        return rows[0].total;
    },

    countSoldListbyID: async id => {
        const rows = await db.load(`SELECT count(*) AS total FROM SANPHAM SP 
                                    WHERE SP.IDNguoiBan = ${id} AND SP.NgayHetHan <= NOW()`);
        return rows[0].total;
    },

    getCategoriesLV1: () => db.load(`SELECT * FROM LOAICAP1`),
    getCategoriesLV2: () => db.load(`SELECT * FROM LOAICAP2`),

    countSearchListbyKey: async(key, idLoai) => {
        const rows = await db.load(`SELECT count(*) as total FROM SANPHAM SP
                                    WHERE MATCH (TenSanPham, MoTaDai) AGAINST ('${key}') ${idLoai}`);
        return rows[0].total;
    },
    getSearchListbyKey: (key, idLoai, by, order, idND, offset) => {

        const guest = `SELECT SP.ID, SP.TenSanPham, SP.Gia as GiaBanDau, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, SP.MainImg, CT.IDNguoiDauGia, CT.Gia, ND.TenTaiKhoan
                                ,(
                                    CASE
                                        WHEN SP.NgayDang BETWEEN DATE_SUB(NOW(), INTERVAL 3 DAY) AND NOW() THEN 1
                                        ELSE 0
                                    END
                                ) AS isNew
                    FROM SANPHAM SP 
                    LEFT JOIN CHITIETDAUGIA CT ON CT.IDSanPham = SP.ID
                    LEFT JOIN NGUOIDUNG ND ON CT.IDNguoiDauGia = ND.ID
                    WHERE MATCH (TenSanPham, MoTaDai) AGAINST ('${key}') ${idLoai} AND (CT.Gia IS NULL OR 
                                                                                         (CT.Gia = (
                                                                        SELECT MAX(CT2.Gia) 
                                                                        FROM CHITIETDAUGIA CT2 WHERE CT2.IDSanPham = SP.ID
                                                                    ) AND CT.ThoiGianDauGia = (
																		SELECT MIN(CT3.ThoiGianDauGia) 
                                                                        FROM CHITIETDAUGIA CT3
																		WHERE CT3.IDSanPham = SP.ID AND CT3.Gia = (
                                                                        SELECT MAX(CT4.Gia) 
                                                                        FROM CHITIETDAUGIA CT4 WHERE CT4.IDSanPham = SP.ID
                                                                    )
																	)))
                    ORDER BY ${by} ${order}
                    LIMIT ${config.paginate.limit} OFFSET ${offset}`;
        const user = `SELECT SP.ID, SP.TenSanPham, SP.Gia as GiaBanDau, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, SP.MainImg, CT.IDNguoiDauGia, CT.Gia, ND.HoTen 
                            ,(
                                CASE
                                    WHEN EXISTS
                                    (
                                        SELECT *
                                        FROM SANPHAMYEUTHICH SPYT
                                        WHERE SP.ID = SPYT.IDSanPham AND ND2.ID = SPYT.IDNguoiDung
                                    ) THEN 1
                                    ELSE 0
                                END
                            ) AS isFavorite
                            ,(
                                CASE
                                    WHEN SP.NgayDang BETWEEN DATE_SUB(NOW(), INTERVAL 3 DAY) AND NOW() THEN 1
                                    ELSE 0
                                END
                            ) AS isNew
                    FROM SANPHAM SP
                    LEFT JOIN CHITIETDAUGIA CT ON CT.IDSanPham = SP.ID
                    LEFT JOIN NGUOIDUNG ND ON CT.IDNguoiDauGia = ND.ID
                    CROSS JOIN NGUOIDUNG ND2
                    WHERE MATCH (TenSanPham, MoTaDai) AGAINST ('${key}') ${idLoai} AND ND2.ID = ${idND} AND (CT.Gia IS NULL OR 
                                                                                                            (CT.Gia = (
                                                                        SELECT MAX(CT2.Gia) 
                                                                        FROM CHITIETDAUGIA CT2 WHERE CT2.IDSanPham = SP.ID
                                                                    ) AND CT.ThoiGianDauGia = (
																		SELECT MIN(CT3.ThoiGianDauGia) 
                                                                        FROM CHITIETDAUGIA CT3
																		WHERE CT3.IDSanPham = SP.ID AND CT3.Gia = (
                                                                        SELECT MAX(CT4.Gia) 
                                                                        FROM CHITIETDAUGIA CT4 WHERE CT4.IDSanPham = SP.ID
                                                                    )
																	)))
                    ORDER BY ${by} ${order}
                    LIMIT ${config.paginate.limit} OFFSET ${offset}`;
        if (idND == -1) {
            return db.load(guest);
        } else {
            return db.load(user);
        }
    },

    getRelation: id =>
        db.load(`select sp1.id, sp1.tensanpham, sp1.gia, sp1.ngayhethan, sp1.solanduocdaugia as solan, sp1.mainimg as avatar
                 from sanpham sp1 join sanpham sp2 on sp1.idloai = sp2.idloai
                                  join loaicap2 on sp2.IDLoai = loaicap2.id and sp1.idloai = loaicap2.id
                                  join loaicap1 on loaicap2.IDLoaiCap1 = loaicap1.id
                 where sp2.id = '${id}' and sp2.id <> sp1.id and sp1.ngayhethan > now()
                 order by rand() limit 5;`),

    getFavorite: (idUser, idProduct) =>
        db.load(`select *
                 from sanphamyeuthich spyt
                 where spyt.idsanpham = '${idProduct}' and spyt.idnguoidung = '${idUser}'`),

    getScore: idUser =>
        db.load(`select tongdiemdanhgia as diem
                 from nguoidung 
                 where id = '${idUser}'`),

    getAllUsers: offset => db.load(`SELECT * FROM NGUOIDUNG LIMIT ${config.paginate.limit} OFFSET ${offset}`),

    countAllUsers: async() => {
        const rows = await db.load(`SELECT COUNT(*) AS total FROM NGUOIDUNG`);
        return rows[0].total;
    },

    getUserById: id => db.load(`SELECT * FROM NGUOIDUNG WHERE ID = '${id}'`),

    getPointByID: id => db.load(`SELECT TenTaiKhoan, TongDiemDanhGia FROM NGUOIDUNG WHERE ID = '${id}'`),

    getYourPointAndDetail: id =>
        db.load(`SELECT ND1.TongDiemDanhGia, ND2.TenTaiKhoan, CTDANHGIA.*
				FROM NGUOIDUNG ND1 JOIN CHITIETDANHGIA CTDANHGIA ON ND1.ID = CTDANHGIA.IDNguoiDuocDanhGia
					JOIN NGUOIDUNG ND2 ON ND2.ID = CTDANHGIA.IDNguoiDanhGia
				WHERE ND1.ID = '${id}'`),

    deleteUser: entity => db.delete('DELETE FROM NGUOIDUNG WHERE ID = ?', [entity.ID]),

    changeUserInfoById: entity => {
        const condition = { ID: entity.ID };
        delete entity.ID;
        return db.patch('NGUOIDUNG', entity, condition);
    },

    getBidderUpgradeRequest: () => db.load(`SELECT * FROM NGUOIDUNG WHERE XinNangCap = true;`),

    countAllBidderRequest: async() => {
        const rows = await db.load(`SELECT COUNT(*) AS total FROM NGUOIDUNG WHERE XinNangCap = true`);
        return rows[0].total;
    },

    // Admin manage category
    getAllCategoryLv1WithQuantity: () => db.load(`SELECT C1.ID, C1.TenLoai, COUNT(SP.ID) AS SoLuong
						FROM SANPHAM SP JOIN LOAICAP2 C2 ON SP.IDLoai = C2.ID
						RIGHT JOIN LOAICAP1 C1 ON C1.ID = C2.IDLoaiCap1
						GROUP BY C1.ID, C1.TenLoai`),

    getAllCategoryLv1: () => db.load(`SELECT * FROM LOAICAP1`),

    getAllCategoryLv2ByCategoryLv1ID: id => db.load(`SELECT C2.ID, C2.TenLoai, COUNT(SP.ID) AS SoLuong 
													FROM SANPHAM SP RIGHT JOIN LOAICAP2 C2 ON SP.IDLoai = C2.ID 
													WHERE C2.IDLoaiCap1 = ${id} 
													GROUP BY C2.ID, C2.TenLoai`),

    isExistCatLv1: id => db.load(`SELECT * FROM LOAICAP1 WHERE ID = ${id}`),

    updateCatLv1Name: entity => {
        const condition = { ID: entity.ID };
        delete entity.ID;
        return db.patch('LOAICAP1', entity, condition);
    },

    updateCatLv2Name: entity => {
        const condition = { ID: entity.ID };
        delete entity.ID;
        return db.patch('LOAICAP2', entity, condition);
    },

    delCatLv1ById: entity => db.delete('DELETE FROM LOAICAP1 WHERE ID = ?', [entity.ID]),

    delCatLv2ById: entity => db.delete('DELETE FROM LOAICAP2 WHERE ID = ?', [entity.ID]),

    addCatLv1: entity => db.add('LOAICAP1', entity),

    addCatLv2: entity => db.add('LOAICAP2', entity),

    addFav: (entity) => db.add('SANPHAMYEUTHICH', entity),

    getTop5HighestBidTimes: () => db.load(`SELECT * FROM SANPHAM 
                                           WHERE IDNGUOITHANGDAUGIA IS NULL AND NGAYHETHAN > NOW()
                                           ORDER BY SoLanDuocDauGia DESC LIMIT 5`),

    getTop5HighestPrice: () => db.load(`SELECT * FROM SANPHAM 
                                        WHERE IDNGUOITHANGDAUGIA IS NULL AND NGAYHETHAN > NOW() 
                                        ORDER BY Gia DESC LIMIT 5`),

    getTop5NearlyExpired: () => db.load(`SELECT * FROM SANPHAM
                                         WHERE IDNGUOITHANGDAUGIA IS NULL AND NGAYHETHAN > NOW()
                                         ORDER BY NGAYHETHAN ASC LIMIT 5`),

    // register
    getIdByEmail: email => db.loadSafe(`SELECT ID, TenTaiKhoan, MatKhau FROM NGUOIDUNG WHERE Email = ?`, email),
    getIdByUsername: username => db.loadSafe(`SELECT ID, TenTaiKhoan, MatKhau, Loai FROM NGUOIDUNG WHERE TenTaiKhoan = ?`, username),

    // reset password
    checkTimeoutToken: token =>
        db.loadSafe(`SELECT ID, token_expire, (
                                        CASE
                                            WHEN token_expire < NOW() THEN 1
                                            ELSE 0
                                        END
                                      ) AS isExpire
                FROM NGUOIDUNG WHERE token = ?	`, token),
    updateNguoiDung: entity => {
        const condition = { ID: entity.id };
        delete entity.id;

        return db.patch('NGUOIDUNG', entity, condition)
    },
    updateTokenExpire: id =>
        db.loadSafe('update nguoidung set token_expire = (NOW() + INTERVAL 5 MINUTE) where ID = ?', id),

    changePassByToken: entity => {
        const condition = { token: entity.token };
        delete entity.token;

        return db.patch('NGUOIDUNG', entity, condition)
    },
    changePassById: entity => {
        const condition = { id: entity.id };
        delete entity.id;

        return db.patch('NGUOIDUNG', entity, condition)
    },

    // finish auction (cron)
    checkExpireAuction: () =>
        db.load(`SELECT SP.ID, SP.TenSanPham, CT.IDNguoiDauGia AS winner, ND.Email AS emailWinner, CT.Gia AS bid, SP.IDNguoiBan as seller, ND2.Email AS emailSeller
                FROM SANPHAM SP 
                LEFT JOIN CHITIETDAUGIA CT ON CT.IDSanPham = SP.ID
                LEFT JOIN NGUOIDUNG ND ON CT.IDNguoiDauGia = ND.ID
                LEFT JOIN NGUOIDUNG ND2 ON SP.IDNguoiBan = ND2.ID
                WHERE SP.TrangThai = 1  AND ((SP.NgayHetHan <= NOW() AND (CT.Gia IS NULL OR
                                                                        CT.Gia = (
                                                                                    SELECT MAX(CT2.Gia) 
                                                                                    FROM CHITIETDAUGIA CT2 WHERE CT2.IDSanPham = SP.ID
                                                                        ) ))
                                        OR (SP.GiaMuaNgay <= CT.Gia AND CT.ThoiGianDauGia = (
                                                                                    SELECT MIN(CT2.ThoiGianDauGia) 
                                                                                    FROM CHITIETDAUGIA CT2 WHERE CT2.IDSanPham = SP.ID
                                                                        )) )`),
    setStatusSold: entity => {
        const condition = { ID: entity.id };
        delete entity.id;
        return db.patch('SANPHAM', entity, condition)
    },
    setWinner: entity => {
        const condition = { ID: entity.id };
        delete entity.id;
        return db.patch('SANPHAM', entity, condition)
    },

    // Rating
    findRating: entity => db.loadSafe('SELECT * FROM CHITIETDANHGIA WHERE IDNguoiDanhGia = ? AND IDNguoiDuocDanhGia = ? AND IDSanPham = ?', [entity.IDNguoiDanhGia, entity.IDNguoiDuocDanhGia, entity.IDSanPham]),

    addRating: entity => db.add('CHITIETDANHGIA', entity),

    delRating: (entity) =>
        db.delete('DELETE FROM CHITIETDANHGIA WHERE IDNguoiDanhGia = ? AND IDNguoiDuocDanhGia = ? AND IDSanPham = ?', [entity.IDNguoiDanhGia, entity.IDNguoiDuocDanhGia, entity.IDSanPham]),

    getScoreById: id => db.loadSafe(`SELECT COUNT(*) as score 
                                    FROM CHITIETDANHGIA DG 
                                    WHERE IDNguoiDuocDanhGia = ? AND DiemDanhGia = 1
                                    UNION ALL
                                    SELECT COUNT(*) as score
                                    FROM CHITIETDANHGIA DG 
                                    WHERE IDNguoiDuocDanhGia = ? AND DiemDanhGia = -1`, [id, id]),

    // Favorite
    addFav: (entity) => db.add('SANPHAMYEUTHICH', entity),

    delFav: (entity) => db.delete('DELETE FROM SANPHAMYEUTHICH WHERE IDNguoiDung = ? AND IDSanPham = ?', [entity.IDNguoiDung, entity.IDSanPham]),

    // Bid
    getMaxBid: entity => db.loadSafe('SELECT * FROM CHITIETDAUGIA WHERE ', entity),

    addBidDetail: entity => db.add('chitietdaugia', entity),

    addUser: entity => db.add('NGUOIDUNG', entity),

    addNewProduct: (entity) => db.add('sanpham', entity),

    addProducImg: async function(proID, ImgUrlArray) {

        const res = await Promise.all([
            db.patch('sanpham', { mainimg: ImgUrlArray[0] }, { id: proID }),
            db.add('hinhanh', { idsanpham: proID, idhinh: 1, imgurl: ImgUrlArray[0] })
        ]);
        for (var i = 1; i < ImgUrlArray.length; i++) {
            await db.add('hinhanh', { idsanpham: proID, idhinh: i + 1, imgurl: ImgUrlArray[i] });
        }
    },

    removeBid: (id, idsp) => db.delete('delete from chitietdaugia where idnguoidaugia = ? and idsanpham = ?', [id, idsp]),

    rejectBidding: async function(proId, idToReject) {
        await Promise.all([
            db.delete('delete from chitietdaugia where idnguoidaugia = ? and idsanpham = ?', [idToReject, proId]),
            db.add('danhsachcam', { idnguoidung: idToReject, idsanpham: proId }),
        ]);
        const [proDetail, newbiddingHistory] = await Promise.all([
            module.exports.getProduct(proId),
            module.exports.getBiddingHistory(proId),
        ]);

        const gia = (newbiddingHistory.length > 0) ? newbiddingHistory[0].gia : 1000;
        await db.patch('sanpham', { gia }, { ID: proId });
        if (proDetail[0].ID_NG_THANG !== null) {
            await db.patch('sanpham', { IDNguoiThangDauGia: newbiddingHistory[0].id_ndg }, { ID: proId });
        }
        console.log("chặn xong");
        // cứ lấy người đầu tiên của lịch sử đấu giá sau khi cấm thì sẽ là người giữ giá cao nhất ko bị cấm

    },

    checkIsBanned: async function(proId, userId) {
        const res = await db.load(`select * from danhsachcam where idnguoidung = ${userId} and idsanpham = ${proId}`);
        if (res.length === 0)
            return false;
        return true;
    },

    appendDes: (proId, newFullDes) => db.patch('sanpham', { motadai: newFullDes }, { id: proId }),

    updateProduct: entity => {
        const condition = { id: entity.idsanpham };
        delete entity.idsanpham;
        //console.log(entity);
        return db.patch('sanpham', entity, condition);
    },

    changeAvatar: (userId, imgurl) => db.patch('nguoidung', { AvatarURL: imgurl }, { id: userId }),

    delProduct: async function(proId) {
        await Promise.all([
            db.delete('delete from hinhanh where idsanpham = ?', [proId]),
            db.delete('delete from sanphamyeuthich where idsanpham = ?', [proId]),
            db.delete('delete from chitietdaugia where idsanpham = ?', [proId]),
            db.delete('delete from sanpham where id = ?', [proId]),
        ])
    },
};