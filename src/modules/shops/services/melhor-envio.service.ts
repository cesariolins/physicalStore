import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosResponse, AxiosError } from 'axios';

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
            products: {
              id: '1',
              height: 20,
              width: 20,
              length: 20,
              weight: 1,
            },
            services: ['1', '2'],
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
      const err = error as AxiosError;
      console.error('Erro ao calcular frete com Melhor Envio:');
      console.error('Status:', err.response?.status);
      console.error('Data:', JSON.stringify(err.response?.data, null, 2));
      console.error('Mensagem:', err.message);

      throw new HttpException(
        'Erro ao calcular frete com Melhor Envio.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
