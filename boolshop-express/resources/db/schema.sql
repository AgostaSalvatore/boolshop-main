-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: videogame_db
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `game_order`
--

DROP TABLE IF EXISTS `game_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_order` (
  `order_id` bigint NOT NULL,
  `videogame_id` bigint NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `quantity` bigint DEFAULT NULL,
  PRIMARY KEY (`order_id`,`videogame_id`),
  KEY `videogame_id` (`videogame_id`),
  CONSTRAINT `game_order_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  CONSTRAINT `game_order_ibfk_2` FOREIGN KEY (`videogame_id`) REFERENCES `videogame` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_order`
--

LOCK TABLES `game_order` WRITE;
/*!40000 ALTER TABLE `game_order` DISABLE KEYS */;
INSERT INTO `game_order` VALUES (1,18,24.17,2),(2,1,68.61,1),(2,12,47.06,1),(2,14,61.33,1),(3,14,61.33,1),(4,18,24.17,2),(4,19,56.33,1),(5,11,58.72,2),(5,14,61.33,1),(6,12,47.06,2),(7,3,26.75,2),(8,12,47.06,2),(9,11,58.72,2),(9,16,62.33,1),(10,1,68.61,2),(10,7,32.24,2);
/*!40000 ALTER TABLE `game_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Action'),(2,'Adventure'),(3,'RPG'),(4,'Strategy'),(5,'Simulation'),(6,'Racing'),(7,'Puzzle'),(8,'Shooter'),(9,'Platformer'),(10,'Sports');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(8,2) NOT NULL,
  `payment_method` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,'2025-05-19 05:18:20',48.34,'PayPal'),(2,'2025-05-30 00:25:03',177.00,'Credit Card'),(3,'2025-05-24 04:18:20',61.33,'PayPal'),(4,'2025-05-22 10:15:32',104.67,'PayPal'),(5,'2025-05-27 18:29:44',178.77,'Credit Card'),(6,'2025-06-10 13:32:52',94.12,'Bank Transfer'),(7,'2025-05-27 12:00:16',53.50,'Credit Card'),(8,'2025-06-02 17:08:58',94.12,'Bank Transfer'),(9,'2025-05-17 07:09:02',179.77,'PayPal'),(10,'2025-05-30 00:42:20',201.70,'PayPal');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipment`
--

DROP TABLE IF EXISTS `shipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `recipient_name` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `shipping_date` datetime DEFAULT NULL,
  `delivery_status` varchar(50) DEFAULT NULL,
  `carrier` varchar(100) DEFAULT NULL,
  `tracking_number` varchar(100) DEFAULT NULL,
  `shipping_cost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `shipment_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment`
--

LOCK TABLES `shipment` WRITE;
/*!40000 ALTER TABLE `shipment` DISABLE KEYS */;
INSERT INTO `shipment` VALUES (1,1,'Via Roma 12, Milano','Luca Bianchi','+39 328 4567890','2025-06-10 00:00:00','Spedito','SDA','TRK123456789IT',7.50),(2,2,'Piazza Garibaldi 5, Napoli','Giulia Verdi','+39 320 9876543','2025-06-11 00:00:00','Consegnato','GLS','GLS987654321IT',6.90),(3,3,'Corso Vittorio Emanuele 33, Torino','Marco Rossi','+39 347 1112233','2025-06-09 00:00:00','In transito','Bartolini','BRT1122334455',5.80),(4,4,'Via Dante 7, Bologna','Sara Neri','+39 339 9988776','2025-06-12 00:00:00','Preparazione','Poste Italiane','PI7788990011',4.50),(5,5,'Viale Europa 9, Firenze','Alessandro Gallo','+39 333 4455667','2025-06-13 00:00:00','Consegnato','DHL','DHL0011223344IT',8.20),(6,6,'Via Mazzini 45, Palermo','Chiara Russo','+39 327 5544332','2025-06-08 00:00:00','Spedito','UPS','UPS9988776655IT',9.00),(7,7,'Via Libertà 20, Catania','Matteo Ferrari','+39 342 6677889','2025-06-10 00:00:00','In transito','GLS','GLS5566778899IT',6.70),(8,8,'Via Manzoni 8, Genova','Elena Colombo','+39 348 2211334','2025-06-12 00:00:00','Consegnato','SDA','SDA3344556677IT',7.10),(9,9,'Piazza Duomo 3, Lecce','Francesco Conti','+39 326 9988221','2025-06-11 00:00:00','Spedito','DHL','DHL7788991122IT',8.40),(10,10,'Via Nazionale 101, Verona','Martina Esposito','+39 349 3344221','2025-06-13 00:00:00','Preparazione','Poste Italiane','PI1122334455',5.00);
/*!40000 ALTER TABLE `shipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videogame`
--

DROP TABLE IF EXISTS `videogame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videogame` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `description` text,
  `price` decimal(6,2) NOT NULL,
  `release_year` year DEFAULT NULL,
  `software_house` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `quantity` bigint DEFAULT NULL,
  `discount` decimal(2,0) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videogame`
--

LOCK TABLES `videogame` WRITE;
/*!40000 ALTER TABLE `videogame` DISABLE KEYS */;
INSERT INTO `videogame` VALUES (1,'The Legend of Zelda: Breath of the Wild','Explore an open world full of secrets, puzzles, and wild adventures.',68.61,2018,'Pace and Sons','game_1.jpg',24,20),(2,'Gran Turismo 7','A realistic racing simulator featuring hundreds of cars and tracks.',53.12,2025,'Simon, Cross and Hurst','game_2.jpg',128,5),(3,'Final Fantasy VII Remake','A retelling of a classic JRPG with real-time combat and deep storytelling.',26.75,2025,'Smith, Lindsey and Walker','game_3.jpg',38,10),(4,'Sid Meier’s Civilization VI','Build and expand your empire in a turn-based strategy world.',55.34,2023,'Stephens-Johnson','game_4.jpg',60,5),(5,'XCOM 2','Lead resistance forces against alien invaders in tactical battles.',28.55,2021,'Liu-Hill','game_5.jpg',65,5),(6,'Forza Horizon 5','Drive across dynamic open-world landscapes in a high-octane racing game.',33.28,2020,'Brandt, Miller and Melton','game_6.jpg',172,10),(7,'Fire Emblem: Three Houses','Strategic RPG with relationship building and tactical combat.',32.24,2022,'Sullivan-Sawyer','game_7.jpg',73,5),(8,'Portal 2','Solve complex puzzles using portals and physics in a sci-fi environment.',54.77,2024,'Heath-Hamilton','game_8.jpg',182,10),(9,'Ori and the Will of the Wisps','A heartfelt platforming adventure in a beautifully animated world.',24.21,2023,'Kelly, Rowland and Hanson','game_9.jpg',191,5),(10,'Fortnite','Battle royale shooter with building mechanics and seasonal updates.',48.47,2021,'Cox Ltd','game_10.jpg',33,20),(11,'Grand Theft Auto V','Three criminals navigate heists and chaos in a massive open-world city.',58.72,2021,'Mcgrath PLC','game_11.jpg',11,5),(12,'Stardew Valley','Live off the land, grow crops, raise animals, and connect with villagers.',47.06,2023,'Peck, Griffith and Edwards','game_12.jpg',16,20),(13,'Resident Evil 4','Survive horror and solve mysteries in a remote European village.',41.26,2020,'Hanna-Joyce','game_13.jpg',100,0),(14,'League of Legends','Compete in strategic 5v5 matches to destroy the enemy nexus.',61.33,2020,'Mason and Sons','game_14.jpg',21,15),(15,'Among Us','Unmask the impostor in this social deduction game set in space.',63.80,2022,'Jones, Jones and Whitehead','game_15.jpg',73,10),(16,'Dark Souls III','A challenging RPG in a dark fantasy world full of bosses and lore.',62.33,2025,'Howell-Rios','game_16.jpg',135,10),(17,'FIFA 23','Realistic football matches with authentic teams and leagues.',37.25,2020,'Coleman, Edwards and Mcdonald','game_17.jpg',194,5),(18,'Animal Crossing: New Horizons','Create your dream island life with charming animal neighbors.',24.17,2022,'Pena, Smith and Shelton','game_18.jpg',92,5),(19,'Overwatch','Team-based hero shooter with objectives and unique characters.',56.33,2019,'Lewis, Smith and Greene','game_19.jpg',77,5),(20,'Call of Duty: Modern Warfare II','High-stakes modern combat in a cinematic first-person shooter.',66.28,2022,'Mclean, Stewart and Le','game_20.jpg',111,20);
/*!40000 ALTER TABLE `videogame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videogame_genre`
--

DROP TABLE IF EXISTS `videogame_genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videogame_genre` (
  `videogame_id` bigint NOT NULL,
  `genre_id` bigint NOT NULL,
  PRIMARY KEY (`videogame_id`,`genre_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `videogame_genre_ibfk_1` FOREIGN KEY (`videogame_id`) REFERENCES `videogame` (`id`),
  CONSTRAINT `videogame_genre_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videogame_genre`
--

LOCK TABLES `videogame_genre` WRITE;
/*!40000 ALTER TABLE `videogame_genre` DISABLE KEYS */;
INSERT INTO `videogame_genre` VALUES (1,1),(16,1),(20,1),(8,2),(9,2),(11,2),(13,2),(16,2),(3,3),(7,3),(5,4),(11,4),(13,5),(14,5),(19,5),(2,6),(6,6),(8,6),(12,6),(1,7),(5,7),(10,7),(15,7),(4,8),(8,8),(12,8),(16,8),(6,9),(14,9),(1,10),(5,10),(12,10),(15,10),(17,10),(18,10);
/*!40000 ALTER TABLE `videogame_genre` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-14 16:12:25
