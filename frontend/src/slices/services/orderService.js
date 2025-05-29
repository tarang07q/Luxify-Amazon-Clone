import { apiSlice } from '../apiSlice';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order'],
    }),
    getOrderDetails: builder.query({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: ['Order'],
    }),
    getMyOrders: builder.query({
      query: () => '/orders/my-orders',
      providesTags: ['Order'],
    }),
    getAllOrders: builder.query({
      query: () => '/orders',
      providesTags: ['Order'],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Order'],
    }),
    updateOrderPayment: builder.mutation({
      query: ({ orderId, paymentResult }) => ({
        url: `/orders/${orderId}/pay`,
        method: 'PUT',
        body: { paymentResult },
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useUpdateOrderPaymentMutation,
} = orderApiSlice;

// Export with the expected name for compatibility
export const useGetOrderByIdQuery = useGetOrderDetailsQuery;
