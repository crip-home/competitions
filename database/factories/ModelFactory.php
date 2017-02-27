<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Post::class, function (Faker\Generator $faker) {
    return [
        'title' => $faker->sentence(),
        'body' => join('<br><br>', $faker->paragraphs(10)),
        'image' => $faker->imageUrl(1110, 300),
        'state' => $faker->randomElement(['PUBLISHED', 'DRAFT', 'PENDING', 'TRASH', 'PRIVATE']),
        'publish_at' => $faker->dateTimeThisMonth,
        'locale' => $faker->randomElement(['lv', 'en']),
    ];
});

$factory->define(\App\TeamMember::class, function (Faker\Generator $faker) {
    return [
        'membership_type' => \App\TeamMember::MEMBER,
        'name' => $faker->name,
    ];
});

$factory->define(\App\Competition::class, function (Faker\Generator $faker) {
    $date = (new \Carbon\Carbon('now'))->addDays($faker->numberBetween(20, 40));
    return [
        'ambulance' => join('<br><br>', $faker->paragraphs(3)),
        'cooperation' => join('<br><br>', $faker->paragraphs(10)),
        'equipment' => join('<br><br>', $faker->paragraphs(5)),
        'invitation' => join('<br><br>', $faker->paragraphs(2)),
        'organization_date' => $date,
        'price' => join('<br><br>', $faker->paragraphs(5)),
        'prizes' => join('<br><br>', $faker->paragraphs(10)),
        'program' => join('<br><br>', $faker->paragraphs(20)),
        'registration_till' => $date->addDays(-1),
        'rules' => join('<br><br>', $faker->paragraphs(40)),
        'subtitle' => $faker->sentence(),
        'title' => $faker->sentence(),

        'judge_name' => $faker->name,
        'judge_id' => 5
    ];
});