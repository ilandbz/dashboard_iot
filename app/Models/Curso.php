<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $fillable = ['nombre','nivel'];

    public function horarios(){ return $this->hasMany(Horario::class); }
}
