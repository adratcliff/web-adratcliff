<template>
  <div class="d-flex flex-column h-100">
    <div class="d-flex align-center ga-3 px-4 py-3">
      <v-avatar color="primary" variant="tonal" rounded="lg" size="40" class="flex-shrink-0">
        <v-icon :icon="route.meta.icon || 'mdi-information-outline'" size="22" />
      </v-avatar>

      <div class="flex-grow-1 min-w-0">
        <div class="text-subtitle-1 font-weight-bold text-truncate header-title">{{ name }}</div>
        <div v-if="status || info?.updated" class="d-flex align-center ga-2 header-meta">
          <v-chip
            v-if="status"
            :color="status.color"
            :prepend-icon="status.icon"
            :text="status.text"
            size="x-small"
            variant="tonal"
            label />
          <span v-if="info?.updated" class="text-disabled text-no-wrap updated">Updated {{ updated }}</span>
        </div>
      </div>

      <v-btn icon="mdi-close" size="small" variant="text" class="flex-shrink-0" @click="emit('close')" />
    </div>

    <v-divider />

    <div class="flex-grow-1 overflow-y-auto min-h-0 pa-4">
      <div v-if="!info" class="d-flex flex-column align-center text-center py-12">
        <v-icon icon="mdi-text-box-search-outline" size="48" class="text-disabled mb-3" />
        <p class="text-body-2 text-medium-emphasis">No information for this page yet.</p>
      </div>

      <template v-else>
        <p v-if="info.description" class="text-body-1 description mb-4">{{ info.description }}</p>

        <div v-if="info.tags?.length" class="d-flex flex-wrap ga-1 mb-6">
          <v-chip
            v-for="tag in info.tags"
            :key="tag"
            :text="tag"
            :color="tagColor(tag)"
            size="small"
            variant="tonal"
            label />
        </div>

        <section v-if="info.usage?.length" class="mb-6">
          <div class="section-title"><v-icon icon="mdi-play-circle-outline" size="16" />How to use</div>
          <div v-for="(step, i) in info.usage" :key="i" class="d-flex ga-3 step">
            <span class="step-number">{{ i + 1 }}</span>
            <span class="text-body-2">{{ step }}</span>
          </div>
        </section>

        <section v-for="list in lists" :key="list.title" class="mb-6">
          <div class="section-title"><v-icon :icon="list.icon" size="16" />{{ list.title }}</div>
          <div v-for="(item, i) in list.items" :key="i" class="d-flex ga-3 mb-2">
            <v-icon :icon="list.bullet" :color="list.color" size="18" class="mt-px" />
            <span class="text-body-2 text-medium-emphasis">{{ item }}</span>
          </div>
        </section>

        <section v-if="related.length" class="mb-6">
          <div class="section-title"><v-icon icon="mdi-link-variant" size="16" />Related</div>
          <v-list density="compact" nav class="pa-0">
            <v-list-item
              v-for="page in related"
              :key="page.meta.id"
              :prepend-icon="page.meta.icon"
              :title="page.meta.title"
              :to="page.path"
              append-icon="mdi-chevron-right"
              variant="tonal"
              rounded="lg"
              class="compact-icon mb-1"
              @click="emit('close')" />
          </v-list>
        </section>
      </template>
    </div>

    <template v-if="info?.links?.length">
      <v-divider />

      <v-list density="compact" nav class="flex-shrink-0 pa-3">
        <v-list-item
          v-for="link in info.links"
          :key="link.url"
          :href="link.url"
          :prepend-icon="link.icon || 'mdi-open-in-new'"
          :title="link.label"
          target="_blank"
          rel="noopener"
          variant="tonal"
          rounded="lg"
          class="compact-icon mb-1">
          <template #append>
            <v-chip
              v-if="link.chip"
              :text="link.chip"
              size="x-small"
              variant="outlined"
              class="font-mono me-2"
              label />
            <v-icon icon="mdi-arrow-top-right" size="16" />
          </template>
        </v-list-item>
      </v-list>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTheme } from 'vuetify';
import { storeToRefs } from 'pinia';

import { routes } from '@/router';
import { useAppStore } from '@/stores';
import pageInfo from '@/config/pageInfo';

const emit = defineEmits(['close']);

const { token } = storeToRefs(useAppStore());

const statuses = {
  live: { text: 'Live', color: 'success', icon: 'mdi-check-circle' },
  beta: { text: 'Beta', color: 'info', icon: 'mdi-flask-outline' },
  wip: { text: 'In progress', color: 'warning', icon: 'mdi-hammer-wrench' },
};

const tagColors = {
  'Vue 3': 'green',
  'Vuetify': 'light-blue',
  'Pinia': 'amber',
  'Vite': 'deep-purple',
  'Module Federation': 'indigo',
  'SCSS': 'pink',
  'AWS Lambda': 'orange',
  'DynamoDB': 'blue',
  'Terraform': 'purple',
  'Web Workers': 'teal',
  'Canvas API': 'cyan',
};

// Tags without a set colour get a stable one picked from their name
const fallbackColors = ['teal', 'indigo', 'pink', 'cyan', 'deep-orange', 'brown', 'blue-grey'];

// Tonal chips use the colour as text, so shift the shade to keep contrast against each theme's background
const theme = useTheme();
const tagColor = (tag) => {
  const hash = [...tag].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const base = tagColors[tag] || fallbackColors[hash % fallbackColors.length];
  return `${base}-${theme.current.value.dark ? 'lighten-2' : 'darken-2'}`;
};

const route = useRoute();

const info = computed(() => pageInfo[route.meta.id]);
const name = computed(() => info.value?.name || route.meta.title || 'Information');
const status = computed(() => statuses[info.value?.status]);

const updated = computed(() => new Date(info.value.updated)
  .toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }));

const lists = computed(() => [
  {
    title: 'Known limitations',
    icon: 'mdi-alert-outline',
    bullet: 'mdi-minus-circle-outline',
    color: 'warning',
    items: info.value?.limitations,
  },
  {
    title: 'Future improvements',
    icon: 'mdi-lightbulb-on-outline',
    bullet: 'mdi-plus-circle-outline',
    color: 'primary',
    items: info.value?.improvements,
  },
].filter(list => list.items?.length));

// Hide links to pages that are disabled or need a login the viewer doesn't have, matching the nav.
const related = computed(() => (info.value?.related || [])
  .map(id => routes.find(r => r.meta.id === id))
  .filter(r => {
    if (!r || r.meta.disabled) return false;
    if (r.meta.requirements?.includes('token') && !token.value) return false;
    return true;
  }));
</script>

<style lang="scss" scoped>
.min-w-0 {
  min-width: 0;
}

.min-h-0 {
  min-height: 0;
}

.header-title {
  line-height: 1.3;
}

.header-meta {
  min-height: 20px;
  margin-top: 2px;
}

.updated {
  font-size: 0.6875rem;
  font-weight: 400;
}

.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.mt-px {
  margin-top: 1px;
}

.description {
  line-height: 1.6;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.step {
  padding-bottom: 12px;
}

// Vuetify reserves a wide gap after list item icons; tighten it for the drawer's lists
.compact-icon :deep(.v-list-item__spacer) {
  width: 12px !important;
}

.step-number {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
  background: rgba(var(--v-theme-primary), 0.15);
  color: rgb(var(--v-theme-primary));
}
</style>
