<template>
  <header>
    <div class="burgerMenu">
      <div class="icon" @click="store.state.sidebar.sidebar = true">
        <fa-icon icon="bars" />
      </div>
    </div>
    <div class="logo-malamih">
      <img src="/f1.png" alt="" />
      <div class="text">
        <span class="company-name">malamih creative</span>
        <span class="dashboard-name">hayat dashboard 2024</span>
      </div>
    </div>
    <div class="profile">
      <RouterLink
        v-if="router.currentRoute.value.meta.postRoute"
        :to="router.currentRoute.value.meta.postRoute"
      >
        <div class="new">
          <fa-icon icon="square-plus" />
        </div>
      </RouterLink>
      <div class="logout" @click="logout">
        <fa-icon icon="arrow-right-from-bracket" />
      </div>
      <RouterLink to="/profile">
        <div class="user-image">
          <img src="/logo-9.png" alt="" />
        </div>
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: var(--background-color);
  border-bottom: 1px solid lightgray;
  z-index: 99;
  .burgerMenu {
    @media (min-width: 768px) {
      display: none;
    }
    .icon {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
  }
  .logo-malamih {
    display: flex;
    gap: 4px;
    @media (max-width: 767px) {
      display: none;
    }
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
    .text {
      display: flex;
      flex-direction: column;
      span {
        text-transform: capitalize;
      }
      .company-name {
        font-size: 15px;
        font-weight: 400;
        color: black;
      }
      .dashboard-name {
        font-size: 12px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.391);
      }
    }
  }
  .profile {
    &,
    .new {
      display: flex;
      align-items: center;
    }
    gap: 10px;
    .new {
      width: 30px;
      height: 30px;
      justify-content: center;
      color: black;
      font-size: 23px;
      cursor: pointer;
    }
    .logout {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      transition: 0.2s;
      cursor: pointer;
      &:hover {
        background-color: rgb(0, 153, 150);
        color: white;
      }
    }
  }
}
</style>
