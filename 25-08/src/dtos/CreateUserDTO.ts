// src/dtos/CreateUserDTO.ts
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {
    //Valida se o campo está vazio
  @IsNotEmpty({ message: "O nome é obrigatório" })
  //Valida se segue o padrão regex que indica que o nome deve conter apenas letras, espaços e acentos
  @Matches(/^[A-Za-zÀ-ÿ\s]+$/, { message: "Nome deve conter apenas letras e espaços" })
  // Valida se tem, no maximo, 50 caracteres            
  @MaxLength(50, { message: "Nome deve ter no máximo 50 caracteres" })
  name: string;

  @IsEmail({}, { message: "E-mail inválido" })
  @MaxLength(100, { message: "E-mail deve ter no máximo 100 caracteres" })
  email: string;

  @MinLength(6, { message: "Senha deve ter no mínimo 6 caracteres" })
  @Matches(/(?=.*[a-z])/, { message: "Senha deve conter pelo menos uma letra minúscula" })
  @Matches(/(?=.*[A-Z])/, { message: "Senha deve conter pelo menos uma letra maiúscula" })
  @Matches(/(?=.*\d)/, { message: "Senha deve conter pelo menos um número" })
  @Matches(/(?=.*[@$!%*?&])/, { message: "Senha deve conter pelo menos um caractere especial (@$!%*?&)" })
  password: string;
}
