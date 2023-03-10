export type ResponseStatus = 'SUCCESS' | 'SUCCESS_CREATE' | 'BAD_REQUEST' | 'INTERNAL'
export interface ResponseBlock {
  code: number
  message: string
}

export const RESPONSE: Record<ResponseStatus, ResponseBlock> = {
  SUCCESS: {
    code: 200,
    message: 'Success'
  },
  SUCCESS_CREATE: {
    code: 201,
    message: 'Created sucessfully'
  },
  BAD_REQUEST: {
    code: 400,
    message: 'Bad request'
  },
  INTERNAL: {
    code: 500,
    message: 'Internal server error'
  }
}
