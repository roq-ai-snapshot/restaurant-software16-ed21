import * as yup from 'yup';

export const ReservationsValidationSchema = yup.object().shape({
  reservation_time: yup.date().required(),
  table_preferences: yup.string(),
  customer_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
});
