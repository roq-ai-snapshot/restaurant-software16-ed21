import * as yup from 'yup';
import { menu_itemsValidationSchema } from 'validationSchema/menu_items';

export const MenuCategoriesValidationSchema = yup.object().shape({
  name: yup.string().required(),
  restaurant_id: yup.string().nullable().required(),
  menu_items: yup.array().of(menu_itemsValidationSchema),
});
