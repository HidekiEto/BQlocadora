-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08-Nov-2024 às 15:25
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bqlocadora`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--
create database bqlocadora;

use bqlocadora;

CREATE TABLE `categoria` (
  `CatCod` int(11) NOT NULL,
  `CatNome` varchar(20) NOT NULL,
  `CatValor_km` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `categoria`
--

INSERT INTO `categoria` (`CatCod`, `CatNome`, `CatValor_km`) VALUES
(1, 'Basico', '0.49'),
(2, 'Utilitario', '0.51'),
(3, 'Luxo', '0.53'),
(4, 'Especial', '0.55');

-- --------------------------------------------------------

--
-- Estrutura da tabela `clientes`
--

CREATE TABLE `clientes` (
  `clienteCPF` int(9) NOT NULL,
  `clienteNome` varchar(40) NOT NULL,
  `clienteEnde` varchar(60) NOT NULL,
  `clienteTel` varchar(15) NOT NULL,
  `clienteCidade` varchar(60) NOT NULL,
  `clienteDataNasc` date NOT NULL,
  `clienteCNH` int(11) NOT NULL,
  `clienteCNHCat` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `clientes`
--

INSERT INTO `clientes` (`clienteCPF`, `clienteNome`, `clienteEnde`, `clienteTel`, `clienteCidade`, `clienteDataNasc`, `clienteCNH`, `clienteCNHCat`) VALUES
(111222333, 'Pedro Santos', 'Rua da Praia, 789', '(21) 98765-1234', 'Rio de Janeiro', '1978-11-30', 2147483647, 'AB'),
(123456789, 'João Silva', 'Rua das Flores, 123', '(11) 98765-4321', 'São Paulo', '1985-04-12', 2147483647, 'B'),
(222333444, 'Laura Mendes', 'Avenida Brasil, 303', '(41) 91234-5678', 'Curitiba', '1988-12-10', 2147483647, 'B'),
(333444555, 'Gustavo Rocha', 'Avenida Sete, 606', '(11) 93456-7890', 'São Paulo', '1980-01-20', 2147483647, 'C'),
(444555666, 'Ana Costa', 'Rua dos Jacarandás, 101', '(31) 92345-6789', 'Belo Horizonte', '1982-05-16', 2147483647, 'B'),
(555666777, 'Lucas Almeida', 'Rua das Palmeiras, 404', '(21) 99876-5432', 'Rio de Janeiro', '1993-03-05', 2147483647, 'A'),
(666777888, 'Juliana Campos', 'Rua dos Girassóis, 707', '(31) 91567-8901', 'Belo Horizonte', '1991-06-12', 2147483647, 'B'),
(777888999, 'Carlos Pereira', 'Rua das Acácias, 202', '(61) 98765-4321', 'Brasília', '1995-07-25', 2147483647, 'C'),
(888999000, 'Fernanda Lima', 'Rua das Orquídias, 505', '(71) 98765-6789', 'Salvador', '1987-09-17', 2147483647, 'AB'),
(987654321, 'Maria Oliveira', 'Avenida Paulista, 456', '(11) 91234-5678', 'São Paulo', '1990-08-22', 2147483647, 'A');

-- --------------------------------------------------------

--
-- Estrutura da tabela `combustivel`
--

CREATE TABLE `combustivel` (
  `CombTipo` char(1) NOT NULL,
  `CombNome` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `combustivel`
--

INSERT INTO `combustivel` (`CombTipo`, `CombNome`) VALUES
('A', 'Alcool'),
('D', 'Diesel'),
('F', 'Flex'),
('G', 'Gasolina');

-- --------------------------------------------------------

--
-- Estrutura da tabela `departamento`
--

CREATE TABLE `departamento` (
  `DeptoCod` int(11) NOT NULL,
  `DeptoNome` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `departamento`
--

INSERT INTO `departamento` (`DeptoCod`, `DeptoNome`) VALUES
(1, 'Atendimento'),
(2, 'Administrativo'),
(3, 'Financeiro'),
(4, 'Diretoria'),
(5, 'Copa');

-- --------------------------------------------------------

--
-- Estrutura da tabela `funcionarios`
--

CREATE TABLE `funcionarios` (
  `funcMatricula` int(4) NOT NULL,
  `funcNome` varchar(40) NOT NULL,
  `funcDepto` int(1) NOT NULL,
  `funcSalario` decimal(8,2) NOT NULL,
  `funcAdmissao` date NOT NULL,
  `funcFilho` int(1) NOT NULL,
  `funcSexo` varchar(1) NOT NULL,
  `funcAtivo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `funcionarios`
