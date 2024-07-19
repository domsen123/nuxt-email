export default defineEventHandler(async () => {
  const mailer = new MailService()
  await mailer.send({
    to: 'someone@example.com',
    subject: 'Welcome to Nuxt Mailer',
    template: {
      data: {
        content: MailService.builder({
          tag: 'div',
          content: MailService.builder({
            tag: 'span',
            content: 'Welcome to Nuxt Mailer',
          }),
        }),
      },
    },
  })

  return 200
})
