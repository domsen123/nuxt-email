import { consola } from 'consola'
import type { AnyBuilderElement } from '../types'

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

const selfClosingElements: string[] = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
]
const concat = (obj: object) => Object.entries(obj).map(([key, value]) => `${key}:"${value}"`).join(';')

const stringify = (obj: Record<string, unknown>) => {
  return Object.entries(obj).map(([key, value]) => {
    if (value === true) return key
    if (value === false) return ''
    if (value === null || value === undefined) return ''
    if (key === 'style' && typeof value === 'object') return `${key}="${concat(value)}"`
    return `${key}="${value}"`
  }).join(' ')
}

export const builder = (opts: AnyBuilderElement | AnyBuilderElement[]): string => {
  const elements = Array.isArray(opts) ? opts : [opts]

  return elements.map((element) => {
    const attributes = element.attributes
      ? stringify(element.attributes)
      : ''

    const content = element.content
      ? typeof element.content === 'string'
        ? element.content
        : builder(element.content)
      : ''

    return selfClosingElements.includes(element.tag)
      ? `<${element.tag} ${attributes} />`
      : `<${element.tag} ${attributes}>${content}</${element.tag}>`
  }).join('')
}
