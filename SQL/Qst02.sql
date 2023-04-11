/*Questão 02*/
CREATE TABLE IF NOT EXISTS categoria_cliente
(
    cod_categoria_cliente integer NOT NULL,
    nom_categoria_cliente character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT categoria_cliente_pkey PRIMARY KEY (cod_categoria_cliente)
);
SELECT * FROM categoria_cliente;
--DELETE FROM categoria_cliente;

CREATE TABLE IF NOT EXISTS cliente
(
    cod_cliente integer NOT NULL,
    nom_cliente character varying(255) COLLATE pg_catalog."default" NOT NULL,
    num_cpf_cnpj character varying(255) COLLATE pg_catalog."default",
    num_celular character varying(255),
	des_endereco character varying(255),
	cod_categoria_cliente integer not null,
    CONSTRAINT cliente_pkey PRIMARY KEY (cod_cliente),
	CONSTRAINT fk_categoria_cliente FOREIGN KEY (cod_categoria_cliente) 
	REFERENCES categoria_cliente (cod_categoria_cliente)
);
SELECT * FROM cliente;

CREATE TABLE IF NOT EXISTS tipo_conta
(
    cod_tipo_conta integer NOT NULL,
    des_tipo_conta character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tipo_conta_pkey PRIMARY KEY (cod_tipo_conta)
);
SELECT * FROM tipo_conta;

CREATE TABLE IF NOT EXISTS agencia
(
    num_agencia integer NOT NULL,
    nom_agencia character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT agencia_pkey PRIMARY KEY (num_agencia)
);
SELECT * FROM agencia;

CREATE TABLE IF NOT EXISTS conta
(
    num_conta integer NOT NULL,
    val_saldo numeric(15,2) DEFAULT 0.0,
	cod_tipo_conta integer NOT NULL,
	cod_cliente integer NOT NULL,
	num_agencia integer NOT NULL,
	CONSTRAINT conta_pkey PRIMARY KEY (num_conta),
	CONSTRAINT fk_tipo_conta FOREIGN KEY (cod_tipo_conta) 
	REFERENCES tipo_conta (cod_tipo_conta),
	CONSTRAINT fk_cliente FOREIGN KEY (cod_cliente) 
	REFERENCES cliente (cod_cliente),
	CONSTRAINT fk_agencia FOREIGN KEY (num_agencia) 
	REFERENCES agencia (num_agencia)
);
SELECT * FROM conta;

CREATE TABLE IF NOT EXISTS tipo_movimentacao
(
    cod_tipo_movimentacao integer NOT NULL,
    des_tipo_movimentacao character varying(255) COLLATE pg_catalog."default" NOT NULL,
    val_taxa numeric(15,2),
	ind_debito_credito char,
	CONSTRAINT tipo_movimentacao_pkey PRIMARY KEY (cod_tipo_movimentacao)
);
SELECT * FROM tipo_movimentacao;

CREATE TABLE IF NOT EXISTS historico_movimentacao
(
	cod_historico_movimentacao integer NOT NULL,
	num_conta integer NOT NULL,
    cod_tipo_movimentacao integer NOT NULL,
    val_movimentacao numeric(15,2),
	dta_movimentacao timestamp,
	CONSTRAINT historico_movimentacao_pkey PRIMARY KEY (cod_historico_movimentacao),
	CONSTRAINT fk_conta FOREIGN KEY (num_conta) 
	REFERENCES conta (num_conta),
	CONSTRAINT fk_tipo_movimentacao FOREIGN KEY (cod_tipo_movimentacao) 
	REFERENCES tipo_movimentacao (cod_tipo_movimentacao)
);
SELECT * FROM historico_movimentacao;

SELECT CL.cod_cliente, AVG(HM.val_movimentacao)
FROM CLIENTE CL INNER JOIN CONTA CO ON CL.cod_cliente = CO.cod_cliente
INNER JOIN historico_movimentacao HM ON CO.num_conta = HM.num_conta
GROUP BY CL.cod_cliente, CL.cod_cliente
ORDER BY AVG(HM.val_movimentacao) DESC

CREATE VIEW cliente_avg_movimentacao AS
SELECT CL.cod_cliente, AVG(HM.val_movimentacao) AS avg_movimentacao
FROM CLIENTE CL 
INNER JOIN CONTA CO ON CL.cod_cliente = CO.cod_cliente
INNER JOIN historico_movimentacao HM ON CO.num_conta = HM.num_conta
GROUP BY CL.cod_cliente
ORDER BY avg_movimentacao DESC;

CREATE OR REPLACE PROCEDURE cliente_avg_movimentacao_proc(
  OUT cod_cliente integer, 
  OUT avg_movimentacao numeric
)
AS $$
BEGIN
  SELECT cod_cliente, avg_movimentacao 
  INTO cod_cliente, avg_movimentacao 
  FROM cliente_avg_movimentacao;
END;
$$ LANGUAGE plpgsql;

CALL cliente_avg_movimentacao_proc();

CREATE INDEX cliente_idx ON CLIENTE (cod_cliente);
CREATE INDEX conta_idx ON CONTA (cod_cliente, num_conta);
CREATE INDEX historico_movimentacao_idx ON historico_movimentacao (num_conta, val_movimentacao);






