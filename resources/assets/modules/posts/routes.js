import * as routes from '../../router/routes'
import * as roles from '../../api/roles'
import Wrapper from '../../Wrapper.vue'
import Home from './PostList.vue'
import ReadPost from './PostView.vue'
import CreateEditPost from './ManagePost.vue'
import ListPosts from './ManagePosts.vue'

export const home = {path: '/home/:page?', name: routes.home.name, component: Home}
export const posts = {
  path: '/posts',
  component: Wrapper,
  children: [
    {path: 'view/:id', name: routes.readPost.name, component: ReadPost},
    {
      path: 'manage/new',
      name: routes.createPost.name,
      component: CreateEditPost,
      meta: {requiresAuth: true, requiresRoles: [roles.CREATE_POST]}
    },
    {
      path: 'manage/all/:page?',
      name: routes.listPosts.name,
      component: ListPosts,
      meta: {requiresAuth: true, requiresAnyOfRoles: [roles.CREATE_POST, roles.MANAGE_POSTS]}
    },
    {
      path: 'manage/:id',
      name: routes.editPost.name,
      component: CreateEditPost,
      meta: {requiresAuth: true, requiresAnyOfRoles: [roles.CREATE_POST, roles.MANAGE_POSTS]}
    }
  ]
}
