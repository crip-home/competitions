<?php namespace App\Contracts;

/**
 * Interface IPostRepository
 * @package App\Contracts
 */
interface IPostRepository extends IPaginateRepository
{
    /**
     * Filter only published posts
     *
     * @return $this
     */
    public function onlyPublished();

    /**
     * Filter only where in list of locales
     *
     * @param array $locales
     *
     * @return $this
     */
    public function scopeLocales(array $locales = []);

    /**
     * Join author entity ro querable
     *
     * @return $this
     */
    public function withAuthor();
}