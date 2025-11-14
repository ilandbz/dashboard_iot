<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Estudiante;
use Illuminate\Http\Request;

class EstudianteController extends Controller
{
    public function index(Request $request)
    {
        $q = Estudiante::with(['aula:id,nombre,codigo','profesor:id,name']);

        if ($request->filled('aula_id')) {
            $q->where('aula_id', $request->aula_id);
        }
        if ($request->filled('texto')) {
            $t = '%'.$request->texto.'%';
            $q->where(function($x) use ($t){
                $x->where('nombre','like',$t)->orWhere('apellido','like',$t)->orWhere('dni','like',$t);
            });
        }

        return response()->json($q->orderBy('apellido')->limit(200)->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre'      => ['required','string','max:100'],
            'apellido'    => ['required','string','max:100'],
            'dni'         => ['required','string','max:15','unique:estudiantes,dni'],
            'genero'      => ['nullable','in:M,F,O'],
            'rol'         => ['nullable','string','max:30'],
            'nivel'       => ['nullable','string','max:50'],
            'grado'       => ['nullable','string','max:20'],
            'seccion'     => ['nullable','string','max:20'],
            'aula_id'     => ['nullable','exists:aulas,id'],
            'profesor_id' => ['nullable','exists:users,id'],
            'foto_base64' => ['nullable','string'], // viene del componente CameraCapture
        ]);

        $est = Estudiante::create($data);

        return response()->json([
            'ok'=>1,
            'mensaje'=>'Estudiante registrado',
            'estudiante'=>$est
        ], 201);
    }
}
