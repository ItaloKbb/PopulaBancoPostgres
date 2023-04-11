/*Questão 01*/
CREATE TABLE IF NOT EXISTS fornecedor
(
    codfornecedor integer NOT NULL,
    nomefornecedor character varying(100) COLLATE pg_catalog."default" NOT NULL,
    statusfornecedor character(1) COLLATE pg_catalog."default" DEFAULT 'T'::"char",
    CONSTRAINT fornecedor_pkey PRIMARY KEY (codfornecedor)
);
SELECT * FROM FORNECEDOR;

CREATE TABLE IF NOT EXISTS peca
(
    codpeca integer NOT NULL,
    nomepeca character varying(255) COLLATE pg_catalog."default" NOT NULL,
    corpeca character varying(255) COLLATE pg_catalog."default",
    pesopeca numeric,
    CONSTRAINT peca_pkey PRIMARY KEY (codpeca)
);
SELECT * FROM PECA;

CREATE TABLE IF NOT EXISTS embarque
(
    codpeca integer NOT NULL,
    codfornecedor integer NOT NULL,
    quantidadeembarque bigint,
    CONSTRAINT fk_codfornecedor FOREIGN KEY (codfornecedor)
        REFERENCES fornecedor (codfornecedor) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_codpeca FOREIGN KEY (codpeca)
        REFERENCES peca (codpeca) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
SELECT * FROM embarque;

--DELETE FROM embarque;
--DELETE FROM FORNECEDOR;
--DELETE FROM PECA;

CREATE VIEW view_peca AS
SELECT P.CodPeca, P.NomePeca
FROM Peca P JOIN Embarque E 
ON P.CodPeca = E.codpeca AND E.QuantidadeEmbarque > 100;

SELECT * FROM view_peca;

--------------------------------

CREATE OR REPLACE PROCEDURE procedure_peca()
LANGUAGE plpgsql
AS $$
DECLARE
    result CURSOR FOR SELECT * FROM view_peca;
    row record;
BEGIN
    OPEN result;
    FETCH NEXT FROM result INTO row;
    IF FOUND THEN
        RAISE NOTICE 'CodPeça: %, NomePeça: %', row.CodPeca, row.NomePeca;
    END IF;
    CLOSE result;
END;
$$;

CALL procedure_peca();

------------------------------------

CREATE INDEX CodPeca_index ON Peca(CodPeca);