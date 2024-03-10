import axios from 'axios'
import store from '.'
import router from '@/router'

export default {
  state: {
    tickets: [],
    canPost: true,
    canUpdate: true,
    postButton: 'upload',
    updateButton: 'update'
  },
  mutations: {
    getTickets(state) {
      axios
        .get(`${store.state.url}/tickets`)
        .then((res) => {
          state.tickets = res.data.tickets
          store.state.countersModule.counters.find((counter) => counter.name == 'tickets').count =
            res.data.tickets.length
        })
        .catch((err) => {
          handleError(err)
        })
    },
    postTicket(state, data) {
      state.postButton = 'uploading...'
      state.canPost = false
      axios
        .post(`${store.state.url}/tickets`, data, store.state.headers)
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          state.postButton = 'upload'
          state.canPost = true
          router.push('/tickets')
        })
        .catch((err) => {
          state.canPost = true
          state.postButton = 'upload'
          handleError(err)
        })
    },
    deleteTicket() {
      axios
        .delete(`${store.state.url}/tickets/${store.state.deleteMsg.id}`, store.state.headers)
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
    updateTicket(state, data) {
      state.canUpdate = false
      state.updateButton = 'updating...'
      axios
        .patch(
          `${store.state.url}/tickets/${router.currentRoute.value.params.ticket_id}`,
          data,
          store.state.headers
        )
        .then((res) => {
          store.commit('callSuccessMsg', res.data.message)
          state.canUpdate = true
          router.push('/tickets')
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
