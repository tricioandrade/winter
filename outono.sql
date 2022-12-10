-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 10-Dez-2022 às 15:48
-- Versão do servidor: 10.4.25-MariaDB
-- versão do PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `outono`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_12_05_100513_create_products_table', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stock_quantity` bigint(20) NOT NULL,
  `unity_quantity` bigint(20) NOT NULL,
  `for_sale_quantity` bigint(20) DEFAULT NULL,
  `for_sale_status` tinyint(1) NOT NULL DEFAULT 1,
  `unity_of_measure` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(20,4) NOT NULL,
  `product_type_id` bigint(20) UNSIGNED NOT NULL DEFAULT 1,
  `price_with_tax` decimal(20,4) NOT NULL,
  `promotional_price` decimal(20,4) DEFAULT NULL,
  `promotional_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax_id` bigint(20) UNSIGNED NOT NULL,
  `tax_value` int(11) NOT NULL,
  `tax_total_added` decimal(20,4) NOT NULL,
  `tax_exemption_code` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT if(`tax_id` <> 0,'NOT_A',''),
  `tax_exemption_reason` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT if(`tax_id` <> 0,'NOT_APPLY',''),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `code`, `stock_quantity`, `unity_quantity`, `for_sale_quantity`, `for_sale_status`, `unity_of_measure`, `price`, `product_type_id`, `price_with_tax`, `promotional_price`, `promotional_status`, `tax_id`, `tax_value`, `tax_total_added`, `tax_exemption_code`, `tax_exemption_reason`, `created_at`, `updated_at`) VALUES
(4, 'iPhone XB', 'lorem ipsun', '7878764', 89898, 45, NULL, 1, 'KG', '13212.0000', 1, '14136.8400', NULL, NULL, 1, 7, '924.8400', 'NOT_A', 'NOT_APPLY', '2022-12-07 13:49:27', '2022-12-08 19:26:29'),
(5, 'iPhone XR', 'itel mobile', '78764', 8787, 5454, NULL, 1, 'KG', '13212.0000', 1, '14268.9600', NULL, NULL, 1, 8, '1056.9600', 'NOT_A', 'NOT_APPLY', '2022-12-07 13:49:42', '2022-12-07 13:49:42'),
(7, 'Tablet nano 7', 'itel mobile', '887454', 8787, 5454, NULL, 1, 'KG', '13212.0000', 1, '13872.6000', NULL, NULL, 1, 5, '660.6000', 'NOT_A', 'NOT_APPLY', '2022-12-07 13:50:32', '2022-12-07 13:50:32'),
(9, 'itel P37 Pro', 'itel mobile', '787876431', 45, 455, NULL, 1, 'KG', '13212.0000', 1, '14136.8400', NULL, NULL, 1, 7, '924.8400', 'NOT_A', 'NOT_APPLY', '2022-12-07 16:38:45', '2022-12-07 16:38:45'),
(11, 'iPhone XRP', 'i', '78786764', 89, 76, NULL, 1, 'KG', '13212.0000', 1, '15061.6800', NULL, NULL, 1, 14, '1849.6800', 'NOT_A', 'NOT_APPLY', '2022-12-08 15:52:58', '2022-12-08 15:52:58'),
(12, 'iPhone XB9', 'lorem ipsun', '787867640', 89898, 45, NULL, 1, 'KG', '13212.0000', 1, '14136.8400', NULL, NULL, 1, 7, '924.8400', 'NOT_A', 'NOT_APPLY', '2022-12-08 19:27:49', '2022-12-08 19:27:49'),
(13, 'iPhon2 roR', 'Hye', '7878176432', 212, 21, NULL, 1, 'KG', '23231.0000', 1, '26483.3400', NULL, NULL, 1, 14, '3252.3400', 'NOT_A', 'NOT_APPLY', '2022-12-09 22:43:50', '2022-12-09 22:43:50');

-- --------------------------------------------------------

--
-- Estrutura da tabela `product_types`
--

CREATE TABLE `product_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `symbol` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `product_types`
--

INSERT INTO `product_types` (`id`, `name`, `symbol`) VALUES
(1, 'Produto', 'P'),
(2, 'Serviço', 'S');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tax`
--

CREATE TABLE `tax` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `symbol` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `tax`
--

INSERT INTO `tax` (`id`, `name`, `description`, `symbol`, `created_at`, `updated_at`) VALUES
(1, 'IVA', 'IVA', 'IVA', NULL, NULL),
(2, 'ISE', 'ISE', 'ISE', NULL, NULL),
(3, 'IS', 'IS', 'IS', NULL, NULL),
(4, 'NS', 'NS', 'NS', NULL, NULL),
(5, 'OUT', 'OUT', 'OUT', NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Payton Orn MD', 'schoen.bernadine@example.net', '2022-12-06 17:21:25', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'sbs677cSFZ', '2022-12-06 17:21:25', '2022-12-06 17:21:25'),
(2, 'Rachelle Beier', 'auer.ulices@example.org', '2022-12-06 17:21:25', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '8SxgwixZue', '2022-12-06 17:21:25', '2022-12-06 17:21:25'),
(3, 'Heloise Stroman', 'ruben65@example.com', '2022-12-06 17:21:25', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'sabR1roqyz', '2022-12-06 17:21:25', '2022-12-06 17:21:25'),
(4, 'Jerome Marvin', 'boyer.karley@example.net', '2022-12-06 17:21:25', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'e2b9Z5v8OM', '2022-12-06 17:21:25', '2022-12-06 17:21:25'),
(5, 'Zakary Hammes', 'bashirian.nicholaus@example.net', '2022-12-06 17:21:25', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '3hx3Bc4wLf', '2022-12-06 17:21:26', '2022-12-06 17:21:26');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Índices para tabela `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Índices para tabela `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Índices para tabela `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_name_unique` (`name`),
  ADD UNIQUE KEY `products_code_unique` (`code`),
  ADD KEY `products_tax_id_foreign` (`tax_id`),
  ADD KEY `p_type` (`product_type_id`);

--
-- Índices para tabela `product_types`
--
ALTER TABLE `product_types`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tax`
--
ALTER TABLE `tax`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tax_name_unique` (`name`),
  ADD UNIQUE KEY `tax_description_unique` (`description`),
  ADD UNIQUE KEY `tax_symbol_unique` (`symbol`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `product_types`
--
ALTER TABLE `product_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tax`
--
ALTER TABLE `tax`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `p_type` FOREIGN KEY (`product_type_id`) REFERENCES `product_types` (`id`),
  ADD CONSTRAINT `products_tax_id_foreign` FOREIGN KEY (`tax_id`) REFERENCES `tax` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
