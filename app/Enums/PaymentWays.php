<?php

namespace App\Enums;

enum PaymentWays: int
{
    case NU = 1;
    case CC = 2;
    case CB = 3;
    case OU = 4;

    public function name(): string
    {
        return match ($this) {
            self::NU => 'Numerário',
            self::CC => 'Cartão de crédito',
            self::CB => 'Cheque bancário',
            self::OU => 'Outros meios'
        };
    }

    public function symbol(): string
    {
        return match ($this) {
            self::NU => 'NU',
            self::CC => 'CC',
            self::CB => 'CB',
            self::OU => 'OU'
        };
    }

}
