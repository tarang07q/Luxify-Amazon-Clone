import { apiSlice } from '../apiSlice';

export const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => '/wishlist',
      providesTags: ['Wishlist'],
    }),
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: '/wishlist/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Wishlist'],
    }),
    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist/remove/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
    }),
    clearWishlist: builder.mutation({
      query: () => ({
        url: '/wishlist/clear',
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
    }),
    updateWishlistSettings: builder.mutation({
      query: (data) => ({
        url: '/wishlist/settings',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Wishlist'],
    }),
    checkProductInWishlist: builder.query({
      query: (productId) => `/wishlist/check/${productId}`,
      providesTags: ['Wishlist'],
    }),
    moveToCart: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/wishlist/move-to-cart/${productId}`,
        method: 'POST',
        body: { quantity },
      }),
      invalidatesTags: ['Wishlist', 'Cart'],
    }),
    getPublicWishlist: builder.query({
      query: (userId) => `/wishlist/public/${userId}`,
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
  useUpdateWishlistSettingsMutation,
  useCheckProductInWishlistQuery,
  useMoveToCartMutation,
  useGetPublicWishlistQuery,
} = wishlistApiSlice;
