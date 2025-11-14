<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aula extends Model
{
    protected $fillable = ['nombre','codigo','ubicacion','nivel','grado','seccion'];

    public function dispositivos() { return $this->hasMany(Dispositivo::class); }
    public function horarios()    { return $this->hasMany(Horario::class); }
    public function estudiantes() { return $this->hasMany(Estudiante::class); }
}
