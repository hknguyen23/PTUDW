const db = require("../utils/db");

module.exports = {
    getProduct: id =>
        db.load(`SELECT SP.TENSANPHAM , SP.GIA, SP.NGAYDANG, SELLER.TENTAIKHOAN AS SELLER,SELLER.TONGDIEMDANHGIA AS DIEMSELLER, SP.THOIGIANCONLAI, SP.MOTADAI, LOAI.TENLOAI
                FROM SANPHAM SP JOIN NGUOIDUNG SELLER ON SP.IDNGUOIBAN = SELLER.ID
                                 JOIN LOAI ON SP.IDLOAI = LOAI.ID
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

    getProductByCat: id =>
        db.load(`SELECT LOAI.TenLoai, SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.ThoiGianConLai, SP.NgayDang, SP.SoLanDuocDauGia, ND.TenTaiKhoan, SP.MainImg
                FROM LOAI LEFT JOIN SANPHAM SP ON LOAI.ID = SP.IDLoai
                LEFT JOIN NGUOIDUNG ND ON SP.IDNguoiBan = ND.ID
                WHERE LOAI.ID = ${id}
                ORDER BY SP.NgayDang DESC`),
    getWatchListbyID: id =>
        db.load(`SELECT SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.ThoiGianConLai, SP.NgayDang, SP.SoLanDuocDauGia, ND.TenTaiKhoan, SP.MainImg
                FROM SANPHAMYEUTHICH YT LEFT JOIN SANPHAM SP ON YT.IDSanPham = SP.ID
                LEFT JOIN NGUOIDUNG ND ON SP.IDNguoiBan = ND.ID
                WHERE YT.IDNguoiDung = ${id}
                ORDER BY SP.NgayDang DESC`),
    getOngoingListbyID: id =>
    db.load(`SELECT SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.ThoiGianConLai, SP.NgayDang, SP.SoLanDuocDauGia, ND.TenTaiKhoan, SP.MainImg
            FROM CHITIETDAUGIA CT LEFT JOIN SANPHAM SP ON CT.IDSanPham = SP.ID
            LEFT JOIN NGUOIDUNG ND ON SP.IDNguoiBan = ND.ID
            WHERE CT.IDNguoiDauGia = ${id} AND SP.ThoiGianConLai > 0
            ORDER BY SP.NgayDang DESC`),
    getWonListbyID: id =>
    db.load(`SELECT SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.ThoiGianConLai, SP.NgayDang, SP.SoLanDuocDauGia, ND.TenTaiKhoan, SP.MainImg
            FROM  SANPHAM SP LEFT JOIN NGUOIDUNG ND ON SP.IDNguoiBan = ND.ID
            WHERE SP.IDNguoiThangDauGia = ${id}
            ORDER BY SP.NgayDang DESC`),            
    getUploadListbyID: id =>
    db.load(`SELECT SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.ThoiGianConLai, SP.NgayDang, SP.SoLanDuocDauGia, ND.TenTaiKhoan, SP.MainImg
            FROM  SANPHAM SP LEFT JOIN NGUOIDUNG ND ON SP.IDNguoiBan = ND.ID
            WHERE SP.IDNguoiBan = ${id}
            ORDER BY SP.NgayDang DESC`),            
    getSoldloadListbyID: id =>
    db.load(`SELECT SP.ID, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.ThoiGianConLai, SP.NgayDang, SP.SoLanDuocDauGia, ND.TenTaiKhoan, SP.MainImg
            FROM  SANPHAM SP LEFT JOIN NGUOIDUNG ND ON SP.IDNguoiBan = ND.ID
            WHERE SP.IDNguoiBan = ${id} AND SP.ThoiGianConLai = 0
            ORDER BY SP.NgayDang DESC`),            




    getCategories: () => db.load('SELECT * FROM LOAI'),

    getRelation: id =>
        db.load(`select sp1.id, sp1.tensanpham, sp1.gia, sp1.thoigianconlai, sp1.solanduocdaugia as solan, sp1.mainimg as avatar
                 from sanpham sp1 join sanpham sp2 on sp1.idloai = sp2.idloai
                 where sp2.id = '${id}' and sp2.id <> sp1.id
                 order by rand() limit 5;`),

    getFavorite: (idUser, isProduct) =>
        db.load(`select *
                 from sanphamyeuthich spyt
                 where spyt.idsanpham = '${isProduct}' and spyt.idnguoidung = '${idUser}'`),

    getScore: (idUser) =>
        db.load(`select tongdiemdanhgia as diem
                 from nguoidung 
                 where id = '${idUser}'`),

    add: entity => db.add('chitietdaugia', entity),
};