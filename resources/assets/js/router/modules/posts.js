import * as routes from './../routes'
import HomeView from './../../components/Home.vue'
import ReadPostView from './../../components/posts/ReadPost.vue'

export const home = {path: '/home/:page?', name: routes.home.name, component: HomeView};
export const posts = {path: '/posts/read/:id', name: routes.read_post.name, component: ReadPostView};