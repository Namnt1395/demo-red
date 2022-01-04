<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
    </head>
    <body>
      <div id="app">
          <app-layout></app-layout>
      </div>
      <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
