import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const API_URI = "http://localhost:8000/";
const baseQuery = fetchBaseQuery({ baseUrl: API_URI });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Task"],
  endpoints: (builder) => ({}),
});
