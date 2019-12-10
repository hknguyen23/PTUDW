const db = require("../utils/db");

module.exports = {
    getProduct: id =>
        db.load(`SELECT SP.TENSANPHAM , SP.GIA, SP.NGAYDANG, SELLER.TENTAIKHOAN AS SELLER,SELLER.TONGDIEMDANHGIA AS DIEMSELLER, SP.THOIGIANCONLAI, SP.MOTADAI
                FROM SANPHAM SP JOIN NGUOIDUNG SELLER ON SP.IDNGUOIBAN = SELLER.ID
                WHERE SP.ID = ${id}`),
    getImage: id =>
        db.load(`select hinh.imgurl
                from sanpham sp join hinhanh hinh on sp.id = hinh.idsanpham
                where sp.id = ${id}`),
    getBiddingHistory: id =>
        db.load(`select ndg.tentaikhoan,ndg.tongdiemdanhgia as diemndg, ctdg.thoigiandaugia as thoigian, ctdg.gia
                  from chitietdaugia ctdg join nguoidung ndg on ctdg.idnguoidaugia = ndg.id
                  where idsanpham = ${id}
                  order by ctdg.gia desc , ctdg.thoigiandaugia asc`),
    getProductByCat: id =>
        db.load(`SELECT LOAI.TenLoai, SP.TenSanPham, SP.Gia, SP.GiaMuaNgay, SP.ThoiGianConLai, SP.NgayDang, SP.SoLanDuocDauGia, ND.TenTaiKhoan, SP.MainImg
                FROM LOAI LEFT JOIN SANPHAM SP ON LOAI.ID = SP.IDLoai
                LEFT JOIN NGUOIDUNG ND ON SP.IDNguoiBan = ND.ID
                WHERE LOAI.ID = '${id}'
                ORDER BY SP.NgayDang DESC`),      
    getCategories: () => db.load('SELECT * FROM LOAI'),
 
};