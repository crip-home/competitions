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
        $role_table = app(Role::class)->getTable();
        $roles = [
            Role::SUPER_ADMIN,

            Role::CREATE_POST,
            Role::MANAGE_POSTS,

            Role::EDIT_COMPETITIONS,
            Role::CREATE_COMPETITIONS,
            Role::MANAGE_COMPETITIONS,
        ];

        DB::table('role_user')->delete();
        DB::table($role_table)->delete();

        foreach ($roles as $role) {
            Role::create(['key' => $role]);
        }
    }
}
