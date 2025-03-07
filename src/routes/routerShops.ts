import express from 'express'
import { cepValidation } from '../models/cepValidation'
import { searchShops } from '../models/searchShops'
import logger from '../logger'

const router = express.Router()

router.get('/lojas', async (req, res, next) => {
  const cep = req.query.cep as string;

  if (!cep) {
    logger.warn('CEP não fornecido na solicitação')
    res.status(400).json({ message: 'CEP é obrigatório' })
    return
  }

  try {
    logger.info(`Validando CEP: ${cep}`)
    await cepValidation(cep)

    logger.info(`Buscando lojas próximas ao CEP: ${cep}`)
    const shops = await searchShops(cep)

    res.status(200).json(shops)
    return

  } catch (error: any) {
    logger.error(`Erro ao processar a solicitação: ${error.message}`)
    next(error)
    res.status(404).json({ message: error.message })
    return
  }
})

export default router