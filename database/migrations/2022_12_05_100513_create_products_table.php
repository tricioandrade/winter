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
        Schema::create('tax_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('description')->unique();
            $table->string('symbol')->unique();
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')
                ->on('users')
                ->references('id');

            $table->string('description');
            $table->string('unique_code')->unique();
            $table->string('code')->unique();
            $table->string('storage_id')->nullable();
            $table->bigInteger('stock_quantity');
            $table->bigInteger('unity_quantity');
            $table->bigInteger('for_sale_quantity')->nullable();
            $table->string('for_sale_status');
            $table->string('unity_of_measure');
            $table->decimal('price', 20, 4);
            $table->decimal('price_with_tax', 20, 4);
            $table->decimal('promotional_price', 20, 4)->nullable();
            $table->string('promotional_status')->nullable();

            $table->unsignedBigInteger('tax_type_id');
            $table->foreign('tax_type_id')
                    ->on('tax_types')
                    ->references('id');

            $table->integer('tax_value');
            $table->decimal('tax_total_added', 20, 4);
            $table->string('tax_exemption_code', 6);
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
