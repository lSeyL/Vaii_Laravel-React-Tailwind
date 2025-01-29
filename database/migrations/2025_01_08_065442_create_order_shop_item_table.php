<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderShopItemTable  extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_shop_item', function (Blueprint $table) {
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('shop_item_id');
            $table->timestamps();

            
            $table->primary(['order_id', 'shop_item_id']);
            $table->foreign('order_id')
                  ->references('id')->on('orders')
                  ->onDelete('cascade');
            $table->foreign('shop_item_id')
                  ->references('id')->on('shop_items')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_shop_item');
    }
};
