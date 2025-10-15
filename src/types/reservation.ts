export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  partySize: number;
  note: string;
}

export interface ReservationFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  partySize?: string;
  note?: string;
}