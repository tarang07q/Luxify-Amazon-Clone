import { apiSlice } from '../apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
        credentials: 'include', // Include cookies in the request
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
        credentials: 'include', // Include cookies in the request
      }),
    }),
    registerAdmin: builder.mutation({
      query: (adminData) => ({
        url: '/auth/register-admin',
        method: 'POST',
        body: adminData,
        credentials: 'include', // Include cookies in the request
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      }),
      // Force a cache invalidation to ensure we don't use cached data after logout
      invalidatesTags: ['User'],
    }),
    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: '/auth/profile',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/auth/change-password',
        method: 'PUT',
        body: passwordData,
      }),
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: '/auth/delete-account',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    verifyAdmin: builder.query({
      query: () => '/auth/verify-admin',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRegisterAdminMutation,
  useLogoutMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useVerifyAdminQuery,
} = authApiSlice;
