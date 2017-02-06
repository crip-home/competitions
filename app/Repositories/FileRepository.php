<?php namespace App\Repositories;

use App\Contracts\IFileRepository;
use App\File;

/**
 * Class FileRepository
 * @package App\Repositories
 */
class FileRepository extends Repository implements IFileRepository
{
    /**
     * Get current repository full model class name
     * @return string
     */
    function modelClass()
    {
        return File::class;
    }

    /**
     * Filter files where name starts with passed name
     * @param string $name
     * @return $this
     */
    public function whereNameStartsWith($name)
    {
        $this->query = $this->getQuery()->where('name', 'LIKE', $name . '%');

        return $this;
    }
}