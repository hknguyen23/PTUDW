CREATE DATABASE SANDAUGIATRUCTUYEN;

USE SANDAUGIATRUCTUYEN;

CREATE TABLE NGUOIDUNG(
	ID INT NOT NULL AUTO_INCREMENT,
	TenTaiKhoan VARCHAR(20) NOT NULL,
	MatKhau VARCHAR(100) NOT NULL,
	HoTen VARCHAR(30) NOT NULL,
	NgaySinh DATE NOT NULL,
	Email VARCHAR(50) NOT NULL,
	DiaChi VARCHAR(1000),
    DienThoai VARCHAR(20),
	Loai INT NOT NULL,
	XinNangCap BOOL NOT NULL,
	AvatarURL VARCHAR(100) NOT NULL,
	TongDiemDanhGia INT NOT NULL,
	PRIMARY KEY(ID)
);

CREATE TABLE SANPHAM(
	ID INT NOT NULL AUTO_INCREMENT,
	TenSanPham VARCHAR(1000) NOT NULL,
	Gia FLOAT NOT NULL,
	GiaMuaNgay FLOAT,
	NgayDang DATETIME NOT NULL,
	NgayHetHan DATETIME NOT NULL,
    BuocGia FLOAT NOT NULL,
    TuDongGiaHan BOOL NOT NULL,
	LuonDuocDauGia BOOL NOT NULL,
    MoTaNgan VARCHAR(100),
    MoTaDai VARCHAR(1000),
	MainImg VARCHAR(100) NOT NULL,
	SoLanDuocDauGia INT,
	IDLoai INT NOT NULL,
	IDNguoiBan INT NOT NULL,
	IDNguoiThangDauGia INT,
	PRIMARY KEY(ID)
);

CREATE TABLE LOAICAP1(
	ID INT NOT NULL AUTO_INCREMENT,
	TenLoai VARCHAR(100) NOT NULL,
	PRIMARY KEY(ID)
);

CREATE TABLE LOAICAP2(
	ID INT NOT NULL AUTO_INCREMENT,
	IDLoaiCap1 INT NOT NULL,
	TenLoai VARCHAR(100) NOT NULL,
	PRIMARY KEY(ID, IDLoaiCap1)
);

CREATE TABLE HINHANH(
	IDSanPham INT NOT NULL,
	IDHinh INT NOT NULL,
	ImgURL VARCHAR(100) NOT NULL,
	PRIMARY KEY(IDSanPham, IDHinh)
);

CREATE TABLE CHITIETDAUGIA(
	IDNguoiDauGia INT NOT NULL,
	IDSanPham INT NOT NULL,
	ThoiGianDauGia DATETIME NOT NULL,
	Gia FLOAT NOT NULL,
	PRIMARY KEY(IDNguoiDauGia, IDSanPham, ThoiGianDauGia)
);

CREATE TABLE CHITIETDANHGIA(
	IDNguoiDuocDanhGia INT NOT NULL,
	IDNguoiDanhGia INT NOT NULL,
	ThoiGianDanhGia DATETIME NOT NULL,
	DiemDanhGia INT NOT NULL,
	NhanXet VARCHAR(1000),
	PRIMARY KEY(IDNguoiDuocDanhGia, IDNguoiDanhGia, ThoiGianDanhGia)
);

CREATE TABLE SANPHAMYEUTHICH(
	IDSanPham INT NOT NULL,
	IDNguoiDung INT NOT NULL,
	PRIMARY KEY(IDSanPham, IDNguoiDung)
);

CREATE TABLE DANHSACHCAM(
	IDNguoiDung INT NOT NULL,
	IDSanPham INT NOT NULL,
	PRIMARY KEY(IDNguoiDung, IDSanPham)
);

CREATE TABLE THAMSO(
	ID INT NOT NULL AUTO_INCREMENT,
	GiaTri FLOAT NOT NULL,
	PRIMARY KEY(ID)
);

