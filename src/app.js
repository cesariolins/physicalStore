const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const router = require("./routes/routes")

const app = express()

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`Servidor funcionando na porta ${PORT}`))

app.use(router)