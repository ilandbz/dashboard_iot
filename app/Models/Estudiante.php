<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    protected $fillable = [
        'nombre','apellido','dni','genero','rol',
        'nivel','grado','seccion','aula_id','profesor_id','foto_base64'
    ];

    public function aula()     { return $this->belongsTo(Aula::class); }
    public function profesor() { return $this->belongsTo(User::class, 'profesor_id'); }
}
