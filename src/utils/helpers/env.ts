import { z } from 'zod'

const preProcessToNum = z.preprocess((val) => Number(val), z.number())

const schema = z.object({
  app_env: z.enum(['dev', 'stage', 'uat', 'prod']).default('dev'),
  mysql_host: z.string().default('localhost'),
  mysql_port: preProcessToNum.default(3306),
  mysql_user: z.string(),
  mysql_pass: z.string(),
  mysql_database: z.string(),
  mysql_pool_min: preProcessToNum.default(5),
  mysql_pool_max: preProcessToNum.default(10)
})

export type ProcessEnv = Record<keyof z.infer<typeof schema>, string | undefined>

export const parseEnv = (env: ProcessEnv): z.infer<typeof schema> => {
  const parsed = schema.safeParse(env)

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', JSON.stringify(parsed.error.flatten().fieldErrors, null, 2))
    throw new Error('Invalid environment variables')
  }

  return new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined
      return target[prop as keyof typeof target]
    }
  })
}
