<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

/**
 * Class UsersTableSeeder
 */
class UsersTableSeeder extends Seeder
{
    /**
     * @var \Illuminate\Support\Collection
     */
    private $roles;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $posts_table = app(\App\Post::class)->getTable();
        $users_table = app(\App\User::class)->getTable();

        DB::table($posts_table)->delete();
        DB::table($users_table)->delete();

        $this->createAdmin();
        $this->createPostCreator();
        $this->createPostManager();

        // Create extra 50 random users
        factory(App\User::class, 50)->create()->each(function ($user) {
            // Create random user posts
            factory(\App\Post::class, 3)->create(['author_id' => $user->id]);
        });
    }

    private function findRoleId($role_key)
    {
        if (!$this->roles) {
            $role_table = app(\App\Role::class)->getTable();
            $this->roles = DB::table($role_table)->get();
        }
        $result = 0;
        $this->roles->filter(function ($role) use ($role_key) {
            return $role->key == $role_key;
        })->map(function ($role) use (&$result) {
            $result = $role->id;
            return $role->id;
        });

        return $result;
    }

    private function createAdmin()
    {
        $admin = App\User::create([
            'name' => 'TAHQ69',
            'email' => 'admin@crip.lv',
            'password' => bcrypt('password')
        ]);

        // add super admin role for admin user
        $admin->roles()->sync([$this->findRoleId(\App\Role::SUPER_ADMIN)]);

        factory(App\Post::class, 5)->create(['author_id' => $admin->id]);
    }

    private function createPostCreator()
    {
        $user = App\User::create([
            'name' => 'post.creator',
            'email' => 'post.creator@crip.lv',
            'password' => bcrypt('password')
        ]);

        // add super admin role for admin user
        $user->roles()->sync([$this->findRoleId(\App\Role::CREATE_POST)]);

        factory(App\Post::class, 20)->create(['author_id' => $user->id]);
    }

    private function createPostManager()
    {
        $user = App\User::create([
            'name' => 'post.manager',
            'email' => 'post.manager@crip.lv',
            'password' => bcrypt('password')
        ]);

        // add super admin role for admin user
        $user->roles()->sync([$this->findRoleId(\App\Role::MANAGE_POSTS)]);
    }
}