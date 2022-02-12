import { get } from 'lodash'
import axios, { Method } from 'axios'
import { apiConfig } from './api-config'
import { routesConfig } from './routes-config'
import { sessionHandler } from './session-handler'

export interface IRequestOptions {
  unauthorizedErrorExpected: boolean
}

export interface Response<T> {
  data?: T
  code?: number
  error?: string
  isOk: boolean
}

async function doRequest<T>(
  url: string,
  method: Method,
  payload: any = null,
): Promise<Response<T>> {

  const headers: { [key: string]: string } = {}

  const token = sessionHandler.getToken()

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await axios({
      baseURL: apiConfig.baseUrl(),
      url,
      method,
      headers,
      data: payload
    })

    return {
      code: response.status,
      data: response.data as T,
      isOk: true
    }
  } catch (error) {
    console.error(error)
    if (error.response) {
      if (error.response.status === 401) {
        sessionHandler.clearToken()
        window.location.pathname = routesConfig.session.signIn()
      }

      const errorMessage = [404, 500].includes(error.response.status)
        ? error.message
        : get(error, 'response.data.message') || error.message
      return {
        code: error.response.status,
        error: errorMessage,
        isOk: false
      }
    }

    return {
      code: error.response.status,
      error: error.message,
      isOk: false
    }
  }
}

export class Request {
  static async get<T>(url: string): Promise<Response<T>> {
    return doRequest<T>(url, 'GET')
  }

  static async post<TPayload, T>(
    url: string,
    data: TPayload
  ): Promise<Response<T>> {
    return doRequest<T>(url, 'POST', data)
  }

  static async put<TPayload, T>(
    url: string,
    data: TPayload
  ): Promise<Response<T>> {
    return doRequest<T>(url, 'PUT', data)
  }

  static async $delete<T>(url: string): Promise<Response<T>> {
    return doRequest<T>(url, 'DELETE', null)
  }
}
