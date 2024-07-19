import type { EmailOptions } from '../../types'
import { builder } from '../utils'

export const useMailer = () => {
  const send = async (options: EmailOptions) => {
    await $fetch('/api/mailer', {
      method: 'POST',
      body: JSON.stringify(options),
    })
  }
  return { send, builder }
}
