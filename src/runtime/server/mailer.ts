import { createRequire } from 'node:module'
import type { Transporter } from 'nodemailer'
import nodemailer from 'nodemailer'
import type _mg from 'nodemailer-mailgun-transport'
import Handlebars from 'handlebars'
import { logger, omit, builder } from '../utils'
import { useRuntimeConfig, useStorage } from '#imports'
import type { BaseOptions, BlockContext, EmailOptions, MailgunOptions, ModuleOptions, SMTPOptions } from '~/src/types'

const require = createRequire(import.meta.url)

let transporter: Transporter

const isMailgun = (options: ModuleOptions): options is BaseOptions & MailgunOptions => {
  return options.transport === 'mailgun'
}

const isSmtp = (options: ModuleOptions): options is BaseOptions & SMTPOptions => {
  return options.transport === 'smtp'
}

const getMailer = (): Transporter => {
  if (transporter) return transporter

  const env = useRuntimeConfig().mailer as ModuleOptions

  if (isSmtp(env)) {
    const options = omit(env, 'transport', 'templatePath', 'from')

    transporter = nodemailer.createTransport(options)
  }
  else if (isMailgun(env)) {
    const options = omit(env, 'transport', 'templatePath', 'from')

    const mg: typeof _mg = require('nodemailer-mailgun-transport')

    transporter = nodemailer.createTransport(
      mg(options),
    )
  }
  else {
    logger.warn('Illegal transport given for email')
  }

  return transporter
}

export const registerHandlebarLayouts = async () => {
  const keys = await Promise.all([
    useStorage<string>('assets:custom-mail-templates').getKeys(),
    useStorage<string>('assets:mail-templates').getKeys(),
  ])

  for (let i = 0; i < keys.length; i++) {
    const storage = i === 0 ? 'custom-mail-templates' : 'mail-templates'
    for (const key of keys[i].filter(k => k.endsWith('.layout.hbs'))) {
      const partial = key.replace('.layout.hbs', '')
      const content = await useStorage<string>(`assets:${storage}`).getItem(key)
      if (content) {
        logger.info(`Registering partial ${partial} from storage ${storage}`)
        Handlebars.registerPartial(partial, content)
      }
    }
  }
}

export class MailService {
  private mailer: Transporter
  private env: ModuleOptions

  constructor() {
    this.mailer = getMailer()
    this.env = useRuntimeConfig().mailer as ModuleOptions
  }

  static builder = builder

  async send<T>(options: EmailOptions): Promise<T | null> {
    const { template, ...emailOptions } = options
    let { html } = options

    const from = options.from || this.env.from

    if (template) {
      let templateData = template.data
      template.name = template.name || 'default'

      templateData = {
        ...templateData,
      }

      html = await this.renderTemplate(template.name, templateData)
    }
    if (typeof html === 'string') {
      // Some email clients start acting funky when line length exceeds 75 characters. See #6074
      html = html
        .split('\n')
        .map(line => line.trim())
        .join('\n')
    }

    const _options = { ...emailOptions, from, html }

    return await this.mailer.sendMail(_options)
  }

  private registerHelpers() {
    if (!Handlebars.helpers.block) {
      Handlebars.registerHelper('block', function (this: BlockContext, name: string, options: Handlebars.HelperOptions) {
        if (!this._blocks) {
          this._blocks = {}
        }
        this._blocks[name] = options.fn
        return null
      })
    }
    if (!Handlebars.helpers.contentFor) {
      Handlebars.registerHelper('contentFor', function (this: BlockContext, name: string, options: Handlebars.HelperOptions) {
        return this._blocks && this._blocks[name] ? this._blocks[name](this) : options.fn(this)
      })
    }
  }

  private async renderTemplate(template: string, variables: Record<string, unknown>): Promise<string> {
    this.registerHelpers()
    await registerHandlebarLayouts()

    let templateString = await useStorage<string>('assets:custom-mail-templates').getItem(template + '.hbs')
    if (!templateString) {
      templateString = await useStorage<string>('assets:mail-templates').getItem(template + '.hbs')
    }

    if (!templateString) {
      throw new Error(`Template "${template}" doesn't exist`)
    }
    const html = Handlebars.compile(templateString)(variables)

    return html
  }
}

export default MailService
