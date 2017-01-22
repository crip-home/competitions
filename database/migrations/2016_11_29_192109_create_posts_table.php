<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends BaseMigration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('body');
            $table->string('image', 1000);
            $table->enum('state', ['PUBLISHED', 'DRAFT', 'PENDING', 'TRASH', 'PRIVATE']);
            $table->timestamp('publish_at')->nullable();

            $table->integer('author_id')->unsigned();
            $table->foreign('author_id')->references('id')->on('users');

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
        Schema::dropIfExists('posts');
    }
}
