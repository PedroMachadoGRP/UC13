import { Request, Response } from "express"
import { Produtos, produtos } from "../models/Produtos"

export class ProdutosController {

    createProdutos(req: Request, res: Response): Response {
        const { id, nome, quantidade } = req.body;

        if (!id || !nome || !quantidade) {
            return res.status(400).json({ mensagem: "Id, nome, quantidade precisam ser informados!" });
        }

        const produto = new Produtos(id, nome, quantidade);
        produtos.push(produto);

        return res.status(201).json({ mensagem: "Produto criado com sucesso!", produto: produto });

    }

    listAllProdutoss(req: Request, res: Response): Response {
        return res.status(200).json({ produtos: produtos });
    }

    updateProdutos(req: Request, res: Response): Response {
        const id: number = Number(req.params.id);
        const { nome, quantidade } = req.body;

        if (!nome || !quantidade) {
            return res.status(400).json({ mensagem: "Nome e quantidade são obrigatórios!" })
        }

        let produto = produtos.find(produtos => produtos.id === id);

        if (!produto) return res.status(404).json({ mensagem: "Produto não encontrado!" })

        produto.nome = nome;
        produto.quantidade = quantidade;

        return res.status(200).json({ mensagem: "Produto atualizado com sucesso!", Produto_atualizado: produto })
    }

    deleteProdutos(req: Request, res: Response): Response {
        const id: number = Number(req.params.id);

        let index = produtos.findIndex(produto => produto.id === id);

        if (index === -1) {
            return res.status(404).json({ mensagem: "Produto não encontrado" })
        }

        produtos.splice(index, 1);
        return res.status(204).send();
    }
}