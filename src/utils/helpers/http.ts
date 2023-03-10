import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { RESPONSE, type ResponseStatus } from './response'

export const APIGatewayContextParser = (event: APIGatewayProxyEvent) => {
  const ctx = event.requestContext

  const http = {
    method: event.httpMethod,
    path: event.path
  }
  const ip = ctx?.identity?.sourceIp ?? ''
  const requestId = event.headers?.['x-request-ip'] ?? ctx.requestId

  return {
    http,
    ctx,
    ip,
    requestId
  }
}

export const APIGatewayEventParser = (event: APIGatewayProxyEvent) => {
  const body = JSON.parse(event.body ?? '{}') as unknown
  const query = event.queryStringParameters ?? {}
  const params = event.pathParameters ?? {}
  const headers = event.headers ?? {}

  return { body, query, params, headers, meta: APIGatewayContextParser(event) }
}

interface ResponseOptions {
  type: ResponseStatus
  data?: unknown
  message?: string
  requestId: string
  headers?: Record<string, string | number | boolean>
}
export const response = ({ data, requestId, type, headers, message: msg }: ResponseOptions): APIGatewayProxyResult => {
  const { code, message } = RESPONSE[type]

  const responseBody = {
    data,
    message: msg ?? message,
    requestId
  }

  return {
    statusCode: code,
    body: JSON.stringify(responseBody),
    headers
  }
}
