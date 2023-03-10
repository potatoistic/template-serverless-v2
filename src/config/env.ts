import { parseEnv, type ProcessEnv } from '@helpers/env'

const processEnv: ProcessEnv = {
  app_env: process.env.APP_ENV,
  mysql_database: process.env.MYSQL_DBNAME,
  mysql_host: process.env.MYSQL_HOST,
  mysql_port: process.env.MYSQL_PORT,
  mysql_user: process.env.MYSQL_USER,
  mysql_pass: process.env.MYSQL_PASS
}

export const ENV = parseEnv(processEnv)
