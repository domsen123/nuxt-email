import MailService from '../mailer'
import type { EmailOptions } from '../../../types'
import { defineEventHandler, readBody } from '#imports'

export default defineEventHandler<{ body: EmailOptions }>(async (event) => {
  const body = await readBody(event)

  const service = new MailService()
  return await service.send(body)
})
