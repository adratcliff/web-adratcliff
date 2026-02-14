<template>
  <v-app :theme="theme">
    <v-app-bar flat border>
      <v-app-bar-nav-icon
        v-if="$vuetify.display.mobile"
        @click="navDrawer = !navDrawer" />
      <v-btn v-else icon="mdi-home" variant="text" to="/" />

      <v-app-bar-title class="font-weight-bold">AD Ratcliff</v-app-bar-title>

      <v-spacer />

      <div class="d-flex align-center ga-2 px-2">
        <v-btn
          :icon="theme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          density="comfortable"
          variant="text"
          @click="toggleTheme" />

        <v-btn
          :icon="infoDrawer ? 'mdi-close' : 'mdi-information-outline'"
          density="comfortable"
          variant="text"
          @click="infoDrawer = !infoDrawer" />

        <v-divider vertical inset class="mx-2" />

        <v-btn v-if="!user.id" variant="flat" color="primary" @click="openLogin">
          <v-icon start>mdi-account-outline</v-icon>
          <span v-if="!$vuetify.display.mobile">Login</span>
        </v-btn>

        <v-menu v-else location="bottom end">
          <template #activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar :color="user.color" size="32">
                <span class="text-caption">{{ user.initials }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-logout" title="Logout" @click="logout" />
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="navDrawer"
      :permanent="!$vuetify.display.mobile"
      :rail="!$vuetify.display.mobile"
      expand-on-hover
      border>
      <v-list nav>
        <v-list-item
          v-for="route in navRoutes"
          :key="route.meta.id"
          :prepend-icon="route.meta.icon"
          :title="route.meta.title"
          :to="route.path"
          color="primary"
          rounded="lg" />
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="infoDrawer"
      :width="$vuetify.display.mobile ? $vuetify.display.width : 360"
      location="right"
      temporary
      border>
      <div class="d-flex flex-column h-100">
        <v-toolbar color="transparent" density="comfortable">
          <v-toolbar-title class="text-subtitle-1 font-weight-bold">Information</v-toolbar-title>
          <v-spacer />
          <v-btn icon="mdi-close" variant="text" @click="infoDrawer = false" />
        </v-toolbar>

        <v-divider />

        <v-container class="flex-grow-1">
          <p class="text-body-2 text-medium-emphasis">Random card text and helpful hints live here.</p>
        </v-container>

        <v-divider />

        <div class="pa-4">
          <v-btn block color="secondary" variant="tonal">Test Action</v-btn>
        </div>
      </div>
    </v-navigation-drawer>

    <login-dialog ref="loginDialog" />

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed, onMounted, ref, toRef } from 'vue';
import { storeToRefs } from 'pinia';

import { routes } from '@/router';
import { useAppStore } from '@/stores';
import { useUserStore } from '@/stores/users';

import LoginDialog from '@/components/LoginDialog.vue';

const theme = toRef(localStorage.getItem('adratcliff-pagetheme') || 'dark');
const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  localStorage.setItem('adratcliff-pagetheme', theme.value);
};

const navDrawer = toRef(true);
const infoDrawer = toRef(false);

const appStore = useAppStore();
const userStore = useUserStore();

const { token } = storeToRefs(appStore);
const { self: user } = storeToRefs(userStore);

const navRoutes = computed(() => routes
  .filter(route => {
    if (route.meta.disabled) return false;
    if (!route.meta.position) return false;
    if (route.meta.requirements) {
      if (route.meta.requirements.includes('token') && !token.value) return false;
    }
    return true;
  })
  .sort((a, b) => a.meta.position - b.meta.position));

const loginDialog = ref(null);
const openLogin = () => loginDialog.value.openLogin();
const logout = () => appStore.logout();

onMounted(async () => {
  appStore.pageLoad();
  await userStore.getDetail('self');
});
</script>

<style lang="scss" scoped>
.info-card {
  height: calc(100% - 102px);
}
</style>
