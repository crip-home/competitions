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
        // Get list of all tables in our database
        $tables = DB::table('information_schema.TABLES')
            ->where('TABLE_SCHEMA', env('DB_DATABASE'))
            ->get(['TABLE_NAME']);

        // Disable FOREIGN_KEY_CHECKS to be able truncate tables with relationships
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');

        // Truncate database tables
        foreach ($tables as $table)
            DB::table($table->TABLE_NAME)->truncate();

        // Return back FOREIGN_KEY_CHECKS to avoid future issues with missing data
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');
    }
}
