<?php

use App\Role;
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

    const SUPER_ADMIN_EMAIL = 'tahq69@gmail.com';
    const POST_MANAGER_EMAIL = 'post.manager@crip.lv';
    const TEAM_MANAGER_EMAIL = 'team.manager@crip.lv';

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->createAdmin();
        $this->createPostCreator();
        $this->createPostManager();
        $this->createTeamManager();

        // Create extra 50 random users
        factory(App\User::class, 50)->create()->each(function ($user) {
            // Create random user posts
            factory(\App\Post::class, 3)->create(['author_id' => $user->id]);
        });
    }

    private function createAdmin()
    {
        $admin = App\User::create([
            'name' => 'TAHQ69',
            'email' => static::SUPER_ADMIN_EMAIL ,
            'password' => bcrypt('password')
        ]);

        // add super admin role for admin user
        $admin->roles()->sync([$this->findRoleId(Role::SUPER_ADMIN)]);

        factory(App\Post::class, 5)->create(['author_id' => $admin->id]);
    }

    private function createPostCreator()
    {
        $user = App\User::create([
            'name' => 'post.creator',
            'email' => 'post.creator@crip.lv',
            'password' => bcrypt('password')
        ]);

        // add create post role for user
        $user->roles()->sync([$this->findRoleId(Role::CREATE_POST)]);

        factory(App\Post::class, 20)->create(['author_id' => $user->id]);
    }

    private function createPostManager()
    {
        $user = App\User::create([
            'name' => 'post.manager',
            'email' => static::POST_MANAGER_EMAIL,
            'password' => bcrypt('password')
        ]);

        // add manage posts role for user
        $user->roles()->sync([$this->findRoleId(Role::MANAGE_POSTS)]);
    }

    private function createTeamManager()
    {
        $user = App\User::create([
            'name' => 'team.manager',
            'email' => static::TEAM_MANAGER_EMAIL,
            'password' => bcrypt('password')
        ]);

        $user->roles()->sync([$this->findRoleId(Role::CREATE_TEAMS)]);
    }

    private function findRoleId($role_key)
    {
        if (!$this->roles) {
            $role_table = app(Role::class)->getTable();
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
}