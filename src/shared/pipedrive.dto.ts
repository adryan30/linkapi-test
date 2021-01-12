/** Resposta base da API do Pipedrive */
class PipedriveResponse {
  success: boolean;
  additional_data: AdditionalData;
}

/** Resposta específica para o endpoint de "Negócios" */
export class DealsResponse extends PipedriveResponse {
  data: Deals[];
  related_objects: RelatedObjects;
}

/** Resposta Específica para o endpoint de "Produtos de Negócios" */
export class DealProductsResponse extends PipedriveResponse {
  data: DealProducts[];
}

/** Objecto representando o "negócio" do Pipedrive */
export class Deals {
  id: number;
  creator_user_id: CreatorUserID;
  user_id: CreatorUserID;
  person_id: PersonID;
  org_id: number;
  stage_id: number;
  title: string;
  value: number;
  currency: string;
  add_time: string;
  update_time: string;
  stage_change_time: string;
  active: boolean;
  deleted: boolean;
  status: string;
  probability: number;
  next_activity_date: string;
  next_activity_time: string;
  next_activity_id: string;
  last_activity_id: string;
  last_activity_date: string;
  lost_reason: string;
  visible_to: string;
  close_time: string;
  pipeline_id: number;
  won_time: string;
  first_won_time: string;
  lost_time: string;
  products_count: number;
  files_count: number;
  notes_count: number;
  followers_count: number;
  email_messages_count: number;
  activities_count: number;
  done_activities_count: number;
  undone_activities_count: number;
  participants_count: number;
  expected_close_date: string;
  last_incoming_mail_time: string;
  last_outgoing_mail_time: string;
  label: string;
  stage_order_nr: number;
  person_name: string;
  org_name: string;
  next_activity_subject: string;
  next_activity_type: string;
  next_activity_duration: string;
  next_activity_note: string;
  formatted_value: string;
  weighted_value: number;
  formatted_weighted_value: string;
  weighted_value_currency: string;
  rotten_time: string;
  owner_name: string;
  cc_email: string;
  org_hidden: boolean;
  person_hidden: boolean;
}

/** Classe para representar objetos relacionados com o négocio */
export class RelatedObjects {
  user: {
    [id: string]: CreatorUserID;
  };
  person: {
    [id: string]: PersonID;
  };
}

/** Objeto que representa os produtos registrados no "negócio" do Pipedrive */
export class DealProducts {
  id: number;
  deal_id: number;
  order_nr: number;
  product_id: number;
  product_variation_id: number;
  item_price: number;
  discount_percentage: number;
  duration: number;
  duration_unit: string;
  sum_no_discount: number;
  sum: number;
  currency: string;
  enabled_flag: boolean;
  add_time: string;
  last_edit: string;
  comments: string;
  active_flag: boolean;
  tax: number;
  name: string;
  sum_formatted: string;
  quantity_formatted: string;
  quantity: number;
}

/** Objeto para a representação do criador de um negócio */
export class CreatorUserID {
  id: number;
  name: string;
  email: string;
  has_pic: number;
  pic_hash: string;
  active_flag: boolean;
  value?: number;
}

/** Informações do cliente do Pipedrive */
export class PersonID {
  active_flag: boolean;
  name: string;
  email: Contact[];
  phone: Contact[];
  value?: number;
  id?: number;
}

/** Objeto para representar informações de contato */
export class Contact {
  value: string;
  primary: boolean;
}

/** Objeto para informações adicionais de requisições como Paginação */
export class AdditionalData {
  products_quantity_total?: number;
  products_sum_total?: number;
  variations_enabled?: boolean;
  products_quantity_total_formatted?: string;
  products_sum_total_formatted?: string;
  pagination: Pagination;
}

/** Objeto de paginação da API Pipedrive */
export class Pagination {
  start: number;
  limit: number;
  more_items_in_collection: boolean;
}
