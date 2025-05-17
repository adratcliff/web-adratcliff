<template>
  <v-dialog
    v-model="loginDialog"
    width="450">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="3" />
          <v-col cols="6" class="d-flex align-center justify-center">
            Login
          </v-col>
          <v-col cols="3" class="d-flex align-center justify-end">
            <v-btn
              icon="mdi-close"
              variant="flat"
              size="small"
              @click="closeLogin" />
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="pt-8 pb-12">
        <v-row class="d-flex justify-center">
          <v-col cols="10">
            <v-row>
              <v-text-field
                v-model="email"
                label="Email"
                density="comfortable"
                @keydown.enter="login" />
            </v-row>
            <v-row>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                density="comfortable"
                @keydown.enter="login" />
            </v-row>
            <v-row>
              <v-btn
                :disabled="loginDisabled"
                :loading="!!loaders.login"
                variant="tonal"
                color="primary"
                class="w-100"
                size="large"
                @click="login">
                Login
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
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