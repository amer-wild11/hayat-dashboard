<template>
  <div class="updateNews" v-if="currentNews">
    <h2>update your news</h2>
    <form @submit.prevent="update">
      <div class="input">
        <span>title</span>
        <input type="text" v-model="title" />
      </div>
      <div class="input">
        <span>description</span>
        <textarea type="text" v-model="desc"></textarea>
      </div>
      <div class="thumbnail">
        <label for="thumbInput" class="input thumbnailInput">
          <span>thumbnail</span>
          <fa-icon icon="image" />
          <input type="file" id="thumbInput" ref="thumbnailInput" @change="thumbChanged" />
        </label>
        <div class="thumbnailContainer">
          <img :src="store.state.url + '/' + currentNews.thumbnail.path" alt="" ref="thumbnail" />
        </div>
      </div>
      <div class="btn">
        <button
          class="button"
          v-html="store.state.newsModule.updateButton"
          style="float: right"
        ></button>
      </div>
    </form>
  </div>
</template>

<script setup>
import newsModule from '@/store/newsModule'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const currentNews = ref('')
const thumbnailInput = ref('')
const thumbnail = ref('')
const title = ref('')
const desc = ref('')

currentNews.value = store.state.newsModule.news.find(
  (n) => n._id == router.currentRoute.value.params.news_id
)

if (!currentNews.value) {
  router.push('/news')
} else {
  title.value = currentNews.value.title
  desc.value = currentNews.value.desc
}

const thumbChanged = (e) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    thumbnail.value.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

const update = () => {
  if (newsModule.canUpdate) {
    let data = new FormData()
    data.append('title', title.value)
    data.append('desc', desc.value)
    data.append('thumbnail', thumbnailInput.value.files[0])
    store.commit('updateNews', data)
  }
}
</script>

<style lang="scss" scoped>
.updateNews {
  h2 {
    font-size: 30px;
    font-weight: 600;
    text-transform: capitalize;
  }
  form {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 90%;
    max-width: 600px;
    .input {
      display: flex;
      flex-direction: column;
      gap: 10px;
      span {
        font-size: 15px;
        font-weight: bold;
        text-transform: capitalize;
      }
      input,
      textarea {
        padding: 4px;
        border-radius: 4px;
        width: 100%;
        height: 30px;
        background: rgba(18, 115, 185, 0.083);
        border: 1px solid rgba(18, 115, 185, 0.793);
        &::placeholder {
          text-transform: capitalize;
          color: rgba(18, 115, 185, 0.793);
        }
      }
      textarea {
        height: 100px;
        resize: none;
      }
    }
    .thumbnail {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .thumbnailInput {
        width: 100%;
        height: 30px;
        border-radius: 5px;
        background-color: rgba(18, 115, 185, 0.083);
        border: 1px solid rgba(18, 115, 185, 0.793);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 4px 10px;
        cursor: pointer;
        color: rgba(18, 115, 185, 0.793);
        text-transform: capitalize;
        input {
          display: none;
          appearance: none;
        }
      }
      .thumbnailContainer {
        width: 100%;
        height: 200px;
        border: 2px dotted lightgray;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
