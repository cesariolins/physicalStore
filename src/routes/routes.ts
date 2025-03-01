import express from 'express'
import { cepValidation } from '../models/cepValidation'
// import axios from 'axios'
// import { db } from '../services/db'
// import { getCoordinates } from '../models/getCoordinates'

const router = express.Router()

router.get('/lojas', cepValidation)


// router.get('/lojas', async (req: Request, res: Response) => {
//     const cep = req.query.cep as string

//     if (!cep) {
//         return res.status(400).json({ message: 'CEP é obrigatório' });
//       }
    
//       try {
        
//         const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
//         const data = response.data;
    
//         if (data.erro) {
//           return res.status(404).json({ message: 'CEP não encontrado' });
//         }
    
//         const address = `${data.logradouro}, ${data.localidade}, ${data.uf}`;
    
        
//         const { latitude, longitude } = await getCoordinates(address);
    
        
//         const query = `
//           SELECT *
//           FROM (
//             SELECT *,
//             (6371 * acos(
//               cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +
//               sin(radians(?)) * sin(radians(latitude))
//             )) AS distance
//             FROM lojas
//           ) AS subquery
//           WHERE distance <= 100
//           ORDER BY distance ASC;
//         `;
    
//         db.all(query, [latitude, longitude, latitude], (err, rows: any[]) => {
//           if (err) {
//             console.error(err);
//             return res.status(500).json({ message: 'Erro ao consultar o banco de dados' });
//           }
    
//           if (!rows || rows.length === 0) {
//             return res.status(404).json({ message: 'Nenhuma loja encontrada no raio de 100 km' });
//           }
    
//           res.json(rows);
//         });
//       } catch (error: any) {
//         console.error(error);
//         res.status(500).json({ message: 'Erro ao processar a requisição', error: error.message });
//       }
// })

export default router