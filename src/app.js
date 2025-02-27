const dotenv = require("dotenv")
dotenv.config()

const express = require("express")

const app = express()

const PORT = 3000

app.listen(PORT, ()=> console.log(`Servidor funcionando na porta ${PORT}`))

app.get("/index", )