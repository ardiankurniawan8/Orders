import axios from 'axios'

const app = {
  namespaced: true,
  state () {
    return {
      api: 'https://dev-whmcs.jagoanhosting.com/includes/api.php',
      identifier: 'PtDv1VQhJVD7R9MMIXGJwnGEZVKeiPn4',
      secret: 'TBaj037CcwJooS40iam0UHsEaVceBaWR'
    }
  },
  getters: {
  },
  mutations: {
    init (state) {
    }
  },
  actions: {
    login ({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/api/' + '?action=ValidateLogin&responsetype=json&identifier=' + state.identifier + '&secret=' + state.secret + '&email=' + payload.email + '&password2=' + payload.password, {},
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            },
            withCredentials: true
          })
          .then((resp) => {
            if (resp) {
              return resolve(resp.data)
            }
            //   reject(resp.data)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    register ({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/api/' + '?action=AddClient&responsetype=json&identifier=' +
         state.identifier +
         '&secret=' + state.secret +
         '&email=' + payload.email +
         '&password2=' + payload.password +
         '&firstname=' + payload.firstname +
         '&phonenumber=' + payload.phonenumber +
         '&address1=-' +
         '&city=-' +
         '&state=-' +
         '&country=ID' +
         '&postcode=-' +
         '&lastname=-', {},
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
          .then((resp) => {
            if (resp) {
              return resolve(resp.data)
            }
            //   reject(resp.data)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    order ({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/api/' + '?action=AddOrder&responsetype=json&identifier=' +
         state.identifier +
         '&secret=' + state.secret +
         '&clientid=' + payload.clientid +
         '&paymentmethod=banktransfer' +
         '&pid=' + payload.productid,
        '&billingcycle=' + payload.billingcycle,
        {},
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
          .then((resp) => {
            if (resp) {
              return resolve(resp.data)
            }
            //   reject(resp.data)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    fetchProduct ({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/api/' + '?action=GetProducts&responsetype=json&identifier=' + state.identifier + '&secret=' + state.secret, {},
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            },
            withCredentials: true
          })
          .then((resp) => {
            if (resp.data.result === 'success') {
              return resolve(resp.data)
            }
            //   reject(resp.data)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    fetchTld ({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/api/' + '?action=GetTLDPricing&responsetype=json&identifier=' + state.identifier + '&secret=' + state.secret, {},
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            },
            withCredentials: true
          })
          .then((resp) => {
            if (resp.data.result === 'success') {
              return resolve(resp.data)
            }
            //   reject(resp.data)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    checkWhoIs ({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/api/' + '?action=DomainWhois&responsetype=json&identifier=' + state.identifier + '&secret=' + state.secret + '&domain=' + payload.domain, {},
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            },
            withCredentials: true
          })
          .then((resp) => {
            if (resp) {
              return resolve(resp.data)
            }
            //   reject(resp.data)
          }).catch((err) => {
            reject(err)
          })
      })
    }
  }
}

export default app
