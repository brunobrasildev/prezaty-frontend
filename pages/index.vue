<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div class="relative flex flex-col min-w-0 break-words w-full mb-6 border-0">
          <small><img src="~assets/images/logo3.png" alt="Tabler" class="w-2/4 mx-auto" /></small>
        </div>
        <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-50 border-0">
          <div class="rounded-t mb-0 px-6 py-4"></div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="text-center mb-3 font-bold">
              <small>Entrar na Plataforma</small>
            </div>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(enter)">
                <div class="relative w-full mb-3">
                  <ValidationProvider name="e-mail" rules="required|email" v-slot="{ errors }">
                    <label class="block uppercase text-xs font-bold mb-2" htmlFor="grid-password">E-mail</label>
                    <input v-model="login.email" v-lowercase-trim placeholder="E-mail" type="text" class="w-full placeholder-gray-400 p-inputtext p-component" />
                    <span v-show="errors.length > 0" class="text-xs text-red-600">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div class="relative w-full mb-3">
                  <ValidationProvider name="senha" rules="required" v-slot="{ errors }">
                    <label class="block uppercase text-xs font-bold mb-2" htmlFor="grid-password">Senha</label>
                    <input v-model="login.password" placeholder="Senha" type="password" class="w-full placeholder-gray-400 p-inputtext p-component" />
                    <span v-show="errors.length > 0" class="text-xs text-red-600">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <div class="text-center mt-6">
                  <button class="bg-blue-800 active:bg-blue-800 focus:bg-blue-400 text-sm text-white font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="submit">
                    Entrar
                  </button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "guest",
  layout: "auth",
  data() {
    return {
      login: {
        email: null,
        password: null,
      },
    };
  },
  head() {
      return {
        title: "Prezaty | Entrar na Plataforma"
      }
  },      
  methods: {
    async enter() {
      try {
        let response = await this.$auth.loginWith("local", { data: this.login });
        if (response.status == 200) {
          this.$router.push("/expert-advisor");
        } else {
          this.$toast.add({ severity: "error", detail: "Dados incorretos. Tente novamente.", life: 3000 });
        }
      } catch (err) {
        this.$toast.add({ severity: "error", detail: "Dados incorretos. Tente novamente.", life: 3000 });
      }
    },
  },
};
</script>
