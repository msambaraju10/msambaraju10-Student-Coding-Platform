-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2024 at 05:08 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hackathondb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `password`) VALUES
('admin', '12345');

-- --------------------------------------------------------

--
-- Table structure for table `bank`
--

CREATE TABLE `bank` (
  `accnumber` varchar(20) NOT NULL,
  `balance` float DEFAULT NULL,
  `cardnumber` varchar(20) DEFAULT NULL,
  `cardtype` varchar(50) DEFAULT NULL,
  `contactaddress` varchar(300) DEFAULT NULL,
  `contactnumber` varchar(15) DEFAULT NULL,
  `cvvnumber` varchar(5) DEFAULT NULL,
  `expirydate` varchar(20) DEFAULT NULL,
  `fullname` varchar(60) DEFAULT NULL,
  `zipcode` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bank`
--

INSERT INTO `bank` (`accnumber`, `balance`, `cardnumber`, `cardtype`, `contactaddress`, `contactnumber`, `cvvnumber`, `expirydate`, `fullname`, `zipcode`) VALUES
('10000', 3997, '1122334411223344', 'debit', 'apex', '1234567890', '100', '12/27', 'Admin', '12345'),
('10001', 93007, '101', 'debit', 'warangal', '1234567890', '101', '12/27', 'Pranitej', '506002');

-- --------------------------------------------------------

--
-- Table structure for table `banktransactions`
--

CREATE TABLE `banktransactions` (
  `transactionid` bigint(20) NOT NULL,
  `amount` float DEFAULT NULL,
  `fromcardno` varchar(20) DEFAULT NULL,
  `tocardno` varchar(20) DEFAULT NULL,
  `transactiondate` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banktransactions`
--

INSERT INTO `banktransactions` (`transactionid`, `amount`, `fromcardno`, `tocardno`, `transactiondate`) VALUES
(1, 1000, '101', '100', '2024-03-12 00:00:00.000000'),
(2, 999, '101', '1122334411223344', '2024-03-19 08:18:15.000000'),
(3, 999, '101', '1122334411223344', '2024-03-19 08:18:15.000000'),
(4, 999, '101', '1122334411223344', '2024-03-19 14:23:00.000000');

-- --------------------------------------------------------

--
-- Table structure for table `contests`
--

CREATE TABLE `contests` (
  `contest_id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `end_date` datetime(6) NOT NULL,
  `fee_amount` float DEFAULT NULL,
  `start_date` datetime(6) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contests`
--

INSERT INTO `contests` (`contest_id`, `created_at`, `description`, `end_date`, `fee_amount`, `start_date`, `title`) VALUES
(1, '2024-03-12 11:16:00.000000', 'Its a python Contest', '2024-03-30 01:00:00.000000', 999, '2024-03-12 11:00:00.000000', 'Python');

-- --------------------------------------------------------

--
-- Table structure for table `contest_registrations`
--

CREATE TABLE `contest_registrations` (
  `registration_id` bigint(20) NOT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `registration_date` datetime(6) DEFAULT NULL,
  `contest_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contest_registrations`
--

INSERT INTO `contest_registrations` (`registration_id`, `payment_status`, `registration_date`, `contest_id`, `user_id`) VALUES
(1, 'done', '2024-03-19 14:23:00.000000', 1, 1),
(2, 'pending', '2024-03-12 12:17:00.000000', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `leaderboard`
--

CREATE TABLE `leaderboard` (
  `leaderboard_id` bigint(20) NOT NULL,
  `score` int(11) NOT NULL DEFAULT 0,
  `submission_date` datetime(6) DEFAULT NULL,
  `contest_id` bigint(20) DEFAULT NULL,
  `question_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leaderboard`
--

INSERT INTO `leaderboard` (`leaderboard_id`, `score`, `submission_date`, `contest_id`, `question_id`, `user_id`) VALUES
(1, 10, '2024-03-20 20:18:00.000000', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` bigint(20) NOT NULL,
  `amount` float DEFAULT NULL,
  `payment_date` datetime(6) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `registration_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `amount`, `payment_date`, `payment_method`, `registration_id`) VALUES
(4, 1000, '2024-03-12 11:16:00.000000', 'card', 1);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` bigint(20) NOT NULL,
  `language_name` varchar(255) NOT NULL,
  `minutes` int(11) DEFAULT NULL,
  `question_text` varchar(1000) NOT NULL,
  `score` int(11) DEFAULT NULL,
  `contest_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `language_name`, `minutes`, `question_text`, `score`, `contest_id`) VALUES
(1, 'python', 10, '# Get input from the user for two numbers\nnum1 = int(input())\nnum2 = int(input())\n\n# Calculate the sum\nsum_result = ...?\n\n# Display the result\nprint(sum_result)\n', 10, 1),
(2, 'python', 10, '# Get input from the user\nname = input()\n\n# Reverse the string\nreversed_name = ...?\n\n# Display the reversed string\nprint(reversed_name)\n', 10, 1),
(3, 'python', 10, '# Get input from the user\nname = input()\n\n# Print a greeting with the entered name\nprint() # Ex: Hello Ram\n', 10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `test_cases`
--

CREATE TABLE `test_cases` (
  `test_case_id` bigint(20) NOT NULL,
  `expected_output` varchar(255) NOT NULL,
  `input_data` varchar(255) NOT NULL,
  `question_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `test_cases`
--

INSERT INTO `test_cases` (`test_case_id`, `expected_output`, `input_data`, `question_id`) VALUES
(1, '30', '10\n20', 1),
(2, '150', '100\n50', 1),
(3, '100', '99\n1', 1),
(4, 'tac', 'cat', 2),
(5, 'nuf', 'fun', 2),
(6, 'god', 'dog', 2),
(7, 'Hello Funny', 'Funny', 3),
(8, 'Hello Ram', 'Ram', 3),
(9, 'Hello God', 'God', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `qualifications` varchar(255) DEFAULT NULL,
  `registration_date` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `first_name`, `gender`, `last_name`, `mobile`, `password`, `qualifications`, `registration_date`) VALUES
(1, 'vangalapranitej@gmail.com', 'Vangala', 'male', 'Pranitej', '8074122800', '12345', 'admin', '2024-03-12 11:29:00.000000'),
(2, 'vangalafunny@gmail.com', 'Vangala', 'male', 'Funny', '1234567890', '12345', 'user', '2024-03-12 12:17:00.000000'),
(3, 'mallik@gmail.com', 'vanam', 'male', 'mallikarjun', '8972398737', '112233', 'phd', '2024-03-20 20:35:00.000000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`accnumber`);

--
-- Indexes for table `banktransactions`
--
ALTER TABLE `banktransactions`
  ADD PRIMARY KEY (`transactionid`);

--
-- Indexes for table `contests`
--
ALTER TABLE `contests`
  ADD PRIMARY KEY (`contest_id`);

--
-- Indexes for table `contest_registrations`
--
ALTER TABLE `contest_registrations`
  ADD PRIMARY KEY (`registration_id`),
  ADD KEY `FKhdpd7utl67hsa3w4piistvrjc` (`contest_id`),
  ADD KEY `FK1s8sjd7jay95uhocir4q6ueu1` (`user_id`);

--
-- Indexes for table `leaderboard`
--
ALTER TABLE `leaderboard`
  ADD PRIMARY KEY (`leaderboard_id`),
  ADD KEY `FKcj94kl6pfr3vb00xy2v4e4ihn` (`contest_id`),
  ADD KEY `FKmvndpvdvo90v23efya06u4ctc` (`question_id`),
  ADD KEY `FKkrvli8v2u3owoa54i6hc2l0bu` (`user_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `FKpjknpbby70kgvls5qvb5ufok0` (`registration_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `FKpcdmtyloi08l09g6h978l57hh` (`contest_id`);

--
-- Indexes for table `test_cases`
--
ALTER TABLE `test_cases`
  ADD PRIMARY KEY (`test_case_id`),
  ADD KEY `FKas9gsipr1of7kx6dlwb3jbf30` (`question_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banktransactions`
--
ALTER TABLE `banktransactions`
  MODIFY `transactionid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `contests`
--
ALTER TABLE `contests`
  MODIFY `contest_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contest_registrations`
--
ALTER TABLE `contest_registrations`
  MODIFY `registration_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `leaderboard`
--
ALTER TABLE `leaderboard`
  MODIFY `leaderboard_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `test_cases`
--
ALTER TABLE `test_cases`
  MODIFY `test_case_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contest_registrations`
--
ALTER TABLE `contest_registrations`
  ADD CONSTRAINT `FK1s8sjd7jay95uhocir4q6ueu1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FKhdpd7utl67hsa3w4piistvrjc` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`contest_id`);

--
-- Constraints for table `leaderboard`
--
ALTER TABLE `leaderboard`
  ADD CONSTRAINT `FKcj94kl6pfr3vb00xy2v4e4ihn` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`contest_id`),
  ADD CONSTRAINT `FKkrvli8v2u3owoa54i6hc2l0bu` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FKmvndpvdvo90v23efya06u4ctc` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `FKpjknpbby70kgvls5qvb5ufok0` FOREIGN KEY (`registration_id`) REFERENCES `contest_registrations` (`registration_id`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `FKpcdmtyloi08l09g6h978l57hh` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`contest_id`);

--
-- Constraints for table `test_cases`
--
ALTER TABLE `test_cases`
  ADD CONSTRAINT `FKas9gsipr1of7kx6dlwb3jbf30` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
