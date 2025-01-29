import { Grid2, Typography } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useEffect, useMemo, useRef } from 'react';
import OrderSummary from '../../app/shared/components/OrderSummary';
import { useAppSelector } from '../../app/store/store';
import { useFetchBasketQuery } from '../basket/basketApi';
import { useCreatePaymentIntentMutation } from './checkoutApi';
import CheckoutStepper from './CheckoutStepper';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function CheckoutPage() {
  const { data: basket } = useFetchBasketQuery();
  const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation();
  const created = useRef(false);
  const { darkMode } = useAppSelector((state) => state.ui);

  useEffect(() => {
    if (!created.current) createPaymentIntent();
    created.current = true;
  }, [createPaymentIntent]);

  const options: StripeElementsOptions | undefined = useMemo(() => {
    if (!basket?.clientSecret) return undefined;
    return {
      clientSecret: basket.clientSecret,
      appearance: {
        labels: 'floating',
        theme: darkMode ? 'night' : 'stripe',
      },
    };
  }, [basket?.clientSecret, darkMode]);

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={8}>
        {!stripePromise || !options || isLoading ? (
          <Typography variant="h6">Loading checkout...</Typography>
        ) : (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutStepper />
          </Elements>
        )}
      </Grid2>
      <Grid2 size={4}>
        <OrderSummary />
      </Grid2>
    </Grid2>
  );
}
