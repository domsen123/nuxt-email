import MailService from '../mailer'
import type { EmailOptions } from '../../../types'
import { defineEventHandler, readBody, useRuntimeConfig } from '#imports'

export default defineEventHandler<{ body: EmailOptions }>(async (event) => {
  const body = await readBody(event)

  const { mailer } = useRuntimeConfig()

  const allowedDomains = (mailer.allowedDomains || []).map(domain => `@${domain.toLowerCase()}`)

  // verify the domain
  const recipients = Array.isArray(body.to) ? body.to : [body.to]
  for (const recipient of recipients) {
    if (recipient) {
      let to: string
      if (typeof recipient === 'string')
        to = recipient
      else if (typeof recipient === 'object' && recipient.address)
        to = recipient.address
      else
        continue

      const domain = to.split('@')[1]
      if (!allowedDomains.some(allowed => domain.endsWith(allowed))) {
        throw new Error(`Sending to ${to} is not allowed`)
      }
    }
  }

  const service = new MailService()
  return await service.send(body)
})
