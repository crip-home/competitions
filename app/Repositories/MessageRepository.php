<?php namespace App\Repositories;

use App\Contracts\IMessageRepository;
use App\Message;
use Illuminate\Http\Request;

/**
 * Class MessageRepository
 * @package App\Repositories
 */
class MessageRepository extends PaginationRepository implements IMessageRepository
{
    /**
     * Get current repository full model class name
     *
     * @return string
     */
    function modelClass()
    {
        return Message::class;
    }

    /**
     * Filter only incoming messages
     *
     * @param Request $request
     *
     * @return $this
     */
    function filterInbox(Request $request)
    {
        $this->query = $this->getQuery()->where('to_id', $request->user()->id);

        return $this;
    }

    /**
     * Filter only outgoing messages
     *
     * @param Request $request
     *
     * @return $this
     */
    function filterOutbox(Request $request)
    {
        $this->query = $this->getQuery()->where('from_id', $request->user()->id);

        return $this;
    }

    /**
     * Join replays to the current querable
     *
     * @param int $replyCount
     *
     * @return $this
     */
    function withReplays($replyCount = 10)
    {
        $with = join('.', array_fill(0, $replyCount, 'replyOn'));
        $this->query = $this->getQuery()->with($with);

        return $this;
    }

    /**
     * Count unread message count in inbox
     *
     * @param Request $request
     *
     * @return int
     */
    function countUnread(Request $request) {
        return $this->filterInbox($request)->getQuery()
            ->where('is_read', false)
            ->count('id');
    }
}