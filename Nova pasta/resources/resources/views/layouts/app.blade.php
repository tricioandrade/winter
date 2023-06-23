<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Outono') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">

    <!-- Scripts -->
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>
<body>
    <div id="app">
        @guest

        @else

        <nav  class="navbar navbar-expand-md navbar-light shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/home') }}" onclick="route()">
                    {{ config('app.name', 'Outono') }}
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent" style="display: none">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav me-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ms-auto">
                        <!-- Authentication Links -->
                        @guest

                        @else
                            <li class="nav-item">
                                <a id="navbarDropdown" class="nav-link">
                                    <span id="clock"></span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a id="navbarDropdown" class="nav-link">
                                    &verbar;
                                </a>
                            </li>
                            <li class="nav-item dropdown">

                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    <span id="user-name"><i class="fa fa-user-alt"></i>&nbsp;{{ Auth::user()->name }}</span>
                                </a>

                                <div id="logout-content" class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        <i class="fa fa-sign-out-alt"></i>&nbsp;{{ __('Sair') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>
        @endguest

        <main class="col-12 m-0 p-0">
            @yield('content')
        </main>
            <div id="changePass"></div>
            <div id="messageBox"></div>
            <span id="invoice">
                 <div style="display: none" id="print" class="col-12 row">
                    <div class="quotePrint">
                        <div id="outonoPrintLogo">
                            <div id="invoiceLogo" class="col-12 text-start">
                                <img src="outonologo.jpg" alt="Outono">
                            </div>
                        </div>
                        <span id="clean">
                            <div style="" id="invoiceHeader"></div>
                            <div style="" id="invoiceDetails" class="col-12"></div>
                            <div style="" id="invoiceMiddleInfo" class="col-12"></div>
                            <div class="col-12 saleQuote text-start pl-2">
                                <table class="table product  table-venda productList  scroll-table" id="table-venda">
                                    <thead>
                                        <tr>
                                            <th scope="col" id="code" >Código</th>
                                            <th scope="col">Descrição</th>
                                            <th scope="col">Quantidade</th>
                                            <th scope="col">Preço unitário</th>
                                            <th scope="col">Tx IVA</th>
                                            <th scope="col">Total líquido</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                                <div id="footerInfo"></div>
                            </div>
                        </span>
                    </div>
                </div>
            </span>
    </div>
</body>
</html>
