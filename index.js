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

function getRandomDateTime(start, end) {
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  const randomTime = startDate + Math.random() * (endDate - startDate);
  return new Date(randomTime);
}

async function runEX1() {
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

async function runEX2() {
  try {
    // Conexão com o banco de dados
    await client.connect();

    // Gerando dados de categoria_cliente aleatórios
    const categoria_clientes = [];
    for (let i = 0; i < 1000; i++) {
      const categoria_cliente = {
        cod_categoria_cliente: i + 1, // considerando que os códigos começam em 1 e vão até 1000
        nom_categoria_cliente: hoaxer.commerce.productName(),
      };
      categoria_clientes.push(categoria_cliente);
    }
    // Inserindo categoria_cliente no banco de dados
    const insertCategoriaclientesQuery = 'INSERT INTO categoria_cliente (cod_categoria_cliente, nom_categoria_cliente) VALUES ($1, $2)';
    for (const categoria_cliente of categoria_clientes) {
      const values = [categoria_cliente.cod_categoria_cliente, categoria_cliente.nom_categoria_cliente];
      const res = await client.query(insertCategoriaclientesQuery, values);
      console.log('categoria_cliente inserido com sucesso:', categoria_cliente);
    }

    // Gerando dados de clientes aleatórios
    const clientes = [];
    for (let i = 0; i < 1000; i++) {
      const cliente = {
        cod_cliente: i + 1, // considerando que os códigos começam em 1 e vão até 1000
        nome_cliente: hoaxer.commerce.productName(),
        cpf_cnpj: hoaxer.name.findName(),
        num_celular: hoaxer.random.number({ min: 100000, max: 200000, precision: 2 }),
        descricao_endereco: hoaxer.address.city(),
        cod_categoria_cliente: i + 1
      };
      clientes.push(cliente);
    }

    // Inserindo clientes no banco de dados
    const insertclientesQuery = 'INSERT INTO cliente (cod_cliente, nom_cliente, num_cpf_cnpj, num_celular, des_endereco, cod_categoria_cliente) VALUES ($1, $2, $3, $4, $5, $6)';
    for (const cliente of clientes) {
      const values = [cliente.cod_cliente, cliente.nome_cliente, cliente.cpf_cnpj, cliente.num_celular, cliente.des_endereco, cliente.cod_categoria_cliente];
      const res = await client.query(insertclientesQuery, values);
      console.log('clientes inserido com sucesso:', cliente);
    }

    // Gerando dados de tipo_conta aleatórios
    const tipo_contas = [];
    for (let i = 0; i < 1000; i++) {
      const tipo_conta = {
        cod_tipo_conta: i + 1, // considerando que os códigos começam em 1 e vão até 1000
        des_tipo_conta: hoaxer.commerce.productName(),
      };
      tipo_contas.push(tipo_conta);
    }

    // Inserindo clientes no banco de dados
    const insertTipoContaQuery = 'INSERT INTO tipo_conta (cod_tipo_conta, des_tipo_conta) VALUES ($1, $2)';
    for (const tipo_conta of tipo_contas) {
      const values = [tipo_conta.cod_tipo_conta, tipo_conta.des_tipo_conta];
      const res = await client.query(insertTipoContaQuery, values);
      console.log('tipo_conta inserido com sucesso:', tipo_conta);
    }

    // Gerando dados de tipo_conta aleatórios
    const agencias = [];
    for (let i = 0; i < 1000; i++) {
      const agencia = {
        num_agencia: i + 1, // considerando que os códigos começam em 1 e vão até 1000
        nom_agencia: hoaxer.company.companyName(),
      };
      agencias.push(agencia);
    }

    // Inserindo clientes no banco de dados
    const insertAgenciaQuery = 'INSERT INTO agencia (num_agencia, nom_agencia) VALUES ($1, $2)';
    for (const agencia of agencias) {
      const values = [agencia.num_agencia, agencia.nom_agencia];
      const res = await client.query(insertAgenciaQuery, values);
      console.log('agencia inserido com sucesso:', agencia);
    }

    // Gerando dados de contas aleatórios
    const contas = [];
    for (let i = 0; i < 1000; i++) {
      const conta = {
        num_conta: i + 1, // considerando que os códigos começam em 1 e vão até 1000
        val_saldo: hoaxer.random.number({ min: 1, max: 5000 }),
        cod_tipo_conta: i + 1,
        cod_cliente: i + 1,
        num_agencia: i + 1
      };
      contas.push(conta);
    }

    // Inserindo contas no banco de dados
    const insertContaQuery = 'INSERT INTO conta (num_conta, val_saldo, cod_tipo_conta, cod_cliente, num_agencia) VALUES ($1, $2, $3, $4, $5)';
    for (const conta of contas) {
      const values = [conta.num_conta, conta.val_saldo, conta.cod_tipo_conta, conta.cod_cliente, conta.num_agencia];
      const res = await client.query(insertContaQuery, values);
      console.log('conta inserida com sucesso:', conta);
    }

    // Gerando dados de tipo_conta aleatórios
    const tipo_movimentacoes = [];
    for (let i = 0; i < 1000; i++) {
      const tipo_movimentacao = {
        cod_tipo_movimentacao: i + 1, // considerando que os códigos começam em 1 e vão até 1000
        des_tipo_movimentacao: hoaxer.company.companyName(),
        val_taxa: hoaxer.random.number({ min: 1, max: 5000 }),
        ind_debito_credito: hoaxer.random.arrayElement(['T', 'F'])
      };
      tipo_movimentacoes.push(tipo_movimentacao);
    }

    // Inserindo clientes no banco de dados
    const insertTipoMovimentoQuery = 'INSERT INTO tipo_movimentacao (cod_tipo_movimentacao, des_tipo_movimentacao, val_taxa, ind_debito_credito) VALUES ($1, $2, $3, $4)';
    for (const tipo_movimentacao of tipo_movimentacoes) {
      const values = [tipo_movimentacao.cod_tipo_movimentacao, tipo_movimentacao.des_tipo_movimentacao, tipo_movimentacao.val_taxa, tipo_movimentacao.ind_debito_credito];
      const res = await client.query(insertTipoMovimentoQuery, values);
      console.log('tipo_movimentacao inserido com sucesso:', tipo_movimentacao);
    }

    // Gerando dados de tipo_conta aleatórios
    const historico_movimentacoes = [];
    for (let i = 0; i < 1000; i++) {
      const historico_movimentacao = {
        cod_historico_movimentacao: i + 1, // considerando que os códigos começam em 1 e vão até 1000
        num_conta: i + 1,
        cod_tipo_movimentacao: i + 1,
        val_movimentacao: hoaxer.random.number({ min: 1, max: 5000 }),
        dta_movimentacao: '2001-09-28 01:00'
      };
      historico_movimentacoes.push(historico_movimentacao);
    }   
    
    // Inserindo clientes no banco de dados
    const insertHistoricoQuery = 'INSERT INTO historico_movimentacao (cod_historico_movimentacao, num_conta, cod_tipo_movimentacao, val_movimentacao, dta_movimentacao) VALUES ($1, $2, $3, $4, $5)';
    for (const historico_movimentacao of historico_movimentacoes) {
      const values = [historico_movimentacao.cod_historico_movimentacao, historico_movimentacao.num_conta, historico_movimentacao.cod_tipo_movimentacao, historico_movimentacao.val_movimentacao, historico_movimentacao.dta_movimentacao];
      const res = await client.query(insertHistoricoQuery, values);
      console.log('historico_movimentacao inserido com sucesso:', historico_movimentacao);
    }

    // Fechando conexão com o banco de dados
    await client.end();

  } catch (err) {
    console.error(err);
  }
}
//runEX1();
runEX2();