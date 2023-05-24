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
import { createRestaurants } from 'apiSdk/restaurants';
import { Error } from 'components/error';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { restaurantsValidationSchema } from 'validationSchema/restaurants';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { UsersInterface } from 'interfaces/users';
import { getUsers } from 'apiSdk/users';

function RestaurantsCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RestaurantsInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRestaurants(values);
      resetForm();
      router.push('/restaurants');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RestaurantsInterface>({
    initialValues: {
      name: '',
      address: '',
      operating_hours: '',
      owner_id: null,
      menu_categories: [],
      orders: [],
      reservations: [],
      staff: [],
    },
    validationSchema: restaurantsValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Restaurants
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="address" mb="4" isInvalid={!!formik.errors.address}>
            <FormLabel>Address</FormLabel>
            <Input type="text" name="address" value={formik.values.address} onChange={formik.handleChange} />
            {formik.errors.address && <FormErrorMessage>{formik.errors.address}</FormErrorMessage>}
          </FormControl>
          <FormControl id="operating_hours" mb="4" isInvalid={!!formik.errors.operating_hours}>
            <FormLabel>Operating Hours</FormLabel>
            <Input
              type="text"
              name="operating_hours"
              value={formik.values.operating_hours}
              onChange={formik.handleChange}
            />
            {formik.errors.operating_hours && <FormErrorMessage>{formik.errors.operating_hours}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UsersInterface>
            formik={formik}
            name={'owner_id'}
            label={'Owner'}
            placeholder={'Select Users'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record.id}
              </option>
            )}
          />

          <ArrayFormField
            values={formik.values.menu_categories}
            errors={formik.errors.menu_categories}
            setFieldValue={formik.setFieldValue}
            properties={[{ fieldName: 'name', label: 'name' }]}
            title={'Menu Categories'}
            name="menu_categories"
            rowInitialValues={{ name: '' }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'name' && (
                  <FormControl id="name" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
              </>
            )}
          />

          <ArrayFormField
            values={formik.values.orders}
            errors={formik.errors.orders}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'order_time', label: 'order_time' },
              { fieldName: 'pickup_or_delivery', label: 'pickup_or_delivery' },
              { fieldName: 'customer_id', label: 'users' },
            ]}
            title={'Orders'}
            name="orders"
            rowInitialValues={{
              order_time: new Date(new Date().toDateString()),
              pickup_or_delivery: '',
              customer_id: null,
            }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'order_time' && (
                  <FormControl id="order_time" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'pickup_or_delivery' && (
                  <FormControl id="pickup_or_delivery" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'customer_id' && (
                  <AsyncSelect<UsersInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select Users'}
                    fetcher={getUsers}
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

          <ArrayFormField
            values={formik.values.reservations}
            errors={formik.errors.reservations}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'reservation_time', label: 'reservation_time' },
              { fieldName: 'table_preferences', label: 'table_preferences' },
              { fieldName: 'customer_id', label: 'users' },
            ]}
            title={'Reservations'}
            name="reservations"
            rowInitialValues={{
              reservation_time: new Date(new Date().toDateString()),
              table_preferences: '',
              customer_id: null,
            }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'reservation_time' && (
                  <FormControl id="reservation_time" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'table_preferences' && (
                  <FormControl id="table_preferences" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'customer_id' && (
                  <AsyncSelect<UsersInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select Users'}
                    fetcher={getUsers}
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

          <ArrayFormField
            values={formik.values.staff}
            errors={formik.errors.staff}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'work_schedule', label: 'work_schedule' },
              { fieldName: 'user_id', label: 'users' },
            ]}
            title={'Staff'}
            name="staff"
            rowInitialValues={{ work_schedule: '', user_id: null }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'work_schedule' && (
                  <FormControl id="work_schedule" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'user_id' && (
                  <AsyncSelect<UsersInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select Users'}
                    fetcher={getUsers}
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

export default RestaurantsCreatePage;
