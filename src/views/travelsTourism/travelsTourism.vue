<template>
  <main>
    <RouterView></RouterView>
    <div class="container" v-if="$router.currentRoute.value.matched.length == 1">
      <h1>travels and destinations</h1>
    </div>
  </main>
</template>
