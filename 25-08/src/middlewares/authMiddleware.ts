import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

// Middleware para proteger rotas que exigem autenticação
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Pega o header de autorização da requisição
  const authHeader = req.headers.authorization

  // Se não houver header ou ele não começar com "Bearer ", retorna erro 401 (não autorizado)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' })
  }

  // Extrai o token do header (remove o "Bearer " antes)
  const token = authHeader.split(' ')[1]

  // Verifica se o token é válido chamando a função verifyToken
  // Retorna o payload decodificado se válido, ou null se inválido/expirado
  const decoded = verifyToken(token)

  // Se o token for inválido, retorna erro 401
  if (!decoded) {
    return res.status(401).json({ message: 'Token inválido' })
  }

  // Armazena o payload decodificado no req para que outros middlewares ou controllers possam acessar
  // Ex.: req.user terá id e email do usuário logado
  // o tipo Request não tem a propriedade .user definida
  //Se tentarmos fazer req.user = ..., o typescript vai reclamar
  //para "enganar" o typescript, usamos um type assertion (as any).
  //Type Assertion força o compilador a tratar um valor como se fosse de outro tipo
  //Isso diz "confie em mim", trate req como any (se, checagem de tipo)
  //em '.user', estamos criando então uma nova prorpiedade chamada 'user' dentro do objeto 'req'
  //decoded é o payload qye saiu do verifyToken(token) na linha 19
  //req.user pode ser usado mais tarde para:
  // -Para saber quem está logado. Exemplo : /me retorna os dados do usuario logado usnadom req.user.id.
  //-Verificar permissões. Exemplo: só um usuario com role: 'admin' pode acessar certas rotas : if(req.user !== 'admin') return res.status (403).json(...)
  //para associar recursos ao usuario logado. Exemplod criar um post automaticamente ligado ao req.user.id. Não precisa mandar userId no body.
  (req as any).user = decoded

  // Chama o próximo middleware ou controller
  next()
}
