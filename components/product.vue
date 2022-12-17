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
          <div v-for="(dt,i) in options" v-else :key="'o-' + i">
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
          this.options = rslt.products.product
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
