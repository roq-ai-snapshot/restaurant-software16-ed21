import { Order_itemsInterface } from 'interfaces/order_items';

export interface OrdersInterface {
  id?: string;
  customer_id: string;
  restaurant_id: string;
  order_time: Date;
  pickup_or_delivery: string;
  order_items?: Order_itemsInterface[];
}
