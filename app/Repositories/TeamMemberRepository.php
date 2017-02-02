<?php namespace App\Repositories;

use App\Contracts\ITeamMemberRepository;
use App\TeamMember;

/**
 * Class TeamMemberRepository
 * @package App\Repositories
 */
class TeamMemberRepository extends PaginationRepository implements ITeamMemberRepository
{
    /**
     * Get current repository full model class name
     *
     * @return string
     */
    function modelClass()
    {
        return TeamMember::class;
    }

    /**
     * Set team id filter on querable
     *
     * @param int $id
     *
     * @return $this
     */
    public function filterByTeam($id)
    {
        $this->query = $this->getQuery()->where('team_id', $id);

        return $this;
    }
}