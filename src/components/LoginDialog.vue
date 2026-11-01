<template>
  <v-dialog
    v-model="loginDialog"
    max-width="420">
    <v-card rounded="lg">
      <v-toolbar color="transparent" density="comfortable">
        <v-toolbar-title class="text-subtitle-1 font-weight-bold">Login</v-toolbar-title>
        <v-spacer />
        <v-btn icon="mdi-close" variant="text" @click="closeLogin" />
      </v-toolbar>

      <v-divider />

      <v-form @submit.prevent="login">
        <v-card-text class="d-flex flex-column ga-4 pa-6">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            autocomplete="email"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            density="comfortable"
            hide-details
            autofocus />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            autocomplete="current-password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            density="comfortable"
            hide-details />
          <v-btn
            :disabled="loginDisabled"
            :loading="!!loaders.login"
            type="submit"
            :color="email && password ? 'primary' : undefined"
            variant="flat"
            size="large"
            block>
            Login
          </v-btn>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useAppStore } from '@/stores';
import { handleError } from '@/utils';
import { callApi } from '@/utils/api';
import { postLogin } from '@/endpoints';

const loaders = ref({ login: 0 });
const loginDialog = ref(false);
const email = ref('');
const password = ref('');

const openLogin = () => {
  email.value = '';
  password.value = '';
  loginDialog.value = true;
};

// eslint-disable-next-line no-undef
defineExpose({ openLogin });

const closeLogin = () => {
  loginDialog.value = false;
};

const loginDisabled = computed(() => {
  if (loaders.value.login) return true;
  if (!email.value || !password.value) return true;
  return false;
});

const appStore = useAppStore();

const login = async () => {
  if (!email.value || !password.value) return;
  loaders.value.login += 1;
  try {
    const { data: tokenRequest } = await callApi(postLogin({ email: email.value, password: password.value }));
    appStore.login(tokenRequest);
    closeLogin();
  } catch (err) {
    handleError('Error in token request', err);
  } finally {
    loaders.value.login -= 1;
  }
};
</script>