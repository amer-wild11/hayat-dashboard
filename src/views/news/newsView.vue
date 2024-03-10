<template>
  <main>
    <RouterView />
    <div class="container" v-if="$router.currentRoute.value.matched.length == 1">
      <header>
        <h2>news</h2>
        <div class="search">
          <input type="search" placeholder="Search" @input="search" v-model="searchInput" />
          <fa-icon icon="magnifying-glass" class="icon" />
        </div>
      </header>
      <div class="newsContainer">
        <div class="news" v-for="news in allNews" :key="news">
          <div class="thumbnail">
            <img :src="store.state.url + '/' + news.thumbnail.path" alt="" @error="imageError" />
          </div>
          <div class="content">
            <span class="title">{{ news.title }}</span>
            <span class="desc"
              >{{ news.desc.slice(0, 100) }}{{ news.desc.length > 100 ? '...' : '' }}</span
            >
            <span class="date">{{ getDate(news.created_at) }}</span>
          </div>
          <div class="opts">
            <div class="opt delete" @click="callDelete(news._id)">
              <fa-icon icon="trash-can" />
            </div>
            <div
              class="opt update"
              @click="
                router.push(`/news/updateNews/${news._id}`, {
                  name: 'updateNews',
                  params: { news_id: news._id }
                })
              "
            >
              <fa-icon icon="pencil" />
            </div>
          </div>
        </div>
      </div>
      <h2 class="noThing" v-if="allNews.length < 1">no news</h2>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import socket from 'socket.io-client'
import { useRouter } from 'vue-router'
import getDate from '@/helpfulFunctions/getDate.js'

const router = useRouter()
const store = useStore()
const io = socket(store.state.url)
const newsModule = store.state.newsModule
const allNews = ref(store.state.newsModule.news)
const currentDropdown = ref('')
const currentNews = ref('')
const searchInput = ref('')

io.on('postNews', (news) => {
  allNews.value.push(news)
})

io.on('newsDeleted', (id) => {
  let index = allNews.value.indexOf(allNews.value.filter((n) => n._id == id))
  allNews.value.splice(index, 1)
})

io.on('newsUpdated', (news) => {
  let index = allNews.value.indexOf(allNews.value.find((n) => n._id == news._id))
  if (index != -1) {
    allNews.value[index] = news
  }
})

const search = () => {
  let result = []
  if (searchInput.value != '') {
    let letters = searchInput.value
      .toLowerCase()
      .split('')
      .filter((letter) => letter.trim() != '')
    newsModule.news.forEach((news) => {
      for (let letter of letters) {
        if (news.title.toLowerCase().includes(letter)) {
          result.push(news)
          break
        }
      }
    })
    result = Array.from(new Set(result))
    allNews.value = result
  } else {
    allNews.value = newsModule.news
  }
}

const callDelete = (id) => {
  let data = {
    active: true,
    message: 'you are about to delete news are you sure!',
    deleteAction: 'deleteNews',
    id: id,
    returnPath: '/news'
  }
  store.commit('callDeleteOrder', data)
}

document.addEventListener('click', (e) => {
  if (currentDropdown.value != '') {
    newsModule.news.forEach((news) => {
      if (news._id != currentNews.value._id) {
        news.dropdown = false
      }
    })
    if (
      !currentDropdown.value.contains(e.target) &&
      document.querySelector(`#${currentDropdown.value.id} .optsContainer`) &&
      !document.querySelector(`#${currentDropdown.value.id} .optsContainer`).contains(e.target)
    ) {
      currentNews.value.dropdown = false
    }
  }
})

const imageError = (e) => {
  e.target.onError = null
  e.target.src = 'https://i.imgur.com/tLBeBYm.png'
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
.newsContainer {
  display: flex;
  flex-direction: column;
  .news {
    width: 100%;
    display: flex;
    gap: 10px;
    position: relative;
    padding: 10px;
    transition: 0.2s;
    &:hover {
      background: rgba(25, 101, 128, 0.056);
    }
    .thumbnail {
      width: 110px;
      height: 70px;
      border-radius: 5px;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      font-family: 'Inter', sans-serif;
      flex: 1;
      .title {
        font-size: 20px;
        text-transform: capitalize;
      }
      .desc {
        max-width: 100%;
        font-size: 15px;
        flex: 1;
        color: rgba(0, 0, 0, 0.44);
      }
      .date {
        font-size: 14px;
        color: rgb(229, 99, 255);
      }
    }
    .opts {
      display: flex;
      align-items: center;
      gap: 10px;
      .opt {
        width: 70px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #2742f41c;
        border-radius: 4px;
        color: #2742f4d1;
        cursor: pointer;
        transition: 0.2s;
        &:hover {
          color: white;
          &.update {
            background: rgba(40, 130, 40, 0.935);
          }
          &.delete {
            background-color: rgb(240, 69, 69);
          }
        }
      }
    }
  }
}
</style>
