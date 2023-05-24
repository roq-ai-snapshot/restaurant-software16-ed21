import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getOrdersById, updateOrdersById } from 'apiSdk/orders';
import { Error } from 'components/error';
import { ordersValidationSchema } from 'validationSchema/orders';
import { OrdersInterface } from 'interfaces/orders';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';
import { order_itemsValidationSchema } from 'validationSchema/order_items';

function OrdersEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<OrdersInterface>(id, getOrdersById);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: OrdersInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateOrdersById(id, values);
      mutate(updated);
      resetForm();
      router.push('/orders');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<OrdersInterface>({
    initialValues: data,
    validationSchema: ordersValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Orders
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="order_time" mb="4">
              <FormLabel>Order Time</FormLabel>
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values.order_time}
                onChange={(value: Date) => formik.setFieldValue('order_time', value)}
              />
            </FormControl>
            <FormControl id="pickup_or_delivery" mb="4" isInvalid={!!formik.errors.pickup_or_delivery}>
              <FormLabel>Pickup or Delivery</FormLabel>
              <Input
                type="text"
                name="pickup_or_delivery"
                value={formik.values.pickup_or_delivery}
                onChange={formik.handleChange}
              />
              {formik.errors.pickup_or_delivery && (
                <FormErrorMessage>{formik.errors.pickup_or_delivery}</FormErrorMessage>
              )}
            </FormControl>
            <AsyncSelect<UsersInterface>
              formik={formik}
              name={'customer_id'}
              label={'Customer'}
              placeholder={'Select Users'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <AsyncSelect<RestaurantsInterface>
              formik={formik}
              name={'restaurant_id'}
              label={'Restaurant'}
              placeholder={'Select Restaurants'}
              fetcher={getRestaurants}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default OrdersEditPage;
