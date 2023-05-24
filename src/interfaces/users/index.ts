import { OrdersInterface } from 'interfaces/orders';
import { ReservationsInterface } from 'interfaces/reservations';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { StaffInterface } from 'interfaces/staff';

export interface UsersInterface {
  id?: string;
  role: string;
  contact_information: string;
  orders?: OrdersInterface[];
  reservations?: ReservationsInterface[];
  restaurants?: RestaurantsInterface[];
  staff?: StaffInterface[];
}
