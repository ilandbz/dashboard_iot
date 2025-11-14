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
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('apellido');
            $table->string('dni', 15)->unique();
            $table->enum('genero', ['M','F','O'])->nullable();
            $table->string('rol')->default('estudiante');
            $table->string('nivel')->nullable();
            $table->string('grado')->nullable();
            $table->string('seccion')->nullable();
            $table->foreignId('aula_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('profesor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->longText('foto_base64')->nullable(); // captura webcam demo
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estudiantes');
    }
};
