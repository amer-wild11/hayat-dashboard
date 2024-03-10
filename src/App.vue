<script setup>
import { RouterView } from 'vue-router'
import sidebar from '@/components/global/sideBar.vue'
import headerSec from './components/global/headerSec.vue'
import successMsg from './components/global/successMsg.vue'
import travelsFormVue from './components/dashboard/travelsForm.vue'
import deleteAlert from './components/global/deleteAlert.vue'
import errorMsg from './components/global/errorMsg.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

const store = useStore()

const router = useRouter()


router.afterEach(() => {
  store.state.sidebar = false
})

onMounted(() => {
  store.commit('getCountries')
  store.commit('getAll')
})
</script>

<template>
  <headerSec v-if="router.currentRoute.value.meta.global" />
  <sidebar v-if="router.currentRoute.value.meta.global" />
  <travelsFormVue />
  <deleteAlert />
  <errorMsg />
  <successMsg />
  <RouterView />
</template>

<style scoped lang="scss">
main {
  width: 100%;
  min-height: 100dvh;
  background-color: var(--background-color);
  padding: 10px;
  padding-left: calc(var(--sidebar-width) + 10px);
  padding-top: calc(var(--header-height) + 10px);
  color: black;
}
</style>
