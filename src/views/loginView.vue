<template>
  <div class="login">
    <div class="loginFormContainer">
      <h3>sign in to hayat dashboard</h3>
      <form @submit.prevent="login">
        <div class="input">
          <label for="email">email</label>
          <input type="email" id="email" v-model="email" name="email" required />
        </div>
        <div class="input">
          <label for="password">password</label>
          <input
            :type="showPass ? 'text' : 'password'"
            id="password"
            ref="passwordInput"
            v-model="password"
            name="password"
            autocomplete="additional-name"
            required
          />
        </div>
        <div class="showPass">
          <input type="checkbox" @change="togglePass" id="showPass" name="showPass" />
          <label for="showPass">show password</label>
        </div>
        <div class="btn">
          <button v-html="loginBtn"></button>
        </div>
        <div :class="['err', error ? 'show' : '']">
          <span v-html="errorMsg"></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const showPass = ref(false)
const togglePass = (e) => {
  showPass.value = e.target.checked
}

const email = ref('')
const password = ref('')
const error = ref(false)
const errorMsg = ref('')
const loginBtn = ref('sign in')

const login = () => {
  loginBtn.value = 'sign in ...'
  const data = {
    email: email.value,
    password: password.value
  }
  axios
    .post(`${store.state.url}/users/login`, data)
    .then((res) => {
      loginBtn.value = 'signed in'
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      router.push('/')
      store.state.headers.headers.Authorization = `Bearer ${res.data.token}`
      store.state.user = res.data.user
    })
    .catch((err) => {
      error.value = true
      errorMsg.value = err.response.data.message
      loginBtn.value = 'sign in'
    })
}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--login-background);
  .loginFormContainer {
    width: 100%;
    max-width: 400px;
    height: 40dvh;
    background: var(--login-form-background);
    border-radius: 7px;
    color: var(--login-form-color);
    @media (max-width: 500px) {
      width: 90%;
    }
    h3 {
      text-transform: capitalize;
      padding: 10px 0;
      font-weight: 600;
      font-size: 24px;
      padding-bottom: 30px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .input {
        width: 100%;
        display: flex;
        flex-direction: column;
        text-transform: capitalize;
        gap: 6px;
        label {
          font-weight: 600;
        }
        input {
          width: 100%;
          padding: 5px;
          border-radius: 5px;
          border: 1px solid rgba(85, 164, 225, 0.154);
          background: rgba(85, 164, 225, 0.119);
          height: 35px;
          color: black;
          &::placeholder {
            color: rgb(178, 178, 178);
          }
        }
      }
      .btn {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 40px;
        button {
          width: 100%;
          height: 30px;
          font-size: 18px;
          font-weight: 500;
          background: rgb(25, 88, 140);
          color: white;
          border-radius: 4px;
          text-transform: capitalize;
          cursor: pointer;
          border: none;
        }
      }
      .forgetPw {
        text-transform: capitalize;
        text-decoration: underline;
        color: lightblue;
        cursor: pointer;
      }
      .showPass {
        display: flex;
        align-items: center;
        gap: 4px;
        user-select: none;
        label {
          cursor: pointer;
        }
        input {
          cursor: pointer;
          width: 16px;
          height: 16px;
        }
      }
      .err {
        text-transform: capitalize;
        color: rgb(244, 83, 83);
        font-size: 16px;
        transform: translateY(100%);
        opacity: 0;
        transition: 0.4s;
        &.show {
          transform: translateY(0%);
          opacity: 1;
        }
      }
    }
  }
}
</style>
