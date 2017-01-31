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
     * Join user roles to the request response
     *
     * @return $this
     */
    public function withRoles();
}