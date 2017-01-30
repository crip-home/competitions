<?php namespace App\Contracts;

/**
 * Class IPaginateRepository
 * @package App\Contracts
 */
interface IPaginateRepository extends IRepository
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
    public function paginate($per_page = 15, array $filters = [], array $columns = ['*']);
}