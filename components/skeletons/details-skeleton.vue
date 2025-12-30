<template>
  <div class="p-4 max-w-5xl mx-auto animate-pulse space-y-6">
    <!-- Header -->
    <div class="flex gap-4 items-center">
      <div class="w-12 h-12 bg-gray-700 rounded-full"></div>
      <div class="space-y-2">
        <div class="w-40 h-4 bg-gray-700 rounded"></div>
        <div class="w-20 h-3 bg-gray-700 rounded"></div>
      </div>
    </div>

    <!-- Price Card -->
    <div class="bg-gray-800 rounded-xl p-4 space-y-3">
      <div class="w-32 h-6 bg-gray-700 rounded"></div>
      <div class="w-24 h-4 bg-gray-700 rounded"></div>
      <div class="w-48 h-3 bg-gray-700 rounded"></div>
    </div>

    <!-- Grid -->
    <div class="grid md:grid-cols-3 gap-4">
      <div v-for="i in 3" :key="i" class="h-20 bg-gray-800 rounded-xl"></div>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <div v-for="i in 2" :key="i" class="h-24 bg-gray-800 rounded-xl"></div>
    </div>
  </div>
</template>
