import { Pessoa } from "./Pessoa";

//Variaveis
let nome:string = "junior";
let idade:number = 69;
let estudante:boolean = true;

//Arrays

let listaDeCompras:string[] = ['Litio','Uranio 238','Césio 137','Plutonio']
let notas:Array<number> = [18,36,69,99,100];



/*for (let i = 0; i < listaDeCompras.length; i++) {
    console.log(listaDeCompras[i]);
}
*/

//Objetos

let aluno: {nome:string,idade:number, disciplina:string[]} = {
    nome: "Pedro",
    idade: 18,
    disciplina: ["Ogivas nucleares","Trancendencia material","Capitalismo"]
}

function mensagem():void{
    console.log("Ola, gostaria de explodir a republica brasileira?");
    
}

function frase(nome:string):string{
    return `Ola ${nome} gostaria de trancender a matéria?`
}

function fraseOpcional(nome?:string):void{
    console.log("Ola " + (nome || "Mundo!"));
    
}

function calcularValor(valor:number,desconto:number = 5):void{
    console.log(valor - desconto);
    
}


const fulano:Pessoa = new Pessoa('Junior',69);

console.log(fulano.getName);
