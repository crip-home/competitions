import {t} from 'vue'
import router from './index'
import auth from './../api/auth'
import * as routes from './routes'
import * as types from './../store/mutations'
import store from './../store'

export default {
    start() {
        let middleware = auth.middleware;

        router.beforeEach((to, from, next) => {
            if (to.matched.some(record => record.meta.requiresAuth)) {
                // this route requires auth, check if logged in
                // if not, redirect to login page.
                if (!middleware.isAuthenticated())
                    next({name: routes.login.name, query: {redirect: to.fullPath}});
                else {
                    if (to.matched.some(record => record.meta.requiresRoles)) {
                        if (!middleware.hasAllRoles(to.meta.requiresRoles)) {
                            store.commit(types.TOAST_ADD, {
                                message: t('app.permission_denied', {perm: to.meta.requiresRoles.join(', ')}),
                                'class': 'toast-error'
                            });
                            next({name: routes.home.name});
                        } else
                            next();
                    } else
                        next();
                }
            } else
                next(); // make sure to always call next()!
        });

    }
}