ALTER TABLE SANPHAM ADD CONSTRAINT FK_SANPHAM_NGUOIDUNGBAN FOREIGN KEY(IDNguoiBan) REFERENCES NGUOIDUNG(ID);
ALTER TABLE SANPHAM ADD CONSTRAINT FK_SANPHAM_LOAI FOREIGN KEY(IDLoai) REFERENCES LOAICAP2(ID);
ALTER TABLE LOAICAP2 ADD CONSTRAINT FK_LOAICAP2_LOAICAP1 FOREIGN KEY(IDLoaiCap1) REFERENCES LOAICAP1(ID);
ALTER TABLE SANPHAM ADD CONSTRAINT FK_SANPHAM_NGUOIDUNGTHANG FOREIGN KEY(IDNguoiThangDauGia) REFERENCES NGUOIDUNG(ID);
ALTER TABLE HINHANH ADD CONSTRAINT FK_HINHANH_SANPHAM FOREIGN KEY(IDSanPham) REFERENCES SANPHAM(ID);
ALTER TABLE CHITIETDAUGIA ADD CONSTRAINT FK_CHITIETDAUGIA_NGUOIDUNGDAUGIA FOREIGN KEY(IDNguoiDauGia) REFERENCES NGUOIDUNG(ID);
ALTER TABLE CHITIETDAUGIA ADD CONSTRAINT FK_CHITIETDAUGIA_SANPHAM FOREIGN KEY(IDSanPham) REFERENCES SANPHAM(ID);
ALTER TABLE CHITIETDANHGIA ADD CONSTRAINT FK_CHITIETDANHGIA_NGUOIDUNGDUOCDANHGIA FOREIGN KEY(IDNguoiDuocDanhGia) REFERENCES NGUOIDUNG(ID);
ALTER TABLE CHITIETDANHGIA ADD CONSTRAINT FK_CHITIETDANHGIA_NGUOIDUNGDANHGIA FOREIGN KEY(IDNguoiDanhGia) REFERENCES NGUOIDUNG(ID);
ALTER TABLE SANPHAMYEUTHICH ADD CONSTRAINT FK_SANPHAMYEUTHICH_NGUOIDUNG FOREIGN KEY(IDNguoiDung) REFERENCES NGUOIDUNG(ID);
ALTER TABLE SANPHAMYEUTHICH ADD CONSTRAINT FK_SANPHAMYEUTHICH_SANPHAM FOREIGN KEY(IDSanPham) REFERENCES SANPHAM(ID);
ALTER TABLE DANHSACHCAM ADD CONSTRAINT FK_DANHSACHCAM_SANPHAM FOREIGN KEY(IDSanPham) REFERENCES SANPHAM(ID);
ALTER TABLE DANHSACHCAM ADD CONSTRAINT FK_DANHSACHCAM_NGUOIDUNG FOREIGN KEY(IDNguoiDung) REFERENCES NGUOIDUNG(ID);

INSERT INTO LOAICAP1(ID, TenLoai) VALUES
(null, 'Điện tử'),
(null, 'Thời trang'),
(null, 'Phương tiện'),
(null, 'Đồ chơi giải trí'),
(null, 'Trang sức');

INSERT INTO LOAICAP2(ID, IDLoaiCap1, TenLoai) VALUES
(null, 1, 'Điện thoại thông minh'),
(null, 1, 'Laptop'),
(null, 1, 'Linh kiện máy tính'),
(null, 2, 'Áo khoác'),
(null, 2, 'Quần tây'),
(null, 2, 'Bikini'),
(null, 3, 'Xe máy'),
(null, 3, 'Ôtô'),
(null, 4, 'Máy chơi game'),
(null, 4, 'Đồ chơi');

