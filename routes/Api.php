<?php

use App\Http\Controllers\Api\AulaController;
use App\Http\Controllers\Api\DispositivoController;
use App\Http\Controllers\Api\EstudianteController;
use App\Http\Controllers\Api\HorarioController;
use App\Http\Controllers\Api\LecturaController;
use Illuminate\Support\Facades\Route;
use App\Models\User;


Route::get('/test', function () {
    echo 'as';
});

Route::get('/aulas', [AulaController::class, 'index']);
Route::get('/aulas/{aula}', [AulaController::class, 'show']);
Route::get('/profesores', fn() => \App\Models\User::select('id','name','email')->get());

Route::get('/dispositivos', [DispositivoController::class, 'index']);
Route::get('/dispositivos/by-aula/{aula}', [DispositivoController::class, 'byAula']);
Route::post('/dispositivos/{dispositivo}/toggle', [DispositivoController::class, 'toggle']); // encender/apagar demo

Route::get('/estudiantes', [EstudianteController::class, 'index']);
Route::post('/estudiantes', [EstudianteController::class, 'store']); // registra (con foto_base64 opcional)

Route::get('/horarios/by-aula/{aula}', [HorarioController::class, 'byAula']);

Route::get('/lecturas/serie/{dispositivo}', [LecturaController::class, 'serie']); // para gráfico


// Aulas
Route::get('/aulas', [AulaController::class, 'index']);
Route::get('/aulas/{aula}', [AulaController::class, 'show']);

// Profesores (demo: lista de users)
Route::get('/profesores', fn() => User::select('id','name','email')->get());

Route::get('/dispositivos', [DispositivoController::class, 'index']);
Route::get('/lecturas/serie/{dispositivo}', [LecturaController::class, 'serie']);

// Dispositivos
Route::get('/dispositivos', [DispositivoController::class, 'index']);
Route::get('/dispositivos/by-aula/{aula}', [DispositivoController::class, 'byAula']);
Route::post('/dispositivos', [DispositivoController::class, 'store']);
Route::post('/dispositivos/{dispositivo}/toggle', [DispositivoController::class, 'toggle']);
Route::delete('/dispositivos/{dispositivo}', [DispositivoController::class, 'destroy']);

// Estudiantes
Route::get('/estudiantes', [EstudianteController::class, 'index']);
Route::post('/estudiantes', [EstudianteController::class, 'store']);

// Horarios
Route::get('/horarios/by-aula/{aula}', [HorarioController::class, 'byAula']);

// Lecturas (gráfico)
//Route::get('/lecturas/serie/{dispositivo}', [LecturaController::class, 'serie']);
Route::get('/api/lecturas/serie/{id}', [LecturaController::class, 'serie']);