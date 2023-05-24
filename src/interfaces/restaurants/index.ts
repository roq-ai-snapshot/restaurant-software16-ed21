import { Menu_categoriesInterface } from 'interfaces/menu_categories';
import { OrdersInterface } from 'interfaces/orders';
import { ReservationsInterface } from 'interfaces/reservations';
import { StaffInterface } from 'interfaces/staff';

export interface RestaurantsInterface {
  id?: string;
  name: string;
  address: string;
  operating_hours: string;
  owner_id: string;
  menu_categories?: Menu_categoriesInterface[];
  orders?: OrdersInterface[];
  reservations?: ReservationsInterface[];
  staff?: StaffInterface[];
}
