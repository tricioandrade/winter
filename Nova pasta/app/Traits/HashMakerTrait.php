<?php


namespace App\Traits;


use Tricioandrade\OpensCrypt\opensRSA;

trait HashMakerTrait
{
    public static function encrypt( string $data): string
    {
        $enc = new opensRSA();

        /*
         * Goto php docs and search for more digest algo
         * On this example i'm using the SH1 or SH-1
         * */
        $enc::setDigestAlg('sh1');

        /*
         * Set the Private key bits
         * */
        $enc::setPrivateKeyBits(1024);

        /*
         * Now set where you wanna save the keys
         * */
        $privKey = __DIR__.'/private.pem';
        $pubKey = __DIR__.'/public.pem';

        /*
         * Generate The Keys
         *
         * Uncomment to get new key Pairs
         * */


        $enc::setPrivateKeyFilePathAndName($privKey);
        $enc::setPublicKeyFilePathAndName($pubKey);

//        if(!file_exists(__DIR__.'/private.pem')) $enc::generateKeys();
        /*
         * Encrypt a message
         * Use encrypt() method to encrypt, you must provide params types for encrypt
         *
         * $privateKeyEncrypt
         * $publicKeyEncrypt
         * $opensslSign
         *
         *
         * set false to get the encrypted data without base64 encode
         * */

        return $enc::encrypt($data, $enc::$opensslSign);
    }
}
