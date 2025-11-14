<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dispositivo;
use Illuminate\Http\Request;

class LecturaController extends Controller
{
    public function serie(Dispositivo $dispositivo)
    {
        $rows = $dispositivo->lecturas()
            ->orderBy('registrado_en')
            ->limit(24)
            ->get(['valor','registrado_en']);

        $serie = $rows->map(fn($r)=>[
            'hora'  => $r->registrado_en->format('H:i'),
            'valor' => (float)$r->valor,
        ]);

        // útiles para cards (min/max/actual)
        $min = $dispositivo->lecturas()->min('valor');
        $max = $dispositivo->lecturas()->max('valor');
        $actual = optional($dispositivo->lecturas()->latest('registrado_en')->first())->valor;

        return response()->json(compact('serie','min','max','actual'));
    }
}
