import axios from 'axios'
import store from '.'
import router from '@/router'

export default {
  state: {
    visa: [],
    countries: [],
    canPost: true,
    canUpdate: true,
    postButton: 'upload',
    updateButton: 'update',
  },
  mutations: {
    getVisa(state) {
      axios
        .get(`${store.state.url}/visa`)
        .then((res) => {
          state.visa = res.data.visas
          store.state.countersModule.counters.find((counter) => counter.name == 'visa').count =
            res.data.visas.length
        })
        .catch((err) => {
          handleError(err)
        })
    },
    getCountries(state) {
      axios
        .get(`https://restcountries.com/v3.1/all`)
        .then((res) => {
          state.countries = res.data
        })
        .catch((err) => {
          handleError(err)
        })
    },
    postVisa(state, data) {
      state.postButton = 'uploading...'
      state.canPost = false
      axios
        .post(`${store.state.url}/visa`, data, store.state.headers)
        .then((res) => {
          state.postButton = 'upload'
          state.canPost = true
          store.commit('callSuccessMsg', res.data.message)
          router.push('/visa')
        })
        .catch((err) => {
          state.postButton = 'upload'
          state.canPost = true
          handleError(err)
        })
    },
    deleteVisa() {
      axios
        .delete(`${store.state.url}/visa/${store.state.deleteMsg.id}`, store.state.headers)
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          store.state.deleteMsg.active = false
          store.state.deleteMsg.canDelete = true
        })
        .catch((err) => {
          store.state.deleteMsg.canDelete = true
          handleError(err)
        })
    },
    updateVisa(state, data) {
      state.canUpdate = false
      state.updateButton = 'updating...'
      axios
        .patch(
          `${store.state.url}/visa/${router.currentRoute.value.params.visa_id}`,
          data,
          store.state.headers
        )
        .then((res) => {
          state.canUpdate = true
          store.commit('callSuccessMsg', res.data.message)
          router.push('/visa')
          state.updateButton = 'update'
        })
        .catch((err) => {
          state.canUpdate = true
          state.updateButton = 'update'
          handleError(err)
        })
    }
  }
}

function handleError(err) {
  if (typeof err === 'string') {
    store.commit('callErrMsg', err)
  } else if (err.response && err.response.data && err.response.data.message) {
    store.commit('callErrMsg', err.response.data.message)
  } else {
    store.commit('callErrMsg', 'An unknown error occurred.')
  }
}
