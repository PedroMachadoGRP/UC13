import express, { Application} from "express";
import router from "./routes/CharactersRoutes";

const app:Application = express()
const PORT = 3000;



app.use(express.json());
app.use(router)






app.listen(PORT,() =>{
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    
})