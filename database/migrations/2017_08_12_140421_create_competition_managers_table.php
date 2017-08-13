<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateCompetitionManagersTable
 */
class CreateCompetitionManagersTable extends BaseMigration
{
    /**
     * Run the migrations.
     * @return void
     */
    public function up()
    {
        Schema::create('competition_managers', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('competition_id');
            $table->foreign('competition_id')->references('id')
                ->on('competitions')->onDelete('cascade');

            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');

            $this->audit($table);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('competition_managers');
    }
}
