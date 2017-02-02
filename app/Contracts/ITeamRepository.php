<?php namespace App\Contracts;

/**
 * Interface ITeamRepository
 * @package App\Contracts
 */
interface ITeamRepository extends IPaginateRepository
{
    /**
     * Filter teams by owner id
     *
     * @param int $ownerId
     *
     * @return $this
     */
    function whereOwnerIs($ownerId);

    /**
     * Create new team and attach owner in single transaction
     *
     * @param array $input
     * @param int $ownerId
     *
     * @return mixed
     *
     * @throws \Exception
     */
    function createAndAttachOwner(array $input, $ownerId);

    /**
     * Crate team member for team
     *
     * @param mixed $team Team model
     * @param array $details
     *
     * @return mixed Member model
     */
    public function createMember($team, array $details);
}