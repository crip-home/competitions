<?php namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

/**
 * Class CompetitionController
 * @package App\Http\Controllers\Admin
 */
class CompetitionController extends Controller
{
    /**
     * FileController constructor.
     */
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }
}