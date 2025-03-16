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
                density="comfortable" />
            </v-row>
            <v-row>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                density="comfortable" />
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

<script>
import { computed, ref } from 'vue';
import { callApi } from '@/utils/api';
import { postLogin } from '@/endpoints';

export default {
  name: 'LoginDialog',
  setup(props, ctx) {
    const loaders = ref({ login: 0 });
    const loginDialog = ref(false);
    const email = ref('');
    const password = ref('');

    const openLogin = () => {
      email.value = '';
      password.value = '';
      loginDialog.value = true;
    };

    ctx.expose({ openLogin });

    const closeLogin = () => {
      loginDialog.value = false;
    };

    const loginDisabled = computed(() => {
      if (loaders.value.login) return true;
      if (!email.value || !password.value) return true;
      return false;
    })

    const login = async () => {
      if (!email.value || !password.value) return;
      loaders.value.login += 1;
      try {
        const { data: tokenRequest } = await callApi(postLogin({ email: email.value, password: password.value }));
        localStorage.setItem('adratcliff-user-token', tokenRequest.token);
        closeLogin();
      } catch (err) {
        console.warn('Error in token request', err);
      } finally {
        loaders.value.login -= 1;
      }
    };

    return {
      loaders,
      loginDialog,
      email,
      password,
      closeLogin,
      loginDisabled,
      login,
    };
  },
};
</script>