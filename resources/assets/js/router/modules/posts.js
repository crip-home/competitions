import * as routes from './../routes'
import * as roles from './../../api/auth/roles'
import ChildHolder from './../../components/ChildHolder.vue'
import Home from './../../components/Home.vue'
import ReadPost from './../../components/posts/ReadPost.vue'
import CreateEditPost from '../../components/posts/admin/CreateEditPost.vue'
import ListPosts from '../../components/posts/admin/ListPosts.vue'

export const home = {path: '/home/:page?', name: routes.home.name, component: Home};
export const posts = {
    path: '/posts', component: ChildHolder, children: [
        {path: 'read/:id', name: routes.read_post.name, component: ReadPost},
        {
            path: 'admin/create', name: routes.create_post.name, component: CreateEditPost,
            meta: {requiresAuth: true, requiresRoles: [roles.CREATE_POST]}
        },
        {
            path: 'admin/list', name: routes.list_posts.name, component: ListPosts,
            meta: {requiresAuth: true, requiresAnyOfRoles: [roles.CREATE_POST, roles.MANAGE_POSTS]}
        }
    ]
};