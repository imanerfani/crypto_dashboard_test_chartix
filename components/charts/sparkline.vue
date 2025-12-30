<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ data?: number[] }>(), { data: () => [] })

const points = computed(() => {
  if (!props.data || props.data.length < 2) return ''

  const max = Math.max(...props.data)
  const min = Math.min(...props.data)
  const range = max - min

  return props.data
    .map((p, i) => {
      const x = (i / (props.data.length - 1)) * 100
      const y = range === 0 ? 50 : 100 - ((p - min) / range) * 100
      return `${x},${y}`
    })
    .join(' ')
})
</script>

<template>
  <svg viewBox="0 0 100 100" class="w-full h-16">
    <polyline
      :points="points"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      class="text-green-500"
    />
  </svg>
</template>

