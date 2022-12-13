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
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')
                ->references('id')
                ->on('users');

            $table->unsignedBigInteger('document_type_id')->unique();
            $table->foreign('document_type_id')
                ->on('document_types')
                ->references('id');

            $table->string('currency')->default('AOA');
            $table->string('exchange')->default('750');
            $table->string('customer');

            $table->decimal('paid_value', 20,2);
            $table->string('change');
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


            $table->string('merchandise_total');
            $table->string('commercial_discount');
            $table->string('financial_discount');
            $table->string('postage');
            $table->string('service_total');
            $table->string('tax_total');
            $table->string('advance');
            $table->string('eco_value');
            $table->string('hit');
            $table->string('total');
            $table->string('short_hash');

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
