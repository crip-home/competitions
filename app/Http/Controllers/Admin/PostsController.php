<?php namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Posts\AdminStorePost;
use App\Post;
use App\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class PostsController
 * @package App\Http\Controllers\Admin
 */
class PostsController extends Controller
{

    /**
     * @var Post
     */
    private $post;

    /**
     * PostsController constructor.
     * @param Post $post
     */
    public function __construct(Post $post)
    {
        $this->middleware('jwt.auth');
        $this->post = $post;
    }

    /**
     * GET    /api/admin/posts
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $this->authorize('viewList', Post::class);

        $post_query = $this->post->newQuery()->with(['author' => function ($query) {
            $query->select(['id', 'name']);
        }])->orderBy('publish_at', false);

        // If user has no permission to manage post, he can see only posts created by him
        if (!$request->user()->hasRole(Role::MANAGE_POSTS)) {
            $post_query = $post_query->where('author_id', $request->user()->id);
        }

        // TODO: add more filters here for admin

        $posts = $post_query->paginate($request->per_page ?: 15,
            ['id', 'title', 'image', 'publish_at', 'author_id', 'state']);

        return new JsonResponse($posts);
    }

    /**
     * POST    /api/admin/posts
     * @param AdminStorePost $request
     * @return JsonResponse
     */
    public function store(AdminStorePost $request)
    {
        $this->authorize('create', Post::class);

        $details = $request->only(['title', 'body', 'image', 'state', 'publish_at', 'locale']);
        $details['author_id'] = $request->user()->id;
        $post = Post::create($details);

        return new JsonResponse($post);
    }

    /**
     * GET    /api/posts/{post}
     * @param Post $post
     * @return JsonResponse
     */
    public function show(Post $post)
    {
        $this->authorize('view', $post);

        $post_model = $this->post->newQuery()->where('id', $post->id)->with(['author'])->firstOrFail();

        return new JsonResponse($post_model);
    }

    /**
     * PUT/PATCH    /api/admin/posts/{post}
     * @param Request $request
     * @param Post $post
     * @return JsonResponse
     */
    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $details = $request->only(['title', 'body', 'image', 'state', 'publish_at', 'locale']);
        $post_model = $this->post->newQuery()->where('id', $post->id)->update($details);

        return new JsonResponse($post_model);
    }

    /**
     * DELETE    /api/admin/posts/{post}
     * @param Post $post
     */
    public function destroy(Post $post)
    {

    }
}