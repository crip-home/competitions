<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateDisciplinesTable
 */
class CreateDisciplinesTable extends BaseMigration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('disciplines', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('competition_id')->index();
            $table->foreign('competition_id')->references('id')->on('competitions')->onDelete('cascade');

            $table->string('title');
            $table->string('short', 15);
            $table->string('type');
            $table->text('game_type');
            $table->text('description');

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
        Schema::dropIfExists('disciplines');
    }
}
