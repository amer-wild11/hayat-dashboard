<template>
  <main>
    <router-view></router-view>
    <div class="container" v-if="$router.currentRoute.value.matched.length == 1">
      <h1>hotels and resorts</h1>
    </div>
  </main>
</template>