--

INSERT INTO `funcionarios` (`funcMatricula`, `funcNome`, `funcDepto`, `funcSalario`, `funcAdmissao`, `funcFilho`, `funcSexo`, `funcAtivo`) VALUES
(1001, 'Francisco de Oliveira', 1, '1800.00', '2001-11-20', 0, 'M', 1),
(1002, 'Ana Maria Andrade', 2, '3200.00', '1999-02-13', 1, 'F', 1),
(1003, 'Antônio Andrade de Oliveira', 3, '4800.00', '2007-11-05', 3, 'M', 1),
(1004, 'Maria Abelarda da Silva', 5, '937.00', '1997-03-01', 5, 'F', 1),
(1005, 'Manoel Trindade', 4, '7850.50', '1997-01-02', 3, 'M', 1),
(1006, 'Alexandre Barbosa', 1, '1800.00', '2000-06-08', 2, 'M', 1),
(1007, 'Rosana Campoy', 2, '3020.00', '2004-07-24', 3, 'F', 1),
(1008, 'Janaína Albuquerque', 3, '4500.00', '1999-03-25', 0, 'F', 1),
(1009, 'Roberto Silva Junior', 1, '1810.00', '2003-07-07', 0, 'M', 1),
(1010, 'Carlos Eduardo Siqueira', 4, '7890.00', '2009-08-04', 1, 'M', 1),
(1011, 'Heitor Sampaio', 1, '3450.00', '2011-03-05', 1, 'M', 1),
(1012, 'Célia Menezes', 1, '1980.00', '2008-07-18', 0, 'F', 1),
(1013, 'José Alves Costa', 1, '1650.00', '2000-09-11', 1, 'M', 1),
(1014, 'Arlinda Medeiros', 5, '937.00', '2000-05-03', 5, 'F', 1),
(1015, 'Josefina Sarmento', 4, '6789.00', '1997-01-02', 1, 'F', 1),
(1016, 'Wendell Navarro Perez', 3, '1212.00', '2004-04-15', 2, 'M', 1),
(1017, 'Rodolfo Rodrigues', 1, '8500.00', '2022-09-10', 2, 'M', 1);

--
-- Acionadores `funcionarios`
--
DELIMITER $$
CREATE TRIGGER `tr_add_usuario` AFTER INSERT ON `funcionarios` FOR EACH ROW BEGIN
    DECLARE usuarioSenha VARCHAR(8);
    SET usuarioSenha = DATE_FORMAT(NEW.funcAdmissao, '%y%m%d');
    INSERT INTO usuarios (usuarioLogin, usuarioSenha, usuarioFuncMat, usuarioStatus)
    VALUES (NEW.funcMatricula, usuarioSenha, NEW.funcMatricula, 1);
    END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `ordem_de_servico`
--

