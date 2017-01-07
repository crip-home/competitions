<?php

use App\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            Role::SUPER_ADMIN,

            Role::CREATE_POST,
            Role::MANAGE_POSTS,

            Role::CREATE_TEAMS,

            Role::EDIT_COMPETITIONS,
            Role::CREATE_COMPETITIONS,
        ];

        foreach ($roles as $role) {
            Role::create(['key' => $role]);
        }
    }
}
