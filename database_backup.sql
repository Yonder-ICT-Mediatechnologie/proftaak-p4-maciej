/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;



CREATE TABLE chatrooms (
  Id int NOT NULL AUTO_INCREMENT,
  Name varchar(50) NOT NULL,
  IsPublic tinyint(1) DEFAULT '0',
  PRIMARY KEY (Id)
);



CREATE TABLE messages (
  Id int NOT NULL AUTO_INCREMENT,
  UserId int NOT NULL,
  RoomId int DEFAULT NULL,
  Content varchar(150) DEFAULT NULL,
  Timestamp timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (Id),
  KEY UserId (UserId),
  KEY RoomId (RoomId),
  CONSTRAINT messages_ibfk_1 FOREIGN KEY (UserId) REFERENCES users (Id),
  CONSTRAINT messages_ibfk_2 FOREIGN KEY (RoomId) REFERENCES chatrooms (Id)
);


CREATE TABLE sessions (
  session_id varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  expires int unsigned NOT NULL,
  data mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (session_id)
);



CREATE TABLE userchatrooms (
  UserId int NOT NULL,
  RoomId int NOT NULL,
  IsAdmin tinyint(1) DEFAULT '0',
  IsOwner tinyint(1) DEFAULT '0',
  PRIMARY KEY (UserId, RoomId),
  KEY RoomId (RoomId),
  CONSTRAINT userchatrooms_ibfk_1 FOREIGN KEY (UserId) REFERENCES users (Id),
  CONSTRAINT userchatrooms_ibfk_2 FOREIGN KEY (RoomId) REFERENCES chatrooms (Id)
);



CREATE TABLE users (
  Id int NOT NULL AUTO_INCREMENT,
  Username varchar(20) NOT NULL,
  UsernameId int NOT NULL,
  Password varchar(60) NOT NULL,
  Email varchar(50) NOT NULL,
  PRIMARY KEY (Id)
);


INSERT INTO
  `chatrooms` (`Id`, `Name`, `IsPublic`)
VALUES
  (1, 'THE JUNGLE (public room)', 0);
INSERT INTO
  `chatrooms` (`Id`, `Name`, `IsPublic`)
VALUES
  (2, 'room 2', 0);


INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (20, 6, 1, 'FUAAAAAARKK', '2025-04-14 18:37:09');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (22, 9, 1, 'junglefucker', '2025-04-16 07:50:14');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (23, 9, 1, 'discord 2.0', '2025-04-16 07:50:39');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (24, 6, 1, 'Wassup', '2025-04-16 07:50:42');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (
    25,
    9,
    1,
    'nun much, wsp wit u?',
    '2025-04-16 07:50:53'
  );
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (26, 9, 2, 'WAAAT, ROOM 2?', '2025-04-16 07:52:28');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (27, 6, 2, 'Yooooooo', '2025-04-16 07:52:32');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (28, 6, 2, 'Yooooooo', '2025-04-16 07:52:35');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (29, 9, 2, 'Bericht', '2025-04-16 07:53:01');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (30, 9, 2, 'Bericht', '2025-04-16 07:53:01');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (31, 9, 2, 'Bericht', '2025-04-16 07:53:01');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (32, 9, 2, 'Bericht', '2025-04-16 07:53:02');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (33, 9, 2, 'Bericht', '2025-04-16 07:53:02');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (34, 9, 2, 'bericht 2', '2025-04-16 07:53:12');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (35, 9, 2, 'bericht 2', '2025-04-16 07:53:13');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (36, 9, 2, 'bericht 2', '2025-04-16 07:53:13');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (37, 9, 2, 'bericht 2', '2025-04-16 07:53:13');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (38, 9, 2, 'bericht 2', '2025-04-16 07:53:13');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (39, 9, 2, 'bericht 2', '2025-04-16 07:53:13');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (40, 9, 2, 'Nigger', '2025-04-16 07:53:38');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (41, 9, 2, 'Nigger', '2025-04-16 07:53:38');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (42, 9, 2, 'Nigger', '2025-04-16 07:53:39');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (43, 9, 2, 'Nigger', '2025-04-16 07:53:39');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (44, 9, 2, 'Nigger', '2025-04-16 07:53:39');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (45, 9, 2, 'Nigger', '2025-04-16 07:53:39');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (46, 9, 2, 'Nigger', '2025-04-16 07:53:39');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (47, 9, 2, 'Nigger', '2025-04-16 07:53:39');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (48, 9, 2, 'Nigger', '2025-04-16 07:53:39');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (49, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (50, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (51, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (52, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (53, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (54, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (55, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (56, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (57, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (58, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (59, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (60, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (61, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (62, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (63, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (64, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (65, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (66, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (67, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (68, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (69, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (70, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (71, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (72, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (73, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (74, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (75, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (76, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (77, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (78, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (79, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (80, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (81, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (82, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (83, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (84, 9, 2, 'Nigger', '2025-04-16 07:53:40');
INSERT INTO
  `messages` (`Id`, `UserId`, `RoomId`, `Content`, `Timestamp`)
VALUES
  (85, 9, 2, 'Nigger', '2025-04-16 07:53:40');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sessions
# ------------------------------------------------------------

INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    '5PgMb8sxOnRb-YsSX0cBXGWU_kDaUSdw',
    1744876139,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:48:58.717Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    '6nydci1rA67TRpWNxGFHbiHtTumlbARq',
    1744836546,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T20:49:05.618Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    '8QlAqPpQBpIxi-gmtwRr1XkwfgQHH18t',
    1744875749,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:42:28.703Z\,\httpOnly\:true,\path\:\/\}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    '9oYHFw426dD0bsCWmV7JX68HToX_R0X4',
    1744876503,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:55:03.023Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:10}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'Ab7XUhCymV0huGsgiuAKc-yK-IXQ02GQ',
    1744796247,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T09:37:26.985Z\,\httpOnly\:true,\path\:\/\}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'DTOWU0rv1FXLYDvhT729NY6PgWFjZy6Q',
    1744836591,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T20:49:51.118Z\,\httpOnly\:true,\path\:\/\}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'FTZxmMLMM05YsEBt0kd4fjGZqlNLYG-z',
    1744875748,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:42:28.117Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'GKsxbuOcMrBVmPTa2j0UJ061N0S8-clz',
    1744875733,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:42:12.818Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'HPPXWe1nkdnyXpMxe8sSiF8GfPzmjcWd',
    1744876435,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:53:55.218Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'Hb6yyjbskI5WJdTzkG7DCEIDDZ3l6QlU',
    1744876136,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:48:56.334Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'JHMh1Jhk_k3NkBZlCIbvQFeio_IqKS2c',
    1744875731,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:42:11.130Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'MxKX57ymxb29QRQiVeKCsYQzWisnuYhZ',
    1744836596,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T20:49:55.820Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'N5-UlTz5aZG9fMrmeBrwgCbze2HohRoL',
    1744876133,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:48:53.222Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'PfB5IzHpJvBCLwCOZXPJRbOyMTTWq0X0',
    1744876431,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:53:50.723Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'QkWiZ_ByZcJjndhQlUAfDuuvSKvORUSJ',
    1744876433,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:53:52.832Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'Sdvaqzfb0kVoOyHW72wZidUO6Ws_661l',
    1744875734,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:42:14.426Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'UkVx_hd6CfO8GkahaC_OkicthOWQFZfA',
    1744836070,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T20:41:09.713Z\,\httpOnly\:true,\path\:\/\}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'V0BAiSSFAjfz7atPjBZa12woMlYYZdq0',
    1744836140,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T20:42:19.815Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'VRNtlnX1322sSUs53b5ky8Ig40ZxSTWJ',
    1744876447,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:54:07.335Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'YyZYW7mKPI5PDOeSvB77K4FrtuV0jtNL',
    1744876141,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:49:00.529Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'Zk7dH1IYqIYlYuMN6RkCPZWHrBA3Ymrp',
    1744836644,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T20:50:44.427Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'ZtE_EQ6jW1hK16EibC1Di5WdrzGgcKcF',
    1744876421,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:49:40.423Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:9}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    '_ay-hhf7wllzSmB-ds0PZ6ySi_3bOr_v',
    1744876446,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:54:05.511Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    '_vyHlO5rvvyXyBcd9gyTvX7BnjV87BDo',
    1744797013,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T09:50:04.323Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:6}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'a9XLGuZ7jYcjCz-8ixHTY0_zaK6MIU-V',
    1744837321,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T21:02:01.331Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'dF50AQL_qe2s-PSpvDNWfmPnOT_63pdO',
    1744876509,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:55:09.315Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:10}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'gMbGQsE0UYWsqGZizxOSESZNkzZBi51u',
    1744836324,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T20:45:24.313Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'gvYZ8aiaFTdLDDghKRYmKYSSmALH9-2F',
    1744876424,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T20:58:26.942Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:6}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'imbgUWlF5vUok0Ov41yxiSVTKCgsqNhp',
    1744836644,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T20:50:43.814Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'k8RAXn7fgVQWisBC7nwXNZh9DBhrVhbR',
    1744876154,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:49:13.729Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'k9QItk5s-1hDRsWvSmLkOCqqgAiBIPYl',
    1744875724,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:42:04.442Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'lbsxHdvL0_CYcl7IH6c94uRfKpw9NDqK',
    1744836532,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T20:48:51.914Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'mjboYlNurmY42kjjVSUoL51lw3CQ9Fz2',
    1744833430,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T19:57:06.235Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:6}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'o3rYD_KGlVmMUxXCBEtPG8cZHjIjOXS2',
    1744836026,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T20:40:26.427Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'pYb9-19yEr8loL9iWvEYQAKSo2_So8gG',
    1744876511,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:55:11.018Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:10}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'qEnMrFDVUrjrYxNJpRIyThtYqDKPiHJK',
    1744836175,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T20:42:55.415Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'rjALoxUbCoZItVe8j06wfmEuAjHggJNf',
    1744806548,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T09:57:16.225Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:6}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'u8RgEf7e2pQYVnx_xT-xFK3e-97-Sici',
    1744876487,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:54:46.613Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:10}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'u9RWAQi3iAHeThBlV60ESiw45Ya9Y4e1',
    1744876527,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:55:27.214Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:10}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'vyBb-Omqan7VakuFZS7J-Z7FQwjInUYU',
    1744876434,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:53:53.656Z\,\httpOnly\:true,\path\:\/\}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'xXdHih24LTUQASqiHPeRYVeBZkxaY5X1',
    1744876151,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-17T07:49:11.022Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );
INSERT INTO
  `sessions` (`session_id`, `expires`, `data`)
VALUES
  (
    'yAZiYiRWzWINrEZbKHSYjY6NPP6nkw3A',
    1744836148,
    '{\cookie\:{\originalMaxAge\:86400000,\expires\:\2025-04-16T20:42:27.804Z\,\httpOnly\:true,\path\:\/\},\passport\:{\user\:7}}'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: userchatrooms
# ------------------------------------------------------------

INSERT INTO
  `userchatrooms` (`UserId`, `RoomId`, `IsAdmin`, `IsOwner`)
VALUES
  (6, 1, 1, 1);
INSERT INTO
  `userchatrooms` (`UserId`, `RoomId`, `IsAdmin`, `IsOwner`)
VALUES
  (6, 2, 0, 0);
INSERT INTO
  `userchatrooms` (`UserId`, `RoomId`, `IsAdmin`, `IsOwner`)
VALUES
  (7, 1, 0, 0);
INSERT INTO
  `userchatrooms` (`UserId`, `RoomId`, `IsAdmin`, `IsOwner`)
VALUES
  (8, 1, 0, 0);
INSERT INTO
  `userchatrooms` (`UserId`, `RoomId`, `IsAdmin`, `IsOwner`)
VALUES
  (9, 1, 0, 0);
INSERT INTO
  `userchatrooms` (`UserId`, `RoomId`, `IsAdmin`, `IsOwner`)
VALUES
  (9, 2, 1, 1);
INSERT INTO
  `userchatrooms` (`UserId`, `RoomId`, `IsAdmin`, `IsOwner`)
VALUES
  (10, 1, 0, 0);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (`Id`, `Username`, `UsernameId`, `Password`, `Email`)
VALUES
  (
    6,
    'Maciej',
    1,
    '$2b$10$2MNQtk0HYOf2Et.ktKkkeeMmCteNTK1ACma1TXmHiUvZ//BreNER.',
    'kwiatkowski.maciej22@gmail.com'
  );
INSERT INTO
  `users` (`Id`, `Username`, `UsernameId`, `Password`, `Email`)
VALUES
  (
    7,
    'Ikhaatnaggers123',
    1,
    '$2b$10$VbF.b1hgXb3rC4a8nYO/vOzrDEdbdQWjaCq5SWzvoBr0Ic85NnFem',
    'steeps_funding.8r@icloud.com'
  );
INSERT INTO
  `users` (`Id`, `Username`, `UsernameId`, `Password`, `Email`)
VALUES
  (
    8,
    'RIZZLER',
    1,
    '$2b$10$Ej36ly6xNKneklEbX3uKXOKMQclH9gVQUhu0lYHd.0pw5LKyQk1X2',
    'w@w'
  );
INSERT INTO
  `users` (`Id`, `Username`, `UsernameId`, `Password`, `Email`)
VALUES
  (
    9,
    'TEST1',
    1,
    '$2b$10$5hg1ts29i2JnByxaOhEgteOe83YihHsNPNvuoCYgUQ862gYrKx8rq',
    'hapowo3849@mobilesm.com'
  );
INSERT INTO
  `users` (`Id`, `Username`, `UsernameId`, `Password`, `Email`)
VALUES
  (
    10,
    'IkHaatFrank',
    1,
    '$2b$10$fXvKOd2T5zEzFva1ULzb3eR/DNSQNrlmnYDnoZH1T4XS9SAw14fD2',
    'krisdenhertog@icloud.com'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
