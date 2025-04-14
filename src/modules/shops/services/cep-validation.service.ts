import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

interface ViaCepResponse {
  erro?: boolean;
  cep: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
}

@Injectable()
export class CepValidationService {
  async validateCep(cep: string): Promise<ViaCepResponse> {
    try {
      const response = await axios.get<ViaCepResponse>(
        `https://viacep.com.br/ws/${cep}/json/`,
      );
      if (response.data.erro) {
        throw new HttpException('CEP inválido', HttpStatus.NOT_FOUND);
      }
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erro ao validar CEP',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
