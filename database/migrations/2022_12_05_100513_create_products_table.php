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
        Schema::create('tax', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('name')->unique();
            $table->string('description')->unique();
            $table->string('symbol')->unique();
            $table->timestamps();
        });

        Schema::create('product_types', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('name')->unique();
            $table->string('symbol')->unique();
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id('id')->autoIncrement();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')
                ->on('users')
                ->references('id');

            $table->string('name')->unique();
            $table->string('description');
            $table->string('code')->unique();
            $table->integer('stock_quantity');
            $table->integer('unity_quantity');
            $table->integer('for_sale_quantity')->nullable();
            $table->boolean('for_sale_status');
            $table->string('unity_of_measure');
            $table->decimal('price', 20, 4);
            $table->decimal('price_with_tax', 20,4);
            $table->unsignedBigInteger('product_type_id');
            $table->foreign('product_type_id')
                ->on('product_types')
                ->references('id');

            $table->decimal('promotional_price', 20,4)->nullable();
            $table->boolean('promotional_status')->nullable();
            $table->unsignedBigInteger('tax_id');
            $table->foreign('tax_id')
                ->on('tax')
                ->references('id');

            $table->integer('tax_value');
            $table->decimal('tax_total_added', 20, 4);
            $table->string('tax_exemption_code', 10);
            $table->string('tax_exemption_reason', 100);
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
        Schema::dropIfExists('products');
    }
};
