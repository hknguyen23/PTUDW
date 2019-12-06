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
	AvatarURL VARCHAR(100) NOT NULL,
	TongDiemDanhGia INT NOT NULL,
	PRIMARY KEY(ID)
);

CREATE TABLE SANPHAM(
	ID INT NOT NULL AUTO_INCREMENT,
	TenSanPham VARCHAR(1000) NOT NULL,
	Gia FLOAT NOT NULL,
	ThoiGianConLai TIME NOT NULL,
    MoTaNgan VARCHAR(100),
    MoTaDai VARCHAR(1000),
	SoLanDuocDauGia INT,
	IDLoai INT NOT NULL,
	IDNguoiBan INT NOT NULL,
	IDNguoiThangDauGia INT,
	PRIMARY KEY(ID)
);

CREATE TABLE LOAI(
	ID INT NOT NULL AUTO_INCREMENT,
	TenLoai VARCHAR(100) NOT NULL,
	PRIMARY KEY(ID)
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
	Gia FLOAT,
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

CREATE TABLE THAMSO(
	ID INT NOT NULL AUTO_INCREMENT,
	ChiPhiDangSanPham FLOAT,
	PRIMARY KEY(ID)
);

ALTER TABLE SANPHAM ADD CONSTRAINT FK_SANPHAM_NGUOIDUNGBAN FOREIGN KEY(IDNguoiBan) REFERENCES NGUOIDUNG(ID);
ALTER TABLE SANPHAM ADD CONSTRAINT FK_SANPHAM_LOAI FOREIGN KEY(IDLoai) REFERENCES LOAI(ID);
ALTER TABLE SANPHAM ADD CONSTRAINT FK_SANPHAM_NGUOIDUNGTHANG FOREIGN KEY(IDNguoiThangDauGia) REFERENCES NGUOIDUNG(ID);
ALTER TABLE HINHANH ADD CONSTRAINT FK_HINHANH_SANPHAM FOREIGN KEY(IDSanPham) REFERENCES SANPHAM(ID);
ALTER TABLE CHITIETDAUGIA ADD CONSTRAINT FK_CHITIETDAUGIA_NGUOIDUNGDAUGIA FOREIGN KEY(IDNguoiDauGia) REFERENCES NGUOIDUNG(ID);
ALTER TABLE CHITIETDAUGIA ADD CONSTRAINT FK_CHITIETDAUGIA_SANPHAM FOREIGN KEY(IDSanPham) REFERENCES SANPHAM(ID);
ALTER TABLE CHITIETDANHGIA ADD CONSTRAINT FK_CHITIETDANHGIA_NGUOIDUNGDUOCDANHGIA FOREIGN KEY(IDNguoiDuocDanhGia) REFERENCES NGUOIDUNG(ID);
ALTER TABLE CHITIETDANHGIA ADD CONSTRAINT FK_CHITIETDANHGIA_NGUOIDUNGDANHGIA FOREIGN KEY(IDNguoiDanhGia) REFERENCES NGUOIDUNG(ID);
ALTER TABLE SANPHAMYEUTHICH ADD CONSTRAINT FK_SANPHAMYEUTHICH_NGUOIDUNG FOREIGN KEY(IDNguoiDung) REFERENCES NGUOIDUNG(ID);
ALTER TABLE SANPHAMYEUTHICH ADD CONSTRAINT FK_SANPHAMYEUTHICH_SANPchitietdanhgiaHAM FOREIGN KEY(IDSanPham) REFERENCES SANPHAM(ID);

INSERT INTO LOAI(ID, TenLoai) VALUES
(null, 'Điện tử'),
(null, 'Quần áo'),
(null, 'Thực phẩm');

-- Loai: 1: Bidder, 2: Seller, 3: Admin
-- Folder avatar chứa avatar của user. Tên hình: {{ID}}.jpg
INSERT INTO NGUOIDUNG(ID, TenTaiKhoan, MatKhau, HoTen, NgaySinh, Email, DiaChi, DienThoai, Loai, AvatarURL, TongDiemDanhGia) VALUES
(null, 'abc', '123', 'Ad Văn Min', 01/01/1999, 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 3, 'assets/images/avatar/1.jpg', 10),
(null, 'abc', '123', 'Sel Văn Ler', 01/01/1999, 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 2, 'assets/images/avatar/2.jpg', 9),
(null, 'abc', '123', 'Bid Văn Der', 01/01/1999, 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 1, 'assets/images/avatar/3.jpg', 9),
(null, 'abc', '123', 'Nguyễn Văn A', 01/01/1999, 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 2, 'assets/images/avatar/4.jpg', 9),
(null, 'abc', '123', 'Nguyễn Văn A', 01/01/1999, 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 1, 'assets/images/avatar/5.jpg', 9),
(null, 'abc', '123', 'Nguyễn Văn A', 01/01/1999, 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 2, 'assets/images/avatar/6.jpg', 9),
(null, 'abc', '123', 'Nguyễn Văn A', 01/01/1999, 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 1, 'assets/images/avatar/7.jpg', 9),
(null, 'abc', '123', 'Nguyễn Văn A', 01/01/1999, 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 2, 'assets/images/avatar/8.jpg', 9),
(null, 'abc', '123', 'Nguyễn Văn A', 01/01/1999, 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 1, 'assets/images/avatar/9.jpg', 6),
(null, 'abc', '123', 'Nguyễn Văn A', 01/01/1999, 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 2, 'assets/images/avatar/10.jpg', 9),
(null, 'abc', '123', 'Nguyễn Văn A', 01/01/1999, 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 1, 'assets/images/avatar/11.jpg', 7),
(null, 'abc', '123', 'Nguyễn Văn A', 01/01/1999, 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 2, 'assets/images/avatar/12.jpg', 9),
(null, 'abc', '123', 'Nguyễn Văn A', 01/01/1999, 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 1, 'assets/images/avatar/13.jpg', 8),
(null, 'abc', '123', 'Nguyễn Văn A', 01/01/1999, 'someone@example.com', '227 Nguyễn Văn Cừ, Q5, TPHCM', '0987654321', 2, 'assets/images/avatar/14.jpg', 9);

INSERT INTO SANPHAM(ID, TenSanPham, Gia, ThoiGianConLai, MoTaNgan, MoTaDai, SoLanDuocDauGia, IDLoai, IDNguoiBan, IDNguoiThangDauGia) VALUES
(null, 'sp', 100000, '00:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 1, 2, 6),
(null, 'sp', 1000000, '01:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 2, 2, 7),
(null, 'sp', 100000, '01:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 100, 3, 4, 8),
(null, 'sp', 100000, '01:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 1, 4, 9),
(null, 'sp', 100000, '07:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 2, 6, 8),
(null, 'sp', 100000, '01:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 3, 6, 7),
(null, 'sp', 100000, '00:12:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 200, 1, 8, 6),
(null, 'sp', 100000, '01:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 2, 8, 5),
(null, 'sp', 2000000, '00:03:59', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 3, 6, 4),
(null, 'sp', 100000, '01:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 1, 6, 3),
(null, 'sp', 100000, '13:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 2, 4, 9),
(null, 'sp', 100000, '01:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 300, 3, 4, 8),
(null, 'sp', 3000000, '02:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 1, 4, 2),
(null, 'sp', 100000, '01:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 2, 2, 9),
(null, 'sp', 100000, '01:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 3, 2, 3),
(null, 'sp', 4000000, '01:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 1, 2, 4),
(null, 'sp', 5000000, '00:40:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 400, 2, 8, 5),
(null, 'sp', 100000, '01:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 3, 6, 5),
(null, 'sp', 100000, '01:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 1, 4, 6),
(null, 'sp', 100000, '01:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 2, 2, 7),
(null, 'sp', 100000, '00:23:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 3, 2, 8),
(null, 'sp', 100000, '08:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 500, 1, 4, 9),
(null, 'sp', 100000, '01:01:01', 'Mô tả ngắn', 'Mô tả dàiiiiiiiiiiiiiiiiiiiiiiiii', 10, 2, 6, 7);

-- Folder product gồm các folder là ID của product, trong đó chứa 3-4 tấm hình của product đó
-- Tên đường dẫn: assets/images/product/{{IDSanPham}}/{{IDHinh}}.jpg
INSERT INTO HINHANH(IDSanPham, IDHinh, ImgURL) VALUES
(1, 1, 'assets/images/product/1/1.jpg'),
(1, 2, 'assets/images/product/1/2.jpg'),
(1, 3, 'assets/images/product/1/3.jpg'),
(1, 4, 'assets/images/product/1/4.jpg'),
(2, 1, 'assets/images/product/2/1.jpg'),
(2, 2, 'assets/images/product/2/2.jpg'),
(2, 3, 'assets/images/product/2/3.jpg'),
(2, 4, 'assets/images/product/2/4.jpg'),
(3, 1, 'assets/images/product/3/1.jpg'),
(3, 2, 'assets/images/product/3/2.jpg'),
(3, 3, 'assets/images/product/3/3.jpg'),
(3, 4, 'assets/images/product/3/4.jpg'),
(4, 1, 'assets/images/product/4/1.jpg'),
(4, 2, 'assets/images/product/4/2.jpg'),
(4, 3, 'assets/images/product/4/3.jpg'),
(4, 4, 'assets/images/product/4/4.jpg'),
(5, 1, 'assets/images/product/5/1.jpg'),
(5, 2, 'assets/images/product/5/2.jpg'),
(5, 3, 'assets/images/product/5/3.jpg'),
(5, 4, 'assets/images/product/5/4.jpg'),
(6, 1, 'assets/images/product/6/1.jpg'),
(6, 2, 'assets/images/product/6/2.jpg'),
(6, 3, 'assets/images/product/6/3.jpg'),
(6, 4, 'assets/images/product/6/4.jpg');

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

-- YYYY-MM-DD hh:mm:ss
INSERT INTO CHITIETDAUGIA(IDNguoiDauGia, IDSanPham, ThoiGianDauGia, Gia) VALUES
(1, 9, '2019-12-06 15:23:23', 200000),
(2, 8, '2019-12-06 15:23:23', 200000),
(3, 7, '2019-12-06 15:23:23', 200000),
(4, 6, '2019-12-06 15:23:23', 200000),
(5, 5, '2019-12-06 15:23:23', 200000),
(6, 4, '2019-12-06 15:23:23', 200000),
(7, 3, '2019-12-06 15:23:23', 200000),
(8, 2, '2019-12-06 15:23:23', 200000),
(9, 1, '2019-12-06 15:23:23', 200000),
(1, 2, '2019-12-06 15:23:23', 300000),
(2, 3, '2019-12-06 15:23:23', 200000),
(3, 4, '2019-12-06 15:23:23', 200000),
(4, 5, '2019-12-06 15:23:23', 200000),
(4, 6, '2019-12-06 15:40:23', 400000),
(6, 7, '2019-12-06 15:23:23', 200000),
(7, 8, '2019-12-06 15:23:23', 200000),
(8, 9, '2019-12-06 15:23:23', 200000),
(9, 2, '2019-12-06 15:23:23', 200000),
(1, 9, '2019-12-06 15:25:23', 300000);

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
