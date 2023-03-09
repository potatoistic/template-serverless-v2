import {
  type InferModel,
  mysqlTable,
  serial,
  text,
  varchar
} from 'drizzle-orm/mysql-core'

export const Users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 256 }),
  email: varchar('email', { length: 256 }),
  password: text('password')
})

export type User = InferModel<typeof Users>
export type NewUser = InferModel<typeof Users, 'insert'>
