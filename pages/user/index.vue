<script setup>
  import { definePageMeta } from "~/node_modules/nuxt/dist/pages/runtime/composables";
  import { ref, computed, onMounted } from 'vue'
  import { useFavorites } from '~/composables/useFavorites';
  import Sparkline from '~/components/charts/sparkline.vue';
  import { useRouter } from 'vue-router';
 

  definePageMeta({
      layout:"user-panel",
  }) 
const router = useRouter()

function goToCoin(id) {
  router.push(`/user/assets/${id}`)
}
/* --- Favorites --- */
const { favorites, isFavorite, toggle } = useFavorites()

/* --- API --- */
const { data: coinsRaw, pending, error, refresh } = await useAsyncData(
  'coins',
  () => $fetch('https://api.coingecko.com/api/v3/coins/markets', {
    params: { vs_currency: 'usd', sparkline: true }
  }),
  { server: false }
)

/* --- محاسبه بیشترین سود و ضرر --- */
const topGainers = computed(() => {
  if (!coinsRaw.value) return []
  return [...coinsRaw.value]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 5)
})

const topLosers = computed(() => {
  if (!coinsRaw.value) return []
  return [...coinsRaw.value]
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 5)
})

const favoriteCoins = computed(() => {
  if (!coinsRaw.value) return []
  return coinsRaw.value.filter(c => favorites.value.includes(c.id))
})

/* --- Auto Refresh هر 30 ثانیه --- */
onMounted(() => {
  console.log("coinsRaw",coinsRaw);
  
  const interval = setInterval(() => refresh(), 30000)
  onUnmounted(() => clearInterval(interval))
})
</script>

<template>
  <suspense>
    <div class="max-w-6xl mx-auto p-4 space-y-8">
      <h1 class="text-4xl font-bold mb-4">داشبورد</h1>
      <!-- Loader -->
      <div v-if="pending" class="space-y-2 grid md:grid-cols-5 gap-4">
        <SkeletonsCoinCardSkeleton v-for="i in 15" :key="i" />
        <!-- <div v-for="i in 5" :key="i" class="h-16 bg-gray-200 rounded animate-pulse dark:bg-gray-700"></div> -->
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center text-red-600 py-10">{{ "خطا در برقراری ارتباط" }}</div>

      <!-- Gainers -->
      <div class="flex flex-col gap-4" v-else>
        <Section title="Top 5 Gainers">
          <h2 class="text-2xl font-bold mb-4">پر سودترین ها</h2>
          <div class="grid md:grid-cols-5 gap-4">
            <CardsCoinCards @click="goToCoin(coin.id)" v-for="(coin, index) in topGainers" :key="'coinp_' + index" :coin="coin" @toggle-fav="toggle" />
          </div>
        </Section>

        <!-- Losers -->
        <Section title="Top 5 Losers">
          <h2 class="text-2xl font-bold mb-4">پر ضررترین ها</h2>
          <div class="grid md:grid-cols-5 gap-4">
            <CardsCoinCards @click="goToCoin(coin.id)" v-for="(coin, index) in topLosers" :key="'coinn_' + index" :coin="coin" @toggle-fav="toggle" />
          </div>
        </Section>

        <!-- Favorites -->
        <Section title="Favorites">
          <h2 class="text-2xl font-bold mb-4">محبوب ترین ها</h2>
          <div v-if="favoriteCoins.length" class="grid md:grid-cols-5 gap-4">
            <CardsCoinCards @click="goToCoin(coin.id)" v-for="(coin, index) in favoriteCoins" :key="'coinf_' + index" :coin="coin" @toggle-fav="toggle" />
          </div>
          <div v-else class="text-center text-gray-500 py-4">
            هیچ ارز مورد علاقه‌ای وجود ندارد
          </div>
        </Section>
      </div>
    </div>
  </suspense>
</template>

