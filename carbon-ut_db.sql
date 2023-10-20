-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2023 at 12:02 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carbon-ut_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `admin_user` varchar(255) NOT NULL,
  `admin_password` varchar(255) NOT NULL,
  `admin_name` varchar(255) NOT NULL,
  `admin_lastname` varchar(255) NOT NULL,
  `admin_age` int(3) DEFAULT NULL,
  `admin_img` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `admin_user`, `admin_password`, `admin_name`, `admin_lastname`, `admin_age`, `admin_img`) VALUES
(1, 'Donjostooor', '1', 'Phattarakarun', 'Jitareerat', 21, ''),
(2, 'admin', 'admin', 'Gin', 'yaruko', 66, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `f_id` int(11) NOT NULL,
  `f_code` varchar(255) NOT NULL,
  `f_name` varchar(255) NOT NULL,
  `f_carbon` double NOT NULL,
  `f_img` varchar(255) DEFAULT NULL,
  `f_materia` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`f_id`, `f_code`, `f_name`, `f_carbon`, `f_img`, `f_materia`) VALUES
(1, '00', 'ข้าวเปล่า', 2.7, '../src/assets/img/menu_logo/Pic3_00.jpg', '1	กระเทียมสับ	0.2 2	เนื้อไก่ชิ้น	0.4 3	พริกไทยเม็ด	0.002 4	ซอสหอยนางรม	0.015 5	ซีอิ็วขาว	0.0075 6	ซอสปรุงรส	0.0075 7	น้ำตาลทราย	0.0075 8	ข้าวเปล่า	0.2'),
(2, '01', 'ข้าวมัน', 2.7, '../src/assets/img/menu_logo/Pic7_01.jpg', ''),
(3, 'A0', 'ข้าวไก่ทอดกระเทียม', 2.573, '../src/assets/img/menu_logo/Pic13_A0.jpg', ''),
(4, 'A1', 'ไก่ทอดกระเทียม (กับข้าว)', 2.057, '../src/assets/img/menu_logo/Pic20_A1.jpg', ''),
(5, 'A2', 'ข้าวไก่ทอดกระเทียม (ไข่ดาว)', 2.978, '../src/assets/img/menu_logo/Pic25_A2.jpg\n', ''),
(6, 'B0', 'ข้าวปลาหมึกกระเทียม', 3.759, '../src/assets/img/menu_logo/Pic28_B0.jpg', ''),
(7, 'B1', 'ปลาหมึกกระเทียม (กับข้าว)', 3.219, '../src/assets/img/menu_logo/Pic33_B1.jpg', ''),
(8, 'B2', 'ข้าวปลาหมึกกระเทียม (ไข่ดาว)', 4.141, '../src/assets/img/menu_logo/Pic39_B2.jpg', ''),
(9, 'C0', 'ข้าวกะเพราไก่ ', 1.051, '../src/assets/img/menu_logo/Pic44_C0.jpg', ''),
(10, 'C1', 'กะเพราไก่ (กับข้าว)', 0.514, '../src/assets/img/menu_logo/Pic47_C1.jpg', ''),
(11, 'C2', 'ข้าวกะเพราไก่ (ไข่ดาว)', 1.436, '../src/assets/img/menu_logo/Pic51_C2.jpg', ''),
(12, 'D0', 'ข้าวกะเพราหมู ', 2.166, '../src/assets/img/menu_logo/Pic57_D0.jpg', ''),
(13, 'D1', 'กะเพราหมู (กับข้าว)', 1.626, '../src/assets/img/menu_logo/Pic64_D1.jpg', ''),
(14, 'D2', 'ข้าวกะเพราหมู (ไข่ดาว)', 5.91, '../src/assets/img/menu_logo/Pic68_D2.jpg', ''),
(15, 'E0', 'ข้าวกะเพราหมูกรอบ ', 2.53, '../src/assets/img/menu_logo/Pic75_E0.jpg', ''),
(16, 'E1', 'กะเพราหมูกรอบ (กับข้าว)', 1.99, '../src/assets/img/menu_logo/Pic79_E1.jpg', ''),
(17, 'E2', 'ข้าวกะเพราหมูกรอบ (ไข่ดาว)', 2.907, '../src/assets/img/menu_logo/Pic83_E2.jpg', ''),
(18, 'F0', 'ข้าวมันไก่ต้ม', 2.71, '../src/assets/img/menu_logo/Pic90_F0.jpg', ''),
(19, 'F1', 'ไก่ต้ม (กับข้าว)', 2.01, '../src/assets/img/menu_logo/Pic92_F1.jpg', ''),
(20, 'G0', 'ข้าวมันไก่ทอด ', 3.744, '../src/assets/img/menu_logo/Pic100_G0.jpg', ''),
(21, 'G1', 'ไก่ทอด (กับข้าว)', 3.19, '../src/assets/img/menu_logo/Pic105_G1.jpg', ''),
(22, 'H0', 'ข้าวหมูย่าง ', 4.489, '../src/assets/img/menu_logo/Pic107_H0.jpg', ''),
(23, 'H1', 'หมูย่าง (กับข้าว)', 3.949, '../src/assets/img/menu_logo/Pic114_H1.jpg', ''),
(24, 'I0', 'ข้าวไก่ย่าง ', 2.576, '../src/assets/img/menu_logo/Pic117_I0.jpg', ''),
(25, 'I1', 'ไก่ย่าง (กับข้าว)', 2.507, '../src/assets/img/menu_logo/Pic123_I1.jpg', ''),
(26, 'J0', 'ข้าวขาหมู', 9.322, '../src/assets/img/menu_logo/Pic126_J0.jpg', NULL),
(27, 'J1', 'ขาหมู (กับข้าว)', 8.773, '../src/assets/img/menu_logo/Pic135_J1.jpg', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `model`
--

CREATE TABLE `model` (
  `m_id` int(11) NOT NULL,
  `m_model` varchar(255) NOT NULL,
  `m_year` year(4) NOT NULL DEFAULT current_timestamp(),
  `m_date` date NOT NULL DEFAULT current_timestamp(),
  `m_time` time NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `model`
--

INSERT INTO `model` (`m_id`, `m_model`, `m_year`, `m_date`, `m_time`) VALUES
(4, 'https://teachablemachine.withgoogle.com/models/x_A9gxVWW/', '2023', '2023-10-19', '02:51:46');

-- --------------------------------------------------------

--
-- Table structure for table `predict`
--

CREATE TABLE `predict` (
  `pd_id` int(11) NOT NULL,
  `pd_userid` int(11) NOT NULL,
  `pd_name` varchar(255) NOT NULL,
  `pd_code` varchar(255) NOT NULL,
  `pd_carbon` double NOT NULL,
  `pd_predict` double NOT NULL,
  `pd_year` year(4) NOT NULL DEFAULT current_timestamp(),
  `pd_date` date NOT NULL DEFAULT current_timestamp(),
  `pd_time` time NOT NULL DEFAULT current_timestamp(),
  `pd_img` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `predict`
--

INSERT INTO `predict` (`pd_id`, `pd_userid`, `pd_name`, `pd_code`, `pd_carbon`, `pd_predict`, `pd_year`, `pd_date`, `pd_time`, `pd_img`) VALUES
(30, 7, 'ข้าวไก่ทอดกระเทียม (ไข่ดาว)', 'A2', 2.978, 69.6, '2023', '2023-10-13', '02:11:33', NULL),
(40, 7, 'ปลาหมึกกระเทียม (กับข้าว)', 'B1', 3.219, 100, '2023', '2023-10-17', '18:03:35', NULL),
(42, 16, 'ข้าวมันไก่ต้ม', 'F0', 2.71, 98, '2023', '2023-10-17', '22:27:32', NULL),
(55, 1, 'ปลาหมึกกระเทียม (กับข้าว)', 'B1', 3.219, 98.5, '2023', '2023-10-17', '14:40:36', NULL),
(56, 1, 'ไก่ย่าง (กับข้าว)', 'I1', 2.71, 0, '2023', '2023-10-17', '14:41:45', NULL),
(57, 1, 'ข้าวขาหมู ', 'J0', 8.773, 5.899, '2023', '2023-10-18', '14:41:45', NULL),
(58, 1, 'ปลาหมึกกระเทียม (กับข้าว)', 'B1', 3.219, 98.5, '2023', '2023-10-19', '14:49:02', NULL),
(59, 1, 'ข้าวมันไก่ต้ม', 'F0', 2.71, 98.3, '2023', '2023-10-19', '09:22:08', NULL),
(60, 1, 'ไก่ย่าง (กับข้าว)', 'I1', 2.507, 99.3, '2023', '2023-10-19', '09:22:08', NULL),
(61, 1, 'ไก่ทอดกระเทียม (กับข้าว)', 'A1', 2.573, 0.7, '2023', '2023-10-19', '09:22:08', NULL),
(62, 1, 'ข้าวกะเพราไก่ ', 'C0', 1.051, 87.8, '2023', '2023-10-20', '12:08:23', NULL),
(63, 11, 'ข้าวกะเพราไก่ ', 'C0', 1.051, 87.8, '2023', '2023-10-20', '12:18:27', NULL),
(64, 11, 'ข้าวปลาหมึกกระเทียม', 'B0', 3.759, 95.7, '2023', '2023-10-20', '12:21:16', NULL),
(66, 12, 'ข้าวปลาหมึกกระเทียม', 'B0', 3.759, 95.7, '2023', '2023-10-20', '12:24:38', NULL),
(67, 13, 'ข้าวปลาหมึกกระเทียม', 'B0', 3.759, 95.7, '2023', '2023-10-20', '12:50:42', NULL),
(68, 13, 'ข้าวกะเพราไก่ ', 'C0', 1.051, 87.8, '2023', '2023-10-20', '12:51:23', NULL),
(69, 14, 'ข้าวกะเพราไก่ (ไข่ดาว)', 'C2', 1.436, 76.7, '2023', '2023-10-20', '13:11:23', NULL),
(70, 1, 'ข้าวกะเพราไก่ (ไข่ดาว)', 'C2', 1.436, 76.7, '2023', '2023-10-20', '16:32:37', NULL),
(71, 1, 'ข้าวปลาหมึกกระเทียม', 'B0', 3.759, 95.7, '2023', '2023-10-20', '16:38:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `u_id` int(11) NOT NULL,
  `u_email` varchar(255) NOT NULL,
  `u_password` varchar(255) NOT NULL,
  `u_birthday` date NOT NULL,
  `u_name` varchar(255) NOT NULL,
  `u_lastname` text NOT NULL,
  `u_gender` enum('Male','Female') DEFAULT NULL,
  `u_location` varchar(255) DEFAULT NULL,
  `u_img` varchar(255) DEFAULT NULL,
  `u_datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`u_id`, `u_email`, `u_password`, `u_birthday`, `u_name`, `u_lastname`, `u_gender`, `u_location`, `u_img`, `u_datetime`) VALUES
(1, 'a@a.com', '1', '2002-02-26', 'Phattarakarun', 'Jitareerat', 'Male', 'ลำพูน Lamphun |  Thailand', NULL, '2023-10-03 11:48:26'),
(2, 'use23@example.com', '1234', '1995-03-08', 'Prahyad', 'Jitaree', 'Male', 'แม่ฮ่องสอน Mae Hong Son |  Thailand', NULL, '2023-10-03 11:48:26'),
(3, 'user3@example.com', 'password3', '1995-03-08', 'Naphaporn', 'Na Lampang', 'Female', 'มหาสารคาม Maha Sarakham |  Thailand', NULL, '2023-10-03 11:59:59'),
(4, 'salisam63@nu.ac.th', 'salisam63', '2002-04-20', 'Silisa ', 'Muling', 'Female', 'ลำพูน Lamphun |  Thailand', NULL, '2023-10-03 12:00:27'),
(5, 'thitipornm63@nu.ac.th', 'thitipornm63', '2001-05-16', 'Thitiporn ', 'Muikaew', 'Female', 'พิษณุโลก Phitsanulok |  Thailand', NULL, '2023-10-12 00:05:13'),
(6, 'kra@gmail.com', '123456789', '0000-00-00', 'krataporn', 'jitpirit', 'Male', 'ลำปาง Lampang |  Thailand', NULL, '2023-10-12 00:13:58'),
(7, 'poramedm64@nu.ac.th', 'poramedm64', '2001-06-13', 'Pramet ', 'Makyo', 'Male', 'พิษณุโลก Phitsanulok |  Thailand', NULL, '2023-10-12 00:18:07'),
(8, 'saphinyam64@nu.ac.th', 'saphinyam64', '2001-08-14', 'Saphinya ', 'Meenim', 'Female', 'พิษณุโลก Phitsanulok |  Thailand', NULL, '2023-10-12 00:20:20'),
(9, 'teenartp64@nu.ac.th', 'teenartp64', '2001-03-26', 'Teenat ', 'Phattharadisphong', 'Female', 'ลำพูน Lamphun |  Thailand', NULL, '2023-10-12 00:28:00'),
(10, 'ir123_1@hotmail.com', '123', '2023-10-20', 'wa', 'ris', 'Male', 'ยะลา Yala |  Thailand', NULL, '2023-10-17 22:22:27'),
(11, 'CHONASITU63@nu.ac.th', '123456789', '2001-05-04', 'CHONASIT', 'UMPAWAN', 'Male', 'พิษณุโลก Phitsanulok |  Thailand', NULL, '2023-10-20 12:16:57'),
(12, 'indonateCS@gmail.com', '14022514', '2001-09-04', 'DSGGGEZ', 'Tosawat', 'Male', 'พิษณุโลก Phitsanulok |  Thailand', NULL, '2023-10-20 12:23:20'),
(13, 'nam@gmail.com', '1234', '2000-09-07', 'nn', 'wan', 'Female', 'ชัยภูมิ Chaiyaphum |  Thailand', NULL, '2023-10-20 12:50:06'),
(14, 'ninah@gmail.com', '123456', '2001-10-12', 'ninah', 'nini', 'Female', 'ลำปาง Lampang |  Thailand', NULL, '2023-10-20 13:07:32'),
(15, 'tanatipk63@nu.ac.th', 'tanatipk63', '2001-05-15', 'Thanathip ', 'Khampinta', 'Female', 'แพร่ Phrae |  Thailand', NULL, '2023-10-20 16:53:48'),
(16, 'siriratse63@nu.ac.th', 'siriratse63', '2002-05-18', 'Sirirat ', 'Semongkol', 'Female', 'พิษณุโลก Phitsanulok |  Thailand', NULL, '2023-10-20 16:54:30'),
(17, 'phattaranidr64@nu.ac.th', 'phattaranidr64', '2003-09-12', 'Phattharanit', 'RattanaphongPhokai', 'Female', 'นครราชสีมา Nakhon Ratchasima |  Thailand', NULL, '2023-10-20 16:56:12'),
(18, 'natthaphony63@nu.ac.th', 'natthaphony63', '2002-12-04', 'Natthaphon ', 'Yoyim', 'Female', 'พิษณุโลก Phitsanulok |  Thailand', NULL, '2023-10-20 16:57:05'),
(19, 'thanaratth63@nu.ac.th', 'thanaratth63', '2002-10-16', 'Thanarat ', 'Thongchacha', 'Female', 'พิจิตร Phichit |  Thailand', NULL, '2023-10-20 16:58:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `admin_user` (`admin_user`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`f_id`),
  ADD UNIQUE KEY `f_code` (`f_code`);

--
-- Indexes for table `model`
--
ALTER TABLE `model`
  ADD PRIMARY KEY (`m_id`);

--
-- Indexes for table `predict`
--
ALTER TABLE `predict`
  ADD PRIMARY KEY (`pd_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`u_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `f_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `model`
--
ALTER TABLE `model`
  MODIFY `m_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `predict`
--
ALTER TABLE `predict`
  MODIFY `pd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
