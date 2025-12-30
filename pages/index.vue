

<template>
  <div class="min-h-screen bg-gradient-to-r from-purple-700 to-indigo-600 flex flex-col">
    <!-- Header -->
    <header class="p-6 flex justify-between items-center text-white">
      <h1 class="text-2xl font-bold">CryptoPlatform</h1>
      <nav class="space-x-4 flex gap-4">
         <NuxtLink to="/user/" class="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">ورود</NuxtLink>
         <NuxtLink to="/user/" class="bg-purple-500 px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition">ثبت‌نام</NuxtLink>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="flex-1 flex flex-col justify-center items-center text-center px-4">
      <h2 class="text-2xl md:text-5xl font-bold text-white mb-4">به دنیای ارز دیجیتال خوش آمدید</h2>
      <p class="text-white text-md md:text-xl max-w-xl mb-6">
        معاملات سریع، امن و ساده. با ما سرمایه‌گذاری هوشمند را تجربه کنید.
      </p>
      <div class="space-x-4 flex gap-4">
        <NuxtLink to="/user/" class="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">شروع کنید</NuxtLink>
         <NuxtLink to="/user/" class="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition">ورود</NuxtLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-white py-16">
      <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 class="text-2xl font-bold mb-2">امنیت بالا</h3>
          <p>دارایی‌های شما با بهترین پروتکل‌های امنیتی محافظت می‌شوند.</p>
        </div>
        <div>
          <h3 class="text-2xl font-bold mb-2">رابط کاربری ساده</h3>
          <p>مدیریت سرمایه و معاملات بدون پیچیدگی و با تجربه کاربری عالی.</p>
        </div>
        <div>
          <h3 class="text-2xl font-bold mb-2">پشتیبانی ۲۴/۷</h3>
          <p>همیشه در کنار شما هستیم تا بهترین تجربه را داشته باشید.</p>
        </div>
      </div>
    </section>
    <Navigation />
  </div>
</template>

<script setup>
    import Navigation from '~/components/navigations/navigation.vue';

    const handleLogin = () => {
    console.log("Login clicked")
    }

    const handleSignUp = () => {
    console.log("SignUp clicked")
    }
</script>