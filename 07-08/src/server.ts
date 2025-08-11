import express, { Application, Response, Request, NextFunction } from "express";

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());



//Midware para sempre que chamar uma rota registra o horario da requisição
app.use((req: Request, res: Response, next: NextFunction) => {
  //Objeto que retorna o horario que a requisição foi feita
  let date = new Date();
  console.log("Requisição feita em: " + date);

  next();
});



//Rota para mostrar em um JSON as informações da pessoa
app.get("/sobre", (req: Request, res: Response): Response => {
  //Retorna um JSON com as informações da pessoa
  return res
    .status(200)
    .json({ nome: "Pão", idade: 71, descricao: "pitaia é bom" });
});

//Rota para enviar uma mensagem para o servidor
app.post("/comentarios", (req: Request, res: Response): Response => {
  //Variavel para receber o comentario do body
  const { comentario } = req.body;

  //Condicional para verificar se o campo do body foi preenchido e retorno de status 400
  if (!comentario)
    return res.status(400).json({ mensagem: "Comentario não preenchido" });

  //Retorna a mensagem digitada no body
  return res.status(201).json({ mensagem: `${comentario}` });
});

//Rota para deletar a informação com o id
app.delete("/informacao/:id", (req: Request, res: Response) => {
  //Variavel para armazenar o parametro do id
  const { id } = req.params;

  //condicional para garantir que o usuario coloque um id valido
  if (!id) return res.status(400).json({ mensagem: "id Não encontrado" });

  //retorno de mesagem caso a informação seja deletada com sucesso
  return res.status(204).json({ mensagem: "Informação deletada com sucesso" });
});

// Iniciando o servidor
app.listen(PORT, (): void => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});
