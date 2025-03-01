import express from 'express'
import { cepValidation } from '../models/cepValidation'

const router = express.Router()

router.get('/lojas', cepValidation)

export default router