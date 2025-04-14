-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/

-- Host: localhost:3306
-- Generation Time: Apr 14, 2025 at 04:44 PM
-- Server version: 5.7.24
-- PHP Version: 8.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `chatrooms` (
  `Id` int(11) NOT NULL PRIMARY KEY,
  `Name` varchar(50) NOT NULL,
  `IsPublic` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `messages` (
  `Id` int(11) NOT NULL PRIMARY KEY,
  `UserId` int(11) NOT NULL,
  `RoomId` int(11) DEFAULT NULL,
  `Content` varchar(150) DEFAULT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL PRIMARY KEY,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `userchatrooms` (
  `UserId` int(11) NOT NULL,
  `RoomId` int(11) NOT NULL,
  `IsAdmin` tinyint(1) DEFAULT '0',
  `IsOwner` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`UserId`,`RoomId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `Id` int(11) NOT NULL PRIMARY KEY,
  `Username` varchar(20) NOT NULL,
  `UsernameId` int(11) NOT NULL,
  `Password` varchar(60) NOT NULL,
  `Email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD KEY `UserId` (`UserId`),
  ADD KEY `RoomId` (`RoomId`);


ALTER TABLE `userchatrooms`
  ADD KEY `RoomId` (`RoomId`);

--
ALTER TABLE `chatrooms`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`RoomId`) REFERENCES `chatrooms` (`Id`);

ALTER TABLE `userchatrooms`
  ADD CONSTRAINT `userchatrooms_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`),
  ADD CONSTRAINT `userchatrooms_ibfk_2` FOREIGN KEY (`RoomId`) REFERENCES `chatrooms` (`Id`);
COMMIT;
