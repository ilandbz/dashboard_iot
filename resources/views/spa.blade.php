<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <title>Dashboard IoT</title>
  @viteReactRefresh
  @vite(['resources/js/main.jsx','resources/css/app.css'])
</head>
<body class="font-sans antialiased">
  <div id="app"></div>
</body>
</html>
