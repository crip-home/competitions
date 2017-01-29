<?php namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Messages\UserReplyMessage;
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
        $query = $this->message->newQuery()->orderBy('created_at', 'desc')
            ->select(['id', 'subject', 'body', 'is_read', 'importance_level', 'type', 'from_name', 'created_at',
                'reply', 'reply_count']);

        if ($request->type == 'outbox') {
            $query = $query->where('from_id', $request->user()->id);
        } else {
            // inbox
            $query = $query->where('to_id', $request->user()->id);
        }

        $messages = $query->paginate($request->per_page ?: 15);

        return new JsonResponse($messages);
    }

    /**
     * GET     /api/user/messages/read/{message}
     *
     * @param  Request $request
     * @param  Message $message
     * @return JsonResponse
     */
    public function read(Request $request, Message $message)
    {
        // mark message as read if recipient requests its details
        if (!$message->is_read && $message->to_id == $request->user()->id) {
            $message->update(['is_read' => true]);
        }

        $with = join('.', array_fill(0, 10, 'replyOn'));
        $response = $this->message->newQuery()->with($with)->find($message->id);

        return new JsonResponse($response);
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
     * POST    /api/user/messages/{message}/reply
     *
     * @param  UserReplyMessage $request
     * @param  Message $message
     * @return JsonResponse
     */
    public function reply(UserReplyMessage $request, Message $message)
    {
        $details = $request->only(['subject', 'body', 'importance_level']);

        $details['from_id'] = $request->user()->id;
        $details['from_name'] = $request->user()->name;

        $details['to_name'] = $message->from_name;
        $details['to_id'] = $message->from_id;
        $details['reply'] = $message->id;
        $details['reply_count'] = $message->reply_count + 1;

        $details['type'] = Message::USER_MESSAGE;
        $details['importance_level'] = $details['importance_level'] ?: 10;

        $newMessage = Message::create($details);

        return new JsonResponse($newMessage);
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