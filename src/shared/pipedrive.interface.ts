export interface PipedriveResponse {
  success: boolean;
  data: Deals[];
  additional_data: {
    pagination: {
      start: number;
      limit: number;
      more_items_in_collection: boolean;
    };
  };
  related_objects: {
    user: {
      [id: string]: CreatorUserID;
    };
    person: {
      [id: string]: PersonID;
    };
  };
}

export interface Deals {
  id: number;
  creator_user_id: CreatorUserID;
  user_id: CreatorUserID;
  person_id: PersonID;
  org_id: number;
  stage_id: number;
  title: string;
  value: number;
  currency: string;
  add_time: Date;
  update_time: Date;
  stage_change_time: Date;
  active: boolean;
  deleted: boolean;
  status: string;
  probability: number;
  next_activity_date: Date;
  next_activity_time: Date;
  next_activity_id: Date;
  last_activity_id: Date;
  last_activity_date: Date;
  lost_reason: string;
  visible_to: string;
  close_time: Date;
  pipeline_id: number;
  won_time: Date;
  first_won_time: Date;
  lost_time: null;
  products_count: number;
  files_count: number;
  notes_count: number;
  followers_count: number;
  email_messages_count: number;
  activities_count: number;
  done_activities_count: number;
  undone_activities_count: number;
  participants_count: number;
  expected_close_date: Date;
  last_incoming_mail_time: Date;
  last_outgoing_mail_time: Date;
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
  rotten_time: null;
  owner_name: string;
  cc_email: string;
  org_hidden: boolean;
  person_hidden: boolean;
}

export interface CreatorUserID {
  id: number;
  name: string;
  email: string;
  has_pic: number;
  pic_hash: string;
  active_flag: boolean;
  value?: number;
}

export interface PersonID {
  active_flag: boolean;
  name: string;
  email: Contact[];
  phone: Contact[];
  value?: number;
  id?: number;
}

export interface Contact {
  value: string;
  primary: boolean;
}
