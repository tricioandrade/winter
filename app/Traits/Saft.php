<?php


namespace App\Traits;

use App\Traits\Components\Header;
use App\Traits\Components\MasterFiles;
use App\Traits\Components\SalesInvoices;
use DOMDocument;

class Saft
{
    use Header;
    use MasterFiles;
    use SalesInvoices;

    private object $firstElement;
    private object $secondElement;
    private object $thirdElement;
    private object $fourthElement;
    private object $fiveElement;

    private object $insideLineElement;
    private object $dom;

    private object $Documents;
    private object $LineProductsInvoice;
    private object $MasterFiles;
    public $fileDir;

    /**
     * @param mixed $fileDir
     */
    public function setFileDir(mixed $fileDir  = ''): void
    {
        $this->fileDir = $fileDir ?? __DIR__.'/XML_SAF_T_OUTONO_ERP_'.date('d_m_y_H_i_s_mm').'.xml';
    }

    /**
     * @return mixed
     */
    public function getFileDir()
    {
        return $this->fileDir;
    }

    public function generate($month = null, $date = null, $year = null, $file = null)
    {
        $dom  = new DOMDocument('1.0', 'windows-1252');
        $dom->formatOutput = true;
        $AuditFile = $dom->createElement('AuditFile');
        $AuditFileXmlns = $dom->createAttribute('xmlns');
        $AuditFileXmlns->value = "urn:OECD:StandardAuditFile-Tax:PT_1.04_01";
        $AuditFileXmlnsxsi = $dom->createAttribute('xmlns:xsi');
        $AuditFileXmlnsxsi->value = "http://www.w3.org/2001/XMLSchema-instance";
        $AuditFile->appendChild($AuditFileXmlns);
        $AuditFile->appendChild($AuditFileXmlnsxsi);

        $this->dom = $dom;

        /*
         * Creating Header
         * */
        $this->Documents = $dom->createElement("Header");
            $this->saftHeader($month, $date, $year);
            // $this->customNode($this->getHeader(), $dom);
            $arr =(array)$this->getHeader();
            foreach ($arr as $key => $value) {
                $elem = $dom->createElement($key);
                if(is_array($value) || is_object($value)){
                    foreach($value as $newKey  => $newValue):
                        $company = $dom->createElement($newKey);
                        $company->appendChild($dom->createTextNode($newValue));
                        $elem->appendChild($company);
                    endforeach;
                }
                else{
                    $elem->appendChild($dom->createTextNode($value));
                }
                $this->Documents->appendChild($elem);
            }
        $AuditFile->appendChild($this->Documents);

        /* SalesInvoices*/
        $SourceDocuments = $dom->createElement('SourceDocuments');

        /*
         * Creating MasterFiles
         * */
        $this->Documents = $dom->createElement("MasterFiles");

           /* $this->Customer(properties: (new SaftProperties()));
            $this->createInvoiceNode($dom, $this->getIterator($master->getCustomer()));*/
            $this->Product();
            $this->createInvoiceNode($dom, $this->getIterator($this->getProduct()));

        $AuditFile->appendChild($this->Documents);

        /*
         * Creating SourceDocuments
         * */
         $this->Documents = $dom->createElement("SalesInvoices");

            $this->salesHeader();
            $this->customNode($this->getSalesHeader(), $dom);

            $this->createInvoiceNode($dom,  $this->getIterator( $this->invoices($month, $date, $year)));
        $SourceDocuments->appendChild($this->Documents);

        /*
         * Creating WorkDocuments
         * */
         /*$this->Documents = $dom->createElement("WorkingDocuments");
            $work = new WorkingDocuments();
            $work->workHeader(properties: (new SaftProperties));
            $work->init((new SaftProperties));
            $this->customNode($work->getworkHeader(), $dom);
            $this->createInvoiceNode($dom,  $this->getIterator($work->getWorkDocument()));
         $SalesInvoices->appendChild($this->Documents);

        $this->Documents = $dom->createElement("Payments");
            $work->Payments((new SaftProperties));
            $this->createInvoiceNode($dom, $this->getIterator($work->getPayments()));

        $SalesInvoices->appendChild($this->Documents);*/


        $AuditFile->appendChild($SourceDocuments);
        $dom->appendChild($AuditFile);
        $dom->save(__DIR__.'/XML_SAF_T_OUTONO_ERP_'.date('d_m_y_H_i_s_mm').'.xml');
    }

