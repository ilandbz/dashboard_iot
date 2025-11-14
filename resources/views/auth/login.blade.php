<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Iniciar sesión — Dashboard IoT</title>
  @vite(['resources/css/app.css'])
</head>
<body class="min-h-screen bg-black text-white">

  <div class="mx-auto max-w-9xl min-h-screen grid lg:grid-cols-2">
    <section class="hidden lg:flex flex-col gap-10 px-10 xl:px-14 py-10 bg-[#0F18B5]">
      <div class="pt-8">
        <h1 class="text-4xl font-extrabold leading-tight">
          El futuro está en tus manos
        </h1>
        <p class="mt-4 text-white/90 max-w-xl">
          Conecta con la educación del mañana mediante nuestra plataforma IoT avanzada que transforma la experiencia de aprendizaje.
        </p>
      </div>

      <div class="space-y-8">
        <div>
          <h3 class="font-semibold text-lg">Monitoreo en Tiempo Real</h3>
          <p class="text-white/85">Sigue el progreso de estudiantes y dispositivos IoT al instante.</p>
        </div>
        <div>
          <h3 class="font-semibold text-lg">Gestión de Clases</h3>
          <p class="text-white/85">Administra múltiples aulas y grupos de estudiantes eficientemente.</p>
        </div>
        <div>
          <h3 class="font-semibold text-lg">Analíticos Avanzados</h3>
          <p class="text-white/85">Obtén insights detallados sobre temperatura del aula y estudiante.</p>
        </div>
      </div>

      <blockquote class="mt-auto bg-white/15 text-white/95 rounded-2xl p-6">
        <p class="italic">
          “La tecnología es sólo una herramienta. Para conseguir que los niños trabajen juntos y motivarles, el profesor es lo más importante.”
        </p>
        <footer class="mt-3 text-sm">— Bill Gates</footer>
      </blockquote>
    </section>

    <section class="flex items-center justify-center px-6 py-12">
      <div class="w-full max-w-md bg-[#1B1B2E] rounded-3xl shadow-2xl px-7 py-8 login-scope">
        <h2 class="text-center text-4xl font-extrabold tracking-wide">LOGIN</h2>

        {{-- Avatar / ícono --}}
        <div class="mt-5 flex justify-center">
          <div class="w-20 h-20 rounded-full bg-[#5B7CFF]/30 grid place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5.33 0-8 2.67-8 5v1h16v-1c0-2.33-2.67-5-8-5Z"/>
            </svg>
          </div>
        </div>

        <p class="mt-5 text-center text-sm tracking-wide text-white/80 font-semibold">
          Sistema IoT Escolar
        </p>
        <p class="text-center text-2xl mt-1 tracking-widest text-white/90">BIENVENIDO</p>

        {{-- Errores --}}
        @if ($errors->any())
          <div class="mt-6 space-y-1 bg-red-500/10 border border-red-500/40 text-red-200 text-sm rounded-lg p-3">
            @foreach ($errors->all() as $e)
              <div>• {{ $e }}</div>
            @endforeach
          </div>
        @endif

        {{-- Formulario --}}
        <form method="POST" action="{{ route('login') }}" class="mt-6 space-y-5">
          @csrf

          <div>
            <label class="block text-sm font-semibold mb-1 text-white">Email</label>
            <input
              name="email"
              type="email"
              required
              autocomplete="username"
              placeholder="tu.email@ejemplo.com"
              class="w-full rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#4C6BFF] focus:border-transparent"
              value="{{ old('email') }}"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold mb-1 text-white">Contraseña</label>
            <input
              name="password"
              type="password"
              required
              autocomplete="current-password"
              placeholder="Ingresa tu contraseña"
              class="w-full rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50 px-4 py-3 outline-none focus:ring-2 focus:ring-[#4C6BFF] focus:border-transparent"
            />
          </div>

          <div class="flex items-center justify-between text-sm">
            <label class="inline-flex items-center gap-2 text-white/80">
              <input type="checkbox" name="remember" class="accent-[#4C6BFF]">
              Recordarme
            </label>

            @if (Route::has('password.request'))
              <a href="{{ route('password.request') }}" class="text-[#6C8DFF] hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            @endif
          </div>

          <button
            type="submit"
            class="w-full rounded-2xl bg-[#1928FF] hover:bg-[#0F1BFF] transition px-4 py-3 text-white font-semibold text-lg shadow-lg shadow-blue-900/30">
            Iniciar sesión
          </button>
        </form>
      </div>
    </section>
  </div>


  <style>
    .login-scope, .login-scope * { color: #E9EAF5; }
    .login-scope h2 { color: #ffffff; }
  </style>
</body>
</html>
