import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCategory } from "../../../types/Categories.type";
import { TProduct } from "../../../types/Product.type";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit = 10, skip = 0 }) =>
        `products?limit=${limit}&skip=${skip}`,
    }),

    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),

    updateProductById: builder.mutation<
      TProduct,
      { id: string; data: Partial<TProduct> }
    >({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getCategories: builder.query<TCategory[], void>({
      query: () => `products/categories`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useUpdateProductByIdMutation,
} = productsApi;
