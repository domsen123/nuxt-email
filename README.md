
# Nuxt Email Module

Nuxt Email is a powerful Nuxt.js module that facilitates sending emails directly from your application. With support for Handlebars templates, it allows for dynamic and customizable email content.

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
    from: 'someone@example.com',
    transport: 'smtp',
    templatePath: 'mail-templates',
    allowedDomains: ['example.com'],
    ...options
  }
})
```

Create a default template in your project:

**`/[your template path || mail-templates]/default.hbs`**

```handlebars
{{#block "header"}}
  <div>Add a nice header</div>
{{/block}}

{{#block "content"}}
  <div>
    Add your content and your {{vars}}
  </div>
{{/block}}

{{#block "footer"}}
  <div>Add a nice footer</div>
{{/block}}

{{> default-layout }}
```

## Options

### SMTP Options

- `transport`: smtp
- `host`: The SMTP server you want to use.
- `port`: The port of the SMTP server.
- `secure`: Use SSL/TLS. Set to `true` for port 465, otherwise `false`.
- `auth`: Authentication details for the SMTP server.
  - `user`: Your email username.
  - `pass`: Your email password.
- `from`: The default sender address for emails.

For more options checkout: [https://nodemailer.com/smtp/](https://nodemailer.com/smtp/)

### Mailgun Options

- `transport`: mailgun
- `auth`: Authentication details for the SMTP server.
  - `api_key`: key-1234123412341234.
  - `domain`: one of your domain names listed at your https://app.mailgun.com/app/sending/domains.

For more options checkout: [https://github.com/orliesaurus/nodemailer-mailgun-transport](https://github.com/orliesaurus/nodemailer-mailgun-transport)

## Usage

### Creating Email Templates

Place your Handlebar email templates in the configured directory (`templatePath`). Each template should be saved in a separate `.hbs` file. Example:

**mail-templates/welcome.hbs:**

```handlebars
<h1>Welcome, {{name}}!</h1>
<p>Thank you for registering.</p>
```

### Creating Email Layouts

Place your Handlebar email layouts in the configured directory (`templatePath`). Each layout should be saved in a separate `.layout.hbs` file. Example:

**mail-templates/auth.layout.hbs:**

```handlebars
<div>
  Authentication
  {{#contentFor "content"}}
                  
  {{/contentFor}}
</div>
```

You can define as many "blocks" as you want. Just add a new `{{#contentFor "block_name"}}`.

You can use your new layout with:

**`/[your template path || mail-templates]/auth.hbs`**

```handlebars
{{#block "content"}}
  <div>
    You signed in as: {{username}}
  </div>
{{/block}}

{{> auth }}
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
      name: 'welcome',
      data: {
        name
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
        username: 'John Doe'
      },
    },
  })

  return 200
})
```

## License

MIT License
