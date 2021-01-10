export interface PedidoBling {
  pedido: {
    cliente: Cliente;
    transporte?: Transporte;
    itens?: {
      item: Item[];
    };
    parcelas?: Parcela[];
    vlr_frete?: string;
    vlr_desconto?: string;
    obs?: string;
    obs_internas?: string;
  };
}

export interface Cliente {
  nome: string;
  tipoPessoa?: string;
  endereco?: string;
  cpf_cnpj?: string;
  ie?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  uf?: string;
  fone?: string;
  email?: string;
}

export interface Item {
  codigo?: number;
  descricao: string;
  un?: string;
  qtde: number;
  vlr_unit: number;
}

export interface Parcela {
  data?: string;
  vlr: string;
  obs?: string;
}

export interface Transporte {
  transportadora?: string;
  tipo_frete?: string;
  servico_correios?: string;
  dados_etiqueta?: DadosEtiqueta;
  volumes?: Volume[];
}

export interface DadosEtiqueta {
  nome?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  municipio?: string;
  uf?: string;
  cep?: string;
  bairro?: string;
}

export interface Volume {
  servico: string;
  codigoRastreamento?: string;
}
