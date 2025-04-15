import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

interface MelhorEnvioFrete {
  name: string;
  price: string;
}

@Injectable()
export class MelhorEnvioService {
  async calcularFrete(cepOrigem: string, cepDestino: string): Promise<string> {
    try {
      const response: AxiosResponse<MelhorEnvioFrete[]> = await axios.post(
        'https://www.melhorenvio.com.br/api/v2/me/shipment/calculate',
        [
          {
            from: { postal_code: cepOrigem },
            to: { postal_code: cepDestino },
            package: {
              height: 20,
              width: 20,
              length: 20,
              weight: 1,
            },
          },
        ],
        {
          headers: {
            Authorization: `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.data || response.data.length === 0) {
        throw new HttpException(
          'Não foi possível calcular o frete. Nenhuma opção retornada.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const frete = response.data[0];
      return `R$ ${Number(frete.price).toFixed(2)} (frete via ${frete.name})`;
    } catch (error) {
      console.error('Erro ao calcular frete com Melhor Envio:', error);
      throw new HttpException(
        'Erro ao calcular frete com Melhor Envio.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
