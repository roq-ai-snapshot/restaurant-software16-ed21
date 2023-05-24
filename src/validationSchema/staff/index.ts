import * as yup from 'yup';

export const StaffValidationSchema = yup.object().shape({
  work_schedule: yup.string().required(),
  user_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
});
