import Wrapper from '../../Components/Wrapper.vue'
import PostList from './PostList.vue'

export const home = {path: '/home', component: PostList}
export const posts = {
  path: '/posts',
  component: Wrapper,
  children: [
    {path: 'all', name: 'posts-all', component: PostList}
  ]
}
