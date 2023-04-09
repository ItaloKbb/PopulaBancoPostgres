const hoaxer = require('hoaxer');
const { Client } = require('pg');
const cpfCheck = require('cpf-check');

// Configuração de conexão com o banco de dados
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1227',
  port: 5432,
});

async function run() {
  try {
    // Conexão com o banco de dados
    await client.connect();

    // Gerando dados de peças aleatórias
    const pecas = [];
    for (let i = 0; i < 1000; i++) {
      const peca = {
        cod_peca: i + 1, // considerando que os códigos começam em 1 e vão até 1000
        nome_peca: hoaxer.commerce.productName(),
        cor_peca: hoaxer.commerce.color(),
        peso_peca: hoaxer.random.number({ min: 1, max: 10, precision: 2 }), // peso entre 1 e 10 kg
      };
      pecas.push(peca);
    }

    // Gerando dados de fornecedores aleatórios
    const fornecedores = [];
    for (let i = 0; i < '1000'; i++) {
      const fornecedor = {
        cod_fornecedor: i + 1, // considerando que os códigos começam em 1 e vão até 50
        nome_fornecedor: hoaxer.company.companyName(),
        status_fornecedor: hoaxer.random.arrayElement(['T', 'F']),
      };
      fornecedores.push(fornecedor);
    }

    // Gerando dados de embarque aleatórios
    const embarques = [];
    for (let i = 0; i < 500; i++) {
      const embarque = {
        cod_peca: hoaxer.random.number({ min: 1, max: 1000 }),
        cod_fornecedor: hoaxer.random.number({ min: 1, max: 1000 }),
        quantidade_embarque: hoaxer.random.number({ min: 1, max: 200 }),
      };
      embarques.push(embarque);
    }

    // Inserindo peças no banco de dados
    let query = 'INSERT INTO PECA (CODPECA, NOMEPECA, CORPECA, PESOPECA) VALUES ($1, $2, $3, $4)';
    for (const peca of pecas) {
      const values = [peca.cod_peca, peca.nome_peca, peca.cor_peca, peca.peso_peca];
      const res = await client.query(query, values);
      console.log('Peça inserida com sucesso:', peca);
    }

    // Inserindo fornecedores no banco de dados
    const insertFornecedorQuery = 'INSERT INTO fornecedor (codfornecedor, nomefornecedor, statusfornecedor) VALUES ($1, $2, $3)';
    for (const fornecedor of fornecedores) {
      const values = [fornecedor.cod_fornecedor, fornecedor.nome_fornecedor, fornecedor.status_fornecedor];
      const res = await client.query(insertFornecedorQuery, values);
      console.log('Fornecedor inserido com sucesso:', fornecedor);
    }

    // Inserindo embarques no banco de dados
    const insertEmbarqueQuery = 'INSERT INTO embarque (codpeca, codfornecedor, quantidadeembarque) VALUES ($1, $2, $3)';
    for (const embarque of embarques) {
      const values = [embarque.cod_peca, embarque.cod_fornecedor, embarque.quantidade_embarque];
      const res = await client.query(insertEmbarqueQuery, values);
      console.log('Embarque inserido com sucesso:', embarque);
    }

    // Fechando conexão com o banco de dados
    await client.end();
  } catch (err) {
    console.error(err);
  }
}
run();