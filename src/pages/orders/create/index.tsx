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
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createOrders } from 'apiSdk/orders';
import { Error } from 'components/error';
import { OrdersInterface } from 'interfaces/orders';
import { ordersValidationSchema } from 'validationSchema/orders';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { getMenu_items } from 'apiSdk/menu_items';
import { Menu_itemsInterface } from 'interfaces/menu_items';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';

function OrdersCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: OrdersInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createOrders(values);
      resetForm();
      router.push('/orders');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<OrdersInterface>({
    initialValues: {
      order_time: new Date(new Date().toDateString()),
      pickup_or_delivery: '',
      customer_id: null,
      restaurant_id: null,
      order_items: [],
    },
    validationSchema: ordersValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Orders
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
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

          <ArrayFormField
            values={formik.values.order_items}
            errors={formik.errors.order_items}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'quantity', label: 'quantity' },
              { fieldName: 'special_requests', label: 'special_requests' },
              { fieldName: 'menu_item_id', label: 'menu_items' },
            ]}
            title={'Order Items'}
            name="order_items"
            rowInitialValues={{ quantity: 0, special_requests: '', menu_item_id: null }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'quantity' && (
                  <FormControl id="quantity" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <NumberInput
                      name={name}
                      value={value}
                      onChange={(valueString, valueNumber) =>
                        formik.setFieldValue(name, Number.isNaN(valueNumber) ? 0 : valueNumber)
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'special_requests' && (
                  <FormControl id="special_requests" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'menu_item_id' && (
                  <AsyncSelect<Menu_itemsInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select Menu_items'}
                    fetcher={getMenu_items}
                    renderOption={(record) => (
                      <option key={record.id} value={record.id}>
                        {record.id}
                      </option>
                    )}
                  />
                )}
              </>
            )}
          />

          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default OrdersCreatePage;
