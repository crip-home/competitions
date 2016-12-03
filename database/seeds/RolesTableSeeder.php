<?php

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
        $role_table = app(\App\Role::class)->getTable();
        $roles = [
            'SUPER_ADMIN',
            'CREATE_POST',
            'EDIT_POSTS',
        ];

        DB::table($role_table)->delete();

        foreach ($roles as $role) {
            DB::table($role_table)->insert([
                'key' => $role
            ]);
        }
    }
}
