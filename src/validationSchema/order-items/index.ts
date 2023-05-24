import * as yup from 'yup';

export const OrderItemsValidationSchema = yup.object().shape({
  quantity: yup.number().integer().required(),
  special_requests: yup.string(),
  order_id: yup.string().nullable().required(),
  menu_item_id: yup.string().nullable().required(),
});
