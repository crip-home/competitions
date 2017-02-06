<?php namespace App\Contracts;

/**
 * Class IFileRepository
 * @package App\Contracts
 */
interface IFileRepository extends IRepository
{
    /**
     * Filter files where name starts with passed name
     * @param string $name
     * @return $this
     */
    public function whereNameStartsWith($name);
}