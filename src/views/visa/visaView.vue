<template>
  <main>
    <router-view></router-view>
    <div class="container" v-if="$router.currentRoute.value.matched.length == 1">
      <header>
        <h2>your visas</h2>
        <div class="search">
          <input type="search" placeholder="Search" @input="search" v-model="searchInput" />
          <fa-icon icon="magnifying-glass" class="icon" />
        </div>
      </header>
      <div class="visas">
        <div class="visa" v-for="visa in visaMd.visa" :key="visa._id">
          <div class="thumbnail">
            <img :src="`${store.state.url}/${visa.thumbnail.path}`" alt="" />
          </div>
          <div class="content">
            <span>{{ visa.name }}</span>
            <img :src="visa.flag" alt="" />
          </div>
          <div class="opts">
            <div class="opt delete" @click="deleteVisa(visa._id)">
              <fa-icon icon="trash-can" />
            </div>
            <div
              class="opt update"
              @click="
                $router.push(`/visa/updateVisa/${visa._id}`, {
                  name: 'updateVisa',
                  params: { visa_id: visa._id }
                })
              "
            >
              <fa-icon icon="pencil" />
            </div>
          </div>
        </div>
      </div>
      <h2 class="noThing" v-if="visaMd.visa.length < 1">not visas</h2>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import socket from 'socket.io-client'

const store = useStore()
const visaMd = store.state.visaModule
const searchInput = ref('')
const visas = ref('')
const io = socket(store.state.url)
visas.value = store.state.visaModule.visa

io.on('postVisa', (visa) => {
  visaMd.visa.push(visa)
})

io.on('visaDeleted', (id) => {
  let visas = visaMd.visa
  let index = visas.indexOf(visas.find((v) => v._id == id))
  visaMd.visa.splice(index, 1)
})

io.on('visaUpdated', (visa) => {
  let visas = visaMd.visa
  let index = visas.indexOf(visas.find((v) => v._id == visa._id))
  visaMd.visa[index] = visa
})

const search = () => {
  let result = []
  if (searchInput.value.trim() != '') {
    let letters = searchInput.value
      .toLowerCase()
      .split('')
      .filter((letter) => letter.trim() !== '')
    visaMd.visa.forEach((visa) => {
      for (let letter of letters) {
        if (visa.name.toLowerCase().includes(letter)) {
          result.push(visa)
          break
        }
      }
    })
    result = Array.from(new Set(result))
    visaMd.visa = result
  } else {
    visaMd.visa = visas.value
  }
}

const deleteVisa = (id) => {
  let data = {
    message: `this action can't be undone are you sure you want to delete this visa`,
    id: id,
    active: true,
    returnRoute: '/visa',
    deleteAction: 'deleteVisa'
  }
  store.commit('callDeleteOrder', data)
}
</script>

<style scoped lang="scss">
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
.visas {
  display: flex;
  flex-direction: column;
  width: 100%;
  .visa {
    width: 100%;
    height: 120px;
    display: flex;
    gap: 10px;
    padding: 10px 5px;
    transition: 0.2s;
    &:hover {
      background: rgba(173, 216, 230, 0.121);
    }
    .thumbnail {
      width: 200px;
      height: 100%;
      border-radius: 3px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 4px 0;
      flex: 1;
      span {
        font-size: 20px;
        font-weight: bold;
      }
      img {
        width: 50px;
        height: 30px;
        object-fit: cover;
      }
    }
    .opts {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      .opt {
        width: 100px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        background: #e7f0f4;
        transition: 0.2s;
        cursor: pointer;
        &:hover {
          color: white;
          &.update {
            background: rgba(20, 136, 20, 0.612);
          }
          &.delete {
            background: rgba(238, 51, 51, 0.734);
          }
        }
      }
    }
  }
}
</style>
