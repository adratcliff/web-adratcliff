<template>
  <v-container class="home">
    <section class="d-flex flex-column flex-sm-row align-center ga-6 py-6">
      <v-avatar
        image="/img/face-1.png"
        color="light-green-lighten-3"
        class="primary-img border-lg border-background flex-shrink-0"
        size="140" />

      <div class="text-center text-sm-start">
        <p class="text-body-1 text-medium-emphasis intro">
          My playground for trying out new ideas and tech, which has turned into a collection of useful odds and ends.
          Every project is its own app, deployed independently and stitched together into this site on a serverless AWS backend.
          Everything here is open source, so feel free to dig into the code.
        </p>
      </div>
    </section>

    <section class="mt-6">
      <div class="d-flex align-center mb-4">
        <div class="section-title">
          <v-icon icon="mdi-folder-multiple-outline" size="18" />Projects
        </div>
        <v-spacer />
        <v-btn-toggle
          v-model="view"
          class="view-toggle"
          color="primary"
          selected-class="view-toggle-active"
          variant="text"
          mandatory>
          <v-btn value="cards" aria-label="Card view" title="Cards">
            <v-icon icon="mdi-view-grid-outline" size="18" />
          </v-btn>
          <v-btn value="table" aria-label="Table view" title="Table">
            <v-icon icon="mdi-table" size="18" />
          </v-btn>
        </v-btn-toggle>
      </div>

      <v-row v-if="view === 'cards'" dense>
        <v-col v-for="project in projectList" :key="project.repo" cols="12" sm="6" lg="4">
          <v-card class="d-flex flex-column h-100 pa-4" variant="tonal" rounded="lg">
            <div class="d-flex align-center ga-3 mb-1">
              <v-icon :icon="project.icon" size="20" class="text-medium-emphasis flex-shrink-0" />
              <div class="flex-grow-1 min-w-0 text-body-1 font-weight-medium text-truncate">{{ project.name }}</div>
              <v-chip
                :text="types[project.type].text"
                :color="typeColor(project.type)"
                class="flex-shrink-0"
                size="x-small"
                variant="tonal"
                label />
            </div>

            <p class="flex-grow-1 text-body-2 text-medium-emphasis mb-1">{{ project.description }}</p>

            <div class="d-flex align-center ga-1 actions">
              <v-btn
                :href="githubUrl(project.repo)"
                prepend-icon="mdi-github"
                text="GitHub"
                target="_blank"
                rel="noopener"
                size="small"
                variant="text" />
              <v-btn
                v-if="project.page"
                :to="project.page.path"
                append-icon="mdi-arrow-right"
                text="Open"
                color="primary"
                size="small"
                variant="text" />
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-table v-else density="comfortable" class="bg-transparent">
        <thead>
          <tr>
            <th>Project</th>
            <th>Type</th>
            <th class="d-none d-md-table-cell">Description</th>
            <th colspan="2" class="text-end">Links</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projectList" :key="project.repo">
            <td>
              <div class="d-flex align-center ga-3">
                <v-icon :icon="project.icon" size="20" class="text-medium-emphasis" />
                <span class="font-weight-medium text-no-wrap">{{ project.name }}</span>
              </div>
            </td>
            <td>
              <v-chip
                :text="types[project.type].text"
                :color="typeColor(project.type)"
                size="x-small"
                variant="tonal"
                label />
            </td>
            <td class="d-none d-md-table-cell text-body-2 text-medium-emphasis">{{ project.description }}</td>
            <!-- Separate cells keep the GitHub icons aligned when a row has no Open link -->
            <td class="text-end pe-0 link-cell">
              <v-btn
                v-if="project.page"
                :to="project.page.path"
                :aria-label="`Open ${project.name}`"
                icon="mdi-arrow-right"
                color="primary"
                size="small"
                variant="text" />
            </td>
            <td class="text-end ps-0 link-cell">
              <v-btn
                :href="githubUrl(project.repo)"
                :aria-label="`${project.name} on GitHub`"
                icon="mdi-github"
                target="_blank"
                rel="noopener"
                size="small"
                variant="text" />
            </td>
          </tr>
        </tbody>
      </v-table>
    </section>
  </v-container>
</template>

<script setup>
import { computed, toRef, watch } from 'vue';
import { useTheme } from 'vuetify';

import { canAccess, routes } from '@/router';
import projects, { githubUrl } from '@/config/projects';

const view = toRef(localStorage.getItem('adratcliff-projectview') || 'cards');
watch(view, value => localStorage.setItem('adratcliff-projectview', value));

const types = {
  frontend: { text: 'Frontend', color: 'teal' },
  backend: { text: 'Backend', color: 'orange' },
  infra: { text: 'Infrastructure', color: 'deep-purple' },
};

// Tonal chips use the colour as text, so shift the shade to keep contrast against each theme's background
const theme = useTheme();
const typeColor = type => `${types[type].color}-${theme.current.value.dark ? 'lighten-2' : 'darken-2'}`;

// Only link to pages the viewer can open; the home page doesn't need a link to itself
const projectList = computed(() => projects.filter(project => !project.disabled).map(project => {
  const route = routes.find(r => r.meta.id === project.route);
  return {
    ...project,
    icon: route?.meta.icon || project.icon,
    page: route && route.path !== '/' && canAccess(route) ? route : null,
  };
}));
</script>

<style lang="scss" scoped>
.home {
  max-width: 1200px;
}

.v-avatar.primary-img {
  border-color: #5c6e49 !important;
}

// Segmented control: a soft track with the selected option raised inside it
.view-toggle {
  height: auto !important;
  padding: 3px;
  gap: 2px;
  border-radius: 10px;
  background: rgba(var(--v-theme-on-surface), 0.06);

  .v-btn {
    height: 30px !important;
    min-width: 36px !important;
    padding: 0 !important;
    border-radius: 7px !important;
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  }

  .view-toggle-active {
    background: rgb(var(--v-theme-surface));
    color: rgb(var(--v-theme-primary));
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

    // Hide Vuetify's active overlay so the raised background shows cleanly
    :deep(.v-btn__overlay) {
      opacity: 0 !important;
    }
  }
}

// Fixed width so the column is the same whether or not a row has a button in it
.link-cell {
  width: 44px;
}

.min-w-0 {
  min-width: 0;
}

// Pull the text buttons back so their labels line up with the card text
.actions {
  margin-left: -8px;
}

.intro {
  max-width: 640px;
  line-height: 1.7;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}
</style>
