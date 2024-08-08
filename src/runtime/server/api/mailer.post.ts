import MailService from '../mailer'
import type { EmailOptions } from '../../../types'
import { defineEventHandler, readBody, useRuntimeConfig } from '#imports'

export default defineEventHandler<{ body: EmailOptions }>(async (event) => {
  const body = await readBody(event)

  const { mailer } = useRuntimeConfig()

  const allowedDomains = (mailer.allowedDomains || []).map(domain => `@${domain.toLowerCase()}`)

  if (allowedDomains.length > 0) {
  // verify the domain
    const to = Array.isArray(body.to) ? body.to : [body.to]
    const cc = Array.isArray(body.cc) ? body.cc : [body.cc]
    const bcc = Array.isArray(body.bcc) ? body.bcc : [body.bcc]
    const recipients = [...to, ...cc, ...bcc]

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
  }

  const service = new MailService()
  return await service.send(body)
})
