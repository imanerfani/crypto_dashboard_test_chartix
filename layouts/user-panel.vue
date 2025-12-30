<template>
  <div class="min-h-screen overflow-hidden flex flex-col">
    <Header />

    <div class="flex flex-1 flex-col md:flex-row overflow-hidden">
      <Sidebar class="mt-[60px]" />
      <main class="flex-1 p-4 bg-white h-[calc(100vh-160px)] mt-[60px] mb-[100px] overflow-y-auto">
        <slot />
      </main>
    </div>

    <Footer />
    <Navigation />
  </div>
</template>

<script setup>
    import Header from '~/components/headers/header.vue'
    import Sidebar from '~/components/sidebars/sidebar.vue'
    import Footer from '~/components/footers/footer.vue'
    import Navigation from '~/components/navigations/navigation.vue';
</script>
