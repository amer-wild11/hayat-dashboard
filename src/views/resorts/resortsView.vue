<template>
  <main>
    <router-view></router-view>
    <div class="container" v-if="$router.currentRoute.value.name == 'resorts'">
      <header>
        <h2>resorts</h2>
        <div class="search">
          <input type="search" placeholder="Search" @input="search" v-model="searchInput" />
          <fa-icon icon="magnifying-glass" class="icon" />
        </div>
      </header>
      <div class="resorts">
        <div class="resort" v-for="resort in resortsModule.resorts" :key="resort._id">
          <div class="thumbnail">
            <img :src="store.state.url + '/' + resort.thumbnail.path" alt="" />
          </div>
          <div class="content">
            <div class="name-offer">
              <span class="name">{{ resort.name }}</span>
            </div>
            <div class="location">
              <span>{{ resort.location }}</span>
            </div>
            <div class="opts">
              <div class="opt delete" @click="callDelete(resort._id)">
                <fa-icon icon="trash-can" />
              </div>
              <div
                class="opt update"
                @click="
                  $router.push(`/hotels&resorts/resorts/updateResort/${resort._id}`, {
                    name: 'updateResort',
                    params: { resort_id: resort._id }
                  })
                "
              >
                <fa-icon icon="pencil" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 class="noThing" v-if="resortsModule.resorts.length < 1">no resorts</h2>
    </div>
  </main>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
import socket from 'socket.io-client'

const store = useStore()
const resortsModule = store.state.resortsModule
const searchInput = ref('')
const resorts = ref('')
const io = socket(store.state.url)
resorts.value = store.state.resortsModule.resorts

io.on('postResort', (hotel) => {
  resortsModule.resorts.push(hotel)
})

io.on('resortDeleted', (id) => {
  let resorts = resortsModule.resorts
  let index = resorts.indexOf(resorts.find((r) => r._id == id))
  resortsModule.resorts.splice(index, 1)
})

io.on('resortUpdated', (resort) => {
  let resorts = resortsModule.resorts
  let index = resorts.indexOf(resorts.find((r) => r._id == resort._id))
  resortsModule.resorts[index] = resort
})

const callDelete = (id) => {
  let data = {
    message: `this action can't be undone are you sure you want to delete this resort`,
    id: id,
    active: true,
    returnRoute: '/hotels&resorts/resorts',
    deleteAction: 'deleteResort'
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
    resortsModule.resorts.forEach((resort) => {
      for (let letter of letters) {
        if (resort.name.toLowerCase().includes(letter)) {
          result.push(resort)
          break
        }
      }
    })
    result = Array.from(new Set(result))
    resortsModule.resorts = result
  } else {
    resortsModule.resorts = resorts.value
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
.resorts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  .resort {
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
