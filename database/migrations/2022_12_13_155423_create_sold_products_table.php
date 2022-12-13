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
        Schema::create('sold_products', function (Blueprint $table) {
            $table->id('id')->autoIncrement();
            $table->unsignedBigInteger('sale_id');
            $table->foreign('sale_id')
                ->references('id')
                ->on('sales');

            $table->string('name');
            $table->string('description');
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')
                ->references('id')
                ->on('products');

            $table->decimal('price', 20, 4);
            $table->decimal('price_with_tax', 20,4);
            $table->decimal('promotional_price', 20,4)->nullable();
            $table->boolean('promotional_status')->nullable();

            $table->string('product_type_symbol');
            $table->string('product_type_name');

            $table->decimal('sold_quantity', 20,4);
            $table->integer('discount');
            $table->integer('tax_value');
            $table->string('tax_type');
            $table->decimal('tax_total', 20,2);
            $table->decimal('total',20,4);
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
        Schema::dropIfExists('sold_products');
    }
};
