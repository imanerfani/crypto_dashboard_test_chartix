<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:scale-[1.02] transition cursor-pointer"
  >
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <img :src="coin.image" class="w-6 h-6" />
        <span class="font-medium">{{ coin.name }}</span>
      </div>

      <button @click.stop="$emit('toggle-fav', coin.id)" class="text-yellow-400">
        {{ isFavorite(coin.id) ? '⭐' : '☆' }}
      </button>
    </div>

    <div class="font-bold text-lg">${{ coin.current_price.toLocaleString() }}</div>

    <div :class="coin.price_change_percentage_24h>=0 ? 'text-green-500' : 'text-red-500'" class="font-semibold">
      {{ coin.price_change_percentage_24h.toFixed(2) }}%
    </div>

    <Sparkline :data="coin.sparkline_in_7d.price" />
  </div>
</template>

<script setup lang="ts">
    import  { defineProps } from 'vue';
    import Sparkline from '~/components/charts/sparkline.vue';
    import { useFavorites } from '~/composables/useFavorites';

    const props = defineProps<{ coin: any }>()
    const { isFavorite } = useFavorites()
</script>
