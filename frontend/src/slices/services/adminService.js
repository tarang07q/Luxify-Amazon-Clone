import { apiSlice } from '../apiSlice';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => ({
        url: '/admin/users',
        method: 'POST',
        body: userData,
      }),
    }),
    // We will add other admin endpoints here later (e.g., list users, get user, update user, delete user)
  }),
});

export const {
  useCreateUserMutation,
} = adminApiSlice; 