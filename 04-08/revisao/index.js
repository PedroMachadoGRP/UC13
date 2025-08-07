"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pessoa_1 = require("./Pessoa");
//Variaveis
var nome = "junior";
var idade = 69;
var estudante = true;
//Arrays
var listaDeCompras = ['Litio', 'Uranio 238', 'Césio 137', 'Plutonio'];
var notas = [18, 36, 69, 99, 100];
/*for (let i = 0; i < listaDeCompras.length; i++) {
    console.log(listaDeCompras[i]);
}
*/
//Objetos
var aluno = {
    nome: "Pedro",
    idade: 18,
    disciplina: ["Ogivas nucleares", "Trancendencia material", "Capitalismo"]
};
function mensagem() {
    console.log("Ola, gostaria de explodir a republica brasileira?");
}
function frase(nome) {
    return "Ola ".concat(nome, " gostaria de trancender a mat\u00E9ria?");
}
function fraseOpcional(nome) {
    console.log("Ola " + (nome || "Mundo!"));
}
function calcularValor(valor, desconto) {
    if (desconto === void 0) { desconto = 5; }
    console.log(valor - desconto);
}
var fulano = new Pessoa_1.Pessoa('Junior', 69);
console.log(fulano.getName);
