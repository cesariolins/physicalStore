import express from 'express'
import { cepValidation } from '../models/cepValidation'

const router = express.Router()

router.get('/lojas', (req, res, next) => {
    cepValidation(req, res).catch(next);
  })

export default router