CREATE TABLE `ordem_de_servico` (
  `OsNum` int(11) NOT NULL,
  `OsFuncMat` int(4) NOT NULL,
  `OsClienteCPF` int(9) NOT NULL,
  `OsVeicPlaca` char(7) NOT NULL,
  `OsDataRetirada` date NOT NULL,
  `OsDataDevolucao` date DEFAULT NULL,
  `OsKMRetirada` decimal(8,2) NOT NULL,
  `OsKMDevolucao` decimal(8,2) NOT NULL,
  `OsStatus` tinyint(1) NOT NULL,
  `OsValorPgto` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `ordem_de_servico`
--

INSERT INTO `ordem_de_servico` (`OsNum`, `OsFuncMat`, `OsClienteCPF`, `OsVeicPlaca`, `OsDataRetirada`, `OsDataDevolucao`, `OsKMRetirada`, `OsKMDevolucao`, `OsStatus`, `OsValorPgto`) VALUES
(1, 1001, 123456789, 'ABW4007', '2017-01-03', '2018-01-03', '300.40', '400.70', 1, '150.20'),
(2, 1002, 987654321, 'AZX3273', '2018-01-01', '2018-06-09', '90.82', '100.12', 1, '80.82'),
(3, 1003, 111222333, 'ADE3456', '2017-03-05', '2017-03-07', '70.25', '85.15', 1, '90.25'),
(4, 1004, 444555666, 'ADW2456', '2017-05-08', '2017-05-10', '200.40', '210.80', 1, '100.60'),
(5, 1005, 777888999, 'ADX1473', '2016-06-10', '2017-06-10', '100.72', '250.52', 1, '150.12'),
(6, 1006, 222333444, 'AQW1234', '2017-07-20', '2017-07-22', '200.26', '350.46', 1, '250.76'),
(7, 1007, 555666777, 'AQX3451', '2017-08-25', '2017-08-27', '300.98', '450.28', 1, '150.98'),
(8, 1008, 888999000, 'AQY2005', '2017-09-30', '2017-10-02', '400.50', '550.10', 1, '300.50'),
(9, 1009, 333444555, 'ASX3232', '2017-11-05', '2017-11-07', '200.10', '300.80', 1, '150.20'),
(10, 1010, 666777888, 'AWQ3703', '2017-12-10', '2017-12-12', '400.55', '500.55', 1, '50.50');

--
-- Acionadores `ordem_de_servico`
--
DELIMITER $$
CREATE TRIGGER `tr_alter_status` AFTER INSERT ON `ordem_de_servico` FOR EACH ROW BEGIN
UPDATE veiculos
SET veicStatusAlocado = 1
WHERE veicPlaca = NEW.OsVeicPlaca and NEW.OsDataDevolucao <= curdate() and NEW.OsDataDevolucao >= curdate();
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_alterar_status` AFTER UPDATE ON `ordem_de_servico` FOR EACH ROW BEGIN
    IF NEW.OsDataDevolucao IS NOT NULL AND NEW.OsDataDevolucao <= CURDATE() THEN
        UPDATE veiculos
        SET veicStatusAlocado = 0
        WHERE veicPlaca = NEW.OsVeicPlaca;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_calcular_pagamento` AFTER UPDATE ON `ordem_de_servico` FOR EACH ROW BEGIN
 DECLARE resultado DECIMAL(10,2);
 SELECT CatValor_km INTO resultado
 FROM categoria
 JOIN veiculos ON veiculos.veicCat = categoria.CatCod
 WHERE veiculos.veicPlaca = NEW.OsVeicPlaca;
 IF NEW.OsKMDevolucao IS NOT NULL THEN
 UPDATE ordem_de_servico
 SET OsValorPgto = (NEW.OsKMDevolucao - NEW.OsKMRetirada) * resultado
 WHERE OsNum = NEW.OsNum;
 END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `usuarioLogin` int(11) NOT NULL,
  `usuarioSenha` varchar(8) NOT NULL,
  `usuarioFuncMat` int(4) DEFAULT NULL,
  `usuarioSetor` int(11) NOT NULL,
  `usuarioStatus` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `veiculos`
--

CREATE TABLE `veiculos` (
  `veicPlaca` char(7) NOT NULL,
  `veicMarca` varchar(15) NOT NULL,
  `veicModelo` varchar(15) NOT NULL,
  `veicCor` varchar(15) DEFAULT NULL,
  `veicAno` int(4) NOT NULL,
  `veicComb` char(1) DEFAULT NULL,
  `veicCat` int(1) DEFAULT NULL,
  `veicStatusAlocado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `veiculos`
--

INSERT INTO `veiculos` (`veicPlaca`, `veicMarca`, `veicModelo`, `veicCor`, `veicAno`, `veicComb`, `veicCat`, `veicStatusAlocado`) VALUES
('ABW4007', 'VW', 'Jetta', 'Preto', 2022, 'F', 3, 1),
('ACZ3243', 'VW', 'Fusca', 'Rosa', 1956, 'G', 4, 1),
('ADE3456', 'Chevrolet', 'Camaro', 'Amarelo', 2022, 'G', 4, 1),
('ADW2456', 'VW', 'Gol', 'Vermelho', 2021, 'A', 1, 1),
('ADX1473', 'Ford', 'Ka', 'Branco', 2021, 'A', 1, 1),
('AQW1234', 'Ford', 'Fusion', 'Preto', 2022, 'F', 3, 1),
('AQX3451', 'Porsche', 'Carrera', 'Preto', 2022, 'G', 4, 1),
('AQY2005', 'Chevrolet', 'S10', 'Branco', 2022, 'D', 2, 1),
('ASX3232', 'Ford', 'Ka', 'Marrom', 2022, 'F', 1, 1),
('AVX4003', 'VW', 'Amarok', 'Preto', 2022, 'D', 2, 1),
('AWQ3703', 'Chevrolet', 'Omega', 'Preto', 2022, 'G', 3, 1),
('AWS2365', 'Chevrolet', 'Cruze', 'Azul', 2022, 'F', 3, 1),
('AWV1234', 'Fiat', 'Palio', 'Branco', 2021, 'F', 1, 0),
('AWV1323', 'VW', 'Gol', 'Branco', 2022, 'F', 1, 0),
('AWY4546', 'Fiat', 'Fiorino', 'Branco', 2021, 'A', 2, 1),
('AZX3273', 'VW', 'Fox', 'Azul', 2021, 'F', 1, 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`CatCod`);

--
-- Índices para tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`clienteCPF`);

--
-- Índices para tabela `combustivel`
--
ALTER TABLE `combustivel`
  ADD PRIMARY KEY (`CombTipo`);

--
-- Índices para tabela `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`DeptoCod`);

--
-- Índices para tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`funcMatricula`),
  ADD KEY `funcDepto` (`funcDepto`);

