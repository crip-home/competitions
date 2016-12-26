<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateDisciplinesTable
 */
class CreateDisciplinesTable extends Migration
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

            $table->unsignedInteger('created_by')->index();
            $table->string('created_by_name');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('no action');

            $table->unsignedInteger('updated_by')->nullable();
            $table->string('updated_by_name');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('no action');

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
