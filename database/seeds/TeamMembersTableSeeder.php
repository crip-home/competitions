<?php

use App\Team;
use Illuminate\Database\Seeder;

class TeamMembersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $team = Team::query()->firstOrFail();
        factory(\App\TeamMember::class, 50)->create(['team_id' => $team->id]);
    }
}
