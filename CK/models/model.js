const db = require("../utils/db");
const config = require('../config/default.json');

module.exports = {
    getProduct: id =>
        db.load(`SELECT SP.TENSANPHAM , SP.GIA, SP.NGAYDANG, SELLER.TENTAIKHOAN AS SELLER,SELLER.TONGDIEMDANHGIA AS DIEMSELLER, 
                                                SP.THOIGIANCONLAI, SP.MOTADAI, LOAICAP1.TENLOAI AS LOAI1, LOAICAP2.TENLOAI AS LOAI2
                FROM SANPHAM SP JOIN NGUOIDUNG SELLER ON SP.IDNGUOIBAN = SELLER.ID
                                 JOIN LOAICAP1 ON SP.IDLOAI = LOAICAP1.ID
                                 JOIN LOAICAP2 ON LOAICAP2.IDLOAICAP1 = LOAICAP1.ID
                WHERE SP.ID = '${id}'`),
    getImage: id =>
        db.load(`select hinh.imgurl
                from sanpham sp join hinhanh hinh on sp.id = hinh.idsanpham
                where sp.id = '${id}'`),
    getBiddingHistory: id =>
        db.load(`select ndg.id as id_ndg,ndg.tentaikhoan, ndg.hoten,ndg.tongdiemdanhgia as diemndg, ctdg.thoigiandaugia as thoigian, ctdg.gia
                  from chitietdaugia ctdg join nguoidung ndg on ctdg.idnguoidaugia = ndg.id
                  where idsanpham = '${id}'
                  order by ctdg.gia desc , ctdg.thoigiandaugia asc`),

    // route list                  
    countProductByCat: async id => {
        const rows = await db.load(`SELECT count(*) AS total FROM SANPHAM SP 
                                    WHERE SP.IDLoai = ${id}`);
        return rows[0].total;
    },
    getProductByCat: (id, idND, offset) =>{
        const guest = `SELECT L2.TenLoai, SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, SP.MainImg, CT.IDNguoiDauGia, CT.Gia, ND.HoTen
                                ,(
                                    CASE
                                        WHEN SP.NgayDang BETWEEN DATE_SUB(NOW(), INTERVAL 3 DAY) AND NOW() THEN 1
                                        ELSE 0
                                    END
                                ) AS isNew
                    FROM LOAICAP2 L2 LEFT JOIN SANPHAM SP ON L2.ID = SP.IDLoai
                    LEFT JOIN CHITIETDAUGIA CT ON CT.IDSanPham = SP.ID
                    LEFT JOIN NGUOIDUNG ND ON CT.IDNguoiDauGia = ND.ID
                    WHERE L2.ID = ? AND CT.Gia = ( 
                                                    SELECT MAX(CT2.Gia) 
                                                    FROM CHITIETDAUGIA CT2 WHERE CT2.IDSanPham = SP.ID
                                                 )
                    ORDER BY SP.NgayDang DESC, SP.TenSanPham ASC
                    LIMIT ? OFFSET ?`;
        const user = `SELECT L2.TenLoai, SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, SP.MainImg, CT.IDNguoiDauGia, CT.Gia, ND.HoTen
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
                    WHERE L2.ID = ? AND ND2.ID = ? AND CT.Gia = ( 
                                                                    SELECT MAX(CT2.Gia) 
                                                                    FROM CHITIETDAUGIA CT2 WHERE CT2.IDSanPham = SP.ID
                                                                )
                    ORDER BY SP.NgayDang DESC, SP.TenSanPham ASC
                    LIMIT ? OFFSET ?`;
        if (idND == -1){
            return db.loadSafe(guest,[id, config.paginate.limit, offset]);
        }
        else{
            return db.loadSafe(user,[id, idND, config.paginate.limit, offset]);
        }       
    },
    
    getPersonalListByID: (type, id, offset) => {
        var head = `SELECT SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, SP.MainImg, CT.IDNguoiDauGia, CT.Gia, ND.HoTen
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
        switch(type){
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
                diff = `FROM  SANPHAM SP 
                        LEFT JOIN CHITIETDAUGIA CT ON CT.IDSanPham = SP.ID
                        LEFT JOIN NGUOIDUNG ND ON CT.IDNguoiDauGia = ND.ID           
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
                diff = `FROM  SANPHAM SP 
                        LEFT JOIN CHITIETDAUGIA CT ON CT.IDSanPham = SP.ID
                        LEFT JOIN NGUOIDUNG ND ON CT.IDNguoiDauGia = ND.ID
                        CROSS JOIN NGUOIDUNG ND2
                        WHERE SP.IDNguoiBan = ${id} AND SP.NgayHetHan <= NOW() AND ND2.ID = ${id}`;
                break;
        }
        var foot = ` AND CT.Gia = ( 
                                    SELECT MAX(CT2.Gia) 
                                    FROM CHITIETDAUGIA CT2 WHERE CT2.IDSanPham = SP.ID
                                 )
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

    countSearchListbyKey: async (key, idLoai) => {
        const rows = await db.load(`SELECT count(*) as total FROM SANPHAM SP
                                    WHERE MATCH (TenSanPham, MoTaNgan) AGAINST ('${key}') ${idLoai}`);
        return rows[0].total;
    },
    getSearchListbyKey: (key, idLoai, by, order, idND, offset) => {

        const guest = `SELECT SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, SP.MainImg, CT.IDNguoiDauGia, CT.Gia, ND.HoTen
                                ,(
                                    CASE
                                        WHEN SP.NgayDang BETWEEN DATE_SUB(NOW(), INTERVAL 3 DAY) AND NOW() THEN 1
                                        ELSE 0
                                    END
                                ) AS isNew
                    FROM SANPHAM SP 
                    LEFT JOIN CHITIETDAUGIA CT ON CT.IDSanPham = SP.ID
                    LEFT JOIN NGUOIDUNG ND ON CT.IDNguoiDauGia = ND.ID
                    WHERE MATCH (TenSanPham, MoTaNgan) AGAINST ('${key}') ${idLoai} AND CT.Gia = ( 
                                                                                                    SELECT MAX(CT2.Gia) 
                                                                                                    FROM CHITIETDAUGIA CT2 WHERE CT2.IDSanPham = SP.ID
                                                                                                 )
                    ORDER BY ${by} ${order}
                    LIMIT ${config.paginate.limit} OFFSET ${offset}`;
        const user = `SELECT SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, SP.MainImg, CT.IDNguoiDauGia, CT.Gia, ND.HoTen 
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
                    WHERE MATCH (TenSanPham, MoTaNgan) AGAINST ('${key}') ${idLoai} AND ND2.ID = ${idND} AND CT.Gia = ( 
                                                                                                                        SELECT MAX(CT2.Gia) 
                                                                                                                        FROM CHITIETDAUGIA CT2 WHERE CT2.IDSanPham = SP.ID
                                                                                                                      )
                    ORDER BY ${by} ${order}
                    LIMIT ${config.paginate.limit} OFFSET ${offset}`;
        if (idND == -1){
            return db.load(guest);
        }
        else{
            return db.load(user);
        }       
    },

    getRelation: id =>
        db.load(`select sp1.id, sp1.tensanpham, sp1.gia, sp1.thoigianconlai, sp1.solanduocdaugia as solan, sp1.mainimg as avatar
                 from sanpham sp1 join sanpham sp2 on sp1.idloai = sp2.idloai
                 where sp2.id = '${id}' and sp2.id <> sp1.id
                 order by rand() limit 5;`),

    getFavorite: (idUser, isProduct) =>
        db.load(`select *
                 from sanphamyeuthich spyt
                 where spyt.idsanpham = '${isProduct}' and spyt.idnguoidung = '${idUser}'`),

    getScore: idUser =>
        db.load(`select tongdiemdanhgia as diem
                 from nguoidung 
                 where id = '${idUser}'`),
				 
	getAllUsers: () => db.load(`SELECT * FROM NGUOIDUNG`),
	
	getUserById: id => db.load(`SELECT * FROM NGUOIDUNG WHERE ID = '${id}'`),
	
	getPointByID: id => db.load(`SELECT TongDiemDanhGia FROM NGUOIDUNG WHERE ID = '${id}'`),
	
	getYourPointAndDetail: id => 
		db.load(`SELECT ND1.TongDiemDanhGia, ND2.TenTaiKhoan, CTDANHGIA.*
				FROM NGUOIDUNG ND1 JOIN CHITIETDANHGIA CTDANHGIA ON ND1.ID = CTDANHGIA.IDNguoiDuocDanhGia
					JOIN NGUOIDUNG ND2 ON ND2.ID = CTDANHGIA.IDNguoiDanhGia
				WHERE ND1.ID = '${id}'`),
				
	getBidderUpgradeRequest: () => db.load(`SELECT * FROM NGUOIDUNG WHERE XinNangCap = true;`),

    // register
    getIdByEmail: email => db.loadSafe(`SELECT ID, TenTaiKhoan, MatKhau FROM NGUOIDUNG WHERE Email = ?`, email),
    getIdByUsername: username => db.loadSafe(`SELECT ID, TenTaiKhoan, MatKhau FROM NGUOIDUNG WHERE TenTaiKhoan = ?`, username),
    
    // reset password
    checkTimeoutToken: token => 
    db.loadSafe(`SELECT ID, token_expire, (
                                        CASE
                                            WHEN token_expire < NOW() THEN 1
                                            ELSE 0
                                        END
                                      ) AS isExpire
                FROM NGUOIDUNG WHERE token = ?	`, token),
    updateToken: entity => {
        const condition = { ID: entity.id };
        delete entity.id;

        return db.patch('NGUOIDUNG', entity, condition)
    },
    updateTokenExpire: id => 
        db.loadSafe('update nguoidung set token_expire = (NOW() + INTERVAL 5 MINUTE) where ID = ?', id),

    changePass: entity => {
        const condition = { token: entity.token };
        delete entity.token;

        return db.patch('NGUOIDUNG', entity, condition)
    },

    // finish auction (cron)
    checkExpireAuction: () => 
        db.load(`SELECT SP.ID, SP.TenSanPham, CT.IDNguoiDauGia AS winner, ND.Email AS emailWinner, CT.Gia AS bid, SP.IDNguoiBan as seller, ND2.Email AS emailSeller
                FROM SANPHAM SP 
                LEFT JOIN CHITIETDAUGIA CT ON CT.IDSanPham = SP.ID
                LEFT JOIN NGUOIDUNG ND ON CT.IDNguoiDauGia = ND.ID
                LEFT JOIN NGUOIDUNG ND2 ON SP.IDNguoiBan = ND2.ID
                WHERE SP.TrangThai = 1  AND SP.NgayHetHan <= NOW() AND (CT.Gia IS NULL OR
                                                                        CT.Gia = (
                                                                                    SELECT MAX(CT2.Gia) 
                                                                                    FROM CHITIETDAUGIA CT2 WHERE CT2.IDSanPham = SP.ID
                                                                        ) )`),
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

    add: entity => db.add('chitietdaugia', entity),

    addUser: entity => db.add('NGUOIDUNG', entity),

    addFav: (entity) => db.add('SANPHAMYEUTHICH', entity),

    delFav: (entity) => db.delete('DELETE FROM SANPHAMYEUTHICH WHERE IDNguoiDung = ? AND IDSanPham = ?', [entity.IDNguoiDung, entity.IDSanPham]),

    patch: entity => {
        const condition = { id: entity.idsanpham };
        delete entity.idsanpham;

        //console.log(`update sanpham set ? where ?`, [entity, condition]);
        return db.patch('sanpham', entity, condition);
    }
};