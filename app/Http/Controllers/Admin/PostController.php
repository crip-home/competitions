<?php namespace App\Http\Controllers\Admin;

use App\Contracts\IPostRepository;
use App\Http\Controllers\Controller;
use App\Http\Requests\Posts\AdminStorePost;
use App\Http\Requests\Posts\AdminUpdatePost;
use App\Post;
use App\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class PostController
 * @package App\Http\Controllers\Admin
 */
class PostController extends Controller
{
    /**
     * @var IPostRepository
     */
    private $posts;

    /**
     * PostController constructor.
     * @param Post $post
     * @param IPostRepository $posts
     */
    public function __construct(IPostRepository $posts)
    {
        $this->middleware('jwt.auth');
        $this->posts = $posts;
    }

    /**
     * GET    /api/admin/posts
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $this->authorize('viewList', Post::class);

        $this->posts->withAuthor()->orderBy('publish_at');

        // If user has no permission to manage post, he can see only posts created by him
        if (!$request->user()->hasRole(Role::MANAGE_POSTS)) {
            $this->posts->filterByAuthor($request->user()->id);
        }

        $posts = $this->posts->paginate($request->per_page ?: 15, [],
            ['id', 'title', 'image', 'publish_at', 'author_id', 'state']);

        return new JsonResponse($posts);
    }

    /**
     * POST  /api/admin/posts
     * @param AdminStorePost $request
     * @return JsonResponse
     */
    public function store(AdminStorePost $request)
    {
        $this->authorize('create', Post::class);

        $details = $request->only(['title', 'body', 'image', 'state', 'publish_at', 'locale']);
        $details['author_id'] = $request->user()->id;

        $this->posts->create($details);

        return new JsonResponse($details);
    }

    /**
     * GET    /api/posts/{post}
     * @param int $postId
     * @return JsonResponse
     */
    public function show($postId)
    {
        $post = $this->posts->withAuthor()->find($postId);
        $this->authorize('view', $post);

        return new JsonResponse($post);
    }

    /**
     * PUT/PATCH  /api/admin/posts/{post}
     * @param AdminUpdatePost $request
     * @param int $postId
     * @return JsonResponse
     */
    public function update(AdminUpdatePost $request, $postId)
    {
        $post = $this->posts->find($postId);
        $this->authorize('update', $post);

        $details = $request->only(['title', 'body', 'image', 'state', 'publish_at', 'locale']);

        $this->posts->update($details, $postId, $post);

        return new JsonResponse($post);
    }
}