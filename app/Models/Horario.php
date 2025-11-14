<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    protected $fillable = ['aula_id','profesor_id','curso_id','dia','hora_inicio','hora_fin'];

    public function aula()     { return $this->belongsTo(Aula::class); }
    public function profesor() { return $this->belongsTo(User::class, 'profesor_id'); }
    public function curso()    { return $this->belongsTo(Curso::class); }
}
