<?php

namespace App\Enums;

use App\Interfaces\Types;

enum TaxTypes: int implements Types {
    case IVA = 1;
    case ISE = 2;
    case IS  = 3;
    case NS  = 4;
    case OUT = 5;

    public function name(): string
    {
        return match ($this) {
            self::IVA => 'IVA',
            self::ISE => 'ISE',
            self::IS => 'IS',
            self::NS => 'NS',
            self::OUT => 'OUT'
        };
    }

    public function symbol(): string
    {
        return match ($this) {
            self::IVA => 'IVA',
            self::ISE => 'ISE',
            self::IS => 'IS',
            self::NS => 'NS',
            self::OUT => 'OUT'
        };
    }

    public function description(): string
    {
        return match ($this) {
            self::IVA => 'Imposto sob valor acrescentado',
            self::ISE => 'Isento',
            self::IS => 'Imposto de selo',
            self::NS => 'NS',
            self::OUT => 'Outro'
        };
    }

}
