<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-8">
        <h4>
          Order Layanan - Cloud Hosting Starter
        </h4>
      </div>
      <div class="col-8">
        <div class="card p-4">
          <div class="row">
            <div class="col">
              <h6 class="mb-0">
                Pilih Paket
              </h6>
              <h6>
                <small>
                  Sesuaikan dengan kebutuhan anda
                </small>
              </h6>
              <div class="card p-3 clickable" @click="showProduct">
                <h6 class="mb-0">
                  {{ product ? product.name : 'Silahkan pilih produk' }}
                </h6>
              </div>
            </div>
            <div class="col">
              <h6 class="mb-0">
                Pilih Billing Cycle
              </h6>
              <h6>
                <small>
                  Harga perpanjangan tetap sama
                </small>
              </h6>
              <div class="card p-3 clickable" @click="showBilling">
                <h6 class="mb-0">
                  Tes
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card p-4">
          <h5>
            Ringkasan Pesanan
          </h5>
        </div>
      </div>
    </div>
    <modalProduct ref="product" @submit="onProductSelected" />
    <modalBilling ref="billing" :options="product ? product.price: []" @submit="onBillingSelected" />
  </div>
</template>

<script>
import modalProduct from '~/components/product.vue'
import modalBilling from '~/components/billing.vue'
export default {
  name: 'IndexPage',
  components: {
    modalProduct,
    modalBilling
  },
  data () {
    return {
      product: null
    }
  },
  methods: {
    showProduct () {
      this.$refs.product.show()
    },
    showBilling () {
      this.$refs.billing.show()
    },
    onProductSelected (dt) {
      this.product = dt
      console.log('product: ', this.product)
    }
  }
}
</script>
