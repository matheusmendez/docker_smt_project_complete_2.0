DROP DATABASE IF EXISTS `db_smt`;
CREATE DATABASE IF NOT EXISTS `db_smt`;
USE `db_smt`;

CREATE TABLE IF NOT EXISTS `usuarios`(
  `user` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  PRIMARY KEY (`user`)
	);

CREATE TABLE IF NOT EXISTS `sensores`(
  `key_sensor` varchar(50) NOT NULL,
  `name_sensor` varchar(50) NOT NULL,
  `loc_sensor` varchar(50) NOT NULL,
  `max_temp` FLOAT NOT NULL,
  `min_temp` FLOAT NOT NULL,
  `max_humi` FLOAT NOT NULL,
  `min_humi` FLOAT NOT NULL,
  `loss_temp` FLOAT DEFAULT 0.0,
  `loss_humi` FLOAT DEFAULT 0.0,
  `responsavel` varchar(50) NOT NULL,
  PRIMARY KEY (`key_sensor`)
  ); 

  CREATE TABLE IF NOT EXISTS `tb_temp_humi`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_sensor` varchar(50) NOT NULL,
  `temp_value` float DEFAULT NULL,
  `humi_value` float DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
	);

  ALTER TABLE `sensores` ADD CONSTRAINT FK_USUARIOS_USER
  FOREIGN KEY (`responsavel`) REFERENCES `usuarios` (`user`);

  ALTER TABLE `tb_temp_humi` ADD CONSTRAINT FK_SENSORES_KEY_SENSOR
  FOREIGN KEY (`id_sensor`) REFERENCES `sensores` (`key_sensor`);

  INSERT INTO `usuarios` (`user`,`senha`) VALUES ("admin", "admin");
  
  INSERT INTO `sensores` (`key_sensor`,`name_sensor`,`loc_sensor`,`max_temp`,`min_temp`,`max_humi`,`min_humi`,`loss_temp`,`loss_humi`,`responsavel`)
   VALUES ("sensor_ambiente_1", "Sensor Ambiente 1", "SMT", 30.0,18.0,60.0,30.0,00,0.0,"admin");
  