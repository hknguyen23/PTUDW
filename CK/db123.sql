CREATE DATABASE  IF NOT EXISTS `sandaugiatructuyen` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sandaugiatructuyen`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: sandaugiatructuyen
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chitietdanhgia`
--

DROP TABLE IF EXISTS `chitietdanhgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietdanhgia` (
  `IDNguoiDuocDanhGia` int(11) NOT NULL,
  `IDNguoiDanhGia` int(11) NOT NULL,
  `IDSanPham` int(11) NOT NULL,
  `ThoiGianDanhGia` datetime NOT NULL,
  `DiemDanhGia` int(11) NOT NULL,
  `NhanXet` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`IDNguoiDuocDanhGia`,`IDNguoiDanhGia`,`IDSanPham`,`ThoiGianDanhGia`),
  KEY `FK_CHITIETDANHGIA_NGUOIDUNGDANHGIA` (`IDNguoiDanhGia`),
  KEY `FK_CHITIETDANHGIA_SANPHAM` (`IDSanPham`),
  CONSTRAINT `FK_CHITIETDANHGIA_NGUOIDUNGDANHGIA` FOREIGN KEY (`IDNguoiDanhGia`) REFERENCES `nguoidung` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_CHITIETDANHGIA_NGUOIDUNGDUOCDANHGIA` FOREIGN KEY (`IDNguoiDuocDanhGia`) REFERENCES `nguoidung` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_CHITIETDANHGIA_SANPHAM` FOREIGN KEY (`IDSanPham`) REFERENCES `sanpham` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdanhgia`
--

LOCK TABLES `chitietdanhgia` WRITE;
/*!40000 ALTER TABLE `chitietdanhgia` DISABLE KEYS */;
/*!40000 ALTER TABLE `chitietdanhgia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietdaugia`
--

DROP TABLE IF EXISTS `chitietdaugia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietdaugia` (
  `IDNguoiDauGia` int(11) NOT NULL,
  `IDSanPham` int(11) NOT NULL,
  `ThoiGianDauGia` datetime NOT NULL,
  `Gia` float NOT NULL,
  `MaxGia` float DEFAULT NULL,
  PRIMARY KEY (`IDNguoiDauGia`,`IDSanPham`,`ThoiGianDauGia`),
  KEY `FK_CHITIETDAUGIA_SANPHAM` (`IDSanPham`),
  CONSTRAINT `FK_CHITIETDAUGIA_NGUOIDUNGDAUGIA` FOREIGN KEY (`IDNguoiDauGia`) REFERENCES `nguoidung` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_CHITIETDAUGIA_SANPHAM` FOREIGN KEY (`IDSanPham`) REFERENCES `sanpham` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdaugia`
--

LOCK TABLES `chitietdaugia` WRITE;
/*!40000 ALTER TABLE `chitietdaugia` DISABLE KEYS */;
INSERT INTO `chitietdaugia` (`IDNguoiDauGia`, `IDSanPham`, `ThoiGianDauGia`, `Gia`, `MaxGia`) VALUES (1,3,'2020-01-07 00:47:21',90000,NULL),(1,13,'2020-01-07 00:47:06',8200000,11000000),(2,1,'2020-01-07 00:44:05',500000,NULL),(2,17,'2020-01-07 00:45:29',3000000,NULL),(2,22,'2020-01-07 00:50:11',60000000,60000000),(3,12,'2020-01-07 00:48:37',5000000,5400000),(3,20,'2020-01-07 00:48:03',140000,200000),(4,1,'2020-01-07 00:43:56',450000,450000),(4,4,'2020-01-07 00:41:06',988000,1000000),(4,12,'2020-01-07 00:41:38',4800000,NULL),(4,13,'2020-01-07 00:46:53',8000000,8000000),(5,3,'2020-01-07 00:50:31',100000,NULL),(5,15,'2020-01-07 00:50:45',4000000,NULL),(5,22,'2020-01-07 00:50:12',60000000,NULL);
/*!40000 ALTER TABLE `chitietdaugia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danhsachcam`
--

DROP TABLE IF EXISTS `danhsachcam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danhsachcam` (
  `IDNguoiDung` int(11) NOT NULL,
  `IDSanPham` int(11) NOT NULL,
  PRIMARY KEY (`IDNguoiDung`,`IDSanPham`),
  KEY `FK_DANHSACHCAM_SANPHAM` (`IDSanPham`),
  CONSTRAINT `FK_DANHSACHCAM_NGUOIDUNG` FOREIGN KEY (`IDNguoiDung`) REFERENCES `nguoidung` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_DANHSACHCAM_SANPHAM` FOREIGN KEY (`IDSanPham`) REFERENCES `sanpham` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhsachcam`
--

LOCK TABLES `danhsachcam` WRITE;
/*!40000 ALTER TABLE `danhsachcam` DISABLE KEYS */;
/*!40000 ALTER TABLE `danhsachcam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hinhanh`
--

DROP TABLE IF EXISTS `hinhanh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hinhanh` (
  `IDSanPham` int(11) NOT NULL,
  `IDHinh` int(11) NOT NULL,
  `ImgURL` varchar(100) NOT NULL,
  PRIMARY KEY (`IDSanPham`,`IDHinh`),
  CONSTRAINT `FK_HINHANH_SANPHAM` FOREIGN KEY (`IDSanPham`) REFERENCES `sanpham` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hinhanh`
--

