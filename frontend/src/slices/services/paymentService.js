import { apiSlice } from '../apiSlice';

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (paymentData) => ({
        url: '/payments/create-intent',
        method: 'POST',
        body: paymentData,
      }),
    }),
    confirmPayment: builder.mutation({
      query: (confirmData) => ({
        url: '/payments/confirm',
        method: 'POST',
        body: confirmData,
      }),
    }),
    getPaymentMethods: builder.query({
      query: () => '/payments/methods',
      providesTags: ['PaymentMethods'],
    }),
    processRefund: builder.mutation({
      query: (refundData) => ({
        url: '/payments/refund',
        method: 'POST',
        body: refundData,
      }),
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useConfirmPaymentMutation,
  useGetPaymentMethodsQuery,
  useProcessRefundMutation,
} = paymentApiSlice;
