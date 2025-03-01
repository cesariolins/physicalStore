import dotenv from "dotenv"
dotenv.config()
import express from "express"
import router from "./routes/routes"

const app = express()

app.use(express.json());
app.use('/busca', router);

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`Servidor funcionando na porta ${PORT}`))

app.use(router)