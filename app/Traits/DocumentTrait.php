<?php


namespace App\Traits;


use App\Models\CreditNote;
use App\Models\Invoice;
use App\Models\InvoiceReceipt;
use App\Models\SaleMoney;
use Illuminate\Support\Facades\DB;
use JetBrains\PhpStorm\Pure;
use Termwind\Html\InheritStyles;

trait DocumentTrait
{

    use TimeTools;
    use HashMakerTrait;

    public array $invoiceNames = [
        'FT' => 'FACTURA ',
        'FR' => 'FACTURA RECIBO ',
        'VD' => 'VENDA A DINHEIRO ',
        'NC' => 'NOTA DE CRÉDITO ',
    ];

    #[Pure] public function moneyFormat($value): string
    {
        $format = new \NumberFormatter("pt_AOA", \NumberFormatter::DECIMAL);
        return $format->format($value);
    }

    public function invoiceFilteredData(string $doc_type, int $id) {
        $documentTables = [
            'NC' => CreditNote::all()->where('sale_id', '=', $id)->toArray(),
            'FR' => InvoiceReceipt::all()->where('sale_id', '=', $id)->toArray(),
            'VD' => SaleMoney::all()->where('sale_id', '=', $id)->toArray()
        ];

        return $documentTables[$doc_type] ?? '';
    }

    public function invoiceCountData($docType) {
        $count =  [
            'NC' => CreditNote::all()->count(),
            'FR' => InvoiceReceipt::all()->count(),
            'VD' => SaleMoney::all()->count()
        ];

        return $count[$docType] ?? '';
    }

    public function invoiceLastData($docType) {
        $count =  [
            'NC' => CreditNote::all()->sortByDesc('id')->take(1),
            'FR' => InvoiceReceipt::all()->sortByDesc('id')->take(1),
            'VD' => SaleMoney::all()->sortByDesc('id')->take(1)
        ];

        return $count[$docType] ?? '';
    }


    public function genInvoiceNumber($docType, $total): array | object
    {
        $count = $this->invoiceCountData($docType);
        $invoiceId = 0;
        $hash = '';

        if($count) {
            $invoiceInfo    = $this->invoiceLastData($docType);
            $invoiceId      = (int)$invoiceInfo->id;
            $hash           = $invoiceInfo->hash;
        }

        /*
         * Generating invoice Number string with new InvoiceResource Info*/
        $invoiceNumber = $docType .' '.date('Y').'OTN'.'/'. ($invoiceId + 1);

        /*
         * Generating data info based in date and datetime string*/
        $toHash = $this->dateNormal().';'.$this->dateTimeT().';'.$invoiceNumber.';'.$total.';'.$hash;

        /*
         * Encrypting*/
        $encryptedData = self::encrypt($this->dateNormal().';'.$this->dateTimeT().';'.$invoiceNumber.';'.$total.';'.$hash);

        /*
         * Split and get a short chars of generated hash*/
        $split = str_split($encryptedData);
        $shortHash = $split[1].$split[11].$split[21].$split[31];


        return new \ArrayObject([
            'invoice_number' => $invoiceNumber,
            'invoice_code'   => $invoiceNumber,
            'hash'           => $encryptedData,
            'short_hash'     => $shortHash,
            'process_number' => ($invoiceId + 1),
            'month_period'   => $this->monthPeriod(date('d-m-Y')),
            'database_date'  => $this->dateSystemNormal(),
            'day'            => $this->day(),
            'date'           =>      $this->dateNormal(),
            'system_entry_date' => $this->dateTimeT(),
            'expiration_date' => $this->generateExpirationDate(30)
        ], \ArrayObject::ARRAY_AS_PROPS);
    }
}
