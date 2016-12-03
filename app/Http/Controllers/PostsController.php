<?php namespace App\Http\Controllers;

use App\Http\Requests\Posts\StorePost;
use App\Post;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class PostsController
 * @package App\Http\Controllers
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
        $this->middleware('jwt.auth', ['except' => ['index', 'show']]);
        $this->post = $post;
    }

    /**
     * GET    /api/posts
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $post_query = $this->post->newQuery()->where('state', Post::STATE_PUBLISHED)->whereRaw('publish_at < CURDATE()')
            ->orderBy('publish_at', false);

        if ($request->locales) {
            $post_query = $post_query->whereIn('locale', explode(',', $request->locales));
        }

        $posts = $post_query->paginate($request->per_page ?: 5, ['id', 'title', 'image', 'body', 'publish_at']);

        return new JsonResponse($posts);
    }

    /**
     * POST    /api/posts
     * @param StorePost $request
     * @return JsonResponse
     */
    public function store(StorePost $request)
    {
        $details = $request->only(['title', 'body', 'image', 'state', 'publish_at', 'locale']);
        $details['author_id'] = \Auth::user()->id;
        $post = Post::create($details);

        return new JsonResponse($post);
    }

    /**
     * GET    /api/posts/{post}
     * @param $post
     * @return JsonResponse
     */
    public function show($post)
    {
        $post_model = $this->post->newQuery()->where('id', $post)->where('state', Post::STATE_PUBLISHED)
            ->with(['author' => function (BelongsTo $query) {
                $query->getQuery()->select(['id', 'name']);
            }])->firstOrFail(['id', 'author_id', 'title', 'image', 'body', 'publish_at']);

        return new JsonResponse($post_model);
    }

    /**
     * PUT/PATCH    /api/posts/{post}
     * @param Request $request
     * @param $post
     */
    public function update(Request $request, $post)
    {

    }

    /**
     * DELETE    /api/posts/{post}
     * @param $post
     */
    public function destroy($post)
    {

    }
}