-- Loai: 1: Bidder, 2: Seller, 3: Admin
-- Folder avatar chứa avatar của user. Tên hình: {{ID}}.jpg
INSERT INTO NGUOIDUNG(ID, TenTaiKhoan, MatKhau, HoTen, NgaySinh, Email, DiaChi, DienThoai, Loai, XinNangCap, AvatarURL, TongDiemDanhGia) VALUES
(null, 'admin', '123', 'Tân Sơn Nhất', '1999-01-01', 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 3, false, 'assets/images/avatar/1.jpg', 10),
(null, 'seller1', '123', 'Triệu Thị Hai', '1999-01-01', 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 2, false, 'assets/images/avatar/2.jpg', 9),
(null, 'bidder1', '123', 'Nguyễn Văn Ba', '1999-01-01', 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 1, true, 'assets/images/avatar/3.jpg', 9),
(null, 'seller2', '123', 'Trịnh Minh Tư', '1999-01-01', 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 2, false, 'assets/images/avatar/4.jpg', 9),
(null, 'bidder2', '123', 'Phạm Hoài Năm', '1999-01-01', 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 1, true, 'assets/images/avatar/5.jpg', 9),
(null, 'seller3', '123', 'Võ Thị Sáu', '1999-01-01', 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 2, false, 'assets/images/avatar/6.jpg', 9),
(null, 'bidder3', '123', 'Lâm Văn Bảy', '1999-01-01', 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 1, true, 'assets/images/avatar/7.jpg', 9),
(null, 'seller4', '123', 'Lê Văn Tám', '1999-01-01', 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 2, false, 'assets/images/avatar/8.jpg', 9),
(null, 'bidder4', '123', 'Lại Hoàng Chín', '1999-01-01', 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 1, true, 'assets/images/avatar/9.jpg', 6),
(null, 'seller5', '123', 'Trần Văn Mười', '1999-01-01', 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 2, false, 'assets/images/avatar/10.jpg', 9),
(null, 'bidder5', '123', 'Mai Hoàng Linh Phi', '1999-01-01', 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 1, false, 'assets/images/avatar/11.jpg', 7),
(null, 'seller6', '123', 'Trần Nguyễn Thanh Trúc', '1999-01-01', 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 2, false, 'assets/images/avatar/12.jpg', 9),
(null, 'bidder6', '123', 'Quách Thị Minh Trang', '1999-01-01', 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 1, false, 'assets/images/avatar/13.jpg', 8),
(null, 'seller7', '123', 'Lâm Lê Bảo Nam', '1999-01-01', 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 2, false, 'assets/images/avatar/14.jpg', 9);

INSERT INTO SANPHAM(ID, TenSanPham, Gia, GiaMuaNgay, NgayDang, NgayHetHan, BuocGia, TuDongGiaHan, LuonDuocDauGia, MoTaNgan, MoTaDai, MainImg, SoLanDuocDauGia, IDLoai, IDNguoiBan, IDNguoiThangDauGia) VALUES
(null, 'sp', 100000, 2000000, '2019-11-29 20:20:20', '2019-12-01 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/1/main.jpg', 10, 1, 2, null),
(null, 'sp', 700000, 2000000, '2019-11-29 20:20:20', '2019-12-19 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/2/main.jpg', 10, 2, 12, null),
(null, 'sp', 250000, null, '2019-11-29 20:20:20', '2019-12-20 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/3/main.jpg', 100, 3, 4, null),
(null, 'sp', 360000, null, '2019-11-29 20:20:20', '2019-12-02 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/4/main.jpg', 10, 4, 4, null),
(null, 'sp', 800000, null, '2019-11-29 20:20:20', '2019-12-20 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/5/main.jpg', 10, 5, 10, null),
(null, 'sp', 400000, null, '2019-11-29 20:20:20', '2019-12-03 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/6/main.jpg', 10, 6, 6, null),
(null, 'sp', 410000, null, '2019-11-29 20:20:20', '2019-12-15 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/7/main.jpg', 200, 7, 8, null),
(null, 'sp', 500000, null, '2019-11-29 20:20:20', '2019-12-20 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/8/main.jpg', 10, 8, 8, null),
(null, 'sp', 300000, null, '2019-11-29 20:20:20', '2019-12-20 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/9/main.jpg', 10, 9, 14, null),
(null, 'sp', 100000, null, '2019-11-29 20:20:20', '2019-12-18 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/10/main.jpg', 10, 10, 6, null),
(null, 'sp', 100000, null, '2019-11-29 20:20:20', '2019-12-14 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/11/main.jpg', 10, 1, 4, null),
(null, 'sp', 100000, null, '2019-11-29 20:20:20', '2019-12-05 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/12/main.jpg', 300, 1, 4, null),
(null, 'sp', 350000, null, '2019-11-29 20:20:20', '2019-12-20 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/13/main.jpg', 10, 2, 4, null),
(null, 'sp', 100000, null, '2019-11-29 20:20:20', '2019-12-07 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/14/main.jpg', 10, 3, 2, null),
(null, 'sp', 100000, null, '2019-11-29 20:20:20', '2019-12-20 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/15/main.jpg', 10, 4, 12, null),
(null, 'sp', 400000, null, '2019-11-29 20:20:20', '2019-12-06 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/16/main.jpg', 10, 3, 2, null),
(null, 'sp', 510000, null, '2019-11-29 20:20:20', '2019-12-20 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/17/main.jpg', 400, 2, 8, null),
(null, 'sp', 100000, null, '2019-11-29 20:20:20', '2019-12-20 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/18/main.jpg', 10, 6, 6, null),
(null, 'sp', 100000, null, '2019-11-29 20:20:20', '2019-12-05 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/19/main.jpg', 10, 7, 4, null),
(null, 'sp', 100000, null, '2019-11-29 20:20:20', '2019-12-20 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/20/main.jpg', 10, 9, 2, null),
(null, 'sp', 190000, null, '2019-11-29 20:20:20', '2019-12-17 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/21/main.jpg', 10, 10, 10, null),
(null, 'sp', 100000, null, '2019-11-29 20:20:20', '2019-12-16 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/22/main.jpg', 500, 8, 14, null),
(null, 'sp', 100000, null, '2019-11-29 20:20:20', '2019-12-03 23:59:59', 20000, true, true, 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 'assets/images/product/23/main.jpg', 10, 1, 6, null);

