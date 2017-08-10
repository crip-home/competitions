<?php namespace App\Repositories;

use App\Contracts\IPaginateRepository;

/**
 * Class PaginationRepository
 * @package App\Repositories
 */
abstract class PaginationRepository
    extends Repository
    implements IPaginateRepository
{
    /**
     * Paginate collection of models
     * @param int $perPage
     * @param array $filters
     * @param array $columns
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginate(
        $perPage = 15, array $filters = [], array $columns = ['*']
    )
    {
        $this->filter($filters);

        $result = $this->getQuery()->paginate($perPage, $columns);

        $this->resetQuery();

        return $result;
    }
}