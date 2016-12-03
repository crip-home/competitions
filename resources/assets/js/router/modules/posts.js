import * as routes from './../routes'
import ChildHolderView from './../../components/ChildHolder.vue'
import HomeView from './../../components/Home.vue'
import ReadPostView from './../../components/posts/ReadPost.vue'
import CreateEditPost from './../../components/posts/CreateEditPost.vue'

export const home = {path: '/home/:page?', name: routes.home.name, component: HomeView};
export const posts = {
    path: '/posts', component: ChildHolderView, children: [
        {path: 'read/:id', name: routes.read_post.name, component: ReadPostView},
        {path: 'create', name: routes.create_post.name, component: CreateEditPost},
    ]
};