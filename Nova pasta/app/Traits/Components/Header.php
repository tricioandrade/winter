<?php


namespace App\Traits\Components;

use App\Http\Controllers\Documents\SaftProperties;
use App\Models\App;
use App\Traits\TimeTools;
use Illuminate\Support\Facades\DB;

trait Header
{
    use TimeTools;

    public object $header;

    public function saftHeader($month_period, $date, $year)
    {
        $startDate = date('Y-m-d');
        $endDate = date('Y-m-d');
        if ($year){
            $startDate = DB::select("select date from sales where year = $year limit 1")[0]->date;
            $endDate = DB::select("select date from sales where year = $year  order by id desc limit 1")[0]->date;
        }
        elseif ($month_period) {
            $startDate = DB::select("select date from sales where month_period = $month_period  order by id desc limit 1")[0]->date;
            $endDate = $startDate;
        }
        elseif ($date) {
            $startDate = DB::select("select date from sales where date = {$date} order by id desc limit 1")[0]->date;
            $endDate = $startDate;
        }

        $this->header = new \ArrayObject([], \ArrayObject::STD_PROP_LIST);

        foreach (App::all() as $app):
            $this->header->AuditFileVersion = '1.04_01';
            $this->header->CompanyID = $app->name;
            $this->header->TaxRegistrationNumber = $app->nif;
            $this->header->TaxAccountingBasis = 'F';
            $this->header->CompanyName = $app->entity;
            $this->header->CompanyAddress = new \ArrayObject([], \ArrayObject::ARRAY_AS_PROPS);
            $this->header->CompanyAddress->AddressDetail  = $app->address;
            $this->header->CompanyAddress->City  = $app->city;
            $this->header->CompanyAddress->Country  = 'AO';
            $this->header->FiscalYear = $app->year;
            $this->header->StartDate = $startDate;
            $this->header->EndDate =  $endDate;
            $this->header->CurrencyCode = 'AOA';
            $this->header->DateCreated = date('Y-m-d');
            $this->header->TaxEntity = 'Global';
            $this->header->ProductCompanyTaxID =  $app->nif;
            $this->header->SoftwareValidationNumber =  $app->license;
            $this->header->ProductID = 'Outono ERP';
            $this->header->ProductVersion = $app->version;
            $this->header->HeaderComment = 'Ficheiro XML de SAF-T para validação do programa Outono, para fins de certificação';
        endforeach;
    }

    /**
     * @return object
     */
    public function getHeader(): object
    {
        return $this->header;
    }
}
