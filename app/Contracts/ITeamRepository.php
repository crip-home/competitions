<?php namespace App\Contracts;

use App\Team;
use App\TeamMember;

/**
 * Interface ITeamRepository
 * @package App\Contracts
 */
interface ITeamRepository extends IPaginateRepository
{
    /**
     * Filter teams by owner id.
     * @param  int $ownerId
     * @return ITeamRepository
     */
    function filterByOwner(int $ownerId): ITeamRepository;

    /**
     * Create new team and attach owner in single transaction
     * @param  array $input
     * @param  int $ownerId
     * @return Team
     * @throws \Exception
     */
    function createAndAttachOwner(array $input, int $ownerId): Team;

    /**
     * Crate team member for team
     * @param  Team $team Team model
     * @param  array $memberDetails
     * @return TeamMember Member model
     */
    public function createMember(Team $team, array $memberDetails): TeamMember;
}