    private function getIterator($iterable){
        return $iterable->getIterator();
    }

    private function whileForEach(object $iterable, $dom, $elementCallback): void
    {
        while ($iterable->valid()):
            $elementCallback($iterable, $dom);
            $iterable->next();
        endwhile;
    }

    /**
     * @param $iterable
     * @param $dom
     * @return mixed
     */
    private function customNode($iterable, $dom): void{
        $this->whileForEach($this->getIterator($iterable), $dom, function ($current, $dom){
            $make = $dom->createElement($current->key());
            if(is_object($current->current())):
                foreach ($current->current() as $key => $value):
                    $inner = $dom->createElement($key);
                    $inner->appendChild($dom->createTextNode($value));
                    $make->appendChild($inner);
                endforeach;
            else:
                $make->appendChild($dom->createTextNode($current->current()));
            endif;
            $this->Documents->appendChild($make);
        });
    }

    private function createInvoiceNode($dom, $iterator): void
    {
         $this->whileForEach($iterator, $dom, function($current, $dom) {
            foreach ($current->current() as $key => $value):
                 $this->firstElement = $dom->createElement($key);
                if (is_object($value)):
                    foreach($value as $key1 => $item1):
                             $this->secondElement = $dom->createElement($key1);
                            if($key1 == 'Line' || is_object($item1)):
                                if ($key1 == 'Line'):
                                     $this->createLineInvoiceNode($dom,  $this->getIterator($item1));
                                elseif($key1 == 'DocumentTotals'):
                                    $this->createDocumentTotals($dom, $item1);
                                else:
                                foreach ($item1 as $key2 => $item2):
                                     $this->thirdElement = $dom->createElement($key2);
                                    if(is_object($item2)):
                                        foreach($item2 as $key3 => $item3)    :
                                             $this->fourthElement = $dom->createElement($key3);
                                             $this->fourthElement->appendChild($dom->createTextNode($item3));
                                             $this->thirdElement->appendChild( $this->fourthElement);
                                        endforeach;
                                    else:
                                         $this->thirdElement->appendChild($dom->createTextNode($item2));
                                    endif;
                                     $this->secondElement->appendChild( $this->thirdElement);
                                endforeach;
                                endif;
                            else:
                                 $this->secondElement->appendChild($dom->createTextNode($item1));
                            endif;
                         $this->firstElement->appendChild( $this->secondElement);
                    endforeach;
                else:
                     $this->firstElement->appendChild($dom->createTextNode($value));
                endif;
            endforeach;
             $this->Documents->appendChild($this->firstElement);
        });
    }

    private function createDocumentTotals($dom, $iterator){
        $this->whileForEach($this->getIterator($iterator), $dom, function ($current, $dom){
            $this->secondElement = $dom->createElement('DocumentTotals');
                foreach($current->current() as $key2 => $item2):
                    $dElement = $dom->createElement($key2);
                    if(is_int($key2) || is_object($item2)):
                        foreach($item2 as $key3 => $item3):
                            $thirdElement = $dom->createElement($key3);
                            if(is_object($item3)):
                                foreach($item3 as $key4 => $item4):
                                    $fourthElement = $dom->createElement($key4);
                                    if(is_object($item4)):
                                        $fourthElement = $dom->createElement($item3);
                                    else:
                                        $fourthElement->appendChild($dom->createTextNode($item4));
                                    endif;
                                    $thirdElement->appendChild($fourthElement);
                                endforeach;
                            else:
                                $thirdElement->appendChild($dom->createTextNode($item3));
                            endif;
                            $dElement->appendChild($thirdElement);
                        endforeach;
                    else:
                        $dElement->appendChild($dom->createTextNode($item2));
                    endif;
                    $this->secondElement->appendChild($dElement);
                endforeach;

        });
    }

