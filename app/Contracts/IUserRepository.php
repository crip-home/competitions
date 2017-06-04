<?php namespace App\Contracts;

/**
 * Interface IUserRepository
 * @package App\Contracts
 */
interface IUserRepository extends IPaginateRepository
{
    /**
     * Set query to search by name column
     * @param string $name
     * @return IUserRepository
     */
    public function searchByName(string $name): IUserRepository;

    /**
     * Join user roles to the query response.
     * @return IUserRepository
     */
    public function withRoles(): IUserRepository;

    /**
     * Join user teams from membership to the query response.
     * @return IUserRepository
     */
    public function withTeams(): IUserRepository;
}