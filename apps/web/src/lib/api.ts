import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DriverDTO, DriverStandingDTO } from '@f1-stats-suite/types';

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Driver', 'Season', 'Favorite'],
  endpoints: (builder) => ({
    listDrivers: builder.query<DriverDTO[], { search?: string } | void>({
      query: (args) => ({ url: '/v1/drivers', params: args }),
      providesTags: (result) =>
        result ? [...result.map((driver) => ({ type: 'Driver' as const, id: driver.driverId })), 'Driver'] : ['Driver'],
    }),
    getDriver: builder.query<DriverDTO, string>({
      query: (driverId) => `/v1/drivers/${driverId}`,
      providesTags: (_result, _error, id) => [{ type: 'Driver', id }],
    }),
    listSeasons: builder.query<DriverStandingDTO[], number>({
      query: (year) => `/v1/seasons/${year}/standings/drivers`,
      providesTags: ['Season'],
    }),
    login: builder.mutation<{ token: string; refreshToken: string; user: { email: string } }, { email: string; password: string }>({
      query: (body) => ({ url: '/v1/auth/login', method: 'POST', body }),
    }),
  }),
});

export const { useListDriversQuery, useGetDriverQuery, useListSeasonsQuery, useLoginMutation } = api;
