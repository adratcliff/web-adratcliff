<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-avatar
          image="/img/face-1.png"
          color="light-green-lighten-3"
          class="primary-img border-lg border-background"
          size="256" />
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>Welcome!</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.v-avatar.primary-img {
  border-color: #5c6e49 !important;
}
</style>
