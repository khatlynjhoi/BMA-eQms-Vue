import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    MainRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    }
  ]
});

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title}`;
  }
  next();
});

export { router };
export default router;