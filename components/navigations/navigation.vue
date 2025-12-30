<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md md:hidden flex justify-around p-2">
    <NuxtLink to="/user/" class="flex flex-col items-center text-gray-700 hover:text-blue-600">
      <HomeIcon />
      <span class="text-xs">داشبورد</span>
    </NuxtLink>

    <NuxtLink to="/user/assets/" class="flex flex-col items-center text-gray-700 hover:text-blue-600">
      <WalletIcon />
      <span class="text-xs">پورتفو</span>
    </NuxtLink>

    <NuxtLink to="#" class="flex flex-col items-center text-gray-700 hover:text-blue-600">
      <PlusCircleIcon />
    </NuxtLink>

    <NuxtLink to="#" class="flex flex-col items-center text-gray-700 hover:text-blue-600">
      <ShoppingCartIcon />
      <span class="text-xs">بازار</span>
    </NuxtLink>

    <NuxtLink to="#" class=" flex flex-col items-center text-gray-700 hover:text-blue-600">
      <ProfileIcon />
      <span class="text-xs">پروفایل</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
    import HomeIcon from '~/components/icons/home-icon.vue'
    import WalletIcon from '~/components/icons/wallet-icon.vue'
    import PlusCircleIcon from '~/components/icons/plus-circle-icon.vue'
    import ShoppingCartIcon from '~/components/icons/shopping-cart-icon.vue'
    import ProfileIcon from '~/components/icons/profile-icon.vue';
</script>
