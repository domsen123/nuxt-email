<script setup lang="ts">
const { send, builder } = useMailer()

const sendMail = async () => {
  await send({
    to: 'someone@example.com',
    template: {
      data: {
        content: builder({
          tag: 'div',
          content: builder({
            tag: 'span',
            content: 'Welcome to Nuxt Mailer',
          }),
        }),
      },
    },
  })
}
</script>

<template>
  <div>
    <button
      type="button"
      @click="sendMail"
    >
      Send Mail
    </button>
  </div>
</template>
