<template>
  <div class="updateServ" v-if="currentServ">
    <h2>update your service</h2>
    <form @submit.prevent="upload">
      <div class="input">
        <span>title</span>
        <input type="text" v-model="title" />
      </div>
      <div class="input">
        <span>description</span>
        <textarea type="text" v-model="desc"></textarea>
      </div>
      <div class="icon">
        <span>service icon</span>
        <label class="iconInput" for="iconInput">
          <span>icon for your service</span>
          <fa-icon icon="image" />
          <input type="file" id="iconInput" ref="iconInput" @change="iconChanged" />
        </label>
        <div class="iconContainer">
          <img :src="`${store.state.url}/${currentServ.image.path}`" alt="" ref="iconContainer" />
        </div>
      </div>
      <div class="btn">
        <button
          :class="['button', servicesMd.canUpdate ? '' : 'cantPost']"
          v-html="servicesMd.updateButton"
          style="float: right"
        ></button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const servicesMd = store.state.servicesModule
const title = ref('')
const desc = ref('')
const iconInput = ref('')
const iconContainer = ref('')

const currentServ = ref(
  servicesMd.services.find((serv) => serv._id == router.currentRoute.value.params.serv_id)
)

if (!currentServ.value) {
  router.push('/services')
} else {
  title.value = currentServ.value.title
  desc.value = currentServ.value.desc
}

const iconChanged = (e) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    iconContainer.value.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

const upload = () => {
  if (servicesMd.canUpdate) {
    let data = new FormData()
    data.append('title', title.value)
    data.append('desc', desc.value)
    if (iconInput.value.files.length > 0) {
      data.append('image', iconInput.value.files[0])
    }
    store.commit('updateService', data)
  }
}
</script>

<style lang="scss" scoped>
.updateServ {
  h2 {
    font-size: 30px;
    font-weight: bold;
    text-transform: capitalize;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 600px;
    width: 100%;
    margin-top: 50px;
    .input {
      display: flex;
      flex-direction: column;
      gap: 10px;
      text-transform: capitalize;
      span {
        font-weight: bold;
        font-size: 15px;
      }
      input,
      textarea {
        padding: 4px;
        border-radius: 4px;
        height: 30px;
        background: rgba(149, 183, 250, 0.101);
        border: rgb(29, 112, 168) 1px solid;
        &::placeholder {
          text-transform: capitalize;
          color: rgb(25, 127, 164);
        }
      }
      textarea {
        height: 100px;
        resize: none;
      }
    }
    .icon {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .iconInput {
        width: 100%;
        height: 30px;
        border: 1px solid rgb(25, 127, 164);
        background-color: rgba(149, 183, 250, 0.101);
        display: flex;
        align-items: center;
        padding: 5px;
        justify-content: space-between;
        text-transform: capitalize;
        color: rgb(25, 146, 170);
        border-radius: 5px;
        cursor: pointer;
        span {
          font-size: 15px;
        }
        input {
          display: none;
          appearance: none;
        }
      }
      .iconContainer {
        width: 150px;
        height: 150px;
        border-radius: 5px;
        overflow: hidden;
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