-- Folder product gồm các folder là ID của product, trong đó chứa 3-4 tấm hình của product đó
-- Tên đường dẫn: assets/images/product/{{IDSanPham}}/{{IDHinh}}.jpg
INSERT INTO HINHANH(IDSanPham, IDHinh, ImgURL) VALUES
(1, 1, 'assets/images/product/1/1.jpg'),
(1, 2, 'assets/images/product/1/2.jpg'),
(1, 3, 'assets/images/product/1/3.jpg'),
(2, 1, 'assets/images/product/2/1.jpg'),
(2, 2, 'assets/images/product/2/2.jpg'),
(2, 3, 'assets/images/product/2/3.jpg'),
(3, 1, 'assets/images/product/3/1.jpg'),
(3, 2, 'assets/images/product/3/2.jpg'),
(3, 3, 'assets/images/product/3/3.jpg'),
(4, 1, 'assets/images/product/4/1.jpg'),
(4, 2, 'assets/images/product/4/2.jpg'),
(4, 3, 'assets/images/product/4/3.jpg'),
(5, 1, 'assets/images/product/5/1.jpg'),
(5, 2, 'assets/images/product/5/2.jpg'),
(5, 3, 'assets/images/product/5/3.jpg'),
(6, 1, 'assets/images/product/6/1.jpg'),
(6, 2, 'assets/images/product/6/2.jpg'),
(6, 3, 'assets/images/product/6/3.jpg'),
(7, 1, 'assets/images/product/7/1.jpg'),
(7, 2, 'assets/images/product/7/2.jpg'),
(7, 3, 'assets/images/product/7/3.jpg'),
(8, 1, 'assets/images/product/8/1.jpg'),
(8, 2, 'assets/images/product/8/2.jpg'),
(8, 3, 'assets/images/product/8/3.jpg'),
(9, 1, 'assets/images/product/9/1.jpg'),
(9, 2, 'assets/images/product/9/2.jpg'),
(9, 3, 'assets/images/product/9/3.jpg'),
(10, 1, 'assets/images/product/10/1.jpg'),
(10, 2, 'assets/images/product/10/2.jpg'),
(10, 3, 'assets/images/product/10/3.jpg'),
(11, 1, 'assets/images/product/11/1.jpg'),
(11, 2, 'assets/images/product/11/2.jpg'),
(11, 3, 'assets/images/product/11/3.jpg'),
(12, 1, 'assets/images/product/12/1.jpg'),
(12, 2, 'assets/images/product/12/2.jpg'),
(12, 3, 'assets/images/product/12/3.jpg'),
(13, 1, 'assets/images/product/13/1.jpg'),
(13, 2, 'assets/images/product/13/2.jpg'),
(13, 3, 'assets/images/product/13/3.jpg'),
(14, 1, 'assets/images/product/14/1.jpg'),
(14, 2, 'assets/images/product/14/2.jpg'),
(14, 3, 'assets/images/product/14/3.jpg'),
(15, 1, 'assets/images/product/15/1.jpg'),
(15, 2, 'assets/images/product/15/2.jpg'),
(15, 3, 'assets/images/product/15/3.jpg'),
(16, 1, 'assets/images/product/16/1.jpg'),
(16, 2, 'assets/images/product/16/2.jpg'),
(16, 3, 'assets/images/product/16/3.jpg'),
(17, 1, 'assets/images/product/17/1.jpg'),
(17, 2, 'assets/images/product/17/2.jpg'),
(17, 3, 'assets/images/product/17/3.jpg'),
(18, 1, 'assets/images/product/18/1.jpg'),
(18, 2, 'assets/images/product/18/2.jpg'),
(18, 3, 'assets/images/product/18/3.jpg'),
(19, 1, 'assets/images/product/19/1.jpg'),
(19, 2, 'assets/images/product/19/2.jpg'),
(19, 3, 'assets/images/product/19/3.jpg'),
(20, 1, 'assets/images/product/20/1.jpg'),
(20, 2, 'assets/images/product/20/2.jpg'),
(20, 3, 'assets/images/product/20/3.jpg'),
(21, 1, 'assets/images/product/21/1.jpg'),
(21, 2, 'assets/images/product/21/2.jpg'),
(21, 3, 'assets/images/product/21/3.jpg'),
(22, 1, 'assets/images/product/22/1.jpg'),
(22, 2, 'assets/images/product/22/2.jpg'),
(22, 3, 'assets/images/product/22/3.jpg'),
(23, 1, 'assets/images/product/23/1.jpg'),
(23, 2, 'assets/images/product/23/2.jpg'),
(23, 3, 'assets/images/product/23/3.jpg');

