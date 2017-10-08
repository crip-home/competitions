@if(env('APP_ENV') == 'local')
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name=viewport content="width=device-width,initial-scale=1">
  <title>Crip competitions</title>
</head>
<body>
<div id="app">Loading...</div>
<script src="//cdn.ckeditor.com/4.7.1/full/ckeditor.js"></script>
<script src="http://localhost:8081/vendor.js"></script>
<script src="http://localhost:8081/app.js"></script>
</body>
</html>
@else
    <?php echo file_get_contents(public_path('assets/index.html')) ?>
@endif