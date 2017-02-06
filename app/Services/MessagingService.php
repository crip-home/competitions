<?php namespace App\Services;

use App\Contracts\IMessageRepository;
use App\Contracts\IUserRepository;
use App\Message;
use App\Team;

/**
 * Class MessagingService
 * @package App\Services
 */
class MessagingService
{
    /**
     * @var IMessageRepository
     */
    private $messages;

    /**
     * @var IUserRepository
     */
    private $users;

    /**
     * MessagingService constructor.
     * @param IMessageRepository $messages
     * @param IUserRepository $users
     */
    public function __construct(IMessageRepository $messages, IUserRepository $users)
    {
        $this->messages = $messages;
        $this->users = $users;
    }

    /**
     * @param int $fromUserId
     * @param int $toUserId
     * @param Team $fromTeamName
     * @param int $forMemberId
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function sendTeamMemberInvitation($fromUserId, $toUserId, $fromTeamName, $forMemberId)
    {
        $fromUser = $this->users->find($fromUserId, ['id', 'name']);
        $toUser = $this->users->find($toUserId, ['id', 'name']);

        $subject = __(':user has invited you to join :team team',
            ['user' => $fromUser->name, 'team' => $fromTeamName]);

        $message = [
            'subject' => $subject,
            'body' => Message::TEAM_MEMBER_INVITATION,
            'importance_level' => 7,
            'to_id' => $toUser->id,
            'to_name' => $toUser->name,
            'from_id' => $fromUser->id,
            'from_name' => $fromUser->name,
            'type' => Message::TEAM_MEMBER_INVITATION,
            'payload' => [
                'from_team_name' => $fromTeamName,
                'from_user_name' => $fromUser->name,
                'member_id' => $forMemberId
            ]
        ];

        return $this->messages->create($message);
    }
}