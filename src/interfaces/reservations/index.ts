export interface ReservationsInterface {
  id?: string;
  customer_id: string;
  restaurant_id: string;
  reservation_time: Date;
  table_preferences?: string;
}
