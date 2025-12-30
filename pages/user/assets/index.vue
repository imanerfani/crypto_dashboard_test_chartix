<template>
  <h2 class="text-2xl font-bold mb-4">لیست دارایی‌ها</h2>
  <TablesCryptoTable />
</template>

<script setup lang="ts">
  import { definePageMeta } from "~/node_modules/nuxt/dist/pages/runtime/composables";

  definePageMeta({
      layout:"user-panel",
  }) 
</script>