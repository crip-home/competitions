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
    function filterByOwner($ownerId);

    /**
     * Join logo to query results
     *
     * @return $this
     */
    public function withLogo();

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
     * @param array $memberDetails
     *
     * @return mixed Member model
     */
    public function createMember($team, array $memberDetails);
}