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
        Schema::create('sales', function (Blueprint $table) {
            $table->id('id')->autoIncrement();

            $table->unsignedBigInteger('company_id');
            $table->foreign('company_id')
                ->references('id')
                ->on('companies');

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')
                ->references('id')
                ->on('users');

            $table->unsignedBigInteger('document_type_id')->unique();
            $table->foreign('document_type_id')
                ->on('document_types')
                ->references('id');

            $table->string('currency')->default('AOA');
            $table->integer('exchange')->default(750);
            $table->string('customer')->default('Consumidor final');

            $table->decimal('paid_value', 20, 4);
            $table->decimal('change', 20, 4)->default(0);

            $table->string('payment_mechanism');
            $table->string('payment_way');

            $table->string('invoice_status', 1)->default('N');
            $table->unsignedBigInteger('invoice_type_id');

            $table->string('invoice_number')->unique();

            $table->integer('day');
            $table->integer('month');
            $table->date('date');
            $table->date('expiration_date');
            $table->dateTime('system_entry_date');


            $table->decimal('merchandise_total', 20, 4)->default(0);
            $table->decimal('commercial_discount', 20, 4)->default(0);
            $table->decimal('financial_discount', 20, 4)->default(0);
            $table->decimal('postage', 20, 4)->default(0);
            $table->decimal('service_total', 20, 4)->default(0);
            $table->decimal('tax_total', 20, 4)->default(0);
            $table->decimal('advance', 20, 4)->default(0);
            $table->decimal('eco_value', 20, 4)->default(0);
            $table->decimal('hit', 20, 4)->default(0);
            $table->decimal('total', 20, 4)->default(0);
            $table->string('short_hash',4);

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
        Schema::dropIfExists('sales');
    }
};
