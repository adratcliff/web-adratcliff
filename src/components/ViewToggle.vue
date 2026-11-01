<template>
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
</template>

<script setup>
const view = defineModel({ type: String, default: 'cards' });
</script>

<style lang="scss" scoped>
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
</style>
