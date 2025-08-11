export class Produtos{
    public id:number;
    public nome:string;
    public quantidade:number;



	constructor(id: number, nome: string, quantidade: number) {
		this.id = id;
		this.nome = nome;
		this.quantidade = quantidade;
	}

}

export let produtos:Produtos[] = [];