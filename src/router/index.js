import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'travels',
      component: () => import('../views/travels/travelsView.vue'),
      meta: {
        icon: 'plane',
        global: true,
        type: 'parent',
        sidebar: true,
        postRoute: '/postTravel'
      },
      children: [
        {
          path: '/:travel_id',
          name: 'update',
          component: () => import('../views/travels/updateForm.vue'),
          props: true,
          meta: {
            global: true,
            type: 'child',
            icon: 'plane',
            sidebar: false
          }
        },
        {
          path: 'postTravel',
          name: 'post',
          component: () => import('../views/travels/postTravel.vue'),
          props: true,
          meta: {
            global: true,
            type: 'child',
            icon: 'plane',
            sidebar: false
          }
        }
      ]
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginView.vue'),
      meta: {
        global: false,
        sidebar: false
      }
    },
    {
      path: '/offers',
      name: 'offers',
      component: () => import('../views/offers/offersView.vue'),
      meta: {
        global: true,
        icon: 'percent',
        type: 'parent',
        sidebar: true,
        postRoute: '/offers/postOffer'
      },
      children: [
        {
          path: 'postOffer',
          name: 'postOffer',
          component: () => import('../views/offers/postOffer.vue'),
          props: true,
          meta: {
            global: true,
            type: 'child',
            icon: 'plane',
            sidebar: false
          }
        },
        {
          path: 'offerDetails/:offer_id',
          name: 'offerDetails',
          component: () => import('../views/offers/offerDetails.vue'),
          props: true,
          meta: {
            global: true,
            type: 'child',
            icon: 'plane',
            sidebar: false
          }
        },
        {
          path: 'updateOffer/:offer_id',
          name: 'updateOffer',
          component: () => import('../views/offers/updateOffer.vue'),
          props: true,
          meta: {
            global: true,
            type: 'child',
            icon: 'plane',
            sidebar: false
          }
        }
      ]
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/news/newsView.vue'),
      meta: {
        global: true,
        icon: 'newspaper',
        type: 'parent',
        sidebar: true,
        postRoute: '/news/postNews'
      },
      children: [
        {
          path: 'postNews',
          name: 'postNews',
          component: () => import('../views/news/postNews.vue'),
          props: true,
          meta: {
            global: true,
            type: 'child',
            icon: 'plane',
            sidebar: false
          }
        },
        {
          path: 'updateNews/:news_id',
          name: 'updateNews',
          component: () => import('../views/news/updateNews.vue'),
          props: true,
          meta: {
            global: true,
            type: 'child',
            icon: 'plane',
            sidebar: false
          }
        }
      ]
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/services/servicesView.vue'),
      meta: {
        global: true,
        icon: 'handshake',
        type: 'parent',
        sidebar: true,
        postRoute: 'services/postService'
      },
      children: [
        {
          path: 'postService',
          name: 'postService',
          component: () => import('../views/services/postService.vue'),
          meta: {
            global: true,
            icon: 'handshake',
            type: 'parent',
            sidebar: false,
            postRoute: 'services/postServices'
          }
        },
        {
          path: 'updateServ/:serv_id',
          name: 'updateServ',
          component: () => import('../views/services/updateServ.vue'),
          meta: {
            global: true,
            icon: 'handshake',
            type: 'parent',
            sidebar: false,
            postRoute: 'services'
          }
        }
      ]
    },
    {
      path: '/hotels&resorts',
      name: 'hotels&resorts',
      component: () => import('../views/hotelsResorts/hotelsResorts.vue'),
      meta: {
        global: true,
        icon: 'suitcase-rolling',
        type: 'parent',
        sidebar: true,
        postRoute: ''
      },
      children: [
        {
          path: 'hotels',
          name: 'hotels',
          component: () => import('../views/hotels/hotelsView.vue'),
          meta: {
            global: true,
            icon: 'hotel',
            type: 'child',
            sidebar: true,
            postRoute: '/hotels&resorts/hotels/postHotel'
          },
          children: [
            {
              path: 'postHotel',
              name: 'postHotel',
              component: () => import('../views/hotels/postHotel.vue'),
              meta: {
                global: true,
                icon: 'handshake',
                type: 'parent',
                sidebar: false,
                postRoute: ''
              }
            },
            {
              path: 'updateHotel/:hotel_id',
              name: 'updateHotel',
              component: () => import('../views/hotels/updateHotel.vue'),
              meta: {
                global: true,
                icon: 'handshake',
                type: 'parent',
                sidebar: false
              }
            }
          ]
        },
        {
          path: 'resorts',
          name: 'resorts',
          component: () => import('../views/resorts/resortsView.vue'),
          meta: {
            global: true,
            icon: 'location-dot',
            type: 'child',
            sidebar: true,
            postRoute: '/hotels&resorts/resorts/postResort'
          },
          children: [
            {
              path: 'postResort',
              name: 'postResort',
              component: () => import('../views/resorts/postResort.vue'),
              meta: {
                global: true,
                icon: 'handshake',
                type: 'child',
                sidebar: false,
                postRoute: '/hotels&resorts/resorts'
              }
            },
            {
              path: 'updateResort/:resort_id',
              name: 'updateResort',
              component: () => import('../views/resorts/updateResort.vue'),
              meta: {
                global: true,
                icon: 'handshake',
                type: 'child',
                sidebar: false
              }
            }
          ]
        }
      ]
    },
    {
      path: '/travel&tourism',
      name: 'travel&tourism',
      component: () => import('../views/travelsTourism/travelsTourism.vue'),
      meta: {
        global: true,
        icon: 'fa-brands fa-usps',
        type: 'parent',
        sidebar: true,
        postRoute: null
      },
      children: [
        {
          path: 'destinations',
          name: 'destinations',
          component: () => import('../views/dests/destsView.vue'),
          meta: {
            global: true,
            icon: 'earth-africa',
            sidebar: true,
            postRoute: '/travel&tourism/destinations/postDest'
          },
          children: [
            {
              path: 'postDest',
              name: 'postDest',
              component: () => import('../views/dests/postDest.vue'),
              meta: {
                global: true,
                icon: 'handshake',
                type: 'child',
                sidebar: false
              }
            },
            {
              path: 'updateDest/:dest_id',
              name: 'updateDest',
              component: () => import('../views/dests/updateDest.vue'),
              meta: {
                global: true,
                icon: 'handshake',
                type: 'child',
                sidebar: false
              }
            }
          ]
        },
        {
          path: 'trips',
          name: 'trips',
          component: () => import('../views/trips/tripsView.vue'),
          meta: {
            global: true,
            icon: 'suitcase',
            sidebar: true,
            postRoute: '/travel&tourism/trips/postTrip'
          },
          children: [
            {
              path: 'postTrip',
              name: 'postTrip',
              component: () => import('../views/trips/postTrip.vue'),
              meta: {
                global: true,
                icon: 'handshake',
                type: 'child',
                sidebar: false
              }
            },
            {
              path: 'updateTrip/:trip_id',
              name: 'updateTrip',
              component: () => import('../views/trips/updateTrip.vue'),
              meta: {
                global: true,
                icon: 'handshake',
                type: 'child',
                sidebar: false
              }
            }
          ]
        }
      ]
    },
    {
      path: '/visa',
      name: 'visa',
      component: () => import('../views/visa/visaView.vue'),
      meta: {
        global: true,
        sidebar: true,
        icon: 'fa-brands fa-cc-visa',
        type: 'parent',
        postRoute: '/visa/postVisa'
      },
      children: [
        {
          path: 'postVisa',
          name: 'postVisa',
          component: () => import('@/views/visa/postVisa.vue'),
          meta: {
            global: true,
            sidebar: false,
            icon: 'fa-icon fa-cc-visa',
            type: 'child',
            postRoute: '/visa'
          }
        },
        {
          path: 'updateVisa/:visa_id',
          name: 'updateVisa',
          component: () => import('@/views/visa/updateVisa.vue'),
          meta: {
            global: true,
            sidebar: false,
            icon: 'fa-icon fa-cc-visa',
            type: 'child',
            postRoute: '/visa'
          }
        }
      ]
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: () => import('../views/tickets/ticketsView.vue'),
      meta: {
        global: true,
        icon: 'ticket',
        sidebar: true,
        type: 'parent',
        postRoute: 'tickets/postTicket'
      },
      children: [
        {
          path: 'postTicket',
          name: 'postTicket',
          component: () => import('@/views/tickets/postTicket.vue'),
          meta: {
            global: true,
            sidebar: false,
            icon: 'fa-icon fa-cc-visa',
            type: 'child',
            postRoute: '/ticket'
          }
        },
        {
          path: 'updateTicket/:ticket_id',
          name: 'updateTicket',
          component: () => import('@/views/tickets/updateTicket.vue'),
          meta: {
            global: true,
            sidebar: false,
            icon: 'fa-icon fa-cc-visa',
            type: 'child',
            postRoute: '/tickets'
          }
        }
      ]
    }
    // {
    //   path: '/profile',
    //   name: 'profile',
    //   component: () => import('../views/profileView.vue'),
    //   meta: {
    //     global: true,
    //     icon: 'user',
    //     sidebar: true,
    //     type: 'parent',
    //     postRoute: 'postTravel'
    //   }
    // }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.global != true && !localStorage.token) {
    return next()
  }
  if (to.meta.global == true && localStorage.token) {
    return next()
  }
  if (to.meta.global == true && !localStorage.token) {
    return next('/login')
  }
  if (to.meta.global != true && localStorage.token) {
    return next('/')
  }
})

function capitalizeText(text) {
  return text.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase()
  })
}

router.afterEach((to) => {
  document.title = capitalizeText(to.name)
})

export default router