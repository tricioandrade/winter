<?php


namespace App\Traits;


use App\Enums\DocTypes;
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
        return number_format($value , 2, ',', '.');
    }

    public function invoiceFilteredData(int $docType, int $id) {
        return match(DocTypes::from($docType)->name){
            'NC' => CreditNote::where('sale_id', '=', $id)->get()->toArray(),
            'FR' => InvoiceReceipt::where('sale_id', '=', $id)->get()->toArray(),
            'VD' => SaleMoney::where('sale_id', '=', $id)->get()->toArray()
        };
    }


    public function invoiceLastData($docType): array {
        return match(DocTypes::from($docType)->name){
            'NC' => $this->query('credit_notes'),
            'FR' => $this->query('invoice_receipts'),
            'VD' => $this->query('sale_money')
        };
    }

    private function query($table): array{
        return DB::select("select * from ${table} order by id desc limit 1");
    }

    public function invoiceCountData(int $docType): int {
        return match (DocTypes::from($docType)->name) {
            'NC' => count((CreditNote::all())),
            'FR' => count((InvoiceReceipt::all())),
            'VD' => count((SaleMoney::all()))
        };
    }
    public function genInvoiceNumber($docType, $total): array | object {
        $invoiceId = 0;
        $hash = '';

        if($this->invoiceCountData($docType) > 0) {
            $invoiceInfo    = $this->invoiceLastData($docType);
            $invoiceId      = $invoiceInfo[0]->id;
            $hash           = $invoiceInfo[0]->hash;
        }

        /*
         * Generating invoice Number string with new InvoiceResource Info*/
        $invoiceNumber = DocTypes::from($docType)->name .' '.date('Y').'OTN'.'/'. ($invoiceId + 1);

        /*
         * Generating data info based in date and datetime string*/
        $toHash = $this->dateNormal().';'.$this->dateTimeT().';'.$invoiceNumber.';'.$total.';'.$hash;

        /*
         * Encrypting*/
        $encryptedData = self::encrypt($this->dateNormal().';'.$this->dateTimeT().';'.$invoiceNumber.';'.$total.';'.$hash);

        /** Split and get a short chars of generated hash*/
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
