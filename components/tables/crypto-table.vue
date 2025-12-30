<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, Suspense } from 'vue'
import { useRouter } from 'vue-router'
import { checkScreenMaxWidth } from '~/composables/utilities';

const router = useRouter()

/* ---------------- state ---------------- */
const search = ref('')
const currentPage = ref(1)
const perPage = 7

const sortKey = ref('name')
const sortAsc = ref(true)

/* ---------------- favorites ---------------- */
const favorites = ref([])

function loadFavorites() {
  const stored = localStorage.getItem('favorites')
  favorites.value = stored ? JSON.parse(stored) : []
}

function toggleFavorite(id) {
  favorites.value.includes(id)
    ? favorites.value = favorites.value.filter(f => f !== id)
    : favorites.value.push(id)

  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

function isFavorite(id) {
  return favorites.value.includes(id)
}

/* ---------------- navigation ---------------- */
function goToCoin(id) {
  router.push(`/user/assets/${id}`)
}

/* ---------------- api ---------------- */
const { data: coinsRaw, refresh, pending, error } = await useAsyncData(
  'coins',
  () =>
    $fetch('https://api.coingecko.com/api/v3/coins/markets', {
      params: { vs_currency: 'usd' }
    }),
  { server: false }
)

onMounted(() => {
  loadFavorites()
  const interval = setInterval(() => refresh(), 30000)
  onBeforeUnmount(() => clearInterval(interval))
})

watch(search, () => (currentPage.value = 1))

/* ---------------- computed ---------------- */
const filteredCoins = computed(() => {
  if (!coinsRaw.value) return []

  let list = coinsRaw.value.filter(c =>
    c.name.toLowerCase().includes(search.value.toLowerCase())
  )

  list.sort((a, b) => {
    let aValue = a[sortKey.value]
    let bValue = b[sortKey.value]
    if (typeof aValue === 'string')
      return sortAsc.value
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)

    return sortAsc.value ? aValue - bValue : bValue - aValue
  })

  return list
})

const totalPages = computed(() =>
  Math.ceil(filteredCoins.value.length / perPage)
)

const paginatedCoins = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredCoins.value.slice(start, start + perPage)
})

const paginationRange = computed(() => {
  const total = totalPages.value
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)

  let start = currentPage.value - 2
  let end = currentPage.value + 2

  if (start < 1) {
    end += 1 - start
    start = 1
  }
  if (end > total) {
    start -= end - total
    end = total
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

function toggleSort(key) {
  if (sortKey.value === key) sortAsc.value = !sortAsc.value
  else {
    sortKey.value = key
    sortAsc.value = true
  }
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
</script>

<template>
  <Suspense>
    <div dir="rtl" class="max-w-6xl mx-auto p-4 font-sans">

      <!-- Search -->
      <div class="mb-4">
        <input
          v-model="search"
          placeholder="جستجوی نام ارز..."
          class="w-full md:w-1/3 px-4 py-2 rounded-xl border
                dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <!-- Loader -->
      <div v-if="pending" class="space-y-2">
        <div
          v-for="i in perPage"
          :key="i"
          class="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
        ></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-10 text-red-600">
        {{ "خطا در برقراری ارتباط" }}
      </div>

      <!-- Desktop Table -->
      <div
        v-else-if="!checkScreenMaxWidth(768)"
        class="hidden md:block overflow-x-auto rounded-2xl shadow bg-white dark:bg-gray-800"
      >
        <table class="min-w-full text-right">
          <thead class="bg-gray-100 dark:bg-gray-700 text-sm">
            <tr>
              <th class="px-6 py-4 cursor-pointer" @click="toggleSort('name')">
                نام ارز
              </th>
              <th class="px-6 py-4 cursor-pointer" @click="toggleSort('current_price')">
                قیمت (USD)
              </th>
              <th class="px-6 py-4">۲۴ ساعت</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="coin in paginatedCoins"
              :key="coin.id"
              @click="goToCoin(coin.id)"
              class="cursor-pointer transition
                    hover:bg-indigo-50 dark:hover:bg-indigo-900
                    active:scale-[0.98]"
            >
              <td class="px-6 py-4 flex items-center gap-3">
                <img :src="coin.image" class="w-6 h-6" />
                <span class="font-medium">{{ coin.name }}</span>

                <!-- Favorite -->
                <button
                  @click.stop="toggleFavorite(coin.id)"
                  class="text-yellow-400 text-lg"
                >
                  {{ isFavorite(coin.id) ? '⭐' : '☆' }}
                </button>
              </td>

              <td class="px-6 py-4">
                {{ coin.current_price.toLocaleString() }}
              </td>

              <td
                class="px-6 py-4 font-semibold"
                :class="coin.price_change_percentage_24h >= 0
                  ? 'text-green-600'
                  : 'text-red-600'"
              >
                {{ coin.price_change_percentage_24h.toFixed(2) }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards -->
      <div v-else class="md:hidden space-y-3">
        <div
          v-for="coin in paginatedCoins"
          :key="coin.id"
          @click="goToCoin(coin.id)"
          class="p-4 rounded-xl shadow bg-white dark:bg-gray-800
                cursor-pointer transition hover:scale-[1.01]"
        >
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center gap-2">
              <img :src="coin.image" class="w-6 h-6" />
              <span class="font-medium">{{ coin.name }}</span>
            </div>

            <button
              @click.stop="toggleFavorite(coin.id)"
              class="text-yellow-400 text-lg"
            >
              {{ isFavorite(coin.id) ? '⭐' : '☆' }}
            </button>
          </div>

          <div class="font-semibold">
            {{ coin.current_price.toLocaleString() }} USD
          </div>

          <div
            class="font-semibold"
            :class="coin.price_change_percentage_24h >= 0
              ? 'text-green-600'
              : 'text-red-600'"
          >
            {{ coin.price_change_percentage_24h.toFixed(2) }}%
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center mt-6 gap-2">
        <button @click="prevPage" class="px-2 py-1 rounded-lg border transition hover:bg-indigo-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed" :disabled="currentPage === 1">قبلی</button>
        <button
          v-for="p in paginationRange"
          :key="p"
          @click="currentPage = p"
          class="px-2 py-1 rounded-lg border transition hover:bg-indigo-600 hover:text-white"
          :class="p===currentPage?'bg-indigo-600 text-white':'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-200'"
        >
          {{ p }}
        </button>
        <button class="px-2 py-1 rounded-lg border transition hover:bg-indigo-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed" @click="nextPage" :disabled="currentPage === totalPages">بعدی</button>
      </div>
    </div>
  </Suspense>  
</template>
