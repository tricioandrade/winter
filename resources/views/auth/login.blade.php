@extends('layouts.app')

@section('content')
<div class="container" id="login">
    <div class="row justify-content-center">
        <div class="col-md-12 mt-4">
            <div class="m-auto col-6 offset-md-3 text-center m-3 p-4">
                <img src="{{asset('winterlogoLONG.png')}}" alt="" width="200">
            </div>
                    <form method="POST" action="{{ route('login') }}">
            <div class="card col-6 m-auto">
                
                    
                <div class="card-header text-center">{{ __('Login') }}</div>

                <div class="card-body">
                        @csrf

                        <div class="row mb-4">
                            <label for="email" class="col-md-2 col-form-label text-md-center">{{ __('Email') }}</label>

                            <div class="col-md-10">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-4">
                            <label for="password" class="col-md-2 col-form-label text-md-center">{{ __('Senha') }}</label>

                            <div class="col-md-10">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-3">
                            
                        </div>

                </div>
                <div class="card-footer">
                    <div class="row mb-0">
                        <div class="text-md-end d-grid gap-2 col-6 mx-auto">
                            <button type="submit"  class="btn btn-primary">
                                {{ __('Entrar') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </div>
    </div>
</div>
@endsection
