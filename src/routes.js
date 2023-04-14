//
import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Switch>
      {routes.map((route, i) => {
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: '/auth/login',
    component: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: true,
    path: '/auth/signup-1',
    component: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '',
    layout: AdminLayout,
    routes: [
      {
        exact: true,
        path: '/app/dashboard/default',
        component: lazy(() => import('./views/dashboard/DashDefault'))
      },
      {
        exact: true,
        path: '/users/list',
        component: lazy(() => import('./views/users/listUser'))
      },
      {
        exact: true,
        path: '/users/me',
        component: lazy(() => import('./views/users/myProfile'))
      },
      {
        exact: true,
        path: '/users/create',
        component: lazy(() => import('./views/users/createUser'))
      },
      {
        exact: true,
        path: '/users/detail',
        component: lazy(() => import('./views/users/detailUser'))
      },
      {
        exact: true,
        path: '/users/edit',
        component: lazy(() => import('./views/users/editUser'))
      },
      {
        exact: true,
        path: '/users/changePassword',
        component: lazy(() => import('./views/users/changePassword'))
      },
      {
        exact: true,
        path: '/scan/website',
        component: lazy(() => import('./views/scan/Website'))
      },     
      {
        exact: true,
        path: '/scan/vulnerability/result',
        component: lazy(() => import('./views/scan/vulnerability/Result'))
      },
      {
        exact: true,
        path: '/scan/vulnerability/addScan',
        component: lazy(() => import('./views/scan/vulnerability/AddScan'))
      },
      {
        exact: true,
        path: '/scan/vulnerability/listEngine',
        component: lazy(() => import('./views/scan/vulnerability/ListEngine'))
      },
      {
        exact: true,
        path: '/scan/vulnerability/vulnerability',
        component: lazy(() => import('./views/scan/vulnerability/Vulnerability'))
      },
      {
        exact: true,
        path: '/engine/list_engine',
        path: '/engine/listEngine',
        component: lazy(() => import('./views/engine/listEngine'))
      },
      {
        exact: true,
        path: '/engine/nuclei',
        component: lazy(() => import('./views/engine/Nuclei'))
      },
      {
        exact: true,
        path: '/engine/acunetix',
        component: lazy(() => import('./views/engine/Acunetix'))
      },
      {
        exact: true,
        path: '/setting/data/backup',
        component: lazy(() => import('./views/setting/data/Backup'))
      },
      {
        exact: true,
        path: '/setting/data/restore',
        component: lazy(() => import('./views/setting/data/Restore'))
      },
      {
        exact: true,
        path: '/setting/docker/container',
        component: lazy(() => import('./views/setting/docker/listContainter'))
      },
      {
        exact: true,
        path: '/setting/docker/image',
        component: lazy(() => import('./views/setting/docker/listImage'))
      },
      {
        exact: true,
        path: '/setting/docker/info',
        component: lazy(() => import('./views/setting/docker/infoContainer'))
      },
      {
        exact: true,
        path: '/setting/docker/resource',
        component: lazy(() => import('./views/setting/docker/dockerResource'))
      },
      {
        exact: true,
        path: '/basic/typography',
        component: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      {
        exact: true,
        path: '/forms/form-basic',
        component: lazy(() => import('./views/forms/FormsElements'))
      },
      {
        exact: true,
        path: '/tables/bootstrap',
        component: lazy(() => import('./views/tables/BootstrapTable'))
      },
      {
        exact: true,
        path: '/charts/nvd3',
        component: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: true,
        path: '/maps/google-map',
        component: lazy(() => import('./views/maps/GoogleMaps'))
      },
      {
        exact: true,
        path: '/sample-page',
        component: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        exact: true,
        path: '/reports/List_reports',
        component: lazy(() => import('./views/reports/List_reports'))
      },
      {
        exact: true,
        path: '/reports/List_report_templates',
        component: lazy(() => import('./views/reports/List_report_templates'))
      },
      {
        exact: true,
        path: '/module/list_vul',
        component: lazy(() => import('./views/module/list_vul'))
      },
      // {
      //   path: '*',
      //   exact: true,
      //   component: () => <Redirect to={BASE_URL} />
      // }
    ]
  }
];


export default routes;
