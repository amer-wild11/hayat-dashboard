<template>
  <main>
    <router-view></router-view>
    <div class="container" v-if="$router.currentRoute.value.name == 'hotels'">
      <header>
        <h2>hotels</h2>
        <div class="search">
          <input type="search" placeholder="Search" @input="search" v-model="searchInput" />
          <fa-icon icon="magnifying-glass" class="icon" />
        </div>
      </header>
      <div class="hotels">
        <div class="hotel" v-for="hotel in hotelsModule.hotels" :key="hotel._id">
          <div class="thumbnail">
            <img :src="store.state.url + '/' + hotel.thumbnail.path" alt="" />
          </div>
          <div class="content">
            <div class="name-offer">
              <span class="name">{{ hotel.name }}</span>
            </div>
            <div class="location">
              <span>{{ hotel.location }}</span>
            </div>
            <div class="opts">
              <div class="opt delete" @click="callDelete(hotel._id)">
                <fa-icon icon="trash-can" />
              </div>
              <div
                class="opt update"
                @click="
                  $router.push(`/hotels&resorts/hotels/updateHotel/${hotel._id}`, {
                    name: 'updateHotel',
                    params: { hotel_id: hotel._id }
                  })
                "
              >
                <fa-icon icon="pencil" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 class="noThing" v-if="hotelsModule.hotels.length < 1">no hotels</h2>
    </div>
  </main>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
import socket from 'socket.io-client'

const store = useStore()
const hotelsModule = store.state.hotelsModule
const searchInput = ref('')
const hotels = ref('')
const io = socket(store.state.url)
hotels.value = store.state.hotelsModule.hotels

io.on('postHotel', (hotel) => {
  hotelsModule.hotels.push(hotel)
})

io.on('hotelDeleted', (id) => {
  let hotels = hotelsModule.hotels
  let index = hotels.indexOf(hotels.find((h) => h._id == id))
  hotelsModule.hotels.splice(index, 1)
})

io.on('hotelUpdated', (hotel) => {
  let hotels = hotelsModule.hotels
  let index = hotels.indexOf(hotels.find((h) => h._id == hotel._id))
  hotelsModule.hotels[index] = hotel
})

const callDelete = (id) => {
  let data = {
    message: `this action can't be undone are you sure you want to delete this hotel`,
    id: id,
    active: true,
    returnRoute: '/hotels&resorts/hotels',
    deleteAction: 'deleteHotel'
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
    hotelsModule.hotels.forEach((hotel) => {
      for (let letter of letters) {
        if (hotel.name.toLowerCase().includes(letter)) {
          result.push(hotel)
          break
        }
      }
    })
    result = Array.from(new Set(result))
    hotelsModule.hotels = result
  } else {
    hotelsModule.hotels = hotels.value
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
.hotels {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  .hotel {
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
