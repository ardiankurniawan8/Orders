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
    fetchProduct ({ state }, payload) {
      const params = {}

      if (payload) {
        params.action = 'GetProducts'
        params.responsetype = 'json'
        params.identifier = state.identifier
        params.secret = state.secret
      }
      //   const params = new FormData()

      //   params.append('action', 'GetProducts')
      //   params.append('responsetype', 'json')
      //   params.append('identifier', state.identifier)
      //   params.append('secret', state.secret)
      return new Promise((resolve, reject) => {
        axios.post(state.api + '?action=GetProducts&responsetype=json&identifier=' + state.identifier + '&secret=' + state.secret, {}, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
          .then((resp) => {
            if (resp.data.status) {
              return resolve(resp)
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
