export interface LandDetails {
  land_details_id: number;
  parcel_number: string;
  date_acquired: string;
  land_description: string;
  price: number;
  owner_name: string;
  previous_owner?: string;
  national_id: string;
  address: string;
  date_sold?: string;
  date_purchased?: string;
  location_name: string;
  latitude: string;
  longitude: string;
}


export interface FormData { 
  parcel_number: string; 
  seller: string; 
  buyer: string; 
  lawyer: string; 
  // date_created: string;
  contract_duration: number; 
  date_created: string;
  agreed_amount: number; 
  installment_schedule: number; 
  penalties_interest_rate: number;
  down_payment: number; 
  buyer_agreed: string; 
  seller_agreed: string; 
  terms_and_conditions: string; 
  transaction_count: number; 
  remaining_amount: number; 
  total_amount_made: number;
  agreement_hash: string; 
  previous_hash: string; 
  transactions_history: string;
}



export interface UserProfile {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
  role: string;
  permissions: string[];
}

export interface User{
  phone_number: string;
  role: string;
  password:string;
}