<template>
  <main>
    <router-view></router-view>
    <div class="container" v-if="router.currentRoute.value.matched.length == 1">
      <header>
        <h3>travels</h3>
        <div class="search">
          <fa-icon icon="magnifying-glass" class="icon" />
          <input
            type="text"
            class="search"
            placeholder="Search"
            @input="searchInTarvels"
            v-model="search"
          />
        </div>
      </header>
      <div class="travelsContainer">
        <div
          class="travel"
          v-for="travel in travelsModule.travels.sort((a, b) => b.created_at - a.created_at)"
          :key="travel.id"
        >
          <div class="thumbnail">
            <img
              :src="store.state.url + '/' + travel.thumbnail.path"
              alt=""
              @error="handleImageError"
            />
          </div>
          <div class="content">
            <span class="landmark">{{ travel.landmark }}</span>
            <span class="country">{{ travel.country }}</span>
          </div>
          <div class="opts">
            <router-link :to="{ name: 'update', params: { travel_id: travel._id } }">
              <div class="update opt">
                <fa-icon icon="pen" />
              </div>
            </router-link>
            <div class="delete opt" @click="deleteTr(travel._id)">
              <fa-icon icon="trash" />
            </div>
          </div>
        </div>
        <h2 class="noThing noTravels" v-if="travelsModule.travels.length < 1">no travels</h2>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import io from 'socket.io-client'

const router = useRouter()
const store = useStore()
const socket = io(store.state.url)
const travelsModule = store.state.travelsModule
const travels = store.state.travelsModule.travels

socket.on('postTravel', (travel) => {
  store.state.travelsModule.travels.push(travel)
})

socket.on('travelDeleted', (id) => {
  let travelToDelete = travelsModule.travels.indexOf(
    travelsModule.travels.find((tr) => tr._id == id)
  )
  if (travelToDelete != -1) {
    travelsModule.travels.splice(travelToDelete, 1)
  }
})

socket.on('travelUpdated', (travel) => {
  let travelToUpdate = travelsModule.travels.indexOf(
    travelsModule.travels.find((tr) => tr._id == travel._id)
  )
  travelsModule.travels[travelToUpdate] = travel
})

const search = ref('')

const handleImageError = (e) => {
  e.target.onError = null
  e.target.src = 'https://i.imgur.com/tLBeBYm.png'
}

const deleteTr = (id) => {
  store.state.deleteMsg.active = true
  store.state.deleteMsg.id = id
  store.state.deleteMsg.message = 'your about to delete a travel from travels list'
  store.state.deleteMsg.deleteAction = 'deleteTravel'
}

const searchInTarvels = () => {
  let result = []
  if (search.value.trim() !== '') {
    let letters = search.value
      .toLowerCase()
      .split('')
      .filter((letter) => letter.trim() !== '')
    travelsModule.travels.forEach((travel) => {
      for (let letter of letters) {
        if (travel.landmark.toLowerCase().includes(letter)) {
          result.push(travel)
          break
        }
      }
    })
    result = Array.from(new Set(result))
    travelsModule.travels = result
  } else {
    travelsModule.travels = travels
  }
}
</script>

<style scoped lang="scss">
header {
  width: 100%;
  margin-bottom: 30px;
  h3 {
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
.travelsContainer {
  width: 100%;
  padding: 20px 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(1fr));
  gap: 20px;

  .travel {
    border-radius: 10px;
    position: relative;
    display: flex;
    gap: 10px;
    padding: 10px;
    transition: 0.2s;
    &:hover {
      background: rgba(211, 211, 211, 0.228);
    }
    .thumbnail {
      width: 120px;
      height: 80px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      padding: 4px;
      flex-grow: 1;
      .landmark {
        font-size: 19px;
        text-transform: capitalize;
        font-weight: 500;
      }
      .country {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.419);
        text-transform: capitalize;
        font-weight: 500;
      }
    }
    .opts {
      display: flex;
      align-items: center;
      gap: 10px;
      .opt {
        width: 60px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.063);
        cursor: pointer;
        transition: 0.2s;
        color: black;
        &:hover {
          color: white;
          &.update {
            background: rgb(24, 132, 24);
          }
          &.delete {
            background: rgb(150, 21, 21);
          }
        }
      }
    }
  }
}
</style>
