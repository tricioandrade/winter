<?php


namespace App\Traits;


use JetBrains\PhpStorm\Pure;

trait TimeTools
{
    public function monthPeriod($data): string
    {
        return (new \DateTime($data))->format('m');
    }

    /**
     * @param $date
     * @return false|string
     */
    #[Pure] public function convertDate($date): bool|string
    {
        return date('d-m-Y', strtotime($date));
    }

    /*
   * Time: Hour:minutes Normal
   * */
    public function time(){
        return date('H:i');
    }
    /*
     * date Normal
     * */
    public function dateNormal(){
        return date('d-m-Y');
    }

    /*
     * date System Normal
     * */
    public function dateSystemNormal(){
        return date('Y-m-d');
    }

    /*
     * date Time With T in middle
     * */
    public function dateTimeT(){
        $dateTime = new \DateTime();
        return $dateTime->format('Y-m-d\TH:i:s');
    }

    /*
     * Normal day
     * */
    public function day(): string{
        return date('d');
    }


    /*
     * date Time no T in middle
     * */
    public function dateTimeNormal(){
        $dateTime = new \DateTime();
        return $dateTime->format('Y-m-d H:i:s');
    }

    /*
     * Expiration date
     * */
    public function generateExpirationDate(int $days){
        return date('Y-m-d', strtotime("+{$days} days", strtotime(date('Y-m-d'))));
    }

}
