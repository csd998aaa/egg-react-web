'use strict';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Loadable from "react-loadable";
import Loading from '@/component/Loading';

function lazyLoad(loader, loading = () => <></>) {
    return Loadable({
        loader,
        loading,
    });
}


const routes = [
    {
        path: '/login',
        component: lazyLoad(() => import('@/page/Login/Login')),
        exact: true,
    },

    {
        path: '/',
        exact: true,
        render: () => <Redirect to="/app" />
    },

    {
        path: '/app',
        component: lazyLoad(() => import('@/page/App'), () => <Loading />),
        routes: [
            {
                path: '/app/dashboard/analysis',
                component: lazyLoad(() => import('@/page/Home/Home')),
                exact: true,
            },

            {
                path: '/app/dashboard/user',
                component: lazyLoad(() => import("@/page/User/User")),
                exact: true,
            },

            // user
            {
                path: '/app/user/base',
                component: lazyLoad(() => import("@/page/User/User")),
                exact: true,
            },
            {
                path: '/app/user/update',
                component: lazyLoad(() => import("@/page/User/Update")),
                exact: true,
            },
        ],
    },

    // 404 page
    {
        component: lazyLoad(() => import('@/page/Error/Error'))
    }
];

export default routes;