INSERT INTO SANPHAMYEUTHICH(IDSanPham, IDNguoiDung) VALUES
(1, 9),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(3, 2),
(3, 5),
(3, 7),
(4, 5),
(4, 2),
(4, 9),
(5, 8),
(5, 6),
(5, 5),
(3, 3),
(6, 6),
(6, 2),
(6, 9),
(7, 4),
(7, 3);

INSERT INTO DANHSACHCAM(IDNguoiDung, IDSanPham) VALUES
(1, 3),
(2, 2),
(3, 20),
(4, 8),
(5, 19),
(6, 5),
(7, 12),
(8, 15),
(9, 1),
(10, 14),
(11, 13),
(12, 11),
(13, 17),
(14, 6);

-- YYYY-MM-DD hh:mm:ss
INSERT INTO CHITIETDAUGIA(IDNguoiDauGia, IDSanPham, ThoiGianDauGia, Gia) VALUES
(1, 9, '2019-12-06 15:23:23', 100000),
(2, 8, '2019-12-06 15:23:23', 100000),
(3, 7, '2019-12-06 15:23:23', 100000),
(4, 6, '2019-12-06 15:23:23', 100000),
(5, 5, '2019-12-06 15:23:23', 100000),
(6, 4, '2019-12-06 15:23:23', 100000),
(7, 3, '2019-12-06 15:23:23', 100000),
(8, 2, '2019-12-06 15:23:23', 100000),
(4, 1, '2019-12-06 15:23:23', 100000),
(1, 2, '2019-12-06 15:23:23', 300000),
(2, 3, '2019-12-06 15:23:23', 250000),
(3, 4, '2019-12-06 15:23:23', 360000),
(4, 5, '2019-12-06 15:23:23', 800000),
(4, 6, '2019-12-06 15:40:23', 400000),
(6, 7, '2019-12-06 15:23:23', 410000),
(7, 8, '2019-12-06 15:23:23', 500000),
(8, 9, '2019-12-06 15:23:23', 200000),
(7, 2, '2019-12-06 15:23:23', 700000),
(12, 9, '2019-12-06 15:25:23', 300000),
(10, 10, '2019-12-09 22:21:33', 100000),
(14, 11, '2019-12-09 22:21:33', 100000),
(3, 17, '2019-12-09 22:21:33', 500000),
(13, 12, '2019-12-09 22:21:33', 100000),
(7, 13, '2019-12-09 22:21:33', 300000),
(11, 14, '2019-12-09 22:21:33', 100000),
(11, 15, '2019-12-09 22:21:33', 100000),
(8, 16, '2019-12-09 22:21:33', 180000),
(10, 16, '2019-12-09 22:21:33', 300000),
(11, 16, '2019-12-09 22:21:33', 400000),
(11, 17, '2019-12-09 22:21:33', 510000),
(5, 18, '2019-12-09 22:21:33', 100000),
(3, 19, '2019-12-09 22:21:33', 100000),
(10, 20, '2019-12-09 22:21:33', 100000),
(2, 21, '2019-12-09 22:21:33', 190000),
(2, 13, '2019-12-09 22:21:33', 350000),
(12, 22, '2019-12-09 22:21:33', 100000),
(14, 23, '2019-12-09 22:21:33', 100000);

