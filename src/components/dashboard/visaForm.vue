<template>
  <div class="visaForm" v-if="visaModule.visaForm">
    <div class="form">
      <div class="close" @click="visaModule.visaForm = false">
        <fa-icon icon="xmark" />
      </div>
      <div class="thumbnail">
        <label for="imageInput" ref="imageInputContainer" class="visaImage" @change="imageChagned">
          <input type="file" id="imageInput" ref="imageInput" />
          <span>visa image here</span>
          <fa-icon icon="image" />
        </label>
        <img src="/visa.png" alt="" ref="image" />
      </div>
      <div class="content">
        <input type="text" v-model="name" ref="nameInput" class="name" placeholder="Visa name" />
        <div class="flags" ref="flags">
          <div class="current" @click="visaModule.showCountries = !visaModule.showCountries">
            <img :src="currentCountry.flags.png" alt="flag" />
            <span>{{ currentCountry.name.common }}</span>
            <fa-icon icon="angle-down" />
          </div>
          <div class="allFlags" v-if="visaModule.showCountries">
            <input type="text" placeholder="Search" v-model="searchInput" @input="search" />
            <div
              class="flag"
              v-for="country in countries"
              :key="country"
              @click="setCurrent(country.name.common)"
            >
              <img :src="country.flags.png" alt="flag" />
              <span class="name">{{ country.name.common }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="btn">
        <button v-html="button" @click="upload"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const visaModule = store.state.visaModule

const imageInput = ref('')
const imageInputContainer = ref('')
const image = ref('')
const name = ref('')
const nameInput = ref('')
const button = ref('upload')
const flags = ref('')
const countries = ref([])
const currentCountry = ref(visaModule.countries[0])

const setCurrent = (name) => {
  currentCountry.value = visaModule.countries.find((country) => country.name.common == name)
  visaModule.showCountries = false
}

document.addEventListener('click', (e) => {
  if (visaModule.visaForm && flags.value && !flags.value.contains(e.target)) {
    visaModule.showCountries = false
  }
})

const searchInput = ref('')

onMounted(() => {
  countries.value = visaModule.countries
})

const search = () => {
  if (searchInput.value != '') {
    const letters = searchInput.value.split(' ').filter((letter) => letter.trim() !== '') // تصفية الفراغات الزائدة
    const searchResult = []
    visaModule.countries.forEach((country) => {
      for (let letter of letters) {
        if (letter != ' ') {
          if (country.name.common.toLowerCase().includes(letter.toLowerCase())) {
            searchResult.push(country)
          }
        }
      }
    })
    countries.value = searchResult
  } else {
    countries.value = visaModule.countries
  }
}

const imageChagned = (e) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    image.value.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

const upload = () => {
  if (name.value == '') {
    nameInput.value.style.borderColor = 'red'
  } else {
    nameInput.value.style.borderColor = 'lightgray'
  }
  if (imageInput.value.files.length < 1) {
    imageInputContainer.value.style.borderColor = 'red'
  } else {
    imageInputContainer.value.style.borderColor = 'lightgray'
  }
  if (name.value != '' && imageInput.value.files.length > 0) {
    let formData = new FormData()
    formData.append('name', name.value)
    formData.append('thumbnail', imageInput.value.files[0])
    formData.append('flag', visaModule.countries[visaModule.currentCountry].flags.png)
    store.commit('postVisa', formData)
  }
}
</script>

<style lang="scss" scoped>
.visaForm {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.34);
  display: flex;
  justify-content: center;
  padding-top: 100px;
  .form {
    width: 450px;
    height: 500px;
    background-color: white;
    border-top-right-radius: 30px;
    padding: 10px 20px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    position: relative;
    @media (max-width: 600px) {
      width: 80%;
    }
    .close {
      width: 30px;
      height: 30px;
      position: absolute;
      top: -30px;
      right: -30px;
      background: white;
      color: black;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .thumbnail {
      widows: 100%;
      height: 70%;
      position: relative;
      .visaImage {
        width: 140px;
        height: 140px;
        position: absolute;
        top: 50%;
        left: 50%;
        background: rgba(0, 0, 0, 0.268);
        border: 1.6px dotted lightgray;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        font-size: 18px;
        transform: translate(-50%, -50%);
        cursor: pointer;
        input {
          display: none;
          appearance: none;
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media (max-width: 500px) {
        flex-direction: column;
        align-items: start;
        justify-content: start;
        gap: 10px;
      }
      input {
        padding: 4px;
        border: 1px solid lightgray;
        background: none;
      }
      .flags {
        width: 180px;
        height: 30px;
        position: relative;
        input {
          padding: 3px;
          width: 100%;
          border: 1px solid rgb(161, 161, 161);
          background: rgb(255, 255, 255);
          position: sticky;
          top: 0;
          left: 0;
        }
        .current {
          padding: 4px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4px;
          color: black;
          font-size: 13px;
          scrollbar-gutter: stable;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid lightgray;
          background: rgba(0, 0, 0, 0.094);
          img {
            width: 30px;
            object-fit: cover;
          }
          .name {
            flex: 1;
          }
        }
        .allFlags {
          width: 100%;
          height: 200px;
          position: absolute;
          top: 100%;
          right: 0;
          overflow: auto;
          background-color: rgb(236, 236, 236);

          &::-webkit-scrollbar {
            width: 10px;
            background: rgb(255, 255, 255);
          }
          &::-webkit-scrollbar-thumb {
            background: lightgray;
            border-radius: 20px;
          }
          img {
            width: 30px;
            object-fit: cover;
          }
          .flag {
            display: flex;
            align-items: center;
            gap: 4px;
            color: black;
            padding: 4px 0;
            transition: 0.2s;
            cursor: pointer;
            &:hover {
              background: rgba(0, 0, 0, 0.17);
            }
            .name {
              font-size: 13px;
            }
          }
        }
      }
    }
    .btn {
      button {
        width: 100px;
        height: 30px;
        background: green;
        color: white;
        font-size: 14px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        float: right;
        margin-top: 10px;
      }
    }
  }
}
</style>
