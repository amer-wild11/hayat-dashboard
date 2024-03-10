<template>
  <main>
    <router-view></router-view>
    <div class="container" v-if="$router.currentRoute.value.name == 'trips'">
      <header>
        <h2>trips</h2>
        <div class="search">
          <input type="search" placeholder="Search" @input="search" v-model="searchInput" />
          <fa-icon icon="magnifying-glass" class="icon" />
        </div>
      </header>
      <div class="trips">
        <div class="trip" v-for="trip in tripsModule.trips" :key="trip._id">
          <div class="thumbnail">
            <img :src="store.state.url + '/' + trip.thumbnail.path" alt="" />
          </div>
          <div class="content">
            <div class="name-offer">
              <span class="name">{{ trip.name }}</span>
            </div>
            <div class="location">
              <span>{{ trip.location }}</span>
            </div>
            <div class="opts">
              <div class="opt delete" @click="callDelete(trip._id)">
                <fa-icon icon="trash-can" />
              </div>
              <div
                class="opt update"
                @click="
                  $router.push(`/travel&tourism/trips/updateTrip/${trip._id}`, {
                    name: 'updateHotel',
                    params: { hotel_id: trip._id }
                  })
                "
              >
                <fa-icon icon="pencil" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 class="noThing" v-if="tripsModule.trips.length < 1">no trips</h2>
    </div>
  </main>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
import socket from 'socket.io-client'

const store = useStore()
const tripsModule = store.state.tripsModule
const searchInput = ref('')
const trips = ref('')
const io = socket(store.state.url)
trips.value = store.state.tripsModule.trips

io.on('postTrip', (trip) => {
  tripsModule.trips.push(trip)
})

io.on('tripDeleted', (id) => {
  let trips = tripsModule.trips
  let index = trips.indexOf(trips.find((t) => t._id == id))
  tripsModule.trips.splice(index, 1)
})

io.on('tripUpdated', (trip) => {
  let trips = tripsModule.trips
  let index = trips.indexOf(trips.find((t) => t._id == trip._id))
  tripsModule.trips[index] = trip
})

const callDelete = (id) => {
  let data = {
    message: `this action can't be undone are you sure you want to delete this trip`,
    id: id,
    active: true,
    returnRoute: '/travels&tourism/trips',
    deleteAction: 'deleteTrip'
  }
  store.commit('callDeleteOrder', data)
}

const search = () => {
  let result = []
  if (searchInput.value.trim() != '') {
    let letters = searchInput.value
      .toLowerCase()
      .split('')
      .filter((letter) => letter.trim() !== '')
    tripsModule.trips.forEach((trip) => {
      for (let letter of letters) {
        if (trip.name.toLowerCase().includes(letter)) {
          result.push(trip)
          break
        }
      }
    })
    result = Array.from(new Set(result))
    tripsModule.trips = result
  } else {
    tripsModule.trips = trips.value
  }
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  margin-bottom: 30px;
  h2 {
    font-size: 35px;
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 30px;
  }
  input {
    width: 100%;
    height: 40px;
    background: none;
    border: 1px solid lightgray;
    padding: 5px;
    border-radius: 5px;
    background: #e7f0f4;
    padding-left: 30px;
  }
  .search {
    position: relative;
    .icon {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      z-index: 1;
      color: rgba(0, 0, 0, 0.507);
    }
  }
}
.trips {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  .trip {
    min-height: 250px;
    border-radius: 4px;
    color: black;
    position: relative;
    padding: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid rgba(211, 211, 211, 0.508);
    cursor: pointer;
    .thumbnail {
      width: 100%;
      height: 130px;
      overflow: hidden;
      position: relative;
      z-index: 0;
      border-radius: 4px;
      box-shadow: 0 0 10px 2px lightgray;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .content {
      padding: 0 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      .name-offer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-transform: capitalize;
        .name {
          font-size: 25px;
          font-weight: bold;
        }
      }
      .location {
        display: flex;
        align-items: center;
        gap: 5px;
        flex: 1;
        span {
          font-size: 16px;
        }
      }
      .opts {
        display: flex;
        align-items: center;
        justify-content: end;
        gap: 10px;
      }
      .opt {
        float: right;
        width: 70px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        background: rgba(26, 132, 207, 0.259);
        font-size: 15px;
        color: rgb(40, 147, 235);
        transition: 0.2s;
        &:hover {
          color: white;
          &.delete {
            background: rgb(245, 93, 93);
          }
          &.update {
            background: rgb(53, 156, 25);
          }
        }
      }
    }
  }
}
</style>
