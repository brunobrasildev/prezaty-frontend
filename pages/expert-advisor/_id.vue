<template>
  <div class="flex flex-col">
    <div class="my-4 grid grid-cols-12">
      <div class="col-span-6">
        <h3 class="text-gray-700 text-xl font-medium">Cadastro de Robô</h3>
      </div>
      <div class="col-span-6 flex justify-end">
        <nuxt-link to="/expert-advisor" class="h-10 inline-flex px-5 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Meus Robôs
        </nuxt-link>
      </div>
    </div>

    <div class="-my-2 sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow p-5 bg-white border-b border-gray-200 sm:rounded-lg">
          <ValidationObserver ref="form">
            <form autocomplete="off" @submit.prevent="save()">
              <div class="p-fluid p-formgrid p-grid mb-5">
                <div class="p-field p-col-12 p-md-6">
                  <ValidationProvider name="nome" rules="required" v-slot="{ errors }">
                    <label>Nome <em class="text-red-500">*</em></label>
                    <InputText maxlength="60" v-model="setup.name" type="text" />
                    <span v-show="errors.length > 0" class="text-xs text-red-600">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                </div>
                <div class="p-field p-col-12 p-md-3">
                  <ValidationProvider name="magig number" rules="required" v-slot="{ errors }">
                    <label>Magic Number <em class="text-red-500">*</em></label>
                    <InputText maxlength="20" v-model="setup.magicNumber" type="text" />
                    <span v-show="errors.length > 0" class="text-xs text-red-600">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                </div>
                <div class="p-field p-col-12 p-md-3">
                  <ValidationProvider name="situação" rules="required" v-slot="{ errors }">
                    <label>Situação <em class="text-red-500">*</em></label>
                    <Dropdown v-model="setup.status" :options="statusSetupEnum" optionLabel="text" optionValue="value" placeholder="Selecione" />
                    <span v-show="errors.length > 0" class="text-xs text-red-600">{{errors[0]}}</span>
                  </ValidationProvider>
                </div>
              </div>
              
              <div class="p-field p-col-12">
                <label>Anotações</label>
                <Editor v-model="setup.obs" editorStyle="height: 320px">
                  <template #toolbar>
                    <span class="ql-formats">
                      <select class="ql-font"></select>
                      <select class="ql-size"></select>
                    </span>
                    <span class="ql-formats">
                      <button class="ql-bold"></button>
                      <button class="ql-italic"></button>
                      <button class="ql-underline"></button>
                      <button class="ql-strike"></button>
                    </span>
                    <span class="ql-formats">
                      <select class="ql-color"></select>
                      <select class="ql-background"></select>
                    </span>
                    <span class="ql-formats">
                      <button class="ql-script" value="sub"></button>
                      <button class="ql-script" value="super"></button>
                    </span>
                    <span class="ql-formats">
                      <button class="ql-header" value="1"></button>
                      <button class="ql-header" value="2"></button>
                      <button class="ql-blockquote"></button>
                      <button class="ql-code-block"></button>
                    </span>
                    <span class="ql-formats">
                      <button class="ql-list" value="ordered"></button>
                      <button class="ql-list" value="bullet"></button>
                      <button class="ql-indent" value="-1"></button>
                      <button class="ql-indent" value="+1"></button>
                    </span>
                    <span class="ql-formats">
                      <button class="ql-direction" value="rtl"></button>
                      <select class="ql-align"></select>
                    </span>
                    <span class="ql-formats">
                      <button class="ql-link"></button>
                      <button class="ql-formula"></button>
                    </span>
                  </template>
                </Editor>
              </div>
              <Button type="submit" class="p-button-raised p-button-success" label="Salvar" />
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EnumService from "~/service/EnumService.js"
import SetupService from "~/service/SetupService.js"
import _ from "lodash"

export default {
  middleware: "auth",
  layout: "app",
  async asyncData({ params, error }) {
    return {
      id: params.id,
      setup: {
        id: null,
        name: "",
        magicNumber: "",
        obs: '',
        status: 'DEVELOPMENT',
      },
      statusSetupEnum: []
    }
  },
  head() {
      return {
        title: "Prezaty | Cadastro de Robô"  
      }
  },
  enumService: null,
  setupService: null,
  created() {
    this.enumService = new EnumService(this.$axios, this.$auth)
    this.setupService = new SetupService(this.$axios, this.$auth)
  },
  mounted() {
    this.enums()
    if (this.id != "new") {
      this.getSetup(this.id)
    }   
  },
  methods: {
    async getSetup(id) {
      let response = await this.setupService.byId(id)
      if (response.id) {
        this.setup = response
      } else {
        this.$toast.add({severity: "error", detail: "Robô não localizado.", life: 3000})
      }
    },
    async enums() {
      this.statusSetupEnum = await this.enumService.get("status-setup")
    },
    async save() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return
        }

        let values = _.clone(this.setup)

        this.setupService
          .save(values)
          .then((response) => {
            this.$toast.add({severity: "success", detail: "O Robô foi salvo com sucesso. Agora já pode fazer o download.", life: 5000})
            this.$router.push("/expert-advisor")
          })
          .catch((error) => {
            if (error.response) {
              this.$toast.add({severity: "error", detail: error.response.data.message, life: 5000})
            } else {
              this.$toast.add({severity: "error", detail: "Ocorreu um erro inesperado. Tente novamente mais tarde.", life: 5000})
            }
        })
      })
    },
    classRow(total) {
        let num = 12 / total
        return 'p-col-12 p-md-' + num
    }
  },
}
</script>
