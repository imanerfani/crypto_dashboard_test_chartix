<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CoinDetailSkeleton from '~/components/skeletons/details-skeleton.vue'
import Sparkline from '~/components/charts/sparkline.vue'
import { useFavorites } from '~/composables/useFavorites'

import { definePageMeta } from "~/node_modules/nuxt/dist/pages/runtime/composables";

  definePageMeta({
      layout:"user-panel",
  }) 

/* گرفتن id از URL */
const route = useRoute()
const coinId = route.params.id

/* favorite */
const { toggle, isFavorite } = useFavorites()

/* گرفتن دیتا از API */
const { data, pending, error } = await useFetch(
  'https://api.coingecko.com/api/v3/coins/markets',
  {
    query: {
      vs_currency: 'usd',
      ids: coinId,
      sparkline: true
    }
  }
)

/* فقط خود کوین */
const coin = computed(() => data.value?.[0])

/* دیتا برای نمودار */
const sparklineData = computed(() =>
  coin.value?.sparkline_in_7d?.price || []
)
</script>
<template>
  <CoinDetailSkeleton v-if="pending" />
  <div v-if="coin" class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-4">
        <img :src="coin.image" class="w-12 h-12" />

        <div>
          <h1 class="text-2xl font-bold">
            {{ coin.name }}
            <span class="text-gray-500 text-sm uppercase">
              ({{ coin.symbol }})
            </span>
          </h1>

          <p class="text-sm text-gray-400">
            Rank #{{ coin.market_cap_rank }}
          </p>
        </div>
      </div>

      <button
        @click="toggle(coin.id)"
        class="text-yellow-400 text-2xl"
      >
        {{ isFavorite(coin.id) ? '⭐' : '☆' }}
      </button>
    </div>
    <div class="bg-gray-900 text-white p-4 rounded-xl space-y-2">
      <div class="text-3xl font-bold">
        ${{ coin.current_price.toLocaleString() }}
      </div>

      <div
        :class="coin.price_change_percentage_24h >= 0
          ? 'text-green-400'
          : 'text-red-400'"
      >
        {{ coin.price_change_percentage_24h.toFixed(2) }}%
        ({{ coin.price_change_24h.toFixed(2) }})
      </div>

      <Sparkline
        v-if="sparklineData.length"
        :data="sparklineData"
      />
    </div>
    <div class="grid md:grid-cols-3 gap-4">
      <Stat label="Market Cap" :value="coin.market_cap" />
      <Stat label="Volume" :value="coin.total_volume" />
      <Stat label="FDV" :value="coin.fully_diluted_valuation" />
    </div>
    <div class="grid md:grid-cols-3 gap-4">
      <Stat label="Circulating" :value="coin.circulating_supply" />
      <Stat label="Total Supply" :value="coin.total_supply" />
      <Stat label="Max Supply" :value="coin.max_supply" />
    </div>
    <div class="grid md:grid-cols-2 gap-4">
      <div class="bg-gray-900 text-white p-4 rounded-xl">
        <h3 class="font-semibold">All Time High</h3>
        <p>${{ coin.ath }}</p>
        <p class="text-sm text-red-400">
          {{ coin.ath_change_percentage.toFixed(2) }}%
        </p>
      </div>

      <div class="bg-gray-900 text-white p-4 rounded-xl">
        <h3 class="font-semibold">All Time Low</h3>
        <p>${{ coin.atl }}</p>
        <p class="text-sm text-green-400">
          {{ coin.atl_change_percentage.toFixed(2) }}%
        </p>
      </div>
    </div>

  </div>

  <div v-else-if="error" class="text-center text-red-500 py-10">
    خطا در دریافت اطلاعات
  </div>
</template>
