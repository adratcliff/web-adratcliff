import { createRouter, createWebHistory } from 'vue-router';
import { storeToRefs } from 'pinia';

import HomeView from '@/pages/HomeView.vue';
import AboutView from '@/pages/AboutView.vue';

import { useAppStore } from '@/stores';

import HelloWorld from '@/components/HelloWorld.vue';
import RemoteLoader from '@/components/RemoteLoader.vue';

// const importChunk = (chunkImport, pageName) => chunkImport().then((pages) => pages[pageName]);

// const RecipeBook = () => import(/* webpackChunkName: "recipe-book" */ 'pages/recipe-book');

export const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      id: 'home',
      title: 'Home',
    },
    component: HomeView,
  },
  {
    path: '/fitness',
    name: 'fitness-tracker',
    meta: {
      requirements: ['token'],
      id: 'fitness',
      title: 'Fitness Tracker',
      icon: 'mdi-run',
      position: 10,
    },
    component: () => AboutView,
    // component: () => import(/* webpackChunkName: "fitness" */ '@/views/AboutView'),
  },
  {
    path: '/recipes',
    name: 'recipe-book',
    meta: {
      id: 'recipes',
      title: 'Recipes',
      icon: 'mdi-food-turkey',
      position: 20,
      disabled: true,
    },
    // component: () => importChunk(RecipeBook, 'RecipeList'),
    component: () => HelloWorld
  },
  {
    path: '/recipes/create',
    name: 'recipe-create',
    meta: {
      id: 'recipe-new',
      title: 'Create Recipe',
      icon: 'mdi-food-turkey',
    },
    // component: () => importChunk(RecipeBook, 'RecipeCreate'),
    component: () => HelloWorld
  },
  {
    path: '/recipes/:id',
    name: 'recipe-item',
    meta: {
      id: 'recipe',
      title: 'Recipe',
      icon: 'mdi-food-turkey',
    },
    // component: () => importChunk(RecipeBook, 'RecipeItem'),
    component: () => HelloWorld
  },
  {
    path: '/secret-santa',
    name: 'secret-santa',
    meta: {
      id: 'secret',
      title: 'Secret Santa',
      icon: 'mdi-gift',
      position: 30,
      disabled: true,
    },
    // component: () => import(/* webpackChunkName: "secret-santa" */ '@/views/AboutView'),
    component: () => HelloWorld
  },
  {
    path: '/rgb-mapper',
    name: 'rgb-mapper',
    meta: {
      // runBefore: () => import(/* webpackChunkName: "quantization" */ `pages/rgb-crosser/dist/rgb-crosser.css`),
      id: 'rgb',
      title: 'RGB Switcher',
      icon: 'mdi-connection',
      position: 40,
    },
    // component: () => import(/* webpackChunkName: "rgb-mapper" */ 'pages/rgb-crosser'),
    component: RemoteLoader,
    props: {
      target: () => import('rgbCrosser/RgbCrosser'),
    },
  },
  {
    path: '/quantization',
    name: 'quantization',
    props: () => ({
      // worker: () => new Worker(new URL(`pages/mask-generator/dist/imageProcessor.js`, import.meta.url)),
    }),
    meta: {
      // runBefore: () => import(/* webpackChunkName: "quantization" */ `pages/mask-generator/dist/quantization.css`),
      id: 'images',
      title: 'Quantizer',
      icon: 'mdi-image',
      position: 50,
      disabled: true,
    },
    // component: () => import(/* webpackChunkName: "quantization" */ 'pages/mask-generator'),
    component: () => HelloWorld
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.disabled) return next(false);

  if (to.meta.requirements) {
    const appStore = storeToRefs(useAppStore());
    if (to.meta.requirements.includes('token') && !appStore.token.value) return next(false);
  }

  if (to.meta.runBefore) {
    await to.meta.runBefore(to, from);
  }

  next();
});

export default router;
