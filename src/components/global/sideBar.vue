<template>
  <div :class="['sidebar', store.state.sidebar ? 'show' : '']">
    <header>
      <div class="company">
        <img src="/f1.png" alt="" class="company_logo" />
        <div class="userData">
          <span class="name">malamih creative</span>
          <span class="dash-name">hayat dashboard 2024</span>
        </div>
      </div>
      <div class="close" @click="store.state.sidebar.sidebar = false">
        <fa-icon icon="xmark" />
      </div>
    </header>
    <ul class="routes">
      <li
        class="route"
        v-for="route in router
          .getRoutes()
          .filter(
            (route) =>
              route.meta.global == true && route.meta.type == 'parent' && route.meta.sidebar == true
          )"
        :key="route"
      >
        <RouterLink :to="route.path">
          <div class="before"></div>
          <fa-icon :icon="route.meta.icon" class="icon" />
          <span class="routeName">{{ route.name }}</span>
        </RouterLink>
        <ul class="children" v-if="route.children.length > 0">
          <li
            v-for="child in route.children.filter((child) => child.meta.sidebar == true)"
            :key="child"
            class="child"
          >
            <RouterLink :to="`${route.path}/${child.path}`">
              <div class="before"></div>
              <fa-icon :icon="child.meta.icon" class="icon" />
              <span class="routeName">{{ child.name }}</span>
            </RouterLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

</script>

<style lang="scss" scoped>
.mobile-display-none {
  @media (max-width: 767px) {
    display: none !important;
  }
}
.sidebar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: var(--sidebar-width);
  height: calc(100% - var(--header-height));
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: 0.2s;
  background: white;
  z-index: 99;
  @media (max-width: 767px) {
    width: 80%;
    height: 100dvh;
    overflow: auto;
    left: -100% !important;
    &.show {
      left: 0 !important;
    }
  }
  @media (max-width: 425px) {
    width: 100%;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    height: var(--header-height);
    padding: 0 10px;
    @media (min-width: 768px) {
      display: none;
    }
    .company {
      display: flex;
      align-items: center;
      gap: 3px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 3px;
        object-fit: cover;
      }
      .userData {
        display: flex;
        flex-direction: column;
        .name {
          font-size: 15px;
          text-transform: capitalize;
          font-weight: 400;
        }
        .dash-name {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.391);
          text-transform: capitalize;
        }
      }
    }
    .close {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
  }
  .routes {
    display: flex;
    flex-direction: column;
    gap: 15px;
    a {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 10px 0;
      padding-left: 20px;
      position: relative;
      text-transform: capitalize;
      transition: 0.1s;
      color: black;
      font-weight: 100;
      .icon,
      span {
        z-index: 2;
      }
      .icon {
        font-size: 17px;
        color: rgba(0, 0, 0, 0.872);
      }
      &.router-link-active {
        scale: 1;
        .before {
          background: #dcdcdc;
          width: 100%;
        }
      }
      .before {
        position: absolute;
        top: 0;
        left: 0%;
        width: 0%;
        height: 100%;
        z-index: -1;
        transition: 0.2s;
      }
    }
    .children {
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 5px;
      padding-right: 10px;
      padding-left: 30px;
      a {
        border-left: 2px solid lightgray;
        padding: 6px;
        &.router-link-active {
          border-left-color: rgb(49, 93, 181);
          .before {
            background: rgba(49, 93, 181, 0.222);
          }
        }
      }
    }
  }
  .profile {
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    .userData {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: start;
      line-height: 20px;
      flex: 1;
      .name {
        font-size: 16px;
        font-weight: 600;
      }
      .email {
        font-size: 13px;
      }
    }
    .icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: 0.2s;
    }
  }
}
</style>
