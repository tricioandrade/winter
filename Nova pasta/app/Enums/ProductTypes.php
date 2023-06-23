<?php

namespace App\Enums;

use App\Interfaces\Types;

enum ProductTypes: int implements Types {
    case P = 1;
    case S = 2;

    public function name(): string
    {
        return match ($this) {
            self::P => 'Produto',
            self::S => 'Serviço'
        };
    }

    public function symbol(): string
    {
        return match ($this) {
            self::P => 'P',
            self::S => 'S'
        };
    }

    public function description(): string
    {
        return match ($this) {
            self::P => 'Produtos salvos',
            self::S => 'Serviços salvos',
        };
    }
}
