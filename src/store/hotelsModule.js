import axios from 'axios'
import store from '.'
import router from '@/router'

export default {
  state: {
    hotels: [],
    postButton: 'upload',
    updateButton: 'update',
    canPost: true,
    canUpdate: true
  },
  mutations: {
    getHotels(state) {
      axios
        .get(`${store.state.url}/hotels`)
        .then((res) => {
          state.hotels = res.data.hotels
          store.state.countersModule.counters.find((counter) => counter.name == 'hotels').count =
            res.data.hotels.length
        })
        .catch((err) => {
          handleError(err)
        })
    },
    postHotel(state, data) {
      state.canPost = false
      state.postButton = 'uploading..'
      axios
        .post(`${store.state.url}/hotels`, data, store.state.headers)
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          router.push('/hotels&resorts/hotels')
          state.canPost = true
          state.postButton = 'upload'
        })
        .catch((err) => {
          state.canPost = true
          handleError(err)
          state.postButton = 'upload'
        })
    },
    deleteHotel(state, id) {
      axios
        .delete(`${store.state.url}/hotels/${id}`, store.state.headers)
        .then((res) => {
          store.state.deleteMsg.active = false
          store.state.deleteMsg.canDelete = true

          store.commit('callSuccessMsg', res.data.message)
        })
        .catch((err) => {
          store.state.deleteMsg.canDelete = true
          handleError(err)
        })
    },
    updateHotel(state, data) {
      state.canUpdate = false
      state.updateButton = 'updating...'
      axios
        .patch(
          `${store.state.url}/hotels/${router.currentRoute.value.params.hotel_id}`,
          data,
          store.state.headers
        )
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          router.push('/hotels&resorts/hotels')
          state.canUpdate = true
          state.updateButton = 'update'
        })
        .catch((err) => {
          handleError(err)
          state.canUpdate = true
          state.updateButton = 'update'
        })
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
