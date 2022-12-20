<?php

namespace App\Enums;

use App\Interfaces\Types;

enum DocTypes: int implements Types
{
    case FR = 1;
    case FT = 2;
    case ND = 3;
    case NC = 4;
    case VD = 5;

    public function name(): string
    {
        return match ($this) {
            self::FR => 'Factura Recibo',
            self::FT => 'Factura',
            self::ND => 'Nota de Débito',
            self::NC => 'Nota de Crédito',
            self::VD => 'Venda a Dinheiro',
        };
    }

    public function symbol(): string
    {
        return match ($this) {
            self::FR => 'FR',
            self::FT => 'FT',
            self::ND => 'ND',
            self::NC => 'NC',
            self::VD => 'VD'
        };
    }

    public function description(): string
    {
        return match ($this) {
            self::FR => 'FR',
            self::FT => 'FT',
            self::ND => 'ND',
            self::NC => 'NC',
            self::VD => 'VD'
        };
    }
}
