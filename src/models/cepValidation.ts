import { Request, Response } from "express";
import axios from "axios"
import { getCoordinates } from "./getCoordinates"

export const cepValidation = async (req: Request, res: Response) => {
    const cep = req.query.cep as string
    
    if (!cep) {
        return res.status(400).json({ message: 'CEP é obrigatório' })
      }

      try {
        
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const data = response.data
    
        if (data.erro) {
          return res.status(404).json({ message: 'CEP não encontrado' })
        }
    
        const address = `${data.logradouro}, ${data.localidade}, ${data.uf}`
        
        const { latitude, longitude } = await getCoordinates(address)
    } catch (error) {
        throw new Error('Erro ao captar latitude e longitude.')
    }
}