import { get } from 'lodash';
import axios, { Method } from 'axios';
import apiConfig from './api-config';
import routesConfig from './routes-config';
import sessionHandler from './session-handler';

export interface IRequestOptions {
  unauthorizedErrorExpected: boolean;
}

export interface Response<T> {
  data?: T;
  code?: number;
  error?: string;
  isOk: boolean;
}

async function doRequest<T>(
  url: string,
  method: Method,
  payload: unknown = null,
): Promise<Response<T>> {
  const headers: { [key: string]: string } = {};

  const token = sessionHandler.getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await axios({
      baseURL: apiConfig.baseUrl(),
      url,
      method,
      headers,
      data: payload,
    });

    return {
      code: response.status,
      data: response.data as T,
      isOk: true,
    };
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw error;
    }

    console.error(error);

    if (error.response) {
      if (error.response.status === 401) {
        sessionHandler.clearToken();
        window.location.pathname = routesConfig.session.signIn();
      }

      const errorMessage: string = [404, 500].includes(error.response.status)
        ? error.message
        : (get(error, 'response.data.message') as string) || error.message;
      return {
        code: error.response.status,
        error: errorMessage,
        isOk: false,
      };
    }

    return {
      code: error.code ? parseInt(error.code, 10) : undefined,
      error: error.message,
      isOk: false,
    };
  }
}

  export async function get<T>(url: string): Promise<Response<T>> {
    return doRequest<T>(url, 'GET');
  }

  export async function post<TPayload, T>(
    url: string,
    data: TPayload,
  ): Promise<Response<T>> {
    return doRequest<T>(url, 'POST', data);
  }

  export async function put<TPayload, T>(
    url: string,
    data: TPayload,
  ): Promise<Response<T>> {
    return doRequest<T>(url, 'PUT', data);
  }

  export async function $delete<T>(url: string): Promise<Response<T>> {
    return doRequest<T>(url, 'DELETE', null);
  }
