import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

const app = createApp(App)

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faAddressCard } from '@fortawesome/free-regular-svg-icons'
import { faTwitter, faUsps, faCcVisa } from '@fortawesome/free-brands-svg-icons'
import {
  faXmark,
  faGauge,
  faPlane,
  faAngleUp,
  faArrowRightFromBracket,
  faCheck,
  faPlus,
  faImage,
  faEllipsisVertical,
  faPen,
  faTrash,
  faPercent,
  faAngleDown,
  faNewspaper,
  faHotel,
  faEarthAfrica,
  faLocationDot,
  faHandshake,
  faSuitcase,
  faSuitcaseRolling,
  faMagnifyingGlass,
  faUser,
  faTicket,
  faAngleRight,
  faImages,
  faTrashCan,
  faPencil,
  faSquarePlus,
  faRectangleXmark,
  faStar,
  faFlag,
  faBars
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faXmark,
  faTwitter,
  faAddressCard,
  faGauge,
  faPlane,
  faAngleUp,
  faArrowRightFromBracket,
  faCheck,
  faPlus,
  faImage,
  faEllipsisVertical,
  faPen,
  faTrash,
  faPercent,
  faAngleDown,
  faNewspaper,
  faUsps,
  faHotel,
  faEarthAfrica,
  faLocationDot,
  faHandshake,
  faSuitcase,
  faSuitcaseRolling,
  faMagnifyingGlass,
  faUser,
  faCcVisa,
  faTicket,
  faAngleRight,
  faImages,
  faTrashCan,
  faPencil,
  faSquarePlus,
  faRectangleXmark,
  faStar,
  faFlag,
  faBars
)

app.component('fa-icon', FontAwesomeIcon)

app.use(store)
app.use(router)

app.mount('#app')
