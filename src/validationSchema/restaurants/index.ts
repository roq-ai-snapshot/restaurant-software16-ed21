import * as yup from 'yup';
import { menu_categoriesValidationSchema } from 'validationSchema/menu_categories';
import { ordersValidationSchema } from 'validationSchema/orders';
import { reservationsValidationSchema } from 'validationSchema/reservations';
import { staffValidationSchema } from 'validationSchema/staff';

export const RestaurantsValidationSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  operating_hours: yup.string().required(),
  owner_id: yup.string().nullable().required(),
  menu_categories: yup.array().of(menu_categoriesValidationSchema),
  orders: yup.array().of(ordersValidationSchema),
  reservations: yup.array().of(reservationsValidationSchema),
  staff: yup.array().of(staffValidationSchema),
});
