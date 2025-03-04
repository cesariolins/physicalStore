import express from 'express'
import { cepValidation } from '../models/cepValidation'
import { searchShops } from '../models/searchShops'

const router = express.Router()

router.get('/lojas', async (req, res, next) => {
  const cep = req.query.cep as string;

  if (!cep) {
    res.status(400).json({ message: 'CEP é obrigatório' });
    return
  }

  try {
    await cepValidation(cep)

    const shops = await searchShops(cep)

    res.status(200).json(shops)
    return

  } catch (error: any) {
    next(error)
    res.status(404).json({ message: error.message })
    return
  }
})

export default router