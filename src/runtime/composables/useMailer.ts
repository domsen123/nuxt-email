import type { EmailOptions, AnyBuilderElement } from '../../types'

export const useMailer = () => {
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

  const builder = (opts: AnyBuilderElement | AnyBuilderElement[]): string => {
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

  const send = async (options: EmailOptions) => {
    await $fetch('/api/mailer', {
      method: 'POST',
      body: JSON.stringify(options),
    })
  }
  return { send, builder }
}
