<template>
  <Suspense>
    <template #default>
      <AsyncRemote v-bind="props.remoteProps" />
    </template>

    <template #fallback>
      <div class="loader-container">
        <v-progress-circular indeterminate color="primary" />
        <p>Loading Module...</p>
      </div>
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