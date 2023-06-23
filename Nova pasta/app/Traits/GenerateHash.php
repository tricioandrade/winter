<?php


namespace App\Traits\Generator;

use Tricioandrade\OpensCrypt\opensRSA;

trait GenerateHash
{
    public function encrypt($data): string
    {
        $enc = new opensRSA();
        $privateKey = __DIR__ . '/private.pem';
        $enc::setPrivateKeyFilePathAndName($privateKey);
        return $enc::generateHashWithPrivateKey($data, true);
    }
}
