<template>
  <div class="postVisa">
    <h2>post a new visa</h2>
    <form @submit.prevent="upload">
      <div class="group">
        <div class="input">
          <span>visa name</span>
          <input type="text" v-model="name" placeholder="name" />
        </div>
        <div class="input country">
          <span>visa country</span>
          <div class="select">
            <div class="countriesForm" ref="countiresFormEl">
              <div class="current" @click="countiresForm = !countiresForm">
                <div class="flag">
                  <img :src="currentCountry.flags.png" alt="" />
                  <span>{{ currentCountry.name.common }}</span>
                </div>
                <fa-icon icon="angle-down" v-if="countiresForm" />
                <fa-icon icon="angle-up" v-if="!countiresForm" />
              </div>
              <div class="countries" v-if="countiresForm">
                <div class="search">
                  <input type="text" placeholder="search" v-model="searchCountriesInput" />
                  <span @click="searchInCountries">search</span>
                </div>
                <div
                  class="country"
                  v-for="country in countries"
                  :key="country"
                  @click="[(currentCountry = country), (countiresForm = false)]"
                >
                  <img :src="country.flags.png" alt="" />
                  <span>{{ country.name.common }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="thumbnail">
        <span>visa thumbnail</span>
        <label for="visaThumb">
          <span>thumbnail</span>
          <fa-icon icon="image" />
          <input type="file" id="visaThumb" @change="thumbChanged" ref="thumbInput" />
        </label>
        <div class="thumbEl" ref="thumbContainer">
          <img src="" alt="" ref="thumbEl" />
        </div>
      </div>
      <div class="btn">
        <button
          :class="['button', visaModule.canPost ? '' : 'cantPost']"
          v-html="visaModule.postButton"
        ></button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const name = ref('')
const countiresForm = ref(false)
const countiresFormEl = ref('')
const searchCountriesInput = ref('')
const countries = ref('')
const visaModule = store.state.visaModule
countries.value = store.state.visaModule.countries
const currentCountry = ref('')
currentCountry.value = countries.value[0]

document.addEventListener('mousedown', (e) => {
  if (countiresFormEl.value && !countiresFormEl.value.contains(e.target)) {
    countiresForm.value = false
  }
})

const searchInCountries = () => {
  let result = []
  if (searchCountriesInput.value.trim() != '') {
    let letters = searchCountriesInput.value
      .toLowerCase()
      .split('')
      .filter((letter) => letter.trim() !== '')
    store.state.visaModule.countries.forEach((c) => {
      for (let letter of letters) {
        if (c.name.common.toLowerCase().includes(letter)) {
          result.push(c)
          break
        }
      }
      if (c.name.common.toLowerCase() == searchCountriesInput.value.toLowerCase()) {
        result = []
        result.push(c)
        countries.value = result
      }
    })
    result = Array.from(new Set(result))
    countries.value = result
  } else {
    countries.value = store.state.visaModule.countries
  }
}

const thumbInput = ref('')
const thumbEl = ref('')
const thumbContainer = ref('')

const thumbChanged = (e) => {
  let reader = new FileReader()
  reader.onload = (e) => {
    thumbEl.value.src = e.target.result
  }
  reader.readAsDataURL(e.target.files[0])
}

const upload = () => {
  if (thumbInput.value.files.length < 1) {
    thumbContainer.value.style.borderColor = 'red'
  } else {
    thumbContainer.value.style.borderColor = 'lightgray'
  }
  if (thumbInput.value.files.length > 0) {
    let data = new FormData()
    data.append('name', name.value)
    data.append('flag', currentCountry.value.flags.png)
    data.append('thumbnail', thumbInput.value.files[0])
    store.commit('postVisa', data)
  }
}
</script>

<style scoped lang="scss">
.postVisa {
  h2 {
    font-size: 30px;
    font-weight: bold;
    text-transform: capitalize;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 600px;
    margin-top: 50px;
    .group {
      display: flex;
      align-items: center;
      gap: 10px;
      @media (max-width: 425px) {
        flex-direction: column;
      }
      .input {
        width: 100%;
      }
    }
    .input {
      display: flex;
      flex-direction: column;
      gap: 10px;
      > span {
        font-size: 15px;
        font-weight: bold;
      }
      input {
        padding: 4px;
        height: 40px;
        border-radius: 4px;
        background: #1d850f20;
        border: 1px solid #1d850f20;
      }
    }
    button {
      float: right;
    }
    .country {
      .countriesForm {
        width: 100%;
        height: 40px;
        background: #1d850f20;
        display: flex;
        align-items: center;
        justify-content: start;
        border-radius: 5px;
        border: 1px solid #1d850f20;
        position: relative;
        cursor: pointer;
        .current {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          width: 100%;
          height: 100%;
          padding: 7px;
          .flag {
            display: flex;
            align-items: center;
            gap: 10px;
          }
        }
        img {
          width: 30px;
          height: 30px;
          object-fit: cover;
          border-radius: 5px;
        }
        .countries {
          position: absolute;
          top: 110%;
          right: 0;
          width: 100%;
          height: 200px;
          background: #e1f0e0;
          border: 1px solid #1d850fb4;
          border-radius: 4px;
          overflow: auto;
          z-index: 10;
          .search {
            padding: 5px 6px 0 5px;
            display: flex;
            align-items: center;
            gap: 10px;
            span {
              width: 100px;
              height: 30px;
              background: rgb(20, 152, 0);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              text-transform: capitalize;
              color: white;
              font-weight: 500;
              border-radius: 4px;
            }
          }
          input {
            padding: 3px;
            width: 100%;
            height: 35px;
            border-radius: 5px;
            background: rgb(255, 255, 255);
            &::placeholder {
              text-transform: capitalize;
            }
          }
          .country {
            width: 100%;
            height: 40px;
            padding: 3px;
            transition: 0.2s;
            display: flex;
            align-items: center;
            gap: 5px;
            &:hover {
              background: #1d850f2a;
              cursor: pointer;
            }
          }
        }
      }
      select {
        display: none;
        appearance: none;
      }
    }
    .thumbnail {
      display: flex;
      flex-direction: column;
      gap: 10px;
      > span {
        font-size: 14px;
        font-weight: bold;
        text-transform: capitalize;
      }
      label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 30px;
        padding: 5px;
        background: #1d850f20;
        border: #1d850f20 1px solid;
        border-radius: 4px;
        cursor: pointer;
        span {
          text-transform: capitalize;
        }
        input {
          display: none;
          appearance: none;
        }
      }
      .thumbEl {
        width: 100%;
        height: 200px;
        border-radius: 4px;
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
