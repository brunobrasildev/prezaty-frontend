<template>
  <div class="flex items-center justify-center">
    <div class="font-sans bg-gray-50 flex flex-col min-h-screen w-full">
      <AppHeader />
    
      <div class="container mx-auto px-6 py-8">
        <Toast />
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "~/layouts/render/AppHeader.vue";

export default {
  data() {
    return {

    };
  },
  components: {
    AppHeader: AppHeader
  }
};
</script>