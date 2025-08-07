import express, { Application, Request, Response } from 'express';

const app: Application = express();  // Tipando 'app' como 'Application'

//Define a porta 3000 para o servidor
const PORT: number = 3000;  // Tipagem da porta como número

// Middleware para permitir que o Express interprete JSON
app.use(express.json());

// Rota GET para a raiz
app.get('/', (req: Request, res: Response): void => {
  res.send('🚀 Servidor TypeScript rodando!');
});

// Iniciando o servidor
app.listen(PORT, (): void => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});


app.get('/meunome',(req:Request, res:Response):void => {
    res.send("Olá, meu nome é Fundencio!");
});