--
-- Índices para tabela `ordem_de_servico`
--
ALTER TABLE `ordem_de_servico`
  ADD PRIMARY KEY (`OsNum`),
  ADD KEY `OsVeicPlaca` (`OsVeicPlaca`),
  ADD KEY `OsClienteCPF` (`OsClienteCPF`),
  ADD KEY `OsFuncMat` (`OsFuncMat`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuarioLogin`),
  ADD KEY `usuarioFuncMat` (`usuarioFuncMat`);

--
-- Índices para tabela `veiculos`
--
ALTER TABLE `veiculos`
  ADD PRIMARY KEY (`veicPlaca`),
  ADD KEY `veicComb` (`veicComb`),
  ADD KEY `veicCat` (`veicCat`);

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`funcDepto`) REFERENCES `departamento` (`DeptoCod`);

--
-- Limitadores para a tabela `ordem_de_servico`
--
ALTER TABLE `ordem_de_servico`
  ADD CONSTRAINT `ordem_de_servico_ibfk_1` FOREIGN KEY (`OsVeicPlaca`) REFERENCES `veiculos` (`veicPlaca`),
  ADD CONSTRAINT `ordem_de_servico_ibfk_2` FOREIGN KEY (`OsClienteCPF`) REFERENCES `clientes` (`clienteCPF`),
  ADD CONSTRAINT `ordem_de_servico_ibfk_3` FOREIGN KEY (`OsFuncMat`) REFERENCES `funcionarios` (`funcMatricula`);

--
-- Limitadores para a tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`usuarioFuncMat`) REFERENCES `funcionarios` (`funcMatricula`);

--
-- Limitadores para a tabela `veiculos`
--
ALTER TABLE `veiculos`
  ADD CONSTRAINT `veiculos_ibfk_1` FOREIGN KEY (`veicComb`) REFERENCES `combustivel` (`CombTipo`),
  ADD CONSTRAINT `veiculos_ibfk_2` FOREIGN KEY (`veicCat`) REFERENCES `categoria` (`CatCod`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
