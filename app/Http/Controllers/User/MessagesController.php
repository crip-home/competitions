<?php namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Messages\UserStoreMessage;
use App\Message;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class MessagesController
 * @package App\Http\Controllers\User
 */
class MessagesController extends Controller
{
    /**
     * @var Message
     */
    private $message;

    /**
     * @var User
     */
    private $user;

    /**
     * MessagesController constructor.
     * @param Message $message
     * @param User $user
     */
    public function __construct(Message $message, User $user)
    {
        $this->middleware('jwt.auth');
        $this->message = $message;
        $this->user = $user;
    }

    /**
     * GET     /api/user/messages
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $messages = $this->message->newQuery()->where('to_id', $request->user()->id)
            ->select(['id', 'subject', 'body', 'is_read', 'importance_level', 'type', 'from_name', 'created_at'])
            ->paginate($request->per_page ?: 15);

        return new JsonResponse($messages);
    }

    /**
     * GET     /api/user/messages/count/unread
     *
     * @param  Request $request
     * @return JsonResponse
     */
    public function countUnread(Request $request)
    {
        $count = $this->message->newQuery()
            ->where('to_id', $request->user()->id)
            ->where('is_read', false)->count('id');

        return new JsonResponse($count);
    }

    /**
     * POST    /api/user/messages
     *
     * @param  UserStoreMessage $request
     * @return JsonResponse
     */
    public function store(UserStoreMessage $request)
    {
        $details = $request->only(['subject', 'body', 'importance_level', 'to_id']);

        $recipient = $this->user->newQuery()->where('id', $request->to_id)->firstOrFail();

        $details['from_id'] = $request->user()->id;
        $details['from_name'] = $request->user()->name;
        $details['to_name'] = $recipient->name;
        $details['type'] = Message::USER_MESSAGE;

        $details['importance_level'] = $details['importance_level'] ?: 10;

        $message = Message::create($details);

        return new JsonResponse($message);
    }
}