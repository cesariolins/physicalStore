import express from "express"


const router = express.Router()

router.get('/', (req, res) => {
    res.send('App para buscar lojas da shopcez!')
})

router.get('/findcep/:cep', (req, res) => {
    
})

export default router