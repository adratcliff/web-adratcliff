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
import { defineAsyncComponent, h, defineProps, watch, shallowRef } from 'vue';

const props = defineProps({
  loader: {
    type: Function,
    required: true,
  },
  remoteProps: {
    type: Object,
    default: () => ({}),
  },
});

const AsyncRemote = shallowRef(null);

watch(() => props.loader, (newLoader) => {
  AsyncRemote.value = defineAsyncComponent({
    loader: newLoader,
    errorComponent: {
      render: () => h('div', 'Error: Could not connect to the remote application.')
    },
    timeout: 5000
  });
}, { immediate: true })

</script>