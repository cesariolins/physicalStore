const express = require("express")

const server = express()

const PORT = 3000

server.listen(PORT, ()=> console.log(`Servidor funcionando na porta ${PORT}`))

server.get('/', (req, res) => {
    res.send("testando api")
    let cep = "55818545"
    let url = `https://viacep.com.br/ws/${cep}/json/`
    fetch(url).then(function(res) {
        res.json().then(function(data) {
            console.log(data)
        })
    })
})