<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Aula;
use Illuminate\Http\Request;

class AulaController extends Controller
{
    public function index()
    {
        $aulas = Aula::withCount(['dispositivos','estudiantes'])->orderBy('nombre')->get();

        return response()->json($aulas);
    }

    public function show(Aula $aula)
    {
        $aula->load(['dispositivos','estudiantes','horarios.curso','horarios.profesor:id,name']);
        return response()->json($aula);
    }
}
