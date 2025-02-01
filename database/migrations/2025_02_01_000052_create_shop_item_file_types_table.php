<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shop_item_file_types', function (Blueprint $table) {
            $table->bigInteger('shop_item_id')->unsigned();
            $table->bigInteger('file_type_id')->unsigned();
            $table->timestamps();
            $table->primary(['shop_item_id', 'file_type_id']);
    
            $table->foreign('shop_item_id')
                ->references('id')
                ->on('shop_items')
                ->onDelete('cascade');
    
            $table->foreign('file_type_id')
                ->references('id')
                ->on('file_types')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shop_item_file_types');
    }
};
