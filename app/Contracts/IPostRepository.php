<?php namespace App\Contracts;

/**
 * Interface IPostRepository
 * @package App\Contracts
 */
interface IPostRepository extends IPaginateRepository
{
    /**
     * Filter only published posts
     * @return $this
     */
    public function filterPublished();

    /**
     * Filter only where in list of locales
     * @param array $locales
     * @return $this
     */
    public function filterLocales(array $locales = []);

    /**
     * Filter query by author id
     * @param int $id Author identifier
     * @return $this
     */
    public function filterByAuthor($id);

    /**
     * Join author entity ro querable
     * @return $this
     */
    public function withAuthor();
}