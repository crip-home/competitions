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
     *
     * @param IMessageRepository $messages
     * @param IUserRepository $users
     */
    public function __construct(IMessageRepository $messages, IUserRepository $users)
    {
        $this->messages = $messages;
        $this->users = $users;
    }

    /**
     * @param int  $fromUserId
     * @param int  $toUserId
     * @param Team $fromTeamName
     * @param int  $forMemberId
     *
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function sendTeamMemberInvitation($fromUserId, $toUserId, $fromTeamName, $forMemberId)
    {
        $fromUser = $this->users->find($fromUserId, ['id', 'name']);
        $toUser = $this->users->find($toUserId, ['id', 'name']);

        $confirmUrl = '/invitations/team-members/accept/' . $forMemberId;
        $declineUrl = '/invitations/team-members/decline/' . $forMemberId;

        $subject = sprintf('%s has invited you to join %s team', $fromUser->name, $fromTeamName);
        $body = sprintf('To join %s team, <a href="%s">click here</a><br>
          To decline invitation - <a href="%s">click here</a>', $fromTeamName, $confirmUrl, $declineUrl);

        $message = [
            'subject' => $subject,
            'body' => $body,
            'importance_level' => 7,
            'to_id' => $toUser->id,
            'to_name' => $toUser->name,
            'from_id' => $fromUser->id,
            'from_name' => $fromUser->name,
            'type' => Message::USER_MESSAGE
        ];

        return $this->messages->create($message);
    }
}