<template>
  <Suspense>
    <template #default>
      <AsyncRemote v-bind="props.remoteProps" />
    </template>

    <template #fallback>
      <v-row>
        <v-col cols="12" class="d-flex justify-center mt-12">
          <v-progress-circular indeterminate color="primary" size="80" width="5" />
        </v-col>
      </v-row>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent, h, defineProps } from 'vue';

const props = defineProps({
  target: {
    type: Function,
    required: true,
  },
  remoteProps: {
    type: Object,
    default: () => ({}),
  },
});

const AsyncRemote = defineAsyncComponent({
  loader: props.target,
  errorComponent: {
    render: () => h('div', 'Error: Could not connect to the remote application.')
  },
  timeout: 5000
});
</script>