    private function createLineInvoiceNode($dom, $iterator)
    {
         $this->whileForEach($iterator, $dom, function($current, $dom) {
            foreach ($current->current() as $key => $value):
                 $this->secondElement = $dom->createElement($key);
                if (is_object($value)):
                    foreach($value as $key1 => $item1):
                        $firstElement = $dom->createElement($key1);
                        if(is_object($item1)):
                            foreach($item1 as $key2 => $item2):
                                $secondElement = $dom->createElement($key2);
                                if(is_object($item2) || is_array($item2)):
                                    foreach($item2 as $key3 => $item3):
                                        $thirdElement = $dom->createElment($key3);
                                        $thirdElement->appendChild($dom->createTextNode($item3));
                                        $secondElement->appendChild($thirdElement);
                                    endforeach;
                                else:
                                    $secondElement->appendChild($dom->createTextNode($item2));
                                endif;
                                $firstElement->appendChild($secondElement);
                            endforeach;
                        else:
                            $firstElement->appendChild($dom->createTextNode($item1));
                        endif;
                         $this->secondElement->appendChild($firstElement);
                    endforeach;
                endif;
                 $this->firstElement->appendChild( $this->secondElement);
            endforeach;
        });
    }
    /*private function createElements($dom, $iterator){

         $this->whileForEach($iterator, $dom, function($current, $dom){
            foreach ($current->current() as $key => $value):
                 $this->firstElement = $dom->createElement($key);
                if(is_object($value)):
                    foreach($value as $key1 => $item1):
                         $this->secondElement = $dom->createElement($key1);
                        if(is_object($item1) && $key1 !== 'Line'):
                            foreach($item1 as $key2 => $item2):
                                 $this->thirdElement = $dom->createElement($key2);
                                if (is_object($item2)):
                                    foreach ($item2 as $key3 => $item3):
                                         $this->fourthElement = $dom->createElement($key3);
                                        if (is_object($item3)):
                                            foreach ($item3 as $key4 => $item4):
                                                 $this->fiveElement = $dom->createElement($key4);
                                                    if (is_object($item4)):
                                                        foreach ($item4 as $key5 => $item5):
                                                            $six = $dom->createElement($key5);
                                                            $six->appendChild($dom->createTextNode($item5));
                                                            $this->fourthElement->appendChild($six);
                                                        endforeach;
                                                    else:
                                                        $this->fiveElement->appendChild($dom->createTextNode($item4));
                                                    endif;
                                                 $this->fiveElement->appendChild($dom->createTextNode($item4));
                                                 $this->fourthElement->appendChild( $this->fiveElement);
                                            endforeach;
                                        else:
                                             $this->fourthElement->appendChild($dom->createTextNode($item3));
                                        endif;
                                         $this->thirdElement->appendChild( $this->fourthElement);
                                    endforeach;
                                else:
                                     $this->thirdElement->appendChild($dom->createTextNode($item2));
                                endif;
                                 $this->secondElement->appendChild( $this->thirdElement);
                            endforeach;
                        else:
                             $this->Lines( $this->invoiceID);
                             $this->createLineInvoiceNode($dom,  $this->getIterator( $this->getLines()));
                        endif;
                         $this->firstElement->appendChild( $this->secondElement);
                    endforeach;
                else:
                     $this->firstElement->appendChild($dom->createTextNode($value));
                endif;
                 $this->Documents->appendChild( $this->firstElement);
            endforeach;
        });
    }*/
}
