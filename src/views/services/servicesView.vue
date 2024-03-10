<template>
  <main>
    <router-view></router-view>
    <div class="container" v-if="$router.currentRoute.value.matched.length == 1">
      <header>
        <h2>services</h2>
        <div class="search">
          <input type="search" placeholder="Search" @input="search" v-model="searchInput" />
          <fa-icon icon="magnifying-glass" class="icon" />
        </div>
      </header>
      <div class="services">
        <div class="service" :id="`serv-for-${serv._id}`" v-for="serv in services" :key="serv._id">
          <div class="icon">
            <img :src="store.state.url + '/' + serv.image.path" alt="" @error="imageError" />
          </div>
          <span class="title">{{ serv.title }}</span>
          <span class="desc">{{ serv.desc }}</span>
          <div class="opts">
            <div
              class="opt update"
              @click="
                $router.push(`services/updateServ/${serv._id}`, {
                  name: 'updateServ',
                  params: { serv_id: serv._id }
                })
              "
            >
              <span>update</span>
            </div>
            <div class="opt delete" @click="showDelete(serv._id)">
              <span>delete</span>
            </div>
          </div>
        </div>
      </div>
      <h2 v-if="services.length < 1" class="noThing">no services</h2>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import socket from 'socket.io-client'

const store = useStore()
const servModule = store.state.servicesModule
const services = ref('')
const io = socket(store.state.url)
const searchInput = ref('')
services.value = servModule.services

io.on('postServ', (serv) => {
  services.value.push(serv)
})

io.on('servUpdated', (serv) => {
  let index = services.value.indexOf(services.value.find((s) => s._id == serv._id))
  index != -1 ? (services.value[index] = serv) : ''
})

io.on('servDeleted', (id) => {
  let index = services.value.indexOf(services.value.find((s) => s._id == id))
  index != -1 ? services.value.splice(index, 1) : ''
})

const showDelete = (id) => {
  let data = {
    active: true,
    message: 'you are about to delete this service this action can not be undone',
    deleteAction: 'deleteService',
    returnRoute: '/services',
    id: id
  }
  store.commit('callDeleteOrder', data)
}

const search = () => {
  if (searchInput.value != '') {
    let letters = searchInput.value
      .toLowerCase()
      .split()
      .filter((lt) => lt.trim() != '')

    let result = []
    services.value.forEach((serv) => {
      for (let letter of letters) {
        if (serv.title.toLowerCase().includes(letter)) {
          result.push(serv)
          break
        }
      }
    })
    result = Array.from(new Set(result))
    services.value = result
  } else {
    services.value = store.state.servicesModule.services
  }
}

const imageError = (e) => {
  e.target.onError = null
  e.target.src = ''
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
.services {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 40px;
  .service {
    border: 1px solid lightgray;
    padding: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    border-radius: 10px;
    transition: 0.2s;

    .icon {
      width: 80px;
      height: 80px;
      overflow: hidden;
      border-radius: 3px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .title {
      font-size: 25px;
      text-transform: capitalize;
      font-weight: 600;
    }
    .desc {
      font-size: 17px;
      color: rgba(0, 0, 0, 0.547);
    }
    .opts {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 10px;
      .opt {
        height: 30px;
        width: 70px;
        border-radius: 5px;
        background-color: rgba(0, 149, 255, 0.177);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        text-transform: capitalize;
        cursor: pointer;
        transition: 0.2s;
        span {
          font-weight: bold;
        }
        &:hover {
          &.update {
            background-color: rgba(45, 235, 45, 0.245);
          }
          &.delete {
            background: rgba(228, 23, 23, 0.219);
          }
        }
      }
    }
  }
}
</style>
