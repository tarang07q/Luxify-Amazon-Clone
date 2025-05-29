import { apiSlice } from '../apiSlice';

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query({
      query: ({ productId, sortBy = 'newest', rating }) => {
        let url = `/reviews/${productId}`;
        const params = new URLSearchParams();

        if (sortBy) params.append('sortBy', sortBy);
        if (rating) params.append('rating', rating);

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        return url;
      },
      providesTags: (result, error, { productId }) => [
        { type: 'Review', id: productId },
        'Review'
      ],
    }),
    createReview: builder.mutation({
      query: ({ productId, ...reviewData }) => ({
        url: `/reviews/${productId}`,
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Review', id: productId },
        'Review',
        { type: 'Product', id: productId }
      ],
    }),
    updateReview: builder.mutation({
      query: ({ productId, reviewId, ...reviewData }) => ({
        url: `/reviews/${productId}/${reviewId}`,
        method: 'PUT',
        body: reviewData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Review', id: productId },
        'Review'
      ],
    }),
    deleteReview: builder.mutation({
      query: ({ productId, reviewId }) => ({
        url: `/reviews/${productId}/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Review', id: productId },
        'Review'
      ],
    }),
    markReviewHelpful: builder.mutation({
      query: ({ productId, reviewId, isHelpful }) => ({
        url: `/reviews/${productId}/${reviewId}/helpful`,
        method: 'POST',
        body: { isHelpful },
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Review', id: productId },
        'Review'
      ],
    }),
    reportReview: builder.mutation({
      query: ({ productId, reviewId, reason }) => ({
        url: `/reviews/${productId}/${reviewId}/report`,
        method: 'POST',
        body: { reason },
      }),
    }),
    getReviewsByUser: builder.query({
      query: (userId) => `/reviews/user/${userId}`,
      providesTags: ['Review'],
    }),
    moderateReview: builder.mutation({
      query: ({ reviewId, action, reason }) => ({
        url: `/reviews/${reviewId}/moderate`,
        method: 'POST',
        body: { action, reason },
      }),
      invalidatesTags: ['Review'],
    }),
  }),
});

export const {
  useGetProductReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useMarkReviewHelpfulMutation,
  useReportReviewMutation,
  useGetReviewsByUserQuery,
  useModerateReviewMutation,
} = reviewApiSlice;
