import * as yup from 'yup';
import { ordersValidationSchema } from 'validationSchema/orders';
import { reservationsValidationSchema } from 'validationSchema/reservations';
import { restaurantsValidationSchema } from 'validationSchema/restaurants';
import { staffValidationSchema } from 'validationSchema/staff';

export const UsersValidationSchema = yup.object().shape({
  role: yup.string().required(),
  contact_information: yup.string().required(),
  orders: yup.array().of(ordersValidationSchema),
  reservations: yup.array().of(reservationsValidationSchema),
  restaurants: yup.array().of(restaurantsValidationSchema),
  staff: yup.array().of(staffValidationSchema),
});
