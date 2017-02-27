<?php

use Illuminate\Database\Seeder;

/**
 * Class CompetitionsTableSeeder
 */
class CompetitionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Competition::class, 30)->create();
    }
}
