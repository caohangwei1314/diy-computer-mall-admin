import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/management',
    name: 'User',
    meta: { title: 'User', icon: 'user' },
    children: [{
      path: 'management',
      name: 'UserManagement',
      component: () => import('@/views/user-management/index'),
      meta: { title: '用户管理', icon: 'user' }
    }]
  },

  {
    path: '/products',
    component: Layout,
    redirect: '/products/management',
    name: 'Products',
    meta: { title: '商品管理', icon: 'form' },
    children: [
      {
        path: 'management',
        name: 'ProductsManagement',
        component: () => import('@/views/products-management/index'),
        meta: { title: '全部商品管理', icon: 'form' }
      },
      {
        path: 'upload',
        name: 'ProductsUpload',
        redirect: '/products/upload/cpu',
        component: () => import('@/views/products-management/detail'),
        meta: { title: '商品上传', icon: 'form' },
        children: [
          {
            path: 'cpu',
            name: 'UploadCPU',
            hidden: true,
            component: () => import('@/views/products-management/products-form/cpu'),
            meta: { title: 'CPU', icon: 'form' }
          },
          {
            path: 'board',
            name: 'UploadBoard',
            hidden: true,
            component: () => import('@/views/products-management/products-form/board'),
            meta: { title: '主板', icon: 'form' }
          },
          {
            path: 'chassis',
            name: 'UploadChassis',
            hidden: true,
            component: () => import('@/views/products-management/products-form/chassis'),
            meta: { title: '机箱', icon: 'form' }
          },
          {
            path: 'graphics',
            name: 'UploadGraphics',
            hidden: true,
            component: () => import('@/views/products-management/products-form/graphics'),
            meta: { title: '显卡', icon: 'form' }
          },
          {
            path: 'mechanical',
            name: 'UploadMechanical',
            hidden: true,
            component: () => import('@/views/products-management/products-form/mechanical'),
            meta: { title: '机械硬盘', icon: 'form' }
          },
          {
            path: 'monitor',
            name: 'UploadMonitor',
            hidden: true,
            component: () => import('@/views/products-management/products-form/monitor'),
            meta: { title: '显示器', icon: 'form' }
          },
          {
            path: 'power',
            name: 'UploadPower',
            hidden: true,
            component: () => import('@/views/products-management/products-form/power'),
            meta: { title: '电源', icon: 'form' }
          },
          {
            path: 'ram',
            name: 'UploadRAM',
            hidden: true,
            component: () => import('@/views/products-management/products-form/ram'),
            meta: { title: '内存', icon: 'form' }
          },
          {
            path: 'sink',
            name: 'UploadSink',
            hidden: true,
            component: () => import('@/views/products-management/products-form/sink'),
            meta: { title: '散热器', icon: 'form' }
          },
          {
            path: 'ssd',
            name: 'UploadSSD',
            hidden: true,
            component: () => import('@/views/products-management/products-form/ssd'),
            meta: { title: '固态硬盘', icon: 'form' }
          }
        ]
      },
      {
        path: 'update',
        name: 'ProductsDetail',
        hidden: true,
        component: () => import('@/views/products-management/detail'),
        meta: { title: '商品详情', icon: 'form' },
        children: [
          {
            path: 'cpu',
            name: 'CPUDetail',
            hidden: true,
            component: () => import('@/views/products-management/products-form/cpu'),
            meta: { title: 'CPU', icon: 'form' }
          },
          {
            path: 'board',
            name: 'BoardDetail',
            hidden: true,
            component: () => import('@/views/products-management/products-form/board'),
            meta: { title: '主板', icon: 'form' }
          },
          {
            path: 'chassis',
            name: 'ChassisDetail',
            hidden: true,
            component: () => import('@/views/products-management/products-form/chassis'),
            meta: { title: '机箱', icon: 'form' }
          },
          {
            path: 'graphics',
            name: 'GraphicsDetail',
            hidden: true,
            component: () => import('@/views/products-management/products-form/graphics'),
            meta: { title: '详情', icon: 'form' }
          },
          {
            path: 'mechanical',
            name: 'MechanicalDetail',
            hidden: true,
            component: () => import('@/views/products-management/products-form/mechanical'),
            meta: { title: '机械硬盘', icon: 'form' }
          },
          {
            path: 'monitor',
            name: 'MonitorDetail',
            hidden: true,
            component: () => import('@/views/products-management/products-form/monitor'),
            meta: { title: '显示器', icon: 'form' }
          },
          {
            path: 'power',
            name: 'PowerDetail',
            hidden: true,
            component: () => import('@/views/products-management/products-form/power'),
            meta: { title: '电源', icon: 'form' }
          },
          {
            path: 'ram',
            name: 'RAMDetail',
            hidden: true,
            component: () => import('@/views/products-management/products-form/ram'),
            meta: { title: '内存', icon: 'form' }
          },
          {
            path: 'sink',
            name: 'SinkDetail',
            hidden: true,
            component: () => import('@/views/products-management/products-form/sink'),
            meta: { title: '散热器', icon: 'form' }
          },
          {
            path: 'ssd',
            name: 'SSDDetail',
            hidden: true,
            component: () => import('@/views/products-management/products-form/ssd'),
            meta: { title: '固态硬盘', icon: 'form' }
          }
        ]
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
