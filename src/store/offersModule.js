import axios from 'axios'
import store from '.'
import router from '@/router'

export default {
  state: {
    offers: [],
    offersForm: false,
    postButton: 'upload',
    updateButton: 'update'
  },
  mutations: {
    getOffers(state) {
      axios
        .get(`${store.state.url}/offers`)
        .then((res) => {
          state.offers = res.data.offers
          state.offers.forEach((of) => {
            of.dropdown = false
          })
          store.state.countersModule.counters.find((counter) => counter.name == 'offers').count =
            res.data.offers.length
        })
        .catch((err) => {
          handleError(err)
        })
    },
    postOffer(state, data) {
      state.postButton = 'uploading...'
      axios
        .post(`${store.state.url}/offers`, data, store.state.headers)
        .then((res) => {
          state.postButton = 'upload'
          store.commit('callSuccessMsg', res.data.message)
          router.push('/offers')
        })
        .catch((err) => {
          state.postButton = 'upload'
          handleError(err)
        })
    },
    deleteOffer() {
      axios
        .delete(
          `${store.state.url}/offers/${router.currentRoute.value.params.offer_id}`,
          store.state.headers
        )
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          store.state.deleteMsg.active = false
          store.state.deleteMsg.canDelete = true

          router.push('/offers')
        })
        .catch((err) => {
          store.state.deleteMsg.active = false
          handleError(err)
        })
    },
    updateOffer(state, data) {
      state.updateButton = 'updating...'
      axios
        .patch(
          `${store.state.url}/offers/${router.currentRoute.value.params.offer_id}`,
          data,
          store.state.headers
        )
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          router.push('/offers')
          state.updateButton = 'update'
        })
        .catch((err) => {
          state.updateButton = 'update'
          handleError(err)
        })
    },
    showOffersForm(state) {
      state.offersForm = true
    }
  }
}

function handleError(err) {
  if (typeof err.response.data.message != 'object') {
    store.commit('callErrMsg', err.response.data.message)
  } else if (!err.response || typeof err.response.data.message == 'object') {
    store.commit('callErrMsg', err.message)
  }
}
