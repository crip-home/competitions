<?php namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Messages\UserReplyMessage;
use App\Http\Requests\Messages\UserStoreMessage;
use App\Message;
use App\Repositories\MessageRepository;
use App\Repositories\UserRepository;
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
     * @var MessageRepository
     */
    private $messages;

    /**
     * @var UserRepository
     */
    private $users;

    /**
     * MessagesController constructor.
     *
     * @param MessageRepository $messages
     * @param UserRepository $users
     */
    public function __construct(MessageRepository $messages, UserRepository $users)
    {
        $this->middleware('jwt.auth');
        $this->messages = $messages;
        $this->users = $users;
    }

    /**
     * GET    /api/user/messages
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $this->messages->requestOrdered($request, 'created_at', 'desc');

        if ($request->type == 'outbox') {
            $this->messages->filterOutbox($request);
        } else {
            $this->messages->filterInbox($request);
        }

        $messages = $this->messages->paginate($request->per_page ?: 15, [], ['id', 'subject', 'body',
            'is_read', 'importance_level', 'type', 'from_name', 'created_at', 'reply', 'reply_count', 'to_name']);

        return new JsonResponse($messages);
    }

    /**
     * GET    /api/user/messages/read/{message}
     *
     * @param Request $request
     * @param int $id
     *
     * @return JsonResponse
     */
    public function read(Request $request, $id)
    {
        $message = $this->messages->find($id);

        // mark message as read if recipient requests its details
        if (!$message->is_read && $message->to_id == $request->user()->id) {
            $this->messages->update(['is_read' => true], $id, $message);
        }

        $messages = $this->messages
            ->withReplays(10)
            ->find($message->id);

        return new JsonResponse($messages);
    }

    /**
     * GET    /api/user/messages/count/unread
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function countUnread(Request $request)
    {
        $count = $this->messages->countUnread($request);

        return new JsonResponse($count);
    }

    /**
     * POST   /api/user/messages/{message}/reply
     *
     * @param UserReplyMessage $request
     * @param int $id
     *
     * @return JsonResponse
     */
    public function reply(UserReplyMessage $request, $id)
    {
        $message = $this->messages->find($id);

        $details = $request->only(['subject', 'body', 'importance_level']);

        $details['from_id'] = $request->user()->id;
        $details['from_name'] = $request->user()->name;

        $details['to_name'] = $message->from_name;
        $details['to_id'] = $message->from_id;
        $details['reply'] = $message->id;
        $details['reply_count'] = $message->reply_count + 1;

        $details['type'] = Message::USER_MESSAGE;
        $details['importance_level'] = $details['importance_level'] ?: 10;

        $newMessage = $this->messages->create($details);

        return new JsonResponse($newMessage);
    }

    /**
     * POST   /api/user/messages
     *
     * @param UserStoreMessage $request
     *
     * @return JsonResponse
     */
    public function store(UserStoreMessage $request)
    {
        $details = $request->only(['subject', 'body', 'importance_level']);
        $details['to_id'] = $request->to;

        $recipient = $this->users->find($request->to);

        $details['from_id'] = $request->user()->id;
        $details['from_name'] = $request->user()->name;
        $details['to_name'] = $recipient->name;
        $details['type'] = Message::USER_MESSAGE;

        $details['importance_level'] = $details['importance_level'] ?: 10;

        $message = $this->messages->create($details);

        return new JsonResponse($message);
    }
}