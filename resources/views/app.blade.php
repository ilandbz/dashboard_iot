<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Dashboard IoT</title>
  @viteReactRefresh
  {{-- ⚠️ Aquí va el entry de Inertia, NO tu SPA --}}
  @vite(['resources/js/app.jsx','resources/css/app.css'])
  @inertiaHead
</head>
<body class="font-sans antialiased">
  @inertia
</body>
</html>