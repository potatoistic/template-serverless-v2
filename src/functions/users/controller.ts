import { type APIGatewayProxyHandler } from 'aws-lambda'
import { client } from '@config/database'

export const getUsers: APIGatewayProxyHandler = async (event) => {
  const data = await client('users').first('id', 'email')

  return {
    statusCode: 200,
    body: JSON.stringify({ data })
  }
}
