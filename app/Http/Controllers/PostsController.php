<?php namespace App\Http\Controllers;

use App\Post;
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
     * @return JsonResponse
     */
    public function index()
    {
        $result = $this->post->newQuery()->where('state', 'PUBLISHED')->with('author')->paginate();

        return new JsonResponse($result);
    }

    /**
     * POST    /api/posts
     * @param Request $request
     */
    public function store(Request $request)
    {

    }

    /**
     * GET    /api/posts/{post}
     * @param $post
     */
    public function show($post)
    {

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
