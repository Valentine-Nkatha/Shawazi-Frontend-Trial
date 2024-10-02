// export interface LandDetails {
//   land_details_id: number;
//   parcel_number: string;
//   date_acquired: string;
//   land_description: string;
//   price: number;
//   owner_name: string;
//   previous_owner?: string;
//   national_id: string;
//   address: string;
//   date_sold?: string;
//   date_purchased?: string;
//   location_name: string;
//   latitude: string;
//   longitude: string;
// }


// export interface Term {
//   id: string | number; 
//   text: string;        
// }

// export interface FormData { 
//   agreement_id:number
//   parcel_number: string; 
//   seller: string; 
//   buyer: string; 
//   lawyer: string; 
//   contract_duration: number; 
//   date_created: string;
//   agreed_amount: number; 
//   installment_schedule: number; 
//   penalties_interest_rate: number;
//   down_payment: number; 
//   buyer_agreed: string; 
//   seller_agreed: string; 
//   terms_and_conditions: string; 
//   transaction_count: number; 
//   remaining_amount: number; 
//   total_amount_made: number;
//   agreement_hash: string; 
//   previous_hash: string; 
//   transactions_history: string;
//   terms?: Term[]; 
// }



// export interface UserProfile {
//   id: number;
//   phone_number: string;
//   first_name: string;
//   last_name: string;
//   is_active: boolean;
//   date_joined: string;
//   role: string;
//   permissions: string[];
//   }


// export interface User{
//   phone_number: string;
//   role: string;
//   password:string;
// }


// export interface UserLogin {
//   phone_number: string;
//   password: string;
// }

// export interface UserData {
//   first_name: string;
//   last_name: string;
//   phone_number: string;
//   password: string;
//   confirm_password: string;
//   role: string;
// }

// export interface ResetPasswordData {
//   email: string;
//   newPassword: string;
//   confirmPassword: string;
// }


// export interface Agreement {
//   agreement_id: string;
//   parcel_number: string;
//   agreed_amount: number;
//   buyer: { username: string };
//   seller: { username: string };
//   buyer_agreed: boolean;
//   seller_agreed: boolean;
//   date_created: string;
//   lawyer: string; 
//   contract_duration: string;
//   installment_schedule: string;
//   penalties_interest_rate: number;
// }


// export interface ContractReviewPopupProps {
//   onClose: () => void;
//   onAgreementUpdate: () => void;
//   agreement: Agreement; // Change this to Agreement
//   userRole: string;
// }

// src/app/utils/types.tsx

// Define the LandDetails interface
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

// Define the Term interface
export interface Term {
  id: string | number; 
  text: string;        
}

// Updated FormData interface
export interface FormData { 
  agreement_id: number;
  parcel_number: string; 
  seller: { username: string }; // Changed to an object
  buyer: { username: string }; // Changed to an object
  lawyer: string; 
  contract_duration: number; 
  date_created: string;
  agreed_amount: number; 
  installment_schedule: number; 
  penalties_interest_rate: number;
  down_payment: number; 
  buyer_agreed: boolean; // Changed to boolean
  seller_agreed: boolean; // Changed to boolean
  terms_and_conditions: string; 
  transaction_count: number; 
  remaining_amount: number; 
  total_amount_made: number;
  agreement_hash: string; 
  previous_hash: string; 
  transactions_history: string;
  terms?: Term[]; 
}

// Updated Agreement interface
export interface Agreement extends Omit<FormData, 'buyer_agreed' | 'seller_agreed'> {
  seller_agreed: boolean; 
  buyer_agreed: boolean; 
}

// Define the UserProfile interface
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

// Define the User interface
export interface User {
  phone_number: string;
  role: string;
  password: string;
}

// Define the UserLogin interface
export interface UserLogin {
  phone_number: string;
  password: string;
}

// Define the UserData interface
export interface UserData {
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  role: string;
}

// Define the ResetPasswordData interface
export interface ResetPasswordData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

// Define the UserRole interface
export interface UserRole {
  userRole: "buyer" | "seller" | "lawyer";
}

// Popup props interface
export interface ContractReviewPopupProps {
  onClose: () => void;
  onSubmit: (response: { buyer_agreed?: boolean; seller_agreed?: boolean }) => Promise<void>;
  agreement: Agreement; // Use the Agreement interface here
  userRole: "buyer" | "seller" | "lawyer"; // Directly passing userRole instead of nested params
}



// src/app/utils/types.tsx

export interface Term {
  id: string | number; 
  text: string;        
}

// Updated FormData interface
export interface FormData { 
  agreement_id: number;
  parcel_number: string; 
  seller: { username: string }; // Seller as an object with a username
  buyer: { username: string }; // Buyer as an object with a username
  lawyer: string; 
  contract_duration: number; 
  date_created: string;
  agreed_amount: number; 
  installment_schedule: number; 
  penalties_interest_rate: number;
  down_payment: number; 
  buyer_agreed: boolean; // Changed to boolean
  seller_agreed: boolean; // Changed to boolean
  remaining_amount: number; 
  total_amount_made: number;
  agreement_hash: string; 
  previous_hash: string; 
  transactions_history: string;
  terms?: Term[]; 
}

// Updated Agreement interface
export interface Agreement extends Omit<FormData, 'buyer_agreed' | 'seller_agreed'> {
  seller_agreed: boolean; 
  buyer_agreed: boolean; 
}

// Popup props interface
export interface ContractReviewPopupProps {
  onClose: () => void;
  onSubmit: (response: { buyer_agreed?: boolean; seller_agreed?: boolean }) => Promise<void>;
  agreement: Agreement; // Use the Agreement interface here
  userRole: "buyer" | "seller" | "lawyer"; // Directly passing userRole
  onAgreementUpdate: () => void; // Added to the props
}

// User and profile interfaces
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

export interface User {
  phone_number: string;
  role: string;
  password: string;
}

export interface UserLogin {
  phone_number: string;
  password: string;
}

export interface UserData {
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  role: string;
}

export interface ResetPasswordData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserRole {
  userRole: "buyer" | "seller" | "lawyer";
}



// Assuming you have already defined UserRole elsewhere
export interface ContractReviewPopupProps {
  params: {
    userRole: "buyer" | "seller" | "lawyer";
  };
  onClose: () => void;
  onSubmit: (response: { buyer_agreed?: boolean; seller_agreed?: boolean }) => Promise<void>;
  agreement: Agreement; // Use the Agreement interface here
}
