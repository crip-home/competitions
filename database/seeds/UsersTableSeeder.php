<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

/**
 * Class UsersTableSeeder
 */
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();

        App\User::create([
            'name' => 'TAHQ69',
            'email' => 'admin@crip.lv',
            'password' => bcrypt('password')
        ]);

        factory(App\User::class, 50)->create();
    }
}