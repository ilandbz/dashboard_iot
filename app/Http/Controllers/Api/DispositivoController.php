<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Aula;
use App\Models\Dispositivo;
use Illuminate\Http\Request;

class DispositivoController extends Controller
{

    public function toggle(Dispositivo $dispositivo)
    {
        $dispositivo->estado = !$dispositivo->estado;
        $dispositivo->save();

        return response()->json([
            'ok'=>1,'estado'=>$dispositivo->estado,
            'mensaje'=>$dispositivo->estado ? 'Dispositivo encendido' : 'Dispositivo apagado'
        ]);
    }
    public function index()
    {
        return response()->json(
            Dispositivo::with('aula:id,nombre,codigo')->orderBy('codigo')->get()
        );
    }

    public function byAula(Aula $aula)
    {
        return response()->json(
            $aula->dispositivos()->select('id','aula_id','codigo','tipo','ubicacion','estado')->orderBy('codigo')->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'aula_id'    => ['nullable','exists:aulas,id'],
            'codigo'     => ['required','string','max:50','unique:dispositivos,codigo'],
            'tipo'       => ['required','in:Temperatura,Humedad,Presencia,Actuador'],
            'ubicacion'  => ['nullable','string','max:100'],
            'descripcion'=> ['nullable','string','max:255'],
        ]);

        $data['estado'] = false; // demo
        $dispositivo = Dispositivo::create($data);

        return response()->json(['ok'=>1,'dispositivo'=>$dispositivo], 201);
    }

    public function destroy(Dispositivo $dispositivo)
    {
        $dispositivo->delete();
        return response()->json(['ok'=>1]);
    }
}
