
# Nuxt Email Module

Nuxt Email is a Nuxt module that allows sending emails directly from a Nuxt.js application. This module supports creating and using Handlebar email templates for dynamic and customizable email content.

## Installation

Install the Nuxt Email module via npm or yarn:

```bash
pnpm add nuxt-email
```

## Configuration

Add the module to your `nuxt.config.js` and configure the necessary settings:

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-email',
  ],
  mailer: {
    from: 'someone@example.com'
    transport: 'smtp',
    templatePath: 'mail-templates',
    ...options
  }
})
```

### Options

#### SMTP Options

- `transport`: smtp
- `host`: The SMTP server you want to use.
- `port`: The port of the SMTP server.
- `secure`: Use SSL/TLS. Set to `true` for port 465, otherwise `false`.
- `auth`: Authentication details for the SMTP server.
  - `user`: Your email username.
  - `pass`: Your email password.
- `from`: The default sender address for emails.

For more options checkout: [https://nodemailer.com/smtp/](https://nodemailer.com/smtp/)

#### Mailgun Options

- `transport`: mailgun
- `auth`: Authentication details for the SMTP server.
  - `api_key`: key-1234123412341234.
  - `domain`: one of your domain names listed at your https://app.mailgun.com/app/sending/domains.

For more options checkout: [https://github.com/orliesaurus/nodemailer-mailgun-transport](https://github.com/orliesaurus/nodemailer-mailgun-transport)

## Usage

### Creating Email Templates

Place your Handlebar email templates in the configured directory (`templatesDir`). Each template should be saved in a separate `.hbs` file. Example:

**mail-templates/welcome.hbs:**

```handlebars
<h1>Welcome, {{name}}!</h1>
<p>Thank you for registering.</p>
```

### Sending an Email

Import and use the module in your Nuxt application:

```html
<script setup>
const { send } = useMailer()


const name = 'John Doe';
send({
    to: 'john@example.com',
    template: {
      name: 'welcome'
      data: {
        name
      },
    },
  })
</script>
```

### Using Builder

You can use integrated builder for creating quick html mails.

```html
<script setup>
const { send, builder } = useMailer()


const name = 'John Doe';
send({
    to: 'john@example.com',
    template: {
      name: 'default' // you can omit
      data: {
        content: builder([
          { 
            tag: 'h1', 
            content: 'Welcome John' 
          },
          {
            tag: 'div',
            content: [
              { 
                tag: 'p',
                content: 'Welcome to nuxt-mailer'
              }
            ]
          }
        ])
      },
    },
  })
</script>
```

## Use it on Server Side

```ts
// server/api/mail.ts

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
```

## License

MIT License
