interface ViaCepResponse {
    erro?: boolean;
    cep: string;
    logradouro?: string;
    complemento?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
}
export declare class CepValidationService {
    validateCep(cep: string): Promise<ViaCepResponse>;
}
export {};
