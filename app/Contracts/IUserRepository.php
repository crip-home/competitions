<?php namespace App\Contracts;

/**
 * Interface IUserRepository
 * @package App\Contracts
 */
interface IUserRepository extends IPaginateRepository
{
    /**
     * Set query to search by name column
     *
     * @param string $name
     *
     * @return $this
     */
    public function searchByName($name);

    /**
     * Join user roles to the query response
     *
     * @return $this
     */
    public function withRoles();

    /**
     * Join user teams from membership to the query response
     *
     * @param bool $includeLogo
     *
     * @return $this
     */
    public function withTeams($includeLogo = false);
}