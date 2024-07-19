import { consola } from 'consola'

export const logger = consola.withTag('nuxt-mailer')

export function omit<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const result: Partial<T> = {};

  (Object.keys(obj) as Array<K>).forEach((key) => {
    if (!keys.includes(key)) {
      result[key] = obj[key]
    }
  })

  return result as Omit<T, K>
}
