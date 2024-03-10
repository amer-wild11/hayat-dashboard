<template>
  <div class="postNews" @submit.prevent="upload">
    <h2>post a new news</h2>
    <form>
      <div class="input">
        <span>news title</span>
        <input type="text" placeholder="title" required v-model="title" />
      </div>
      <div class="input">
        <span>news description</span>
        <textarea placeholder="description" required v-model="desc"></textarea>
      </div>
      <div class="thumbnail">
        <label class="input" for="thumbnailInput">
          <span>thumbnail</span>
          <fa-icon icon="image" />
          <input type="file" id="thumbnailInput" @change="setThumbnail" ref="thumbnailInput" />
        </label>
        <div class="thumbnailContainer" ref="thumbnailContainerWrapper">
          <img src="" alt="" ref="thumbnailContainer" />
        </div>
      </div>
      <div class="btn">
        <button
          v-html="store.state.newsModule.postButton"
          :class="['button', newsModule.canPost ? '' : 'cantPost']"
        ></button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const thumbnailContainer = ref('')
const thumbnailContainerWrapper = ref('')
const thumbnailInput = ref('')
const title = ref('')
const desc = ref('')
const newsModule = store.state.newsModule

const setThumbnail = (e) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    thumbnailContainer.value.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

const upload = () => {
  if (thumbnailInput.value.files.length < 1 && newsModule.canPost) {
    thumbnailContainerWrapper.value.style.borderColor = 'red'
  } else {
    let data = new FormData()
    data.append('title', title.value)
    data.append('desc', desc.value)
    data.append('thumbnail', thumbnailInput.value.files[0])
    store.commit('postNews', data)
  }
}
</script>

<style lang="scss" scoped>
.postNews {
  h2 {
    font-size: 30px;
    font-weight: bold;
    text-transform: capitalize;
  }
  form {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 40px;
    .input {
      display: flex;
      flex-direction: column;
      gap: 10px;
      text-transform: capitalize;
      span {
        font-size: 14px;
        font-weight: 600;
      }
      input,
      textarea {
        padding: 4px;
        width: 100%;
        height: 30px;
        background: rgba(18, 95, 183, 0.123);
        border: 1px solid rgba(18, 95, 183, 0.425);
        border-radius: 4px;
        &::placeholder {
          text-transform: capitalize;
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
      .input {
        width: 100%;
        height: 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 3px 10px;
        background: rgba(18, 95, 183, 0.123);
        border: rgba(18, 95, 183, 0.425) 1px solid;
        cursor: pointer;
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
    button {
      float: right;
    }
  }
}
</style>
