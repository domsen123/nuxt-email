export default defineEventHandler(async () => {
  const mailer = new MailService()
  await mailer.send({
    to: 'someone@example.com',
    subject: 'Welcome to Nuxt Mailer',
    template: {
      name: 'default',
      data: {
        username: 'John Doe',
      },
    },
  })

  return 200
})
