import axios from "axios"
import { getCoordinates } from "./getCoordinates"

export const getDistance = async (originCep: string, destinationCep: string) => {

    try {
      const originCoordinates = await getCoordinates(originCep)
      const destinationCoordinates = await getCoordinates(destinationCep)
  
      const origin = `${originCoordinates.latitude},${originCoordinates.longitude}`
      const destination = `${destinationCoordinates.latitude},${destinationCoordinates.longitude}`
  
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyCqiADoLKOS1GawgoLrgTtBKByDuXq7sCU`

      const response = await axios.get(url)
      const data = response.data
  
      if (data.routes.length > 0) {
        const route = data.routes[0]
        const distance = route.legs[0].distance.value
        return distance
      } else {
        console.log('Nenhuma rota encontrada.')
      }
    } catch (error) {
        console.error('Erro ao obter direções:', error)
      }
    }
    