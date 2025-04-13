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
  `Name` varchar(50) NOT NULL,
  `IsPublic` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `userchatrooms` (
  `UserId` int(11) NOT NULL,
  `RoomId` int(11) NOT NULL,
  `IsAdmin` tinyint(1) DEFAULT '0',
  `IsOwder` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `users` (
  `Id` int(11) AUTO_INCREMENT PRIMARY KEY,
  `Username` varchar(20) NOT NULL,
  `UsernameId` int(11) NOT NULL,
  `Password` varchar(60) NOT NULL,
  `Email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



ALTER TABLE `chatrooms`
  ADD PRIMARY KEY (`Id`);


ALTER TABLE `userchatrooms`
  ADD PRIMARY KEY (`UserId`,`RoomId`),
  ADD KEY `RoomId` (`RoomId`);


ALTER TABLE `chatrooms`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;


CREATE TABLE `messages` (
  `Id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `RoomId` int(11) DEFAULT NULL,
  `Content` varchar(150) DEFAULT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`UserId`) REFERENCES users(`Id`),
  FOREIGN KEY (`RoomId`) REFERENCES chatrooms(`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `userchatrooms`
  ADD CONSTRAINT `userchatrooms_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `userchatrooms_ibfk_2` FOREIGN KEY (`RoomId`) REFERENCES `chatrooms` (`Id`);
COMMIT;
