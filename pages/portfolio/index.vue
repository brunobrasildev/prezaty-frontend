<template>
  <div class="flex flex-col">
    <div class="my-4 grid grid-cols-12">
      <div class="col-span-6">
        <h3 class="text-gray-700 text-xl font-medium">Portfólio</h3>
      </div>
      <div class="col-span-6 flex justify-end">
        <nuxt-link to="/portfolio/new" class="h-10 inline-flex px-5 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Novo Portfólio
        </nuxt-link>
      </div>
    </div>    

    <div class="-my-2 sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="bg-white shadow border-b border-gray-200 sm:rounded-lg">
          <DataTable v-if="portfolios.length > 0" :value="portfolios" class="p-datatable-responsive" responsiveLayout="scroll">
            <Column header="Nome">
              <template #body="portfolio">
                <span class="p-column-title">Nome</span>
                {{ portfolio.data.name }}
              </template>
            </Column>
            <Column header="Data de Cadastro">
              <template #body="portfolio">
                <span class="p-column-title">Data de Cadastro</span>
                {{ portfolio.data.date | date }}
              </template>
            </Column>
            <Column header="Ações">
              <template #body="portfolio">
                <span class="p-column-title">Ações</span>
                <SplitButton label="Editar" icon="pi pi-pencil" class="p-button-secondary" @click="openEdit(portfolio.data)" :model="portfolio.data.actions"></SplitButton>
              </template>
            </Column>
          </DataTable>
          <div class="modal-confirmacao">
            <Dialog header="Confirmar a exclusão" :visible.sync="modalDelete" :style="{width: '350px'}">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem; color:red" />
                    <span>Deseja excluir o portólio <b>#{{ rowDelete.name }}</b>?</span>
                </div>
                <template #footer>
                    <Button label="Não" icon="pi pi-times" @click="closeDelete" class="p-button-text"/>
                    <Button label="Sim" icon="pi pi-check" @click="confirmDelete" class="p-button-danger" />
                </template>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PortfolioService from "~/service/PortfolioService.js"
import _ from "lodash"

export default {
  middleware: 'auth',
  layout: 'app',
  data() {
		return {
      portfolios: [],
      first: false,
      modalDelete: false,
      rowDelete: {
        id: ''
      }
    }
  },
  head() {
      return {
        title: "Prezaty | Meus Portólios"  
      }
  },
  portfolioService: null,
  created() {
    this.portfolioService = new PortfolioService(this.$axios, this.$auth)
  },
  mounted() {
    this.portfolioList()
  },
  methods: {
    async portfolioList() {
      this.portfolios = []
      let response = await this.portfolioService.all()
      
      _.forEach(response, (value) => {
        value.actions = [
          {
            label: 'Dashboard',
            command: () => {
              this.openDashboard(value)
            } 
          },
          {
            label: 'Backtest',
            command: () => {
              this.openBacktest(value)
            } 
          },
          {
            label: 'Excluir',
            command: () => {
              this.openDelete(value)
            } 
          }
        ]

        this.portfolios.push(value)
      })

      if (this.portfolios.length == 0) {
        this.first = true
      }
    },
    newPortfolio() {
      this.$router.push('/portfolio/new')
    },
    openEdit(row) {
      this.$router.push('/portfolio/' + row.id)
    },
    openBacktest(row) {
      this.$router.push('/portfolio/backtest/' + row.id)
    },
    openDashboard(row) {
      this.$router.push('/dashboard?tradeMode=REAL&portfolioIds=' + row.id)
    },
    openDelete(row) {
      this.rowDelete = row;
      this.modalDelete = true;
    },
    closeDelete() {
      this.modalDelete = false;
      this.rowDelete = {
        id: ''
      };
    },
    async confirmDelete() {
      this.modalDelete = false;
      try {
        let response = await this.portfolioService.delete(this.rowDelete.id);
        this.rowDelete = {
          id: ''
        };
        this.portfolioList();   
        this.$toast.add({severity:'success', detail:'O Portólio foi excluído com sucesso.', life: 3000});
      } catch (err) {
        this.$toast.add({severity:'error', detail:'Não foi possível excluir o portólio.', life: 3000});
      }
    }
  } 
}
</script>

<style>
.p-datatable-responsive .p-datatable-tbody > tr > td .p-column-title {
  display: none;
}

@media screen and (max-width: 40em) {
  .p-datatable-thead {
    display: none;
  }
  .p-datatable.p-datatable-responsive .p-datatable-tbody>tr>td .p-column-title {
      padding: .4rem;
      min-width: 30%;
      display: inline-block;
      margin: -.4em 1em -.4em -.4rem;
      font-weight: 700;
  }

  .p-datatable.p-datatable-responsive .p-datatable-tbody>tr>td {
      text-align: left;
      display: block;
      width: 100%;
      float: left;
      clear: left;
      border: 0 none;
  }
  
  .p-datatable.p-datatable-responsive .p-datatable-tbody>tr>td:last-child {
      border-bottom: 1px solid var(--surface-d);
  }
} 
</style>