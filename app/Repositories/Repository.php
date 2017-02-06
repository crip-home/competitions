<?php namespace App\Repositories;

use App\Contracts\IRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

/**
 * Class Repository
 * @package App\Repositories
 */
abstract class Repository implements IRepository
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * @var  \Illuminate\Database\Eloquent\Builder
     */
    protected $query;

    /**
     * Repository constructor.
     */
    public function __construct()
    {
        $this->model = app($this->modelClass());
    }

    /**
     * Get the table associated with the repository model.
     * @return string
     */
    public function getTable()
    {
        return $this->model->getTable();
    }

    /**
     * Get current repository full model class name
     * @return string
     */
    abstract function modelClass();

    /**
     * Set repository querable ordering
     * @param string $by
     * @param string $direction
     * @return $this
     */
    public function orderBy($by = 'id', $direction = 'asc')
    {
        $this->query = $this->getQuery()->orderBy($by, $direction);

        return $this;
    }

    /**
     * Set repository querable ordering from a request
     * @param Request $request
     * @param string $defaultOrder
     * @param string $defaultDirection
     * @return $this
     */
    public function requestOrdered(Request $request, $defaultOrder = 'id', $defaultDirection = 'asc')
    {
        $order = $request->sort_order ?: $defaultOrder;
        $direction = $request->sort_direction ?: $defaultDirection;

        $this->orderBy($order, $direction);

        return $this;
    }

    /**
     * Find single instance of model
     * @param * $id
     * @param array $columns
     * @return Model
     */
    public function find($id, array $columns = ['*'])
    {
        $result = $this->getQuery()->findOrFail($id, $columns);

        $this->resetQuery();

        return $result;
    }

    /**
     * Get collection of models
     * @param array $filters
     * @param array $columns
     * @return Collection
     */
    public function get(array $filters = [], $columns = ['*'])
    {
        $this->filter($filters);

        $result = $this->getQuery()->get($columns);

        $this->resetQuery();

        return $result;
    }

    /**
     * Create new instance in of model in database
     * @param array $input
     * @return Model
     */
    public function create(array $input)
    {
        $model = $this->model->newInstance($input);

        $model->saveOrFail();

        return $model;
    }

    /**
     * Update existing instance in database
     * @param array $input
     * @param int $id
     * @param Model $model
     * @return Model
     */
    public function update(array $input, $id, Model $model = null)
    {
        if (!$model) {
            $model = $this->find($id);
        }

        $model->update($input);

        $this->resetQuery();

        return $model;
    }

    /**
     * Delete record in database
     * @param int $id
     * @return boolean
     */
    public function delete($id)
    {
        return $this->find($id)->delete();
    }

    /**
     * Get count of querable records
     * @return integer
     */
    public function count()
    {
        return $this->getQuery()->count();
    }

    /**
     * Set filter params to querable
     * @param array $filters
     * @return $this
     * @throws \Exception
     */
    protected function filter($filters = [])
    {
        foreach ($filters as $filter => $index) {
            if (is_array($filter)) {
                $this->query = call_user_func_array([$this->getQuery(), 'where'], $filter);
            } else {
                $type = gettype($filter);
                throw new \Exception("Filters property should be array with arrays, but got '$type' at position '$index'");
            }
        }

        return $this;
    }

    /**
     * Get actual query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function getQuery()
    {
        if (!$this->query) {
            $this->query = $this->model->newQuery();
        }

        return $this->query;
    }

    /**
     * Reset current query to new instance
     */
    protected function resetQuery()
    {
        $this->query = $this->model->newQuery();
    }
}