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
        DB::table('posts')->delete();
        DB::table('users')->delete();

        $admin = App\User::create([
            'name' => 'TAHQ69',
            'email' => 'admin@crip.lv',
            'password' => bcrypt('password')
        ]);

        factory(App\Post::class, 5)->create(['author_id' => $admin->id]);

        factory(App\User::class, 50)->create()->each(function ($user) {
            //TODO: create posts only if user has permission for it
            factory(\App\Post::class, 3)->create(['author_id' => $user->id]);
        });
    }
}