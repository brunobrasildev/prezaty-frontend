<template>
  <div class="antialiased">
    <div class="page">
      <div class="content">
        <Toast />
        <Nuxt />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "~/layouts/render/Footer.vue";

export default {
  data() {
    return {};
  },
  components: {
    Footer: Footer,
  },
};
</script>
