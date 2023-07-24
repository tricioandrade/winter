<?php

namespace App\Enums;

enum Privileges:int
{
    case SUPER_ADMIN = 899;
    case ADMIN = 201;
    case EMPLOYEE = 332;
    case CLIENT = 131;
}