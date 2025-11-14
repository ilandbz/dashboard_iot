<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lectura extends Model
{
    protected $fillable = ['dispositivo_id','tipo','valor','registrado_en'];
    protected $casts = ['registrado_en' => 'datetime'];

    public function dispositivo(){ return $this->belongsTo(Dispositivo::class); }
}
