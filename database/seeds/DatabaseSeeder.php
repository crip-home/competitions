<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->cleanDatabase();

        Eloquent::unguard();

        $this->call(RolesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(TeamsTableSeeder::class);

        Eloquent::unguard(false);
    }

    private function cleanDatabase()
    {
        $tables = [
            'areas',
            'category_groups',
            'categories',
            'disciplines',
            'competitions',
            'role_user',
            'roles',
            'posts',
            'team_members',
            'team_owner',
            'teams',
            'users',
        ];

        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');

        foreach ($tables as $table) {
            DB::table($table)->truncate();
        }

        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');
    }
}
