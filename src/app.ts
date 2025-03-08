import dotenv from "dotenv"
dotenv.config()

import express from "express"
import router from "./routes/routerShops"
import { startDB } from "./models/startDB"
import logger from "./logger"

const app = express()

app.use(express.json())
app.use("/busca", router)

const PORT = process.env.PORT || 3000


const startApp = async () => {
    try {
      await startDB()

      app.listen(PORT, ()=> logger.info(`Servidor rodando na porta ${PORT}`))

    } catch (error) {
      logger.error(`Erro ao processar a solicitação: ${error}`)
    }
  }
  
startApp()
