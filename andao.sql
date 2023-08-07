Create Database [IF NOT EXISTS] `Andao`;

DROP TABLE IF EXISTS `Utilisateur`;

CREATE TABLE `Utilisateur` (
  `IdUtilisateur` INT AUTO_INCREMENT  NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Prenom` varchar(255) NOT NULL,
  `Email`  varchar(255) NOT NULL,
  `Password`  varchar(255) NOT NULL,
  `Adresse`  varchar(255) NOT NULL
);


DROP TABLE IF EXISTS `Province`;

CREATE TABLE `Province` (
  `IdProvince`INT AUTO_INCREMENT  NOT NULL,,
  `Description` varchar(2000) NOT NULL,
  `Image` varchar(2000) NOT NULL
);


DROP TABLE IF EXISTS `Restaurant`;

CREATE TABLE `Restaurant` (
  `IdRestaurant`INT AUTO_INCREMENT  NOT NULL,
  `Description` varchar(2000) NOT NULL,
  `Image` varchar(2000) NOT NULL,
  `Adresse`  varchar(255) NOT NULL,
  `IdProvince`INT NOT NULL,
  FOREIGN KEY (IdProvince) REFERENCES Province(IdProvince)
);


DROP TABLE IF EXISTS `Magasin`;

CREATE TABLE `Magasin` (
  `IdMagasin` INT AUTO_INCREMENT  NOT NULL,
  `Description` varchar(2000) NOT NULL,
  `Image` varchar(2000) NOT NULL,
  `Adresse`  varchar(255) NOT NULL,
  `IdProvince`INT NOT NULL,
  FOREIGN KEY (IdProvince) REFERENCES Province(IdProvince)
);



DROP TABLE IF EXISTS `Circuit`;

CREATE TABLE `Circuit` (
  `IdCircuit` INT AUTO_INCREMENT  NOT NULL,
  `Type` varchar(2) NOT NULL
);


DROP TABLE IF EXISTS `Route`;

CREATE TABLE `Route` (
  `IdRoute` INT AUTO_INCREMENT  NOT NULL,
  `Nom` varchar(2000) NOT NULL,
  `IdProvince`INT NOT NULL,
  `IdCircuit`INT NOT NULL,
  FOREIGN KEY (IdProvince) REFERENCES Province(IdProvince),
  FOREIGN KEY (IdCircuit) REFERENCES Circuit(IdCircuit)
);

create view Acceuil_Resto AS SELECT R.IdRestaurant,R.Description,R.Image,R.Adresse,R.IdProvince,P.IdProvince,P.Description,P.Image FROM Restaurant R,
Rt.IdRoute,Rt.Nom,Rt.IdCircuit,Rt.IdProvince JOIN Province P ON R.IdProvince=P.IdProvince,C.IdCircuit,C.Type JOIN 
Route Rt ON P.IdProvince = Rt.IdProvince JOIN Circuit C ON C.IdCircuit = Rt.IdCircuit

create view Resto_Province AS SELECT R.IdRestaurant,R.Description,R.Image,R.Adresse,R.IdProvince,P.IdProvince,P.Description,P.Image FROM Restaurant R JOIN Province P ON R.IdProvince=P.IdProvince
