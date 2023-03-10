export const UserTable = 'users'

export interface IUser {
  id?: number
  email: string
  username: string
  password: string
}

export type PartialUser = Partial<IUser>
