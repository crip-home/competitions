<?php namespace App\Http\Controllers;

use App\Contracts\IPostRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class PostsController
 * @package App\Http\Controllers
 */
class PostsController extends Controller
{
    /**
     * @var IPostRepository
     */
    private $posts;

    /**
     * PostsController constructor.
     *
     * @param IPostRepository $posts
     */
    public function __construct(IPostRepository $posts)
    {
        $this->posts = $posts;
    }

    /**
     * GET    /api/posts
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $locales = $request->locales ? explode(',', $request->locales) : [];
        $posts = $this->posts
            ->onlyPublished()
            ->order('publish_at', 'desc')
            ->scopeLocales($locales)
            ->paginate($request->per_page ?: 5, [], ['id', 'title', 'image', 'body', 'publish_at']);

        return new JsonResponse($posts);
    }

    /**
     * GET    /api/posts/{post}
     *
     * @param $id
     *
     * @return JsonResponse
     */
    public function show($id)
    {
        $post = $this->posts
            ->onlyPublished()
            ->withAuthor()
            ->find($id, ['id', 'author_id', 'title', 'image', 'body', 'publish_at']);

        return new JsonResponse($post);
    }
}
