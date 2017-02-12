<?php namespace App\Contracts;

/**
 * Interface ICompetitionRepository
 * @package App\Contracts
 */
interface ICompetitionRepository extends IPaginateRepository
{
    /**
     * Filter owned or managed competitions
     * @return $this
     */
    public function filterOwnedOrManaged();
}