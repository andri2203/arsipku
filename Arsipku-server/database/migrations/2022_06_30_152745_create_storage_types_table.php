<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStorageTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('storage_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['main', 'second']);
            $table->timestamp('time')->default(now());
            $table->timestamps();
        });

        Schema::table('storages', function (Blueprint $table) {
            $table->foreignId('storage_type_id')->references('id')->on('storage_types');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('storage_types');
    }
}
