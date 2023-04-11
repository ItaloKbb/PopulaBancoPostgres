CREATE TABLE Motorista(
idmoto int primary key,
nome VARCHAR(255),
telefone VARCHAR(9),
idade int
);

create table Carro(
idcarro int primary key,
nomecarro VARCHAR(255),
cor VARCHAR(50)
);

CREATE TABLE Reservas(
idmoto int,
idcarro int,
dia DATE,
FOREIGN key(idmoto) REFERENCES Motorista(idmoto),
FOREIGN key(idcarro) REFERENCES Carro(idcarro)
);

INSERT INTO motorista VALUES(22, 'José', 8888-0000, 45),
(29, 'Maria', 9999-0000, 33),
(31, 'Antônio', Null, 35),
(32, 'Carlos', 3333-9999, 16),
(58, 'Josefina', 3333-0000, 60),
(64, 'Marilda', 3333-1111, 26)

insert into carro VALUES(101, 'Onix', 'Vermelho'),
(102, 'Gol', 'Vermelho'),
(103, 'Civic', 'Verde'),
(104, 'Pálio', 'Azul')

insert into reservas values(22, 101, '2020-08-07'),
(22, 102, '2020-08-07'),
(22, 103, '2020-08-09'),
(22, 104, '2020-08-10'),
(31, 102, '2020-08-10'),
(31, 103, '2020-08-11'),
(64, 101, '2020-08-13')

SELECT M.NOME
FROM MOTORISTA M
WHERE M.IDMOTO IN
 (SELECT R.IDMOTO
 FROM RESERVAS R
 WHERE R.IDCARRO IN
 (SELECT C.IDCARRO
 FROM CARRO C
 WHERE C.COR = 'Vermelho'))

CREATE VIEW motoristas_vermelhos AS
SELECT M.NOME
FROM MOTORISTA M
WHERE M.IDMOTO IN
 (SELECT R.IDMOTO
 FROM RESERVAS R
 WHERE R.IDCARRO IN
 (SELECT C.IDCARRO
 FROM CARRO C
 WHERE C.COR = 'Vermelho'));

CREATE PROCEDURE get_motoristas_vermelhos()
BEGIN
SELECT M.NOME
FROM MOTORISTA M
WHERE M.IDMOTO IN
 (SELECT R.IDMOTO
 FROM RESERVAS R
 WHERE R.IDCARRO IN
 (SELECT C.IDCARRO
 FROM CARRO C
 WHERE C.COR = 'Vermelho'));
END;

CREATE INDEX idx_motoristas_vermelhos ON MOTORISTA (IDMOTO);