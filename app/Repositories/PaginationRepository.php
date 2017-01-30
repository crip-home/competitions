<?php namespace App\Repositories;

use App\Contracts\IPaginateRepository;

/**
 * Class PaginationRepository
 * @package App\Repositories
 */
abstract class PaginationRepository extends Repository implements IPaginateRepository
{
    /**
     * Paginate collection of models
     *
     * @param int $per_page
     * @param array $filters
     * @param array $columns
     *
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginate($per_page = 15, array $filters = [], array $columns = ['*'])
    {
        $this->filter($filters);

        $result = $this->getQuery()->paginate($per_page, $columns);

        $this->resetQuery();

        return $result;
    }
}