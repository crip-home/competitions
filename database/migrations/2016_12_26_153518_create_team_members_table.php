<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTeamMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('team_members', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('no action');

            $table->unsignedInteger('team_id');
            $table->foreign('team_id')->references('id')->on('teams')->onDelete('cascade');

            $table->string('name');
            $table->string('membership_type');

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
        Schema::dropIfExists('team_members');
    }
}
