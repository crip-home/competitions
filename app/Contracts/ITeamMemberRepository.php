<?php namespace App\Contracts;

/**
 * Interface ITeamMemberRepository
 * @package App\Contracts
 */
interface ITeamMemberRepository extends IPaginateRepository
{
    /**
     * Set team id filter on querable
     * @param int $id
     * @return $this
     */
    public function filterByTeam($id);

    /**
     * Join user details to member
     * @return $this
     */
    public function withUserDetails();
}