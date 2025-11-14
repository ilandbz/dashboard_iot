<?php

namespace Database\Seeders;

use App\Models\Aula;
use App\Models\Curso;
use App\Models\Dispositivo;
use App\Models\Estudiante;
use App\Models\Horario;
use App\Models\Lectura;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@demo.test'],
            ['name' => 'Admin', 'password' => Hash::make('password'), 'email_verified_at' => now()]
        );

        // Profesores
        $profes = collect([
            ['name' => 'Juan Perez Leon', 'email' => 'juan@demo.test'],
            ['name' => 'Ana Torres', 'email' => 'ana@demo.test'],
        ])->map(function($p){
            return User::updateOrCreate(['email'=>$p['email']], [
                'name' => $p['name'],
                'password' => Hash::make('secret123'),
                'email_verified_at' => now()
            ]);
        });

        // Aulas
        $aulas = collect([
            ['nombre'=>'Tigresito','codigo'=>'aula0001','ubicacion'=>'Edificio 1 piso 3','nivel'=>'Primaria','grado'=>'1','seccion'=>'A'],
            ['nombre'=>'Leoncito','codigo'=>'aula0002','ubicacion'=>'Edificio 1 piso 1','nivel'=>'Primaria','grado'=>'1','seccion'=>'B'],
        ])->map(fn($a)=>Aula::create($a));

        // Cursos
        $mat = Curso::create(['nombre'=>'Matemática','nivel'=>'Primaria']);
        $com = Curso::create(['nombre'=>'Comunicación','nivel'=>'Primaria']);

        // Horarios (como tu mock)
        Horario::create([
            'aula_id'=>$aulas[0]->id,'profesor_id'=>$profes[0]->id,'curso_id'=>$mat->id,
            'dia'=>'Lunes','hora_inicio'=>'07:30','hora_fin'=>'09:00'
        ]);

        // Dispositivos (encender/apagar tabla)
        foreach ([
            ['ESP32-10001','Temperatura','puerta-01'],
            ['ESP32-10002','Humedad','puerta-02'],
            ['ESP32-10003','Actuador','pizarra'],
        ] as [$code,$tipo,$ubi]) {
            Dispositivo::create([
                'aula_id'=>$aulas[0]->id,'codigo'=>$code,'tipo'=>$tipo,'ubicacion'=>$ubi,
                'estado'=>false,'descripcion'=>"Sensor/actuador de $tipo"
            ]);
        }

        // Estudiantes (22 demo)
        foreach (range(1,22) as $n) {
            Estudiante::create([
                'nombre'=>fake()->firstName(),'apellido'=>fake()->lastName(),
                'dni'=>fake()->unique()->numerify('########'),
                'genero'=>fake()->randomElement(['M','F']),
                'nivel'=>'Primaria','grado'=>'1','seccion'=>'A',
                'aula_id'=>$aulas[0]->id,'profesor_id'=>$profes[0]->id,
            ]);
        }

        // Lecturas (para gráficos/histórico)
        $dispTemp = Dispositivo::where('tipo','Temperatura')->first();
        $dispHum  = Dispositivo::where('tipo','Humedad')->first();

        // 24 puntos recientes
        foreach (range(1,24) as $i) {
            Lectura::create([
                'dispositivo_id'=>$dispTemp->id,'tipo'=>'temp',
                'valor'=>fake()->numberBetween(18,26),
                'registrado_en'=>now()->subHours(24-$i)
            ]);
            Lectura::create([
                'dispositivo_id'=>$dispHum->id,'tipo'=>'hum',
                'valor'=>fake()->numberBetween(58,72),
                'registrado_en'=>now()->subHours(24-$i)
            ]);
        }
    }
}
