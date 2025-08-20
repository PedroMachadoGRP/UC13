import express,{ NextFunction, request, Request, Response } from 'express';
import { connection } from '../config/database';



export class CharacterController {
    async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [rows]: any = await connection.query('SELECT * FROM characters WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Personagem não encontrado.' });
    }
    return res.status(200).json(rows[0]);
  }



  async create(req: Request, res: Response): Promise<Response> {

    const { nome, tipo, raca, arma, statues } = req.body;

    if (tipo === "Nazgûl") {
      console.log("Frodo sente o Um Anel querendo retornar ao seu Mestre...");
    }

    if (!nome || !tipo || !raca || !arma || !statues) {

      return res.status(400).json({ mensagem: "Informações insuficientes" });
    }

    await connection.query(
      "INSERT INTO characters (nome, tipo, raca, arma, statues) VALUES (?, ?, ?, ?, ?)",
      [nome, tipo, raca, arma, statues] 
    );

    return res.status(201).json({ mensagem: "Personagem criado com sucesso" });
  }

  // Listar todos os personagens
  // Método assíncrono que consulta todos os personagens no banco de dados e os retorna em formato JSON
  async listAll(req: Request, res: Response): Promise<Response> {

    const [rows] = await connection.query('SELECT * FROM characters');

    return res.status(200).json(rows);
  }


  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; 

    const [rows]: any = await connection.query(
      "SELECT tipo FROM characters WHERE id = ?",
      [id]
    );

    if (rows.length > 0 && rows[0].tipo === "Nazgûl") {
      console.log("Frodo sente o Um Anel querendo retornar ao seu Mestre...");
    }

    const [result]: any = await connection.query(
      "DELETE FROM characters WHERE id = ?",
      [id]
    );
    // O result.affectedRows mostra quantas linhas foram afetadas pela operação
    // Se for 0, significa que nenhum personagem com esse ID foi encontrado
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Personagem não encontrado." });
    }
    // Se a exclusão foi feita com sucesso, retorna status 204 (sem conteúdo)
    return res.status(204).send();
  }

  // Método responsável por atualizar um personagem existente
  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; // Extrai o ID da URL
    const { nome, tipo, raca, arma, statues } = req.body; // Extrai os dados enviados no corpo
    // Mensagem especial se o personagem for um Nazgûl
    if (tipo === "Nazgûl") {
      console.log("Frodo sente o Um Anel querendo retornar ao seu Mestre...");
    }
    // Verifica se todos os campos foram preenchidos
    if (!nome || !tipo || !raca || !arma || !statues) {
      return res.status(400).json({ mensagem: "Informações insuficientes" });
    }
    // Executa a atualização no banco de dados
    const [result]: any = await connection.query(
      "UPDATE characters SET nome = ?, tipo = ?, raca = ?, arma = ?, statues = ? WHERE id = ?",
      [nome, tipo, raca, arma, statues, id]
    );
    // Verifica se algum registro foi realmente atualizado
    // Se affectedRows for 0, significa que o ID não existe
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Personagem não encontrado." });
    }
    // Retorna mensagem de sucesso com status 200
    return res
      .status(200)
      .json({ mensagem: "Personagem atualizado com sucesso" });
  }
}
