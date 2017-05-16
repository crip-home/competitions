<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" href="/assets/styles.css" />

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>{{ config('app.name', 'Laravel') }}</title>

  <!-- Scripts -->
  <script>
      window.Laravel = {!! json_encode(['csrfToken' => csrf_token() ]) !!}
  </script>
</head>
<body>

<div id="app">
  Loading...
  <!-- Scripts -->
  <script src="/assets/vendor.js"></script>
  <script src="/assets/ckeditor/ckeditor.js"></script>
  <script src="/assets/app.js"></script>
</div>

</body>
</html>