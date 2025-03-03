import dotenv from "dotenv"
dotenv.config()

import express from "express"
import router from "./routes/searchShops"
import { startDB } from "./models/startDB"
import { insertData } from "./models/insertData"

const app = express()

app.use(express.json())
app.use("/busca", router)

const PORT = process.env.PORT || 3000


const startApp = async () => {
    try {
      await startDB()
      await insertData()

      app.listen(PORT, ()=> console.log(`Servidor funcionando na porta ${PORT}`))

    } catch (error) {
      console.error('Erro ao iniciar o servidor:', error)
    }
  }
  
startApp()
