<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dispositivo;
use App\Models\Lectura;
use Carbon\Carbon;
use Illuminate\Http\Request;

class LecturaController extends Controller
{
    // public function serie(Dispositivo $dispositivo)
    // {
    //     $rows = $dispositivo->lecturas()
    //         ->orderBy('registrado_en')
    //         ->limit(24)
    //         ->get(['valor','registrado_en']);

    //     $serie = $rows->map(fn($r)=>[
    //         'hora'  => $r->registrado_en->format('H:i'),
    //         'valor' => (float)$r->valor,
    //     ]);

    //     // útiles para cards (min/max/actual)
    //     $min = $dispositivo->lecturas()->min('valor');
    //     $max = $dispositivo->lecturas()->max('valor');
    //     $actual = optional($dispositivo->lecturas()->latest('registrado_en')->first())->valor;

    //     return response()->json(compact('serie','min','max','actual'));
    // }

    public function serie($dispositivo_id)
    {
        $lecturas = Lectura::where('dispositivo_id', $dispositivo_id)
            ->orderBy('registrado_en')
            ->limit(30)
            ->get();

        if ($lecturas->isEmpty()) {
            return response()->json([
                'serie' => [],
                'min' => null,
                'max' => null,
                'actual' => null
            ]);
        }

        $serie = $lecturas->map(fn($l) => [
            'hora' => Carbon::parse($l->registrado_en)->format('H:i'),
            'valor' => (float)$l->valor
        ]);

        return response()->json([
            'serie' => $serie,
            'min'   => $serie->min('valor'),
            'max'   => $serie->max('valor'),
            'actual'=> $serie->last()['valor'],
        ]);
    }

}
