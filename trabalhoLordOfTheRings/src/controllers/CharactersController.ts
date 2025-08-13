import { NextFunction, request, Request, response, Response } from 'express';
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

    // Listar todos os personagens
    // Método assíncrono que consulta todos os personagens no banco de dados e os retorna em formato JSON
    async listAll(req: Request, res: Response): Promise<Response> {
        // Realiza a consulta no banco de dados para pegar todos os registros da tabela 'Character'
        const [rows] = await connection.query('SELECT * FROM characters');
        // Retorna os dados encontrados com status HTTP 200 (OK)
        return res.status(200).json(rows);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { nome, tipo, raca, arma, statues } = req.body;
        if (!nome || !tipo || !raca || !arma || !statues || tipo != "Sociedade" && tipo != "Nazgûl" && tipo != "Balrog" && raca != 'Hobbit' && raca != 'Elfo' && raca != 'Humano' && raca != 'Orc' && raca != 'Anão' && status != 'vivo' && status != 'ferido' && statues != 'morto') {
            return res.status(400).json({ mensage: 'Informação invalida' })
        }
        await connection.query('INSERT INTO characters (nome,tipo,raca,arma,statues) VALUES (?,?,?,?,?)', [nome, tipo, raca, arma, statues])
        return res.status(201).json({ mensagem: "Personagem criado com sucesso" })

    }
    async update(req:Request, res:Response):Promise<Response>{
        const {id} = req.params;
        const {nome,tipo,raca,arma,statues} = req.body;
        if(!nome || !tipo || !raca || !arma || !statues){
            return res.status(400).json({mensagem: 'Informações insuficientes'});
        }
        await connection.query('UPDATE characters SET nome = ? ,tipo = ?, raca = ?,arma = ?, statues =? WHERE id = ?' ,[nome,tipo,raca,arma,statues,id]);
        return res.status(200).json({mensagem: 'Personagem atualizado com sucesso'});

    }

async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [result]: any = await connection.query('DELETE FROM Characters WHERE id = ?', [id]);

    // O campo 'affectedRows' no resultado da consulta indica quantas linhas foram afetadas pela operação de DELETE
    // Se 'affectedRows' for 0, significa que nenhum personagem foi deletado, ou seja, o ID não existe na tabela
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Personagem não encontrado.' });
    }
    return res.status(204).send();
  }
}
