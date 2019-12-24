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
    getProductByCat: (id, offset) =>
        db.load(`SELECT L2.TenLoai, SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, ND.TenTaiKhoan, SP.MainImg
                FROM LOAICAP2 L2 LEFT JOIN SANPHAM SP ON L2.ID = SP.IDLoai
                LEFT JOIN NGUOIDUNG ND ON SP.IDNguoiBan = ND.ID
                WHERE L2.ID = ${id} 
                ORDER BY SP.NgayDang 
                LIMIT ${config.paginate.limit} OFFSET ${offset}`),
    
    countWatchListbyID: async id => {
        const rows = await db.load(`SELECT count(*) AS total FROM SANPHAMYEUTHICH YT 
                                    WHERE YT.IDNguoiDung = ${id}`);
        return rows[0].total;
    },
    getWatchListbyID: (id, offset) =>
        db.load(`SELECT SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, ND.TenTaiKhoan, SP.MainImg
                FROM SANPHAMYEUTHICH YT LEFT JOIN SANPHAM SP ON YT.IDSanPham = SP.ID
                LEFT JOIN NGUOIDUNG ND ON SP.IDNguoiBan = ND.ID
                WHERE YT.IDNguoiDung = ${id}
                ORDER BY SP.NgayDang DESC
                LIMIT ${config.paginate.limit} OFFSET ${offset}`),

    countOngoingListbyID: async id => {
        const rows = await db.load(`SELECT count(*) AS total 
                                    FROM CHITIETDAUGIA CT LEFT JOIN SANPHAM SP ON CT.IDSanPham = SP.ID
                                    WHERE CT.IDNguoiDauGia = ${id} AND SP.NgayHetHan > NOW()`);
        return rows[0].total;
    },
    getOngoingListbyID: (id, offset) =>
        db.load(`SELECT SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, ND.TenTaiKhoan, SP.MainImg
            FROM CHITIETDAUGIA CT LEFT JOIN SANPHAM SP ON CT.IDSanPham = SP.ID
            LEFT JOIN NGUOIDUNG ND ON SP.IDNguoiBan = ND.ID
            WHERE CT.IDNguoiDauGia = ${id} AND SP.NgayHetHan > NOW()
            ORDER BY SP.NgayDang DESC
            LIMIT ${config.paginate.limit} OFFSET ${offset}`),

    countWonListbyID: async id => {
        const rows = await db.load(`SELECT count(*) AS total FROM SANPHAM SP 
                                    WHERE SP.IDNguoiThangDauGia = ${id}`);
        return rows[0].total;
    },            
    getWonListbyID: (id, offset) =>
        db.load(`SELECT SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, ND.TenTaiKhoan, SP.MainImg
            FROM  SANPHAM SP LEFT JOIN NGUOIDUNG ND ON SP.IDNguoiBan = ND.ID
            WHERE SP.IDNguoiThangDauGia = ${id}
            ORDER BY SP.NgayDang DESC
            LIMIT ${config.paginate.limit} OFFSET ${offset}`),

    countUploadListbyID: async id => {
        const rows = await db.load(`SELECT count(*) AS total FROM SANPHAM SP 
                                    WHERE SP.IDNguoiBan = ${id}`);
        return rows[0].total;
    },
    getUploadListbyID: (id, offset) =>
        db.load(`SELECT SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, ND.TenTaiKhoan, SP.MainImg
            FROM  SANPHAM SP LEFT JOIN NGUOIDUNG ND ON SP.IDNguoiBan = ND.ID
            WHERE SP.IDNguoiBan = ${id}
            ORDER BY SP.NgayDang DESC
            LIMIT ${config.paginate.limit} OFFSET ${offset}`),

    countSoldListbyID: async id => {
        const rows = await db.load(`SELECT count(*) AS total FROM SANPHAM SP 
                                    WHERE SP.IDNguoiBan = ${id} AND SP.NgayHetHan <= NOW()`);
        return rows[0].total;
    },
    getSoldListbyID: (id, offset) =>
        db.load(`SELECT SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, ND.TenTaiKhoan, SP.MainImg
            FROM  SANPHAM SP LEFT JOIN NGUOIDUNG ND ON SP.IDNguoiBan = ND.ID
            WHERE SP.IDNguoiBan = ${id} AND SP.NgayHetHan <= NOW()
            ORDER BY SP.NgayDang DESC
            LIMIT ${config.paginate.limit} OFFSET ${offset}`),
            

    getCategoriesLV1: () => db.load(`SELECT * FROM LOAICAP1`),
    getCategoriesLV2: () => db.load(`SELECT * FROM LOAICAP2`),

    countSearchListbyKey: async (key, idLoai) => {
        const rows = await db.load(`SELECT count(*) as total FROM SANPHAM SP
                                    WHERE MATCH (TenSanPham, MoTaNgan) AGAINST ('${key}') ${idLoai}`);
        return rows[0].total;
    },
    getSearchListbyKey: (key, idLoai, by, order, offset) => 
        db.load(`SELECT SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.NgayHetHan, SP.NgayDang, SP.SoLanDuocDauGia, ND.TenTaiKhoan, SP.MainImg 
            FROM SANPHAM SP LEFT JOIN NGUOIDUNG ND ON SP.IDNguoiBan = ND.ID
            WHERE MATCH (TenSanPham, MoTaNgan) AGAINST ('${key}') ${idLoai}
            ORDER BY ${by} ${order}
            LIMIT ${config.paginate.limit} OFFSET ${offset}`),

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


    getIdByEmail: email => db.loadSafe(`SELECT * FROM NGUOIDUNG WHERE Email = ?`, email),
    getIdByUsername: username => db.loadSafe(`SELECT * FROM NGUOIDUNG WHERE TenTaiKhoan = ?`, username),

    add: entity => db.add('chitietdaugia', entity),

    addUser: entity => db.add('NGUOIDUNG', entity),

    patch: entity => {
        const condition = { id: entity.idsanpham };
        delete entity.idsanpham;

        //console.log(`update sanpham set ? where ?`, [entity, condition]);
        return db.patch('sanpham', entity, condition);
    }
};