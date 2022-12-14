<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('name');
            $table->string('nif');
            $table->string('currency')->default('AOA');
            $table->string('designation');
            $table->string('port');
            $table->string('address');
            $table->string('street');
            $table->string('fulladdress');
            $table->string('city');
            $table->string('country');
            $table->string('email');
            $table->string('fiscal_year');
            $table->string('phone');
            $table->string('iban');
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
        Schema::dropIfExists('companies');
    }
};
