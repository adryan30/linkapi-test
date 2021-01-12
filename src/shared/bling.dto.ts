/** DTO para os pedidos que serão registrados no Bling */
export class PedidoBlingDto {
  pedido: PedidoBling;
}

/** Objeto de pedido Bling para a conversão em XML */
export class PedidoBling {
  cliente: Cliente;
  transporte?: Transporte;
  itens?: Itens;
  parcelas?: Parcela[];
  vlr_frete?: string;
  vlr_desconto?: string;
  obs?: string;
  obs_internas?: string;
}

/** Dados do usuário para cadastro no sistema Bling */
export class Cliente {
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

/** Informações sobre o transporte do pedido */
export class Transporte {
  transportadora?: string;
  tipo_frete?: string;
  servico_correios?: string;
  dados_etiqueta?: DadosEtiqueta;
  volumes?: Volume[];
}

/** Dados da etiqueta de transporte */
export class DadosEtiqueta {
  nome?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  municipio?: string;
  uf?: string;
  cep?: string;
  bairro?: string;
}

/** Dados sobre o serviço que transporta o pedido */
export class Volume {
  servico: string;
  codigoRastreamento?: string;
}

/** Lista de Itens incluídos no pedido */
export class Itens {
  item: Item[];
}

/** Detalhamento dos itens que serão includos no pedido */
export class Item {
  codigo?: number;
  descricao: string;
  un?: string;
  qtde: number;
  vlr_unit: number;
}

/** Dados sobre as Parcelas que devem ser pagas para o pedido */
export class Parcela {
  data?: string;
  vlr: string;
  obs?: string;
}
