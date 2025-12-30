<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
  useHead({
    htmlAttrs: {
      dir: 'rtl',
      lang: 'fa',
    },
  })
</script>
