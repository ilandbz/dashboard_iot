<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Aula;
use Illuminate\Http\Request;

class HorarioController extends Controller
{
    public function byAula(Aula $aula)
    {
        $items = $aula->horarios()
            ->with(['curso:id,nombre','profesor:id,name'])
            ->orderBy('dia')->orderBy('hora_inicio')
            ->get();

        return response()->json($items);
    }
}
