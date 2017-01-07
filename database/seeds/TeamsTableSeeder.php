<?php

/**
 * Class TeamsTableSeeder
 */
class TeamsTableSeeder extends \Illuminate\Database\Seeder
{
    const INSERT = 'INSERT INTO teams 
          (name, short, created_by, created_by_name) 
          VALUES (?,?,?,?)';

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $manager = \App\User::where('email', UsersTableSeeder::TEAM_MANAGER_EMAIL)->firstOrFail();

        $name = 'Team Manager Team 1';
        DB::insert(static::INSERT, [
            $name,
            'TMT1',
            $manager->id,
            $manager->name
        ]);

        /** @var \App\Team $team */
        $team = \App\Team::whereName($name)->firstOrFail();
        $team->owners()->sync([$manager->id]);
    }
}