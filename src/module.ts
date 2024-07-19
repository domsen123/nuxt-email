import defu from 'defu'
import get from 'lodash-es/get'
import { defineNuxtModule, createResolver, addServerHandler, addImports } from '@nuxt/kit'
import type { ModuleOptions } from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-mailer',
    configKey: 'mailer',
  },
  defaults: {
    from: 'no-reply@example.com',
    transport: 'smtp',
    templatePath: 'mail-templates',
  },
  hooks: {
    'nitro:config': async (config) => {
      const { resolve, resolvePath } = createResolver(import.meta.url)

      config.serverAssets = config.serverAssets || []
      config.serverAssets.push(
        {
          baseName: 'mail-templates',
          dir: resolve('./runtime/server/templates'),
        },
      )

      const templatePath = get(config, 'runtimeConfig.mailer.templatePath')
      if (templatePath) {
        config.serverAssets.push(
          {
            baseName: 'custom-mail-templates',
            dir: await resolvePath(templatePath, { cwd: config.rootDir }),
          },
        )
      }
    },
  },
  setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url)

    _nuxt.options.runtimeConfig.mailer = defu(_nuxt.options.runtimeConfig.mailer || {}, _options)

    addServerHandler({
      route: '/api/mailer',
      handler: resolve('runtime/server/api/mailer.post'),
      method: 'post',
    })

    addImports({
      name: 'useMailer',
      as: 'useMailer',
      from: resolve('runtime/composables/useMailer'),
    })
  },
})
