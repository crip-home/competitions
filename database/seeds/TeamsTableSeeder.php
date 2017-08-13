<?php

use App\Team;
use App\User;

/**
 * Class TeamsTableSeeder
 */
class TeamsTableSeeder extends \Illuminate\Database\Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $manager = User::where('email', UsersTableSeeder::TEAM_MANAGER_EMAIL)
            ->firstOrFail();

        $team = Team::create([
            'name' => 'Team Manager Team 1',
            'short' => 'TMT1',
            'created_by' => $manager->id,
            'created_by_name' => $manager->name
        ]);

        $team->owners()->sync([$manager->id]);
    }
}