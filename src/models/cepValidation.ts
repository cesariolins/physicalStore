import axios from "axios"
import { getCoordinates } from "./getCoordinates"

export const cepValidation = async (cep:string) => {

      try {
        
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const data = response.data
    
        if (data.erro) {
          throw new Error('CEP não encontrado')
        }
    
        const address = `${data.logradouro}, ${data.localidade}, ${data.uf}`
        
        const { latitude, longitude } = await getCoordinates(address)
    } catch (error) {
        throw new Error('Erro ao captar latitude e longitude.')
    }
}