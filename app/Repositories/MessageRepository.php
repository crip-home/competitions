<?php namespace App\Repositories;

use App\Message;

/**
 * Class MessageRepository
 * @package App\Repositories
 */
class MessageRepository extends Repository
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
}