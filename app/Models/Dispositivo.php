<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dispositivo extends Model
{
    protected $fillable = ['aula_id','codigo','tipo','ubicacion','estado','descripcion'];
    protected $casts = ['estado' => 'boolean'];

    public function aula()    { return $this->belongsTo(Aula::class); }
    public function lecturas(){ return $this->hasMany(Lectura::class); }
}
