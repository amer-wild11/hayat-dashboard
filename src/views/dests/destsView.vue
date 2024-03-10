<template>
  <main>
    <router-view></router-view>
    <div class="container" v-if="$router.currentRoute.value.name == 'destinations'">
      <header>
        <h2>destinations</h2>
        <div class="search">
          <input type="search" placeholder="Search" @input="search" v-model="searchInput" />
          <fa-icon icon="magnifying-glass" class="icon" />
        </div>
      </header>
      <div class="dests">
        <div class="dest" v-for="dest in destsModule.dests" :key="dest._id">
          <div class="thumbnail">
            <img :src="store.state.url + '/' + dest.thumbnail.path" alt="" />
          </div>
          <div class="content">
            <div class="name-offer">
              <span class="name">{{ dest.name }}</span>
            </div>
            <div class="location">
              <span>{{ dest.location }}</span>
            </div>
            <div class="opts">
              <div class="opt delete" @click="callDelete(dest._id)">
                <fa-icon icon="trash-can" />
              </div>
              <div
                class="opt update"
                @click="
                  $router.push(`/travel&tourism/destinations/updateDest/${dest._id}`, {
                    name: 'updateHotel',
                    params: { hotel_id: dest._id }
                  })
                "
              >
                <fa-icon icon="pencil" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 class="noThing" v-if="destsModule.dests.length < 1">no destinations</h2>
    </div>
  </main>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
import socket from 'socket.io-client'

const store = useStore()
const destsModule = store.state.destsModule
const searchInput = ref('')
const dests = ref('')
const io = socket(store.state.url)
dests.value = store.state.destsModule.dests

io.on('postDest', (dest) => {
  destsModule.dests.push(dest)
})

io.on('destDeleted', (id) => {
  let dests = destsModule.dests
  let index = dests.indexOf(dests.find((d) => d._id == id))
  destsModule.dests.splice(index, 1)
})

io.on('destUpdated', (dest) => {
  let dests = destsModule.dests
  let index = dests.indexOf(dests.find((d) => d._id == dest._id))
  destsModule.dests[index] = dest
})

const callDelete = (id) => {
  let data = {
    message: `this action can't be undone are you sure you want to delete this destination`,
    id: id,
    active: true,
    returnRoute: '/travels&tourism/destinations',
    deleteAction: 'deleteDest'
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
    destsModule.dests.forEach((dest) => {
      for (let letter of letters) {
        if (dest.name.toLowerCase().includes(letter)) {
          result.push(dest)
          break
        }
      }
    })
    result = Array.from(new Set(result))
    destsModule.dests = result
  } else {
    destsModule.dests = dests.value
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
.dests {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  .dest {
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
