import { knex, type Knex } from 'knex'
import { ENV } from './env'

import { type PartialUser, type UserTable } from '../schema/users'

const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: ENV.mysql_host,
    port: ENV.mysql_port,
    user: ENV.mysql_user,
    password: ENV.mysql_pass,
    database: ENV.mysql_database
  },
  pool: {
    min: 5,
    max: 50
  }
}

export const client = knex(config)

declare module 'knex/types/tables' {
  type User = PartialUser

  interface Tables {
    [UserTable]: User
  }
}
