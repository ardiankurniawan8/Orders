<template>
  <div>
    <b-modal
      id="modalSelect"
      ref="modalSelect"
      v-model="state"
      centered
      no-fade
      hide-header
      hide-footer
      modal-class="fade scale"
      content-class="   rounded"
      title="BootstrapVue"
    >
      <div>
        <b-container class="mb-4">
          <div class="pt-4">
            <h6>
              <strong>
                {{ title }}
              </strong>
            </h6>
          </div>
          <template v-if="isLoading">
            <div v-for="dt in 3" :key="dt" class="row mb-2">
              <div class="col">
                <b-skeleton type="input" class="py-3" />
              </div>
            </div>
          </template>
          <div v-for="(dt,i) in defaultOptions" v-else :key="'o-' + i">
            <div
              class="row mx-0 card clickable mb-2 p-3"
              @click="onSelected(dt)"
            >
              <h6>
                {{ dt.name }}
              </h6>
            </div>
          </div>
        </b-container>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    title: {
      default: 'Pilih',
      type: String
    }
  },
  data () {
    return {
      input: null,
      state: false,
      options: [],
      defaultOptions: [
        {
          pid: 1,
          gid: 1,
          type: 'hostingaccount',
          name: 'Merdeka 1',
          slug: 'merdeka-1',
          product_url: 'http://dev-whmcs.jagoanhosting.com/index.php?rp=/store/cloud-hosting/merdeka-1',
          description: '',
          module: 'cpanel',
          paytype: 'recurring',
          pricing: {
            IDR: {
              prefix: 'Rp',
              suffix: ' IDR',
              msetupfee: '0.00',
              qsetupfee: '0.00',
              ssetupfee: '0.00',
              asetupfee: '0.00',
              bsetupfee: '0.00',
              tsetupfee: '0.00',
              monthly: '10000.00',
              quarterly: '30000.00',
              semiannually: '60000.00',
              annually: '120000.00',
              biennially: '240000.00',
              triennially: '360000.00'
            }
          },
          customfields: {
            customfield: []
          },
          configoptions: {
            configoption: []
          }
        }
      ],
      selected: null,
      endpoint: 'app/fetchProduct',
      isError: false,
      isLoading: false,
      debounce: null
    }
  },
  mounted () {
    if (this.initial) {
      this.input = this.initial
    }
  },
  methods: {
    onSearch () {
      if (this.debounce) {
        clearTimeout(this.debounce)
      }
      this.debounce = setTimeout(() => {
        this.fetchData()
      }, 1000)
    },
    fetchData () {
      const vm = this
      this.isError = false
      this.isLoading = true
      const params = {
        page: vm.page,
        search: vm.search
      }
      this.$store.dispatch(this.endpoint, params)
        .then((rslt) => {
          this.options = rslt.data.data.data
          this.total = rslt.data.data.total
          vm.isError = false
          vm.isLoading = false
        }).catch((err) => {
          console.log('err', err)
          //   vm.$store.commit('alert/setAlert', {
          //     type: 'fail',
          //     msg: 'Gagal Mengambil Data'
          //   })
          vm.isError = true
          vm.isLoading = false
        })
    },
    show () {
      this.state = true
      this.search = null
      this.fetchData()
    },
    reset () {
      this.input = null
      this.selected = null
    },
    onSelected (dt) {
      this.selected = dt
      this.$emit('submit', this.selected)
      this.state = false
    }
  }
}
</script>

<style>

</style>
