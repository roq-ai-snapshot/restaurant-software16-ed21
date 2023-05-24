import * as yup from 'yup';
import { order_itemsValidationSchema } from 'validationSchema/order_items';

export const OrdersValidationSchema = yup.object().shape({
  order_time: yup.date().required(),
  pickup_or_delivery: yup.string().required(),
  customer_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
  order_items: yup.array().of(order_itemsValidationSchema),
});
