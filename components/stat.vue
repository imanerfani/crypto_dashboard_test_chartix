<template>
  <div class="bg-gray-900 text-white p-4 rounded-xl">
    <p class="text-sm text-gray-400">{{ label }}</p>
    <p class="font-bold">
      {{ value?.toLocaleString() ?? '-' }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: Number
})
</script>
