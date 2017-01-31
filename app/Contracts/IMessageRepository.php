<?php namespace App\Contracts;

use Illuminate\Http\Request;

/**
 * Interface IMessageRepository
 * @package App\Contracts
 */
interface IMessageRepository extends IPaginateRepository
{
    /**
     * Filter only incoming messages
     *
     * @param Request $request
     *
     * @return $this
     */
    function filterInbox(Request $request);


    /**
     * Filter only outgoing messages
     *
     * @param Request $request
     *
     * @return $this
     */
    function filterOutbox(Request $request);

    /**
     * Join replays to the current querable
     *
     * @param int $replyCount
     *
     * @return $this
     */
    function withReplays($replyCount = 10);

    /**
     * Count unread message count in inbox
     *
     * @param Request $request
     *
     * @return int
     */
    function countUnread(Request $request);
}