import * as routes    from './../routes'
import * as roles     from './../../api/auth/roles'
import ChildHolder    from './../../components/ChildHolder.vue'
import Home           from './../../components/Home.vue'
import ReadPost       from './../../components/posts/ReadPost.vue'
import CreateEditPost from '../../components/posts/admin/CreateEditPost.vue'
import ListPosts      from '../../components/posts/admin/ListPosts.vue'

export const home = {path: '/home/:page?', name: routes.home.name, component: Home}
export const posts = {
  path: '/posts',
  component: ChildHolder,
  children: [
    {path: 'read/:id', name: routes.readPost.name, component: ReadPost},
    {
      path: 'admin/create',
      name: routes.createPost.name,
      component: CreateEditPost,
      meta: {requiresAuth: true, requiresRoles: [roles.CREATE_POST]}
    },
    {
      path: 'admin/list/:page?',
      name: routes.listPosts.name,
      component: ListPosts,
      meta: {requiresAuth: true, requiresAnyOfRoles: [roles.CREATE_POST, roles.MANAGE_POSTS]}
    },
    {
      path: 'admin/edit/:id',
      name: routes.editPost.name,
      component: CreateEditPost,
      meta: {requiresAuth: true, requiresAnyOfRoles: [roles.CREATE_POST, roles.MANAGE_POSTS]}
    }
  ]
}
