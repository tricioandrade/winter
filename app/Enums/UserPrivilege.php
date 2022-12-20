<?php

namespace App\Enums;

enum UserPrivilege: int
{
    case ADMIN = 1;
    case NORMAL = 0;
}
