import { z } from 'zod'

const schema = z.object({
  app_env: z.enum(['dev', 'stage', 'uat', 'prod']).default('dev'),
  mysql_host: z.string().default('localhost'),
  mysql_port: z.preprocess((val) => Number(val), z.number()).default(3306),
  mysql_user: z.string(),
  mysql_pass: z.string(),
  mysql_database: z.string()
})

const processEnv: Record<keyof z.infer<typeof schema>, string | undefined> = {
  app_env: process.env.APP_ENV,
  mysql_database: process.env.MYSQL_DBNAME,
  mysql_host: process.env.MYSQL_HOST,
  mysql_port: process.env.MYSQL_PORT,
  mysql_user: process.env.MYSQL_USER,
  mysql_pass: process.env.MYSQL_PASS
}

const parsed = schema.safeParse(processEnv)

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(parsed.error.flatten().fieldErrors, null, 2)
  )
  throw new Error('Invalid environment variables')
}

export const ENV = new Proxy(parsed.data, {
  get(target, prop) {
    if (typeof prop !== 'string') return undefined
    return target[prop as keyof typeof target]
  }
})
