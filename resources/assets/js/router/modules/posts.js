import * as routes from './../routes'
import HomeView from './../../components/Home.vue'
import ReadPostView from './../../components/posts/ReadPost.vue'

export default {
    path: '/home', name: routes.home.name, component: HomeView, children: [
        {path: 'read/:id', name: routes.read_post.name, component: ReadPostView},
    ]
};