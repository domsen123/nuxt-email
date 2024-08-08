<script setup lang="ts">
const { send } = useMailer()

const sendMail = async () => {
  await send({
    to: 'dmarx@marxulm.de',
    subject: 'Welcome to Nuxt Mailer',
    template: {
      data: {
        username: 'John Doe',
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
