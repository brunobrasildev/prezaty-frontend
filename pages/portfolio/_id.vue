<template>
  <div class="flex flex-col">
    <div class="my-4 grid grid-cols-12">
      <div class="col-span-6">
        <h3 class="text-gray-700 text-xl font-medium">Cadastro de Portfólio</h3>
      </div>
      <div class="col-span-6 flex justify-end">
        <nuxt-link to="/portfolio" class="h-10 inline-flex px-5 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Portfólios
        </nuxt-link>
      </div>
    </div>

    <div class="-my-2 sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow p-5 bg-white border-b border-gray-200 sm:rounded-lg">
          <ValidationObserver ref="form">
            <form autocomplete="off" @submit.prevent="save()">
              <h2 class="text-lg mb-4 font-semibold">Portólio</h2>
              <div class="p-fluid p-formgrid p-grid">
                <div class="p-field p-col-12 p-md-6">
                  <ValidationProvider name="nome" rules="required" v-slot="{ errors }">
                    <label>Nome <em class="text-red-500">*</em></label>
                    <InputText maxlength="60" v-model="portfolio.name" type="text" />
                    <span v-show="errors.length > 0" class="text-xs text-red-600">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <h2 class="text-lg mb-4 font-semibold">Robôs</h2>
              <div class="p-fluid p-formgrid p-grid" v-for="(setup, index) in portfolio.setups" :key="setup.id">
                <div class="p-field p-col-11 p-md-3">
                  <ValidationProvider name="robô" rules="required" v-slot="{ errors }">
                    <label>Robô <em class="text-red-500">*</em></label>
                    <Dropdown v-model="setup.setupId" :options="setups" :filter="true" optionLabel="name" optionValue="id" placeholder="Selecione">
                      <template #option="slotProps">
                        <div>
                          <span>{{slotProps.option.name }} - {{slotProps.option.magicNumber }}</span>
                        </div>
                      </template>
                    </Dropdown>  
                    <span v-show="errors.length > 0" class="text-xs text-red-600">{{errors[0]}}</span>
                  </ValidationProvider>
                </div>
                <div class="p-field p-col-1 p-md-1 mt-6">
                  <Button @click="deleteSetup(index)" icon="pi pi-times" class="p-button-sm p-button-rounded p-button-text" />  
                </div>
              </div>
              <div class="p-fluid p-formgrid p-grid">     
                <div class="p-field p-col-12 p-md-1">         
                  <Button @click="addSetup()" icon="pi pi-plus" class="p-button-sm" label=" Robô" />
                </div>
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
import PortfolioService from "~/service/PortfolioService.js"
import SetupService from "~/service/SetupService.js"
import _ from "lodash"
import EnumService from "~/service/EnumService.js"

export default {
  middleware: "auth",
  layout: "app",
  async asyncData({ params, error }) {
    return {
      id: params.id,
      portfolio: {
        id: null,
        name: "",
        setups: [],
        setupsDeleted: []
      },
      setup: {
        id: null,
        setupId: null,
        label: null,
        magicNumber: null,
        type: null
      },
      blockUser: false,
      setupTypes: [],
      setups: [] 
    }
  },
  head() {
      return {
        title: "Prezaty | Cadastro de Portfólio"  
      }
  },
  setupService: null,
  portfolioService: null,
  enumService: null,
  created() {
    this.enumService = new EnumService(this.$axios, this.$auth)
    this.setupService = new SetupService(this.$axios, this.$auth)
    this.portfolioService = new PortfolioService(this.$axios, this.$auth)
  },
  mounted() {
    this.typeSetupList()
    this.setupList()

    if (this.id != "new") {
      this.getPortfolio(this.id)
    }   
  },
  methods: {
    addSetup() {
      this.portfolio.setups.push(_.clone(this.setup)) 
    },
    deleteSetup(index) {
      if (this.portfolio.setups[index].id != null) {
        this.portfolio.setupsDeleted.push(this.portfolio.setups[index].id)  
      }

      this.portfolio.setups.splice(index, 1)
    },
    selectSetupType(setup) {
      this.portfolio.setups.push(_.clone(this.setup))
    },
    async typeSetupList() {
      let response = await this.enumService.get("setup-type")
      this.setupTypes = response
    },
    async setupList() {
      let response = await this.setupService.all()
      this.setups = response
    },
    async getPortfolio(id) {
      let response = await this.portfolioService.byId(id)
      if (response.id) {
        this.portfolio = response
      } else {
        this.$toast.add({severity: "error", detail: "Portfólio não localizado.", life: 3000})
      }
    },
    async save() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return
        }

        let values = _.clone(this.portfolio)
        
        this.portfolioService
          .save(values)
          .then((response) => {
            this.$toast.add({severity: "success", detail: "O Portfólio foi salvo com sucesso.", life: 5000})
            this.$router.push("/portfolio")
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
  },
}
</script>
