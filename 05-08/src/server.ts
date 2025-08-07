import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();  // Tipando 'app' como 'Application'

//Define a porta 3000 para o servidor
const PORT: number = 3000;  // Tipagem da porta como número

// Middleware para permitir que o Express interprete JSON
app.use(express.json());


app.get('/saudacao' ,(req:Request, res:Response): Response =>{
    return res.send('Ola jovem programador')
})


const porteiroMiddleware = (req: Request, res: Response, next:NextFunction) =>{
    console.log(`📢 Requisição recebida em: ${req.url}`);
    
    next();
};

app.use(porteiroMiddleware);

app.use((req: Request, res: Response): Response => {
  
    // Retorna uma resposta com status HTTP 404 (Não Encontrado)
    // E envia um JSON com a mensagem personalizada
    return res.status(404).json({ mensagem: 'Rota não encontrada!' });
  });


// Iniciando o servidor
app.listen(PORT, (): void => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});
