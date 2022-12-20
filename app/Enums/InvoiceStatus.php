<?php

namespace App\Enums;

use App\Interfaces\Types;

enum InvoiceStatus: int implements Types
{
    case ANNULLED = 0;
    case NORMAL = 1;


    public function name(): string
    {
        return match ($this) {
            self::ANNULLED => 'Anulado',
            self::NORMAL => 'Normal'
        };
    }

    public function symbol(): string
    {
        return match ($this) {
            self::ANNULLED => 'A',
            self::NORMAL => 'N',
        };
    }

    public function description(): string
    {
        return match ($this) {
            self::ANNULLED => 'Documento anulado',
            self::NORMAL => 'Documento válido',
        };
    }

}
