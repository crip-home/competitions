<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAreasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('areas', function (Blueprint $table) {
            $table->increments('id');

            $table->string('title');
            $table->string('type');
            $table->unsignedInteger('nr')->nullable();
            $table->text('description')->nullable();

            $table->unsignedInteger('competition_id');
            $table->foreign('competition_id')->references('id')->on('competitions')->onDelete('cascade');

            $table->unsignedInteger('created_by')->index();
            $table->string('created_by_name');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('no action');

            $table->unsignedInteger('updated_by')->nullable();
            $table->string('updated_by_name')->default('');
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
        Schema::dropIfExists('areas');
    }
}
