<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateCompetitionsTable
 */
class CreateCompetitionsTable extends BaseMigration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('competitions', function (Blueprint $table) {
            $table->increments('id');

            $table->string('title');
            $table->string('subtitle');
            $table->longText('cooperation');
            $table->longText('invitation');
            $table->longText('program');
            $table->longText('rules');
            $table->longText('ambulance');
            $table->longText('prizes');
            $table->longText('equipment');
            $table->longText('price');
            $table->timestamp('organization_date')->nullable();
            $table->timestamp('registration_till')->nullable();

            $table->unsignedInteger('judge_id')->nullable();
            $table->string('judge_name');
            $table->foreign('judge_id')->references('id')->on('users')->onDelete('no action');

            $this->audit($table);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('competitions');
    }
}
