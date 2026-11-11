import type { RouteRecordRaw } from 'vue-router';

const PublicRoutes: RouteRecordRaw = {
  path: '/',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false
  },
  children: [
    {
      name: 'DefaultLogin',
      path: '',
      component: () => import('@/views/authentication/LoginPage.vue'),
      meta: { title: 'Sign In — BMA e-QMS' }
    },
    {
      name: 'Login',
      path: 'login',
      component: () => import('@/views/authentication/LoginPage.vue'),
      meta: { title: 'Sign In — BMA e-QMS' }
    },
    {
      name: 'ForgotPassword',
      path: 'forgot-password',
      alias: ['forgot-pwd1'],
      component: () => import('@/views/authentication/authForms/AuthForgotPwd.vue'),
      meta: { title: 'Forgot Password — BMA e-QMS' }
    },
    {
      name: 'ResetPassword',
      path: 'reset-password',
      component: () => import('@/views/authentication/authForms/AuthResetPwd.vue'),
      meta: { title: 'Reset Password — BMA e-QMS' }
    },
    {
      name: 'CodeVerification',
      path: 'code-verification',
      component: () => import('@/views/authentication/authForms/AuthCodeVerification.vue'),
      meta: { title: 'Two-Factor Verification — BMA e-QMS' }
    },
    {
      name: 'CheckMail',
      path: 'check-mail',
      component: () => import('@/views/authentication/authForms/AuthCheckMail.vue'),
      meta: { title: 'Check Your Email — BMA e-QMS' }
    },
    {
      name: 'Error404',
      path: 'error',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue'),
      meta: { title: 'Page Not Found — BMA e-QMS' }
    }
  ]
};

export default PublicRoutes;