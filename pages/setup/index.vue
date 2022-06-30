<template>
  <div class="flex flex-col">
    <div class="my-4 grid grid-cols-12">
      <div class="col-span-6">
        <h3 class="text-gray-700 text-xl font-medium">Meus Robôs</h3>
      </div>
      <div class="col-span-6 flex justify-end">
        <nuxt-link to="/setup/new" class="h-10 inline-flex px-5 py-2 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Novo Robô
        </nuxt-link>
      </div>
    </div>    

    <div class="-my-2 sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="bg-white shadow border-b border-gray-200 sm:rounded-lg">
          <DataTable v-if="setups.length > 0" :value="setups" class="p-datatable-responsive" responsiveLayout="scroll">
            <Column header="Nome">
              <template #body="setup">
                <span class="p-column-title">Nome</span>
                {{ setup.data.name }}
              </template>
            </Column>
            <Column header="Magic Number">
              <template #body="setup">
                <span class="p-column-title">Magic Number</span>
                {{ setup.data.magicNumber }}
              </template>
            </Column>
            <Column header="Situação">
              <template #body="setup">
                <span class="p-column-title">Situação</span>
                <span v-if="setup.data.status.value == 'OPERATING'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-green-100">
                  {{ setup.data.status.text }}
                </span>
                <span v-if="setup.data.status.value == 'DEMONSTRATION'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-500 text-blue-100">
                  {{ setup.data.status.text }}
                </span>
                <span v-if="setup.data.status.value == 'DEVELOPMENT'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-900 text-gray-100">
                  {{ setup.data.status.text }}
                </span>
                <span v-if="setup.data.status.value == 'WAITING_REAL'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-500 text-yellow-100">
                  {{ setup.data.status.text }}
                </span>
                <span v-if="setup.data.status.value == 'WAITING_DEMO'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-500 text-purple-100">
                  {{ setup.data.status.text }}
                </span>
                <span v-if="setup.data.status.value == 'MAINTENANCE'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-red-100">
                  {{ setup.data.status.text }}
                </span>
                <span v-if="setup.data.status.value == 'STOPED'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-red-100">
                  {{ setup.data.status.text }}
                </span>
              </template>
            </Column>
            <Column header="Ações">
              <template #body="setup">
                <span class="p-column-title">Ações</span>
                <SplitButton label="Editar" class="p-button-secondary" @click="openEdit(setup.data)" :model="setup.data.actions"></SplitButton>
              </template>
            </Column>
          </DataTable>
          <div class="modal-confirmacao">
            <Dialog header="Confirmar a exclusão" :visible.sync="modalDelete" :style="{width: '350px'}">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem; color:red" />
                    <span>Deseja excluir o robô <b>#{{ rowDelete.name }}</b>?</span>
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
import SetupService from "~/service/SetupService.js"
import UtilService from "~/service/UtilService.js"
import _ from "lodash"

export default {
  middleware: 'auth',
  layout: 'app',
  data() {
		return {
      setups: [],
      firstEa: false,
      modalDelete: false,
			disableDownload: false,
      rowDelete: {
        id: ''
      },
      user: this.$auth.user
    }
  },
  head() {
      return {
        title: "Prezaty | Meus Robôs"  
      }
  },
  setupService: null,
  utilService: null,
  created() {
    this.setupService = new SetupService(this.$axios, this.$auth)
    this.utilService = new UtilService(this.$axios, this.$auth)
  },
  mounted() {
    this.setupList()
  },
  methods: {
    async setupList() {
      let response = await this.setupService.all()
      
      _.forEach(response, (value) => {
        value.actions = [
          {
            label: 'Editar',
            command: () => {
              this.openEdit(value)
            } 
          },
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
      })

			this.setups = response

      if (this.setups.length == 0) {
        this.firstEa = true
      }
    },
    newExpertAdvisor() {
      this.$router.push('/setup/new')
    },
    openEdit(row) {
      this.$router.push('/setup/' + row.id)
    },
    openBacktest(row) {
      this.$router.push('/setup/backtest/' + row.id)
    },
    openDashboard(row) {
      this.$router.push('/dashboard/?tradeMode=REAL&setupIds=' + row.id)
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
        let response = await this.setupService.delete(this.rowDelete.id);
        this.rowDelete = {
          id: ''
        };
        this.setupList();   
        this.$toast.add({severity:'success', detail:'O Robô foi excluído com sucesso.', life: 3000});
      } catch (err) {
        this.$toast.add({severity:'error', detail:'Não foi possível excluir o robô.', life: 3000});
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