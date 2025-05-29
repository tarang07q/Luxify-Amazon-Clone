import { apiSlice } from '../apiSlice';

export const analyticsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: (params = {}) => ({
        url: '/analytics',
        params
      }),
      providesTags: ['Analytics'],
    }),
    getDashboardStats: builder.query({
      query: () => '/analytics/dashboard',
      providesTags: ['Analytics'],
    }),
    getRevenueChart: builder.query({
      query: (params = {}) => ({
        url: '/analytics/revenue',
        params
      }),
      providesTags: ['Analytics'],
    }),
    getOrdersChart: builder.query({
      query: (params = {}) => ({
        url: '/analytics/orders',
        params
      }),
      providesTags: ['Analytics'],
    }),
    getTopProducts: builder.query({
      query: (params = {}) => ({
        url: '/analytics/top-products',
        params
      }),
      providesTags: ['Analytics'],
    }),
    getTopCategories: builder.query({
      query: (params = {}) => ({
        url: '/analytics/top-categories',
        params
      }),
      providesTags: ['Analytics'],
    }),
    getUserAnalytics: builder.query({
      query: (params = {}) => ({
        url: '/analytics/users',
        params
      }),
      providesTags: ['Analytics'],
    }),
    getSalesReport: builder.query({
      query: (params = {}) => ({
        url: '/analytics/sales-report',
        params
      }),
      providesTags: ['Analytics'],
    }),
  }),
});

export const {
  useGetAnalyticsQuery,
  useGetDashboardStatsQuery,
  useGetRevenueChartQuery,
  useGetOrdersChartQuery,
  useGetTopProductsQuery,
  useGetTopCategoriesQuery,
  useGetUserAnalyticsQuery,
  useGetSalesReportQuery,
} = analyticsApiSlice;
