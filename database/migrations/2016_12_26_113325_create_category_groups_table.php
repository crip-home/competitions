<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateCategoryGroupsTable
 */
class CreateCategoryGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('category_groups', function (Blueprint $table) {
            $table->increments('id');

            $table->string('title');
            $table->string('short', 15);

            $table->unsignedInteger('competition_id');
            $table->foreign('competition_id')->references('id')->on('competitions')->onDelete('cascade');

            $table->string('discipline_title');
            $table->string('discipline_short');
            $table->unsignedInteger('discipline_id');
            $table->foreign('discipline_id')->references('id')->on('disciplines')->onDelete('cascade');

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
        Schema::dropIfExists('category_groups');
    }
}
