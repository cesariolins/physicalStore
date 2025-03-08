import axios from "axios"
import { getCoordinates } from "./getCoordinates"
import logger from "../logger"

export const cepValidation = async (cep:string) => {

      try {
        
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const data = response.data
    
        if (data.erro) {
          logger.error(`CEP não encontrado.`)
        }
       
        const address = `${data.cep}`

        
        const { latitude, longitude } = await getCoordinates(address)
    } catch (error) {
      logger.error(`Erro ao capturar latitude e longitude: ${error}`)
    }
}