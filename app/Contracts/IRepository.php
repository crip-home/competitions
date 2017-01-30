<?php namespace App\Contracts;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

/**
 * Class IRepository
 * @package App\Contracts
 */
interface IRepository
{
    /**
     * Get the table associated with the repository model.
     *
     * @return string
     */
    public function getTable();

    /**
     * Get current repository full model class name
     *
     * @return string
     */
    public function modelClass();

    /**
     * Set repository querable ordering
     *
     * @param string $by
     * @param string $direction
     *
     * @return $this
     */
    public function order($by = 'id', $direction = 'desc');

    /**
     * Set repository querable ordering from a request
     *
     * @param Request $request
     *
     * @return $this
     */
    public function requestOrder(Request $request);

    /**
     * Find single instance of model
     *
     * @param * $id
     * @param array $columns
     *
     * @return Model
     */
    public function find($id, array $columns = ['*']);

    /**
     * Get collection of models
     *
     * @param array $filters
     * @param array $column
     *
     * @return Collection
     */
    public function get(array $filters = [], $column = ['*']);

    /**
     * Create new instance in of model in database
     *
     * @param array $input
     *
     * @return Model
     */
    public function create(array $input);

    /**
     * Update existing instance in database
     *
     * @param array $input
     * @param int $id
     * @param Model $model
     *
     * @return Model
     */
    public function update(array $input, $id, Model $model = null);

    /**
     * Delete record in database
     *
     * @param int $id
     *
     * @return boolean
     */
    public function delete($id);
}