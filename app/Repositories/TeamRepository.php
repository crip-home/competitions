<?php namespace App\Repositories;

use App\Contracts\ITeamRepository;
use App\Team;
use DB;
use Exception;
use Log;

/**
 * Class TeamRepository
 * @package App\Repositories
 */
class TeamRepository extends PaginationRepository implements ITeamRepository
{
    /**
     * Get current repository full model class name
     *
     * @return string
     */
    function modelClass()
    {
        return Team::class;
    }

    /**
     * Filter teams by owner id
     *
     * @param int $ownerId
     *
     * @return $this
     */
    function filterByOwner($ownerId)
    {
        $this->query = $this->getQuery()
            ->join('team_owner', 'team_owner.team_id', '=', 'teams.id')
            ->where('team_owner.user_id', $ownerId);

        return $this;
    }

    /**
     * Create new team and attach owner in single transaction
     *
     * @param array $input
     * @param int $ownerId
     *
     * @return mixed
     *
     * @throws Exception
     */
    function createAndAttachOwner(array $input, $ownerId)
    {
        DB::beginTransaction();
        try {
            /** @var Team $team */
            $team = $this->create($input);
            $team->owners()->attach($ownerId);
        } catch (Exception $exception) {
            DB::rollBack();
            Log::critical("User '$ownerId' was unavailable store team.", [$exception, $input]);
            throw new Exception('Internal database transaction error occurred.', 507, $exception);
        }
        DB::commit();

        return $team;
    }

    /**
     * Crate team member for team
     *
     * @param mixed $team
     * @param array $memberDetails
     *
     * @return mixed
     */
    public function createMember($team, array $memberDetails)
    {
        $member = $team->members()->create($memberDetails);

        return $member;
    }
}