INSERT INTO CHITIETDANHGIA(IDNguoiDuocDanhGia, IDNguoiDanhGia, ThoiGianDanhGia, DiemDanhGia, NhanXet) VALUES
(3, 2, '2019-12-07 20:20:20', 1, 'Comment'),
(3, 4, '2019-12-07 20:20:20', 1, 'Comment'),
(5, 6, '2019-12-07 20:20:20', -1, 'Comment'),
(5, 8, '2019-12-07 20:20:20', 1, 'Comment'),
(7, 6, '2019-12-07 20:20:20', 1, 'Comment'),
(7, 4, '2019-12-07 20:20:20', -1, 'Comment'),
(9, 2, '2019-12-07 20:20:20', 1, 'Comment'),
(9, 4, '2019-12-07 20:20:20', -1, 'Comment'),
(5, 4, '2019-12-07 20:20:20', -1, 'Comment'),
(9, 6, '2019-12-07 20:20:20', 1, 'Comment'),
(7, 8, '2019-12-07 20:20:20', 1, 'Comment'),
(3, 8, '2019-12-07 20:20:20', 1, 'Comment'),
(9, 8, '2019-12-07 20:20:20', -1, 'Comment'),
(7, 2, '2019-12-07 20:20:20', 1, 'Comment'),
(3, 6, '2019-12-07 20:20:20', -1, 'Comment'),
(5, 2, '2019-12-07 20:20:20', 1, 'Comment');

-- 5 sản phẩm giá cao nhất
SELECT * FROM SANPHAM ORDER BY Gia DESC LIMIT 5;

-- 5 sản phẩm có lượt đấu giá nhiều nhất
SELECT * FROM SANPHAM ORDER BY SoLanDuocDauGia DESC LIMIT 5;

-- 5 sản phẩm gần hết hạn đấu giá
SELECT * FROM SANPHAM ORDER BY NgayHetHan ASC LIMIT 5;

-- Danh sách sản phẩm với số lượt yêu thích
SELECT SP.ID, SP.TenSanPham, COUNT(SPYT.IDNguoiDung) AS SoLuotYeuThich
FROM SANPHAM SP LEFT JOIN SANPHAMYEUTHICH SPYT ON SP.ID = SPYT.IDSanPham
GROUP BY SP.ID, SP.TenSanPham;

-- Hiển thị tất cả thông tin sản phẩm + hình ảnh + lịch sử đấu giá của 1 sản phẩm
SELECT * FROM SANPHAM SP LEFT JOIN CHITIETDAUGIA CTDG ON SP.ID = CTDG.IDSanPham
LEFT JOIN HINHANH HINH ON HINH.IDSanPham = SP.ID
WHERE SP.ID = 1;

-- Cho biết tên tài khoản và tổng điểm của người ra giá cao nhất cho sản phẩm
SELECT CTDG1.IDSanPham, ND.ID, ND.TenTaiKhoan, ND.TongDiemDanhGia, CTDG1.Gia
FROM NGUOIDUNG ND JOIN CHITIETDAUGIA CTDG1 ON ND.ID = CTDG1.IDNguoiDauGia
WHERE CTDG1.Gia = (
	SELECT MAX(CTDG2.Gia) FROM CHITIETDAUGIA CTDG2 WHERE CTDG1.IDSanPham = CTDG2.IDSanPham
) ORDER BY CTDG1.IDSanPham;

-- Cho biết các sản phẩm liên quan
SELECT SP1.*
FROM SANPHAM SP1 JOIN SANPHAM SP2 ON SP1.IDLoai = SP2.IDLoai
WHERE SP1.ID <> SP2.ID AND SP2.ID = 1
ORDER BY RAND() LIMIT 5;

-- Thông tin các lần được đánh giá của 1 người
SELECT ND1.TongDiemDanhGia, ND2.TenTaiKhoan, CTDANHGIA.*
FROM NGUOIDUNG ND1 JOIN CHITIETDANHGIA CTDANHGIA ON ND1.ID = CTDANHGIA.IDNguoiDuocDanhGia
JOIN NGUOIDUNG ND2 ON ND2.ID = CTDANHGIA.IDNguoiDanhGia
WHERE ND1.ID = 3;

-- Danh sách các bidder xin nâng cấp tài khoản
SELECT * FROM NGUOIDUNG WHERE XinNangCap = true;

SELECT count(*) as total FROM SANPHAM SP WHERE SP.IDLoai = 1