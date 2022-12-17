<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-8">
        <h4>
          Order Layanan - Cloud Hosting Starter
        </h4>
      </div>
      <div class="col-12 col-lg-8 mb-3">
        <div class="card p-4">
          <div class="row">
            <div class="col">
              <h6>
                Pilih Paket <br>
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
              <h6>
                Pilih Billing Cycle <br>
                <small>
                  Harga perpanjangan tetap sama
                </small>
              </h6>
              <div class="card p-3" :class="{'clickable':product, 'not-clickable text-secondary': product === null }" @click="showBilling">
                <h6 v-if="billing" class="mb-0">
                  {{ billing.labels }} - {{ billing.prefix }} {{ parseInt(billing.dt) | number }}
                </h6>
                <h6 v-else class="mb-0">
                  Pilih Billing
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div class="card p-4 mt-3">
          <div class="row">
            <div class="col-12">
              <b-alert :show="isErrorWhoIs" variant="danger">
                {{ messageWhoIs }}
              </b-alert>
            </div>
            <div class="col-12">
              <h6>
                Masukkan Domain untuk Layananmu
              </h6>
            </div>
            <div class="col-7 pr-0">
              <input v-model="domain" class="form-control" placeholder="Cari Domain" type="text">
            </div>
            <div class="col-3 pr-0">
              <multiselect
                v-model="tld"
                :options="tld_options"
                :show-labels="false"
                label="tld"
              >
                <template slot="option" slot-scope="props">
                  <div class="option__desc">
                    <span class="option__title">
                      .{{ props.option.tld }}
                      <b-badge variant="primary">{{ props.option.data.categories[0] }}</b-badge>
                    </span><br>
                    {{ currency.prefix }} {{ props.option.data.register[1] }}
                  </div>
                </template>
              </multiselect>
            </div>
            <div class="col-2 text-right">
              <b-button :disabled="isLoading || !tld" block variant="primary" @click="checkWhoIs">
                Cari
              </b-button>
            </div>
          </div>
        </div>
        <div class="card p-4 mt-3">
          <div class="row">
            <div class="col-12">
              <h6>
                Informasi Akun Pemesan
              </h6>
            </div>
            <div class="col-12">
              <div class="card clickable p-3" :class="{'bg-soft': loginMode}" @click="() => {loginMode = true, registerMode = false}">
                <h6 class="mb-0">
                  Saya sudah punya akun
                </h6>
              </div>
            </div>
            <b-collapse id="collapse-login" v-model="loginMode" class="mt-2 col-12">
              <div class="row">
                <div class="col-12">
                  <b-alert :show="isErrorLogin" variant="danger">
                    {{ messageLogin }}
                  </b-alert>
                </div>
                <div class="col-5 pr-0">
                  <input v-model="email" class="form-control" :readonly="userLogged" placeholder="Email" type="text">
                </div>
                <div class="col-5 pr-0">
                  <input v-model="password" class="form-control" :readonly="userLogged" placeholder="Password" type="password">
                </div>
                <div class="col-2 text-right">
                  <b-button v-if="!userLogged" :disabled="isLoading" block variant="primary" @click="login">
                    Login
                  </b-button>
                  <b-button v-else :disabled="isLoading" block variant="danger" @click="logout">
                    Logout
                  </b-button>
                </div>
              </div>
            </b-collapse>
            <div class="col-12">
              <hr>
            </div>
            <div class="col-12">
              <div class="card clickable p-3" :class="{'bg-soft': registerMode}" @click="() => {loginMode = false, registerMode = true}">
                <h6 class="mb-0">
                  Saya belum punya akun (daftar baru)
                </h6>
              </div>
            </div>
            <b-collapse id="collapse-login" v-model="registerMode" class="mt-2 col-12">
              <div class="row">
                <div class="col-6 pr-0">
                  <input v-model="email" class="form-control" placeholder="Email" type="text">
                </div>
                <div class="col-6 pr-0">
                  <input v-model="password" class="form-control" placeholder="Password" type="password">
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-6 pr-0">
                  <input v-model="firstname" class="form-control" placeholder="Nama Awal" type="text">
                </div>
                <div class="col-6 pr-0">
                  <input v-model="phonenumber" class="form-control" placeholder="Nama Akhir" type="text">
                </div>
                <div class="col-3 mt-2 text-right">
                  <b-button :disabled="isLoading" block variant="primary" @click="register">
                    Daftar
                  </b-button>
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card p-4">
          <h5>
            Ringkasan Pesanan
          </h5>
          <div class="row">
            <div class="col">
              <h6>
                Detail
              </h6>
            </div>
          </div>
          <b-alert v-if="!product" show variant="danger">
            Keranjang Masih Kosong
          </b-alert>
          <div v-else class="row">
            <div class="col">
              <h6>
                <small>
                  {{ product.name }}<br>
                  {{ billing ? billing.labels : '-' }}
                </small>
              </h6>
            </div>
            <div v-if="billing" class="col text-right">
              {{ billing.prefix }} {{ parseInt(billing.dt) | number }}
            </div>
            <div class="col-12">
              <hr>
            </div>
            <div class="col">
              <h6>
                Subtotal
              </h6>
            </div>
            <div class="col text-right">
              <h6 v-if="billing">
                {{ billing.prefix }} {{ parseInt(billing.dt) | number }}
              </h6>
            </div>
            <div class="col-12">
              <hr>
            </div>
            <div class="col">
              <h6>
                PPN @11%
              </h6>
            </div>
            <div class="col text-right">
              <h6 v-if="billing">
                {{ billing.prefix }} {{ (parseInt(billing.dt) * 0.11) + parseInt(billing.dt) | number }}
              </h6>
            </div>
            <div class="col-12 mt-2">
              <b-button :disabled="isLoading" block variant="primary" @click="order">
                Order
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modalProduct ref="product" @submit="onProductSelected" />
    <modalBilling ref="billing" :initial-options="product ? product.pricing.IDR: {}" @submit="onBillingSelected" />
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import modalProduct from '~/components/product.vue'
import modalBilling from '~/components/billing.vue'
export default {
  name: 'IndexPage',
  components: {
    Multiselect,
    modalProduct,
    modalBilling
  },
  data () {
    return {
      email: null,
      password: null,
      firstname: null,
      phonenumber: null,
      product: null,
      billing: null,
      domain: null,
      currency: null,
      messageWhoIs: null,
      messageLogin: null,
      messageRegister: null,
      messageToast: null,
      tld: null,
      userLogged: null,
      loginMode: true,
      registerMode: false,
      tld_options: [],
      checkWhoIs_endpoint: 'app/checkWhoIs',
      tld_endpoint: 'app/fetchTld',
      login_endpoint: 'app/login',
      register_endpoint: 'app/register',
      order_endpoint: 'app/order',
      isLoading: false,
      isError: false,
      isErrorWhoIs: false,
      isErrorLogin: false,
      isErrorRegister: false
    }
  },
  created () {
    this.fetchTld()
  },
  methods: {
    showProduct () {
      this.$refs.product.show()
    },
    showBilling () {
      if (this.product) {
        this.$refs.billing.show()
      }
    },
    onProductSelected (dt) {
      this.product = dt
    },
    onBillingSelected (dt) {
      this.billing = dt
    },
    checkWhoIs () {
      const vm = this
      this.isErrorWhoIs = false
      this.isLoading = true
      const params = {
        domain: vm.domain + '.' + this.tld.tld
      }
      this.$store.dispatch(this.checkWhoIs_endpoint, params)
        .then((rslt) => {
          vm.isErrorWhoIs = false
          if (rslt.status === 'error') {
            vm.messageWhoIs = 'Terjadi Kesalahan'
            vm.isErrorWhoIs = true
          }
          vm.isLoading = false
        }).catch((err) => {
          console.log('err', err)
          vm.isErrorWhoIs = true
          vm.isLoading = false
        })
    },
    fetchTld () {
      const vm = this
      this.isError = false
      this.isLoading = true
      this.$store.dispatch(this.tld_endpoint)
        .then((rslt) => {
          const temp = rslt.pricing
          this.currency = rslt.currency
          for (const key in temp) {
            this.tld_options.push({
              tld: key,
              data: temp[key]
            })
          }
          vm.isError = false
          vm.isLoading = false
        }).catch((err) => {
          console.log('err', err)
          vm.isError = true
          vm.isLoading = false
        })
    },
    login () {
      const vm = this
      this.isErrorLogin = false
      this.isLoading = true
      const params = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch(this.login_endpoint, params)
        .then((rslt) => {
          console.log('rslt: ', rslt)
          vm.isErrorLogin = false
          if (rslt.result === 'error') {
            vm.messageLogin = rslt.message
            vm.isErrorLogin = true
          }
          if (rslt.result === 'success') {
            vm.messageToast = 'Login Berhasil'
            vm.userLogged = rslt.userid
            vm.toast('b-toaster-bottom-right', true)
          }
          vm.isLoading = false
        }).catch((err) => {
          console.log('err', err)
          vm.isErrorLogin = true
          vm.isLoading = false
        })
    },
    logout () {
      this.userLogged = null
      this.email = null
      this.password = null
    },
    register () {
      const vm = this
      this.isErrorRegister = false
      this.isLoading = true
      this.userLogged = null
      const params = {
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        phonenumber: this.phonenumber
      }
      this.$store.dispatch(this.register_endpoint, params)
        .then((rslt) => {
          console.log('rslt: ', rslt)
          vm.isErrorRegister = false
          if (rslt.result === 'error') {
            vm.messageRegister = rslt.message
            vm.isErrorRegister = true
          }
          if (rslt.result === 'success') {
            vm.messageToast = 'Pendaftaran Berhasil'
            vm.loginMode = true
            vm.registerMode = false
            vm.password = null
            vm.firstname = null
            vm.phonenumber = null
            vm.toast('b-toaster-bottom-right', true)
          }
          vm.isLoading = false
        }).catch((err) => {
          console.log('err', err)
          vm.isErrorRegister = true
          vm.isLoading = false
        })
    },
    order () {
      if (!this.userLogged) {
        this.messageToast = 'Silahkan Login atau Daftar Terlebih dahulu'
        this.toast('b-toaster-bottom-right', true)
      } else {
        const vm = this
        this.isErrorOrder = false
        this.isLoading = true
        const params = {
          clientid: this.userLogged,
          pid: this.product.pid,
          billingcycle: this.billing.key
        }
        this.$store.dispatch(this.order_endpoint, params)
          .then((rslt) => {
            vm.isErrorOrder = false
            if (rslt.result === 'error') {
              vm.messageToast = 'Order Gagal'
              vm.toastError('b-toaster-bottom-right', true)
            }
            if (rslt.result === 'success') {
              vm.messageToast = 'Order Berhasil'
              vm.toast('b-toaster-bottom-right', true)
            }
            vm.isLoading = false
          }).catch((err) => {
            console.log('err', err)
            vm.isErrorOrder = true
            vm.isLoading = false
          })
      }
    },
    toast (toaster, append = false) {
      this.$bvToast.toast(this.messageToast, {
        title: 'Message',
        toaster,
        solid: true,
        variant: 'primary',
        appendToast: append
      })
    },
    toastError (toaster, append = false) {
      this.$bvToast.toast(this.messageToast, {
        title: 'Message',
        toaster,
        solid: true,
        variant: 'danger',
        appendToast: append
      })
    }
  }
}
</script>
