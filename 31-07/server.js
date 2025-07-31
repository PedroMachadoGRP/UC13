//Biblioteca usda para criar servidores com Node
const express = require('express');

//Biblioteca que permite interações com o banco
const mysql = require('mysql2');

//Permite entender que o servidor entenda o formato JSON
const bodyParser = require('body-parser');
const { error } = require('console');


//Crio o objeto  Express, que me permite acessar método para configurar meu servidor
const app = express();

//Configura o servidor para aceitar dados no formato JSON
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost', //Endereço do servidor de banco de dados
    port: 3306, // Porta que ele usa
    user: 'root', //Usuario
    password: 'root', //Senha
    database: 'meu_backend' //Nome do banco de dados

});


//O método connect (que é da biblioteca mysql2) tenta se conectar ao banco
//Se erro não for nulo, não faz a conexão
//recebe como argumento uma função de callback - ou seja uma função que será executada depois que o banco de dados responder.
connection.connect(error => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados: ' + error.stack);
    }

    console.log('Conectado ao banco de dados com ID ' + connection.threadId);
});

//Rotas

//Cria uma roga http POST para cadastrar um novo usuario no banco de dados
//app é a nossa aplicação Express
// .post() define que essa rota aceita apenas requisições HTTP do tipo POST
// '/usuarios' é o caminho da URL
// (req,res) => {...} é a função de callback que será executada quando essa rota é chamada
//req (request): objeto que contém todas as informações da requisição feita pelo cliente.
//res (response): objeto usada para enviar uma resposta ao cliente

app.post('/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    connection.query(sql, [nome, email, senha], (error) => {
        if (error) return res.status(500).send('Erro ao adicionar usuário: ' + error.message);
        res.status(201).send('Usuário adicionado com sucesso.');
    });
});

app.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM usuarios', (error, results) => {
        if (error) return res.status(500).send('Erro ao obter usuários.');
        res.json(results);
    });
});

//Rota para obter informações de um UNICO usuário

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, results) => {
        if (error) return res.status(500).send('Erro ao obter o usuário: ' + error.message);
        res.json(results);
    });
});


app.put('/usuarios',(req,res) => {
    const {id , nome, email, senha} = req.body
    const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? where id = ? VALUES (?,?,?,?)';
    connection.query(sql, [nome,email,senha,id], (error) => {
        if(error) return res.status(500).send('Erro ao alterar o usuario');
        res.json(results);
    })
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

