<?php

namespace App\Services\Essentials;

use App\Enums\Privileges;
use App\Services\Auth\PrivilegeService;

class VerifyService
{
    public function __construct(
        public PrivilegeService $privilegeService
    ){}

    /**
     * Verify Super Admin
     * @return bool
     */
    public function verifySuperAdmin(): bool
    {
        return $this->privilegeService->privilege() == Privileges::SUPER_ADMIN->value;
    }

    /**
     * Verify Admin
     * @return bool
     */
    public function verifyAdmin(): bool
    {
        return $this->privilegeService->privilege() == Privileges::ADMIN->value;
    }

    /**
     * Verify Employee
     * @return bool
     */
    public function verifyEmployee(): bool
    {
        return $this->privilegeService->privilege() == Privileges::EMPLOYEE->value;
    }

    /**
     * Verify Employee
     * @return bool
     */
    public function verifyClient(): bool
    {
        return $this->privilegeService->privilege() == Privileges::EMPLOYEE->value;
    }
}