<?php

namespace App\Enums;

enum UnityOfMeasure: int
{
    case UN = 1;
    case KG = 2;
    case HH = 3;

    public function symbol(): string
    {
        return match ($this) {
            self::UN => 'UN',
            self::KG => 'KG',
            self::HH => 'HH'
        };
    }

}
