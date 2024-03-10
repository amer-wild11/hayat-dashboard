import { createStore } from 'vuex'
import sidebar from './sidebar'
import successMsg from './successMsg.js'
import travelsModule from './travelsModule'
import offersModule from './offersModule'
import newsModule from './newsModule'
import servicesModule from './servicesModule'
import hotelsModule from './hotelsModule'
import resortsModule from './resortsModule'
import tripsModule from './tripsModule'
import destsModule from './destsModule'
import visaModule from './visaModule'
import ticketsModule from './ticketsModule'
import countersModule from './countersModule'
import errorMsg from './errorMsg'
import store from '.'

export default createStore({
  state: {
    user: localStorage.token ? JSON.parse(localStorage.user) : {},
    url: 'https://purring-sand-production.up.railway.app',
    headers: {
      headers: {
        Authorization: `Bearer ${localStorage.token ? localStorage.token : ''}`
      }
    },
    deleteMsg: {
      message: '',
      deleteAction: '',
      active: false,
      id: '',
      returnPath: '',
      canDelete: true
    }
  },
  mutations: {
    getAll() {
      store.commit('getTravels')
      store.commit('getOffers')
      store.commit('getNews')
      store.commit('getServices')
      store.commit('getHotels')
      store.commit('getResorts')
      store.commit('getTrips')
      store.commit('getDestinations')
      store.commit('getVisa')
      store.commit('getTickets')
      store.commit('getCountries')
    },
    getDate(state, date) {
      var currentTime = new Date()
      var givenTime = new Date(date)
      var timeDifference = +currentTime - +givenTime
      // Convert milliseconds to appropriate units
      var seconds = Math.floor(timeDifference / 1000)
      var minutes = Math.floor(seconds / 60)
      var hours = Math.floor(minutes / 60)
      var days = Math.floor(hours / 24)
      var months = Math.floor(days / 30)
      var years = Math.floor(months / 12)

      if (seconds < 60) {
        return 'Just now'
      } else if (minutes < 60) {
        return minutes + ' minute' + (minutes > 1 ? 's' : '') + ' ago'
      } else if (hours < 24) {
        return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago'
      } else if (days < 30) {
        return days + ' day' + (days > 1 ? 's' : '') + ' ago'
      } else if (months < 12) {
        return months + ' month' + (months > 1 ? 's' : '') + ' ago'
      } else {
        return years + ' year' + (years > 1 ? 's' : '') + ' ago'
      }
    },
    callDeleteOrder(state, data) {
      state.deleteMsg.active = data.active
      state.deleteMsg.deleteAction = data.deleteAction
      state.deleteMsg.message = data.message
      state.deleteMsg.id = data.id
      state.deleteMsg.returnPath = data.returnPath
    }
  },
  modules: {
    countersModule,
    sidebar,
    travelsModule,
    successMsg,
    offersModule,
    newsModule,
    servicesModule,
    hotelsModule,
    resortsModule,
    tripsModule,
    destsModule,
    visaModule,
    ticketsModule,
    errorMsg
  }
})
