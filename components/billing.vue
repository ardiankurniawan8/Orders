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
          <div
            v-for="(dt, i) in options"
            :key="i"
          >
            <div
              v-if="parseInt(dt, i)"
              class="row mx-0 card clickable mb-2 p-3"
              @click="onSelected(dt, i)"
            >
              <h6>
                <strong>
                  {{ labels[i] }}<br>
                </strong>
                {{ options.prefix }} {{ dt | number }}
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
      default: 'Pilih Billing Cycle',
      type: String
    },
    initialOptions: {
      default: () => { return {} },
      type: Object
    }
  },
  data () {
    return {
      input: null,
      state: false,
      labels: {
        monthly: 'Bulanan',
        quarterly: '3 Bulanan',
        semiannually: '6 Bulanan',
        annually: 'Tahunan',
        biennially: '2 Tahunan',
        triennially: '3 Tahunan'
      },
      options: [],
      selected: null,
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
    show () {
      console.log('initialOptions: ', this.initialOptions)
      if (this.initialOptions) {
        this.options = this.initialOptions
      }
      this.state = true
    },
    reset () {
      this.input = null
      this.selected = null
    },
    onSelected (dt, i) {
      this.selected = {
        labels: this.labels[i],
        prefix: this.options.prefix,
        key: i,
        dt
      }
      this.$emit('submit', this.selected)
      this.state = false
    }
  }
}
</script>

<style>

</style>
