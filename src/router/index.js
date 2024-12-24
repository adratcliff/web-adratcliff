import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView';

const importChunk = (chunkImport, pageName) => chunkImport().then((pages) => pages[pageName]);

const RecipeBook = () => import(/* webpackChunkName: "recipe-book" */ 'pages/recipe-book');

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/fitness',
    name: 'fitness-tracker',
    component: () => import(/* webpackChunkName: "fitness" */ '@/views/AboutView'),
  },
  {
    path: '/recipes',
    name: 'recipe-book',
    component: importChunk(RecipeBook, 'RecipeList'),
  },
  {
    path: '/recipes/:id',
    name: 'recipe-item',
    component: importChunk(RecipeBook, 'RecipeItem'),
  },
  {
    path: '/secret-santa',
    name: 'secret-santa',
    component: () => import(/* webpackChunkName: "secret-santa" */ '@/views/AboutView'),
  },
  {
    path: '/rgb-mapper',
    name: 'rgb-mapper',
    component: () => import(/* webpackChunkName: "rgb-mapper" */ '@/views/AboutView'),
  },
  {
    path: '/quantization',
    name: 'quantization',
    meta: {
      runBefore: () => import(/* webpackChunkName: "quantization" */ `pages/mask-generator/dist/quantization.css`),
    },
    component: () => import(/* webpackChunkName: "quantization" */ 'pages/mask-generator'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.runBefore) {
    await to.meta.runBefore(to, from);
  }

  next();
});

export default router;
