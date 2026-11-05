import { createRouter, createWebHistory } from 'vue-router';
import PublicRoutes from './PublicRoutes';
import EmployeeRoutes from './EmployeeRoutes';
import { useAuthStore } from '@/stores/auth';
import { useUIStore } from '@/stores/ui';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    PublicRoutes,
    EmployeeRoutes,
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    }
  ]
});

// GLOBAL ROUTE GUARD
router.beforeEach(async (to, _from, next) => {
  const uiStore = useUIStore();
  const auth = useAuthStore();

  uiStore.isLoading = true;

  const publicPages = ['/', '/login', '/login1', '/register1', '/forgot-pwd1', '/reset-pwd1', '/error'];
  const isPublicPage = publicPages.includes(to.path);
  const authRequired = !isPublicPage && to.matched.some((r) => r.meta.requiresAuth);

  if (auth.user) {
    if (isPublicPage && to.path === '/login') {
      next({ path: '/dashboard' });
    } else {
      next();
    }
  } else {
    if (authRequired) {
      next({ path: '/login' });
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  const uiStore = useUIStore();
  uiStore.isLoading = false;
});