import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView';

const importChunk = (chunkImport, pageName) => chunkImport().then((pages) => pages[pageName]);

const RecipeBook = () => import(/* webpackChunkName: "recipe-book" */ 'pages/recipe-book');

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
      disabled: true,
      id: 'fitness',
      title: 'Fitness Tracker',
      icon: 'mdi-run',
      position: 10,
    },
    component: () => import(/* webpackChunkName: "fitness" */ '@/views/AboutView'),
  },
  {
    path: '/recipes',
    name: 'recipe-book',
    meta: {
      id: 'recipes',
      title: 'Recipes',
      icon: 'mdi-food-turkey',
      position: 20,
    },
    component: () => importChunk(RecipeBook, 'RecipeList'),
  },
  {
    path: '/recipes/:id',
    name: 'recipe-item',
    meta: {
      id: 'recipe',
      title: 'Recipe',
      icon: 'mdi-food-turkey',
    },
    component: () => importChunk(RecipeBook, 'RecipeItem'),
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
    component: () => import(/* webpackChunkName: "secret-santa" */ '@/views/AboutView'),
  },
  {
    path: '/rgb-mapper',
    name: 'rgb-mapper',
    meta: {
      runBefore: () => import(/* webpackChunkName: "quantization" */ `pages/rgb-crosser/dist/rgb-crosser.css`),
      id: 'rgb',
      title: 'RGB Switcher',
      icon: 'mdi-connection',
      position: 40,
    },
    component: () => import(/* webpackChunkName: "rgb-mapper" */ 'pages/rgb-crosser'),
  },
  {
    path: '/quantization',
    name: 'quantization',
    meta: {
      runBefore: () => import(/* webpackChunkName: "quantization" */ `pages/mask-generator/dist/quantization.css`),
      id: 'images',
      title: 'Quantizer',
      icon: 'mdi-image',
      position: 50,
    },
    component: () => import(/* webpackChunkName: "quantization" */ 'pages/mask-generator'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.disabled) return;

  if (to.meta.runBefore) {
    await to.meta.runBefore(to, from);
  }

  next();
});

export default router;