LOCK TABLES `hinhanh` WRITE;
/*!40000 ALTER TABLE `hinhanh` DISABLE KEYS */;
INSERT INTO `hinhanh` (`IDSanPham`, `IDHinh`, `ImgURL`) VALUES (1,1,'assets/images/product/1/1.jpg'),(1,2,'assets/images/product/1/2.jpg'),(1,3,'assets/images/product/1/3.jpg'),(1,4,'assets/images/product/1/4.jpg'),(2,1,'assets/images/product/2/1.jpg'),(2,2,'assets/images/product/2/2.jpg'),(2,3,'assets/images/product/2/3.jpg'),(2,4,'assets/images/product/2/4.jpg'),(3,1,'assets/images/product/3/1.jpg'),(3,2,'assets/images/product/3/2.jpg'),(3,3,'assets/images/product/3/3.jpg'),(3,4,'assets/images/product/3/4.jpg'),(4,1,'assets/images/product/4/1.jpg'),(4,2,'assets/images/product/4/2.jpg'),(4,3,'assets/images/product/4/3.jpg'),(4,4,'assets/images/product/4/4.jpg'),(5,1,'assets/images/product/5/1.jpg'),(5,2,'assets/images/product/5/2.jpg'),(5,3,'assets/images/product/5/3.jpg'),(5,4,'assets/images/product/5/4.jpg'),(6,1,'assets/images/product/6/1.jpg'),(6,2,'assets/images/product/6/2.jpg'),(6,3,'assets/images/product/6/3.jpg'),(6,4,'assets/images/product/6/4.jpg'),(7,1,'assets/images/product/7/1.jpg'),(7,2,'assets/images/product/7/2.jpg'),(7,3,'assets/images/product/7/3.jpg'),(7,4,'assets/images/product/7/4.jpg'),(8,1,'assets/images/product/8/1.jpg'),(8,2,'assets/images/product/8/2.jpg'),(8,3,'assets/images/product/8/3.jpg'),(8,4,'assets/images/product/8/4.jpg'),(9,1,'assets/images/product/9/1.jpg'),(9,2,'assets/images/product/9/2.jpg'),(9,3,'assets/images/product/9/3.jpg'),(9,4,'assets/images/product/9/4.jpg'),(10,1,'assets/images/product/10/1.jpg'),(10,2,'assets/images/product/10/2.jpg'),(10,3,'assets/images/product/10/3.jpg'),(10,4,'assets/images/product/10/4.jpg'),(11,1,'assets/images/product/11/1.jpg'),(11,2,'assets/images/product/11/2.jpg'),(11,3,'assets/images/product/11/3.jpg'),(11,4,'assets/images/product/11/4.jpg'),(12,1,'assets/images/product/12/1.jpg'),(12,2,'assets/images/product/12/2.jpg'),(12,3,'assets/images/product/12/3.jpg'),(12,4,'assets/images/product/12/4.jpg'),(13,1,'assets/images/product/13/1.jpg'),(13,2,'assets/images/product/13/2.jpg'),(13,3,'assets/images/product/13/3.jpg'),(13,4,'assets/images/product/13/4.jpg'),(14,1,'assets/images/product/14/1.jpg'),(14,2,'assets/images/product/14/2.jpg'),(14,3,'assets/images/product/14/3.jpg'),(14,4,'assets/images/product/14/4.jpg'),(15,1,'assets/images/product/15/1.jpg'),(15,2,'assets/images/product/15/2.jpg'),(15,3,'assets/images/product/15/3.jpg'),(15,4,'assets/images/product/15/4.jpg'),(16,1,'assets/images/product/16/1.jpg'),(16,2,'assets/images/product/16/2.jpg'),(16,3,'assets/images/product/16/3.jpg'),(16,4,'assets/images/product/16/4.jpg'),(17,1,'assets/images/product/17/1.jpg'),(17,2,'assets/images/product/17/2.jpg'),(17,3,'assets/images/product/17/3.jpg'),(17,4,'assets/images/product/17/4.jpg'),(18,1,'assets/images/product/18/1.jpg'),(18,2,'assets/images/product/18/2.jpg'),(18,3,'assets/images/product/18/3.jpg'),(18,4,'assets/images/product/18/4.jpg'),(19,1,'assets/images/product/19/1.jpg'),(19,2,'assets/images/product/19/2.jpg'),(19,3,'assets/images/product/19/3.jpg'),(19,4,'assets/images/product/19/4.jpg'),(20,1,'assets/images/product/20/1.jpg'),(20,2,'assets/images/product/20/2.jpg'),(20,3,'assets/images/product/20/3.jpg'),(20,4,'assets/images/product/20/4.jpg'),(21,1,'assets/images/product/21/1.jpg'),(21,2,'assets/images/product/21/2.jpg'),(21,3,'assets/images/product/21/3.jpg'),(21,4,'assets/images/product/21/4.jpg'),(22,1,'assets/images/product/22/1.jpg'),(22,2,'assets/images/product/22/2.jpg'),(22,3,'assets/images/product/22/3.jpg'),(22,4,'assets/images/product/22/4.jpg'),(23,1,'assets/images/product/23/1.jpg'),(23,2,'assets/images/product/23/2.jpg'),(23,3,'assets/images/product/23/3.jpg'),(23,4,'assets/images/product/23/4.jpg');
/*!40000 ALTER TABLE `hinhanh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loaicap1`
--

DROP TABLE IF EXISTS `loaicap1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaicap1` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TenLoai` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaicap1`
--

LOCK TABLES `loaicap1` WRITE;
/*!40000 ALTER TABLE `loaicap1` DISABLE KEYS */;
INSERT INTO `loaicap1` (`ID`, `TenLoai`) VALUES (1,'Điện tử'),(2,'Thời trang'),(3,'Trang sức');
/*!40000 ALTER TABLE `loaicap1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loaicap2`
--

DROP TABLE IF EXISTS `loaicap2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaicap2` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDLoaiCap1` int(11) NOT NULL,
  `TenLoai` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`,`IDLoaiCap1`),
  KEY `FK_LOAICAP2_LOAICAP1` (`IDLoaiCap1`),
  CONSTRAINT `FK_LOAICAP2_LOAICAP1` FOREIGN KEY (`IDLoaiCap1`) REFERENCES `loaicap1` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaicap2`
--

LOCK TABLES `loaicap2` WRITE;
/*!40000 ALTER TABLE `loaicap2` DISABLE KEYS */;
INSERT INTO `loaicap2` (`ID`, `IDLoaiCap1`, `TenLoai`) VALUES (1,1,'Điện thoại thông minh'),(2,1,'Laptop'),(3,1,'Phụ kiện máy tính'),(4,1,'Thiết bị số'),(5,2,'Áo'),(6,2,'Quần'),(7,3,'Dây chuyền'),(8,3,'Vòng tay');
/*!40000 ALTER TABLE `loaicap2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoidung`
--

DROP TABLE IF EXISTS `nguoidung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoidung` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TenTaiKhoan` varchar(20) NOT NULL,
  `MatKhau` varchar(100) NOT NULL,
  `HoTen` varchar(30) NOT NULL,
  `NgaySinh` date DEFAULT NULL,
  `Email` varchar(50) NOT NULL,
  `DiaChi` varchar(1000) DEFAULT NULL,
  `DienThoai` varchar(20) DEFAULT NULL,
  `Loai` int(11) NOT NULL,
  `XinNangCap` tinyint(1) NOT NULL,
  `AvatarURL` varchar(100) DEFAULT NULL,
  `TongDiemDanhGia` int(11) DEFAULT '0',
  `token` varchar(100) DEFAULT NULL,
  `token_expire` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoidung`
--

LOCK TABLES `nguoidung` WRITE;
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
INSERT INTO `nguoidung` (`ID`, `TenTaiKhoan`, `MatKhau`, `HoTen`, `NgaySinh`, `Email`, `DiaChi`, `DienThoai`, `Loai`, `XinNangCap`, `AvatarURL`, `TongDiemDanhGia`, `token`, `token_expire`) VALUES (1,'ltminh','$2a$10$UDz2mHLCnOVg.yts1xSEmevILJbhBhgJDqp/rwWeFPluvO3LN6urm','Lạc Tuấn Minh','1999-01-01','jumming456@gmail.com','1712593 Nguyễn Văn Cừ, Q5, TPHCM','0987654321',3,0,'assets/images/avatar/1.jpg',0,NULL,NULL),(2,'nqminh','$2a$10$UDz2mHLCnOVg.yts1xSEmevILJbhBhgJDqp/rwWeFPluvO3LN6urm','Nguyễn Quang Minh','1999-02-02','masa23vn@gmail.com','1712596 Nguyễn Văn Cừ, Q5, TPHCM','0123456789',3,0,'assets/images/avatar/2.jpg',0,NULL,NULL),(3,'hknguyen','$2a$10$UDz2mHLCnOVg.yts1xSEmevILJbhBhgJDqp/rwWeFPluvO3LN6urm','Hồ Khánh Nguyên','1999-03-03','hokhanhnguyen23@gmail.com','1712618 Nguyễn Văn Cừ, Q5, TPHCM','0918273645',3,0,'assets/images/avatar/3.jpg',0,NULL,NULL),(4,'biddertest','$2a$10$gfNquDaiqaeCCegeD7pLv.DmdAgeKWC55cSmDYO32pJmVJCzEdJiy','quang minh',NULL,'biddertest@example.com',NULL,NULL,1,0,NULL,0,NULL,NULL),(5,'testseller','$2a$10$1qn3AKmZ8PdxFpJV7xJpueYzjPE4a.Ck9PHEXejSM9oSOjuem0VdO','test seller',NULL,'pueblotrillion@gmail.com',NULL,NULL,2,0,NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TenSanPham` varchar(1000) NOT NULL,
  `Gia` float NOT NULL,
  `GiaMuaNgay` float DEFAULT NULL,
  `NgayDang` datetime NOT NULL,
  `NgayHetHan` datetime NOT NULL,
  `BuocGia` float NOT NULL,
  `TuDongGiaHan` tinyint(1) NOT NULL,
  `LuonDuocDauGia` tinyint(1) NOT NULL,
  `MoTaDai` varchar(1000) DEFAULT NULL,
  `MainImg` varchar(100) NOT NULL,
  `SoLanDuocDauGia` int(11) DEFAULT NULL,
  `IDLoai` int(11) NOT NULL,
  `IDNguoiBan` int(11) NOT NULL,
  `IDNguoiThangDauGia` int(11) DEFAULT NULL,
  `TrangThai` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`ID`),
  KEY `FK_SANPHAM_NGUOIDUNGBAN` (`IDNguoiBan`),
  KEY `FK_SANPHAM_LOAI` (`IDLoai`),
  KEY `FK_SANPHAM_NGUOIDUNGTHANG` (`IDNguoiThangDauGia`),
  FULLTEXT KEY `TenSanPham` (`TenSanPham`,`MoTaDai`),
  CONSTRAINT `FK_SANPHAM_LOAI` FOREIGN KEY (`IDLoai`) REFERENCES `loaicap2` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_SANPHAM_NGUOIDUNGBAN` FOREIGN KEY (`IDNguoiBan`) REFERENCES `nguoidung` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_SANPHAM_NGUOIDUNGTHANG` FOREIGN KEY (`IDNguoiThangDauGia`) REFERENCES `nguoidung` (`ID`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` (`ID`, `TenSanPham`, `Gia`, `GiaMuaNgay`, `NgayDang`, `NgayHetHan`, `BuocGia`, `TuDongGiaHan`, `LuonDuocDauGia`, `MoTaDai`, `MainImg`, `SoLanDuocDauGia`, `IDLoai`, `IDNguoiBan`, `IDNguoiThangDauGia`, `TrangThai`) VALUES (1,'Dây chuyền bạc Lovely Snowflake',500000,600000,'2020-01-06 21:52:39','2020-01-07 06:30:25',10000,1,1,'<p>Nếu kh&ocirc;n kh&eacute;o trong việc lựa chọn trang sức, ph&aacute;i đẹp sẽ biến diện mạo của m&igrave;nh trở n&ecirc;n v&ocirc; c&ugrave;ng nổi bật. H&atilde;y thử l&agrave;m điệu v&ugrave;ng cổ của m&igrave;nh với mẫu mặt d&acirc;y chuyền bạc Lovely Snowflake bạn nh&eacute;.<br />ĐẶC ĐIỂM NỔI BẬT:<br />- Ngay từ tạo h&igrave;nh trong thiết kế, mặt d&acirc;y chuyền bạc Lovely Snowflake đ&atilde; đủ n&eacute;t nữ t&iacute;nh để khiến mọi qu&yacute; c&ocirc; say l&ograve;ng m&ecirc; mẩn. Kh&eacute;o l&eacute;o kết hợp với d&acirc;y chuyền ph&ugrave; hợp bạn sẽ c&oacute; ngay mẫu trang sức ấn tượng.<br />- Mặt d&acirc;y chuyền được tạo d&aacute;ng từ h&igrave;nh ảnh b&ocirc;ng tuyết s&aacute;ng trong, thanh cao. Bề mặt mẫu nữ trang s&aacute;ng với sự xuất hiện của những vi&ecirc;n đ&aacute; nạm trắng.<br />- M&oacute;c kết nối giữa mặt d&acirc;y chuyền với d&acirc;y đeo đủ rộng r&atilde;i để bạn g&aacute;i dễ d&agrave;ng thay mới c&aacute;c d&acirc;y đeo ph&ugrave; hợp.</p>','assets/images/product/1/1.jpg',6,7,3,NULL,1),(2,'Dây chuyền bạc Sara Love',245000,500000,'2020-01-06 21:57:33','2020-01-08 21:57:33',10000,1,1,'<p>D&acirc;y chuyền bạc Sara Love nổi bật với vi&ecirc;n ngọc trai tr&ograve;n, căng b&oacute;ng tuyệt đẹp. Một sản phẩm được Eropi Jewelry chăm ch&uacute;t tỷ mỉ tới từng chi tiết.</p>\r\n<p>ĐẶC ĐIỂM NỔI BẬT<br />Sợi d&acirc;y chuyền bạc với dạng mặt x&iacute;ch, nổi bật với vi&ecirc;n ngọc trai căng b&oacute;ng. Lớp x&agrave; cừ mịn cảm tưởng như chiếc gương soi, bạn c&oacute; thể cảm nhận chất lượng qua l&agrave;n da.<br />Mẫu trang sức được l&agrave;m từ d&ograve;ng bạc &Yacute; S925 cao cấp, với chất lượng v&agrave; m&agrave;u sắc tuyệt vời khiến chị em th&iacute;ch th&uacute; ngay khi vừa ngắm nh&igrave;n.<br />Độ d&agrave;i d&agrave;y l&yacute; tưởng, chốt c&agrave;i chắc chắn. Bạn ho&agrave;n to&agrave;n c&oacute; thể tin tưởng m&igrave;nh rạng ngời hơn khi sử dụng.</p>','assets/images/product/2/1.jpg',NULL,7,3,NULL,1),(3,'Lắc tay cặp tình yêu kết đôi',100000,150000,'2020-01-06 22:00:42','2020-01-09 22:00:42',5000,1,1,'<p>Lắc cặp mẫu mới được thiết kế đơn giản nhưng v&ocirc; c&ugrave;ng tinh tế, sang trọng.<br />Sản phẩm lắc cặp l&agrave; một m&oacute;n qu&agrave; kh&ocirc;ng thể thiếu cho c&aacute;c cặp t&igrave;nh nh&acirc;n v&agrave;o những dịp đặc biệt.<br />Đ&aacute; đ&iacute;nh tr&ecirc;n sản phẩm tượng trưng cho sự tinh khiết, quyền lực, sức mạnh mang h&agrave;m &yacute; s&acirc;u sắc sức mạnh t&igrave;nh y&ecirc;u d&ugrave; kh&oacute; khăn thế n&agrave;o cũng vượt qua.</p>\r\n<p>Sản phẩm lắc cặp được thiết kế v&ocirc; c&ugrave;ng tinh tế, sắc n&eacute;t đến từng chi tiết của sản phẩm.<br />Lắc cặp được thiết kế Freesize ph&ugrave; hợp với mọi cỡ tay của kh&aacute;ch h&agrave;ng.<br />Sản phẩm được thiết kế bằng chất liệu kim loại mạ bạch kim mang lại độ b&oacute;ng s&aacute;ng cho sản phẩm.</p>','assets/images/product/3/1.jpg',2,8,2,NULL,1),(4,'Áo sơ mi nữ cao cấp CARO FA-079',988000,NULL,'2020-01-06 22:05:58','2020-01-10 22:05:58',1000,0,1,'<p>Kiểu d&aacute;ng thời trang, s&agrave;nh điệu.<br />&Aacute;o sơ mi chất liệu cotton bền chắc, kh&ocirc;ng phai m&agrave;u, kh&ocirc;ng co r&uacute;t.<br />Ph&ugrave; hợp mọi lứa tuổi v&agrave; bạn ho&agrave;n to&agrave;n an t&acirc;m khi sử dụng sản phẩm.<br />C&oacute; thể kết hợp với nhiều trang phục kh&aacute;c theo phong c&aacute;ch ri&ecirc;ng của bạn.</p>','assets/images/product/4/1.jpg',1,5,2,NULL,1),(5,'Bộ Bàn Phím Giả Cơ và Chuột Chuyên Game G21 Led 7 Màu',102000,250000,'2020-01-06 22:11:04','2020-01-09 22:11:04',2000,0,1,'<p>- Đường n&eacute;t thiết kế g&oacute;c cạnh tạo n&ecirc;n sự kh&aacute;c biệt, kiểu d&aacute;ng ph&aacute; c&aacute;ch.<br />- Đ&egrave;n led nền v&agrave; led ph&iacute;m với nhiều m&agrave;u v&agrave; tắt mở bằng ph&iacute;m Scroll Lock.<br />- Số Ph&iacute;m: 104 ph&iacute;m - Antighost bấm 1 lần được nhiều ph&iacute;m.<br />- Ph&iacute;m giả cơ nghe &acirc;m thanh rất thanh v&agrave; &ecirc;m.<br />- Chuột chuy&ecirc;n game được thiết kế ri&ecirc;ng d&agrave;nh cho game thủ v&agrave; ph&ograve;ng n&eacute;t.<br />- Con lăn thiết kế nhỏ nhưng dể d&agrave;ng di chuyển v&agrave; c&oacute; độ bền cao.<br />- 2 viền b&ecirc;n cạnh được thiết kế nh&ocirc; ra v&agrave; ma s&aacute;t gi&uacute;p game thủ dể d&agrave;ng cầm v&agrave; di chuyển khi sử dụng đặc biệt l&agrave; khi chơi game với tốc độ cao m&agrave; kh&ocirc;ng hề bị mỏi.<br />- Ph&ugrave; hợp với nhiều loại hệ điều h&agrave;nh kh&aacute;c nhau, nhiều cấu h&igrave;nh m&aacute;y của PC hoặc laptop.</p>','assets/images/product/5/1.jpg',NULL,3,2,NULL,1),(6,'Điện Thoại Vsmart Joy 2+',1825000,NULL,'2020-01-06 22:17:06','2020-01-08 22:17:06',25000,1,0,'<p>- Vsmart Joy 2+ l&agrave; sản phẩm c&oacute; sức mạnh vượt trội trong ph&acirc;n kh&uacute;c do sử dụng bộ xử l&yacute; Snapdragon 450 từ Qualcomm - nh&agrave; sản xuất Chip h&agrave;ng đầu thế giới.<br />- Kết hợp với m&agrave;n h&igrave;nh lớn 6,2\" HD+ sắc n&eacute;t, Vsmart Joy2+ &nbsp;hứa hẹn sẽ mang lại trải nghiệm sử dụng ho&agrave;n hảo cho kh&aacute;ch h&agrave;ng.<br />- S&aacute;ng bừng đ&ecirc;m tới với camera k&eacute;p AI: Joy 2+ tiếp tục kế thừa những t&iacute;nh năng camera cao cấp tr&ecirc;n Vsmart Live.<br />- Hệ điều h&agrave;nh ho&agrave;n to&agrave;n mới: Joy 2+ tiếp tục được sử dụng VOS 2.0, hệ điều h&agrave;nh ho&agrave;n to&agrave;n mới được c&aacute;c chuy&ecirc;n gia v&agrave; kỹ sư phần mềm Vsmart nghi&ecirc;n cứu.<br />- Dung lượng pin khủng 4500 mAh.</p>','assets/images/product/6/1.jpg',NULL,1,3,NULL,1),(7,'Điện Thoại Nokia 8110 4G',760000,2000000,'2020-01-06 22:23:29','2020-01-13 22:23:29',10000,0,1,'<p>- Sản phẩm c&oacute; vỏ polycarbonate bảo vệ cong c&ugrave;ng nắp trượt bảo vệ b&agrave;n ph&iacute;m với m&agrave;n h&igrave;nh cong 2.45 inch c&ugrave;ng độ ph&acirc;n giải 240 x 320 pixels.<br />- Cấu h&igrave;nh ổn định: Nokia 8110 4G chạy hệ điều h&agrave;nh KaiOS,&nbsp;được trang bị vi xử l&yacute; Chip Snapdragon 205, chứa CPU l&otilde;i k&eacute;p Cortex-A53 1,1 GHz, đồ hoạ Adreno 304, RAM 512MB c&ugrave;ng bộ nhớ trong 4GB sử dụng modem mạng 4G LTE Cat.<br />- Kh&aacute;ng nước chuẩn IP52.<br />- Chức năng 4G mạnh mẽ: lướt web, chat v&agrave; ph&aacute;t trực tuyến nhanh hơn với 4G LTE.<br />- Dung lượng pin khủng:&nbsp;thời gian sử dụng để nghe nhạc, gọi điện kh&aacute; dư giả trong 2 ng&agrave;y.</p>','assets/images/product/7/1.jpg',NULL,1,2,NULL,1),(8,'Tai Nghe Chụp Tai JBL T450',639000,2000000,'2020-01-06 22:30:15','2020-01-11 22:30:15',5000,0,1,'<p>- Tai Nghe JBL T450 được thiết kế với kiểu d&aacute;ng v&ocirc; c&ugrave;ng đẹp mắt. Hiện đại v&agrave; trẻ trung với 3 m&agrave;u sắc: xanh, trắng, đen, ph&ugrave; hợp với phong c&aacute;ch v&agrave; c&aacute; t&iacute;nh của giới trẻ. Phần c&uacute;p 2 b&ecirc;n thiết kế với c&aacute;c khớp nối c&oacute; thể gấp mở linh hoạt gi&uacute;p người d&ugrave;ng tiện lợi hơn trong việc bảo quản v&agrave; di chuyển. Nhẹ nh&agrave;ng, tinh tế l&agrave; những g&igrave; m&agrave; người d&ugrave;ng đ&aacute;nh gi&aacute; về mẫu tai nghe on ear n&agrave;y.<br />- Ngăn tiếng ồn hiệu quả.<br />- Tương th&iacute;ch với nhiều thiết bị.<br />- T&iacute;ch hợp microphone.<br />- Chất &acirc;m mạnh mẽ v&agrave; mềm mại.</p>','assets/images/product/8/1.jpg',NULL,3,2,NULL,1),(9,'Apple Macbook Pro Touch Bar 2019 - 13 inchs (i5/ 8GB/ 256GB)',36000000,NULL,'2020-01-06 22:36:26','2020-01-10 22:36:26',500000,0,0,'<p>- Thiết thiết kế sang trọng, tinh tế với khung l&agrave;m bằng hợp kim nh&ocirc;m đảm bảo được to&agrave;n bộ kiến tr&uacute;c của m&aacute;y c&oacute; một trọng lượng mỏng v&agrave; nhẹ.<br />- M&agrave;n h&igrave;nh Retina si&ecirc;u ấn tượng: sử dụng đ&egrave;n nền LED v&agrave; độ tương phản cao.<br />- Vi xử l&yacute; Intel Core i5 mới nhất.<br />- T&iacute;ch hợp card đồ họa rời Intel Iris Plus Graphic 645.<br />- Ổ cứng SSD si&ecirc;u nhanh.<br />- Tiếp cận laptop với phương thức ho&agrave;n to&agrave;n mới, Touch Bar.<br />- Tận hưởng &acirc;m thanh sống động.<br />- Bảo mật tuyệt đối với bộ vi xử l&yacute; chuy&ecirc;n bảo mật Apple T2.<br />- Cảm biến v&acirc;n tay Touch ID, bảo mật sau một c&uacute; chạm.</p>','assets/images/product/9/1.jpg',NULL,2,2,NULL,1),(10,'Điện Thoại iPhone X VN/A',19000000,25000000,'2020-01-06 22:40:24','2020-01-07 22:40:24',1000000,1,1,'<p>- Thiết kế lạ mắt kh&ocirc;ng n&uacute;t Home cứng.<br />- M&agrave;n h&igrave;nh lớn 5.8 inch với độ ph&acirc;n giải 1125 x 2436 pixels.<br />- C&ocirc;ng nghệ Face ID.<br />- Cấu h&igrave;nh mạnh mẽ, mượt m&agrave;: sử dụng chip A11 Bionic c&oacute; sức mạnh cao cấp nhất t&iacute;nh đến thời điểm ra mắt.<br />- Cặp đ&ocirc;i camera ấn tượng: trang bị camera k&eacute;p ph&iacute;a sau bao gồm 1 camera ch&iacute;nh với độ ph&acirc;n giải 12MP, khẩu độ f/1.8 v&agrave; một camera b&ecirc;n cạnh c&ugrave;ng độ ph&acirc;n giải 12MP.</p>','assets/images/product/10/1.jpg',NULL,1,3,NULL,1),(11,'Điện Thoại Samsung Galaxy Note 9 (512GB/8GB)',18900000,NULL,'2020-01-06 22:46:27','2020-01-16 22:46:27',1000000,0,1,'<p>- Thiết kế sang trọng, đẳng cấp: sở hữu thiết kế hợp kim nguy&ecirc;n khối sang trọng kết hợp khung viền kim loại sắc sảo v&agrave; chắc chắn với phong c&aacute;ch thiết kế đa diện. Camera sau ẩn v&agrave;o lưng m&aacute;y cho trải nghiệm ho&agrave;n to&agrave;n mượt m&agrave; v&agrave; v&ocirc; c&ugrave;ng quyến rũ.<br />- M&agrave;n h&igrave;nh v&ocirc; cực Quad HD+.<br />- H&igrave;nh ảnh sắc n&eacute;t dưới &aacute;nh s&aacute;ng gắt.<br />- Cấu h&igrave;nh mạnh mẽ: vi xử l&yacute; Exynos 10nm v&agrave; 8GB RAM, được tối ưu hiệu suất để chơi game, hệ thống l&agrave;m m&aacute;t bằng nước carbon.<br />- Hệ thống camera k&eacute;p: n&acirc;ng cao khả năng chụp ảnh của bạn với camera 12MP của Galaxy Note9 với zoom quang học 2x.<br />- Kết nối bluetooth tr&ecirc;n b&uacute;t S Pen.<br />- Tương t&aacute;c ho&agrave;n hảo, truy cập chụp ảnh từ xa.<br />- Trải nghiệm &acirc;m thanh tuyệt đỉnh.<br />- Sạc Kh&ocirc;ng D&acirc;y.</p>','assets/images/product/11/1.jpg',NULL,1,1,NULL,1),(12,'Điện Thoại OPPO F9 (A11) (64GB/4GB)',5000000,NULL,'2020-01-06 22:49:52','2020-01-08 22:49:52',200000,0,1,'<p>- M&agrave;n h&igrave;nh giọt nước độc đ&aacute;o, độ ph&acirc;n giải Full HD+.<br />- Sắc m&agrave;u chuyển động kh&ocirc;ng giới hạn.<br />- OPPO F9 chạy tr&ecirc;n bộ vi xử l&yacute; mới của MediaTek Helio P60 với 4GB RAM 64GB ROM mang lại khả năng chạy đa nhiệm ấn tượng, chiến game v&agrave; chinh phục bất kỳ thử th&aacute;ch n&agrave;o một c&aacute;ch mượt m&agrave; v&agrave; nhanh ch&oacute;ng.<br />- Camera đột ph&aacute; với A.I Beauty 2.1.<br />- Sạc cực nhanh với sự trở lại của VOOC.</p>','assets/images/product/12/1.jpg',3,1,1,NULL,1),(13,'Điện Thoại iPhone 6s 32GB',8200000,NULL,'2020-01-06 22:54:00','2020-01-07 22:54:00',200000,1,1,'<p>- Thiết kế sang trọng: c&oacute; khung được l&agrave;m từ Nh&ocirc;m Aluminum 7000 Series, độ mỏng của iPhone 6S chỉ 7.1mm.<br />- M&agrave;n h&igrave;nh 4.7 inches hiển thị sắc n&eacute;t, c&oacute; độ ph&acirc;n giải 1334 x 750 pixels.<br />- Bộ đ&ocirc;i camera ấn tượng: được trang bị bộ đ&ocirc;i camera 12.0MP v&agrave; 5.0MP, m&aacute;y cũng sẽ cho ph&eacute;p bạn quay chuẩn 4K.<br />- Vi xử l&yacute; A9 mạnh mẽ: bộ vi xử l&yacute; A9 chip 64bit mạnh mẽ ngang với một thiết bị PC, m&aacute;y sử dụng RAM 2 GB, bộ nhớ 32 GB, hệ điều h&agrave;nh iOS 9.<br />- Cảm biến v&acirc;n tay mượt m&agrave;.</p>','assets/images/product/13/1.jpg',7,1,2,NULL,1),(14,'Laptop Lenovo ThinkPad T480 20L5S01400 Core i5-8250U/Free Dos (14 inch)',26730000,30000000,'2020-01-06 22:59:24','2020-01-13 22:59:24',30000,0,0,'<p>- Thiết kế gập 180 độ:&nbsp;bản lề của m&aacute;y được thiết kế đặc biệt gi&uacute;p m&aacute;y c&oacute; thể gập 180 độ như quyển tập.<br />- Màn hình 14 inch với độ ph&acirc;n giải Full HD 1920 x 1080.<br />- Bộ vi xử l&yacute; Intel Core i5-8250U với xung nhịp c&oacute; thể l&ecirc;n đến 3.4GHz, bộ nhớ trong Ram 8GB DDR4 (2400MHz), bộ nhớ 256GB SSD.<br />- C&ocirc;ng nghệ &acirc;m thanh Dolby Home Theater: sử dụng c&ocirc;ng nghệ &acirc;m thanh Dolby Audio.<br />- Hỗ trợ nhiều cổng kết nối như cổng 2 x USB 3.1 Gen 1, 1 x USB 3.1 Gen 1 Type-C, 1 x USB 3.1 Gen 2 Type-C / Intel Thunderbolt 3, HDMI, HD webcam, Bluetooth, khe thẻ nhớ.<br />- Pin 3 cell: cho ph&eacute;p người d&ugrave;ng xem phim li&ecirc;n tục l&ecirc;n đến 8 giờ.</p>','assets/images/product/14/1.jpg',NULL,2,2,NULL,1),(15,'Vòng đeo tay thông minh Samsung Gear Fit2 Pro',4000000,7000000,'2020-01-06 23:03:15','2020-01-12 23:03:15',100000,1,1,'<p>- Thiết kế v&agrave; m&agrave;u sắc đẹp, song h&agrave;nh sự tiện dụng.<br />- T&iacute;nh năng chăm s&oacute;c sức khỏe l&agrave; điều kh&ocirc;ng thể kh&ocirc;ng c&oacute;, cảm biến được đặt mặt sau v&ograve;ng đeo tay, với c&aacute;c ứng dụng như đếm bước ch&acirc;n, đo nhịp tim, oxi, ghi lại qu&atilde;ng đường chạy bằng GPS...<br />- Sử dụng c&ocirc;ng nghệ m&agrave;n h&igrave;nh AMOLED gi&uacute;p bạn theo d&otilde;i th&ocirc;ng tin hiển thị khi ngo&agrave;i trời được tốt hơn.<br />- M&agrave;u sắc v&agrave; chi tiết hiện ra rất sắc sảo v&agrave; r&otilde; n&eacute;t.<br />- Kh&ocirc;ng c&ograve;n những mối bận t&acirc;m d&iacute;nh nước g&acirc;y hư hỏng cho thiết bị.<br />- Với thế hệ mới th&igrave; d&acirc;y đeo được thay đổi bằng m&oacute;c c&agrave;i chắc chắn hơn rất nhiều lần.</p>','assets/images/product/15/1.jpg',1,4,3,NULL,1),(16,'Tai Nghe Bluetooth Samsung Galaxy Buds',2850000,7000000,'2020-01-06 23:07:33','2020-01-10 23:07:33',50000,1,1,'<p>- Thiết kế kh&ocirc;ng d&acirc;y ph&aacute; bỏ mọi giới hạn: thiết kế đơn giản, mang lại cảm gi&aacute;c vừa vặn, thoải m&aacute;i b&ecirc;n bạn trong bất kỳ điều kiện m&ocirc;i trường n&agrave;o.<br />- Chất &acirc;m ho&agrave;n mỹ, đ&agrave;m thoại đỉnh cao.<br />- Kết nối nhanh ch&oacute;ng: t&iacute;nh năng Bluetooth 5.0 th&ocirc;ng minh gi&uacute;p tai nghe Galaxy Buds tự động kết nối với thiết bị Galaxy của bạn ngay khi được lấy ra khỏi hộp.<br />- Ho&agrave;n hảo mọi cuộc hội thoại: loại bỏ c&aacute;c tạp &acirc;m g&acirc;y ồn với đột ph&aacute; c&ocirc;ng nghệ micro k&eacute;p mới.<br />- Thiết kế c&ocirc;ng năng v&agrave; tiện lợi.<br />- Sạc pin nhanh cho trải nghiệm bất tận.</p>','assets/images/product/16/1.jpg',NULL,4,1,NULL,1),(17,'Chuột gaming CorSAIR Glaive PRO Aluminum RGB',3000000,NULL,'2020-01-06 23:11:27','2020-01-07 23:11:27',200000,1,1,'<p>- Chuột gaming CorSAIR Glaive PRO Aluminum RGB l&agrave; một trong những sản phẩm chất lượng với thiết kế gọn nhẹ chỉ 115g k&egrave;m theo đ&oacute; l&agrave; c&aacute;c đường v&acirc;n 2 b&ecirc;n gi&uacute;p cho khả năng cầm nắm được chắc chắn hơn.<br />- Thiết kế vừa l&ograve;ng b&agrave;n tay: được thiết kế nhỏ gọn trong l&ograve;ng b&agrave;n tay chỉ 115g bằng chất liệu nhựa, bạn c&oacute; thể thay đổi phần &ocirc;m b&ecirc;n ng&oacute;n c&aacute;i, rất tiện lợi.<br />- Tuổi thọ l&acirc;u d&agrave;i: được thiết kế với c&ocirc;ng nghệ Omron si&ecirc;u bền gi&uacute;p cho chuột Corsair Night Sword RGB c&oacute; tuổi thọ l&ecirc;n đến 50 triệu lần bấm.<br />- Độ ch&iacute;nh x&aacute;c tuyệt vời, t&ugrave;y chỉnh led RGB.</p>','assets/images/product/17/1.jpg',1,3,1,NULL,1),(18,'Asus Vivobook X507MA-BR208T/Celeron N4000',6500000,8000000,'2020-01-06 23:20:00','2020-01-13 23:20:00',250000,0,1,'<p>- Thiết kế gọn nhẹ thời trang, dễ d&agrave;ng mang đi bất cứ đ&acirc;u: gọn nhẹ với trọng lượng 1,75kg t&iacute;nh cả pin.<br />- M&agrave;n h&igrave;nh viền mỏng NanoEdge.<br />- Hiệu năng ổn cho c&ocirc;ng việc, dung lượng ổ cứng lớn: Nhờ bộ vi xử l&yacute; Intel Celeron N4000, đi c&ugrave;ng 4GB RAM DDR4, m&aacute;y t&iacute;nh x&aacute;ch tay Vivobook X507MA c&oacute; hiệu năng kh&aacute; ổn cho học tập v&agrave; c&ocirc;ng việc văn ph&ograve;ng. M&aacute;y c&oacute; dung lượng HDD l&ecirc;n tới 1TB, cực lớn để bạn lưu trữ dữ liệu. Hơn thế nữa với cổng SSD SATA M2, Asus Vivobook X507MA dễ d&agrave;ng n&acirc;ng cấp th&ecirc;m một ổ cứng thể rắn SSD.<br />- Nhanh ch&oacute;ng đăng nhập chỉ với một lần chạm.<br />- Tận hưởng m&agrave;u sắc theo đ&uacute;ng &yacute; bạn.<br />- &Acirc;m thanh chuy&ecirc;n nghiệp.<br />- Tản nhiệt th&ocirc;ng minh.</p>','assets/images/product/18/1.jpg',NULL,2,1,NULL,1),(19,'Samsung Galaxy S8 Plus',14500000,18000000,'2020-01-06 23:28:52','2020-01-08 23:28:52',500000,1,0,'<p>- Thiết kế nổi bật v&agrave; sang trọng.<br />- M&agrave;n h&igrave;nh lớn với viền \"v&ocirc; cực\": m&agrave;n h&igrave;nh với k&iacute;ch thước 6.2 inch Super AMOLED với độ ph&acirc;n giải QHD+ (1440 x 2960 pixels).<br />- Trợ l&yacute; ảo Bixby: đem lại khả năng tương t&aacute;c với điện thoại theo phong c&aacute;ch mới, th&ocirc;ng minh hơn v&agrave; hiểu người d&ugrave;ng hơn.<br />- Cấu h&igrave;nh vẫn rất mạnh mẽ: chạy chipset Snapdragon 835 v&agrave; Exynos 8895, vi xử l&yacute; octa core tốc độ 2.45 GHz, hệ điều Android 7.0 mới nhất, ROM 64 GB c&oacute; thể mở rộng đến 256 GB th&ocirc;ng qua thẻ microSD v&agrave; RAM 4 GB.<br />- Camera ấn tượng: c&oacute; một camera 8 MP khẩu độ f/1.7 ph&iacute;a trước c&oacute; thể lấy n&eacute;t tự động v&agrave; camera sau 12 MP Dual Pixel cũng với khẩu độ f/1.7.<br />- Tốc độ download 4G l&ecirc;n đến 1 Gbps.<br />- Chống nước, sạc nhanh kh&ocirc;ng d&acirc;y.<br />- Đầy đủ bảo mật.</p>','assets/images/product/19/1.jpg',NULL,1,3,NULL,1),(20,'Quần Bò Nam Đen Rách Gối RACHGOI97',140000,400000,'2020-01-06 23:34:40','2020-01-08 23:34:40',10000,1,1,'<p>- Chất vải: vải jean tương đối mịn, chất mềm, &iacute;t b&aacute;m bụi giữ d&aacute;ng kh&ocirc;ng bai gi&atilde;o cho d&ugrave; giặt nhiều lần. Chất vải n&agrave;y rất bền chắc gi&uacute;p người mặc c&oacute; thể thoải m&aacute;i vận động m&agrave; kh&ocirc;ng lo vải quần bị x&ugrave; l&ocirc;ng hay bung chỉ.<br />- Kiểu d&aacute;ng: d&aacute;ng quần &ocirc;m vừa phải cơ thể, đặc biệt l&agrave; ống ch&acirc;n gi&uacute;p t&ocirc;n d&aacute;ng người mặc tr&ocirc;ng trẻ trung năng động hơn. Ống quần l&agrave; ống c&ocirc;n bo gọn vừa phải v&agrave; được m&aacute;y chắc gi&uacute;p người mặc thoải m&aacute;i vận động di chuyển m&agrave; kh&ocirc;ng lo bị vướng.<br />- M&agrave;u sắc: đen.<br />- Bảo quản: qquần được l&agrave;m bằng chất vải jean cotton &iacute;t thấm nước n&ecirc;n anh em c&oacute; thể ng&acirc;m nước một ch&uacute;t trước khi giặt để quần giặt sạch sẽ hơn.</p>','assets/images/product/20/1.jpg',1,6,2,NULL,1),(21,'Microsoft Surface Pro 2018 - Core i7-8650U/8G/256GB (KJU-00016)',41000000,55000000,'2020-01-06 23:44:34','2020-01-13 23:44:34',1000000,1,0,'<p>- Gọn nhẹ, với trọng lượng chỉ 775g.<br />- Màn hình cảm ứng 12.3 inch QHD+: hiển thị h&igrave;nh ảnh QHD+ (2736 x 1824).<br />- Camera sau 8.0MP tự động lấy n&eacute;t.<br />- Bộ vi xử l&yacute; Intel Core i7-8650U: với bộ nhớ trong Ram 8GB, m&aacute;y c&ograve;n trang bị th&ecirc;m bộ nhớ 256GB SSD, card đồ họa t&iacute;ch hợp Intel HD Graphics 620.<br />- Linh hoạt nhờ kết nối th&ocirc;ng minh:&nbsp;hỗ trợ đầy đủ c&aacute;c cổng kết nối th&ocirc;ng dụng gi&uacute;p tương t&aacute;c tốt với c&aacute;c phụ kiện ngoại vi như USB 3.0, Mini DisplayPort, Jack 3.5mm, MicroSDXC, Surface Connect và c&ocirc;̉ng Cover.<br />- Thời lượng pin l&acirc;u hơn: l&ecirc;n đ&ecirc;́n 13.5 giờ sử dụng.</p>','assets/images/product/21/1.jpg',NULL,2,1,NULL,1),(22,'Điện thoại Samsung Galaxy Fold',60000000,NULL,'2020-01-06 23:52:05','2020-01-16 23:52:05',2000000,1,1,'<p>- Thiết kế 2 m&agrave;n h&igrave;nh, m&agrave;n h&igrave;nh uốn dẻo, với k&iacute;ch thước 7.3 inch.<br />- Thoải m&aacute;i sử dụng nhiều ứng dụng c&ugrave;ng l&uacute;c.<br />- Hiệu năng đứng đầu bảng: được trang bị cấu h&igrave;nh mạnh mẽ nhất của thế giới Android trong năm 2019 ch&iacute;nh l&agrave; chipset Snapdragon 855 mạnh mẽ c&ugrave;ng với RAM l&ecirc;n đến 12 GB, dung lượng khủng l&ecirc;n tới 512 GB, c&agrave;i đặt sẵn hệ điều h&agrave;nh Android 9.0 (Pie).<br />- C&oacute; tới 6 camera tr&ecirc;n m&aacute;y: bộ 3 camera ch&iacute;nh ở mặt lưng, camera trước l&agrave; cụm camera k&eacute;p v&agrave; m&aacute;y c&ograve;n c&oacute; th&ecirc;m một camera đặt ở m&agrave;n h&igrave;nh phụ.<br />- Dung lượng pin lớn: tổng dung lượng 4.380 mAh.</p>','assets/images/product/22/1.jpg',3,1,1,NULL,1),(23,'Đồng hồ thông minh Samsung Galaxy watch 46mm',4000000,7000000,'2020-01-06 23:59:12','2020-01-09 23:59:12',200000,1,0,'<p>- Chuẩn mực thời trang mới: c&oacute; m&agrave;u đen huyền sang trọng đi c&ugrave;ng thiết kế truyền thống với mặt đồng hồ tr&ograve;n cổ điển, v&ograve;ng xoay bezel cho khả năng điều hướng dễ d&agrave;ng.<br />- D&acirc;y đeo hiện đại: với chất liệu silicone cho bạn cảm gi&aacute;c thoải m&aacute;i khi đeo trong thời gian d&agrave;i.<br />- Bộ đ&ocirc;i Super AMOLED v&agrave; Gorilla DX+: c&oacute; m&agrave;n h&igrave;nh Super AMOLED c&ugrave;ng với lớp k&iacute;nh được tăng cường độ bền bằng chất liệu Gorilla Glass DX+ hạn chế tối đa trầy xước khi va chạm.<br />- Kết nối trong tầm tay, kho ứng dụng phong ph&uacute;.<br />- Cho sức khỏe tốt hơn mỗi ng&agrave;y: được trang bị nhiều chế độ theo d&otilde;i vận động v&agrave; theo d&otilde;i sức khỏe, hỗ trợ cải thiện căng thẳng.<br />- Thời lượng pin: c&oacute; dung lượng 472 mAh.<br />- Khả năng kh&aacute;ng nước l&ecirc;n đến độ s&acirc;u 50m.</p>','assets/images/product/23/1.jpg',NULL,4,1,NULL,1);
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanphamyeuthich`
--

DROP TABLE IF EXISTS `sanphamyeuthich`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanphamyeuthich` (
  `IDSanPham` int(11) NOT NULL,
  `IDNguoiDung` int(11) NOT NULL,
  PRIMARY KEY (`IDSanPham`,`IDNguoiDung`),
  KEY `FK_SANPHAMYEUTHICH_NGUOIDUNG` (`IDNguoiDung`),
  CONSTRAINT `FK_SANPHAMYEUTHICH_NGUOIDUNG` FOREIGN KEY (`IDNguoiDung`) REFERENCES `nguoidung` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_SANPHAMYEUTHICH_SANPHAM` FOREIGN KEY (`IDSanPham`) REFERENCES `sanpham` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanphamyeuthich`
--

LOCK TABLES `sanphamyeuthich` WRITE;
/*!40000 ALTER TABLE `sanphamyeuthich` DISABLE KEYS */;
INSERT INTO `sanphamyeuthich` (`IDSanPham`, `IDNguoiDung`) VALUES (1,2),(22,2),(12,3),(20,3),(22,3);
/*!40000 ALTER TABLE `sanphamyeuthich` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thamso`
--

DROP TABLE IF EXISTS `thamso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thamso` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `GiaTri` float NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thamso`
--

LOCK TABLES `thamso` WRITE;
/*!40000 ALTER TABLE `thamso` DISABLE KEYS */;
/*!40000 ALTER TABLE `thamso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sandaugiatructuyen'
--

--
-- Dumping routines for database 'sandaugiatructuyen'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-07  1:39:07
