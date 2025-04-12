-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 09, 2025 at 06:21 PM
-- Server version: 5.7.24
-- PHP Version: 8.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `machat`
--

-- --------------------------------------------------------

--
-- Table structure for table `chatrooms`
--

CREATE TABLE `chatrooms` (
  `Id` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `userchatrooms` (
  `UserId` int(11) NOT NULL,
  `RoomId` int(11) NOT NULL,
  `IsAdmin` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `users` (
  `Id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `Username` varchar(50) NOT NULL,
  `UsernameId` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




--
-- Indexes for table `chatrooms`
--
ALTER TABLE `chatrooms`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `messages`
--


--
-- Indexes for table `userchatrooms`
--
ALTER TABLE `userchatrooms`
  ADD PRIMARY KEY (`UserId`,`RoomId`),
  ADD KEY `RoomId` (`RoomId`);

--
-- Indexes for table `users`
--

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chatrooms`
--
ALTER TABLE `chatrooms`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`


CREATE TABLE `messages` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `RoomId` int(11) DEFAULT NULL,
  `Content` varchar(150) DEFAULT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`UserId`) REFERENCES users(`Id`),
  FOREIGN KEY (`RoomId`) REFERENCES chatrooms(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--

--
-- Constraints for table `userchatrooms`
--
ALTER TABLE `userchatrooms`
  ADD CONSTRAINT `userchatrooms_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `userchatrooms_ibfk_2` FOREIGN KEY (`RoomId`) REFERENCES `chatrooms` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
