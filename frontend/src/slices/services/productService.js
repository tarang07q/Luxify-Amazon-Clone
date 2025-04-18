import { apiSlice } from '../apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword = '', pageNumber = '', category = '', sort = '' }) => ({
        url: '/products',
        params: { q: keyword, page: pageNumber, category, sort },
      }),
      providesTags: ['Product'],
      transformResponse: (response) => {
        return {
          data: response.data || [],
          pages: Math.ceil(response.count / 10) || 1,
          page: 1,
          count: response.count || 0
        };
      },
    }),
    getProductDetails: builder.query({
      query: (productId) => `/products/${productId}`,
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: '/products',
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, productData }) => ({
        url: `/products/${productId}`,
        method: 'PUT',
        body: productData,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    uploadProductImage: builder.mutation({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
        formData: true,
      }),
    }),
    createReview: builder.mutation({
      query: ({ productId, reviewData }) => ({
        url: `/reviews/${productId}`,
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: ['Product', 'Review'],
    }),
    getProductReviews: builder.query({
      query: (productId) => `/reviews/${productId}`,
      providesTags: ['Review'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadProductImageMutation,
  useCreateReviewMutation,
  useGetProductReviewsQuery,
} = productApiSlice;
