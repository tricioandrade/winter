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

//        dd($this->getProduct());
        $this->build($this->getIterator($this->getProduct()), $dom);

        $AuditFile->appendChild($this->Documents);

        /*
         * Creating SourceDocuments
         * */
        $this->Documents = $dom->createElement("SalesInvoices");

        $this->salesHeader();
        $this->customNode($this->getSalesHeader(), $dom);
        // dd($this->invoices($month, $date, $year));

        $this->invoices($month, $date, $year);
        $this->buildSourceDocuments($this->getIterator($this->getInvoices()), $dom);
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

    public function build($iterable, $dom)
    {
        // dd($iterable);
        $this->whileForEach($iterable, $dom, function ($object, $dom) {
            foreach ($object->current() as $key => $value) {
                $main = $dom->createElement($key);
                if (is_object($value)):
                    foreach ($value as $firstKey => $firstValue) {
                        $element1 = $dom->createElement($firstKey);
                        $element1->appendChild($dom->createTextNode($firstValue));
                        $main->appendChild($element1);
                    }
                else:
                     $main->appendChild($dom->createTextNode($value));
                endif;
                $this->Documents->append($main);
            }
        });
    }

    public function buildSourceDocuments($iterable, $dom)
    {
        $this->whileForEach($iterable, $dom, function ($object, $dom) {
            foreach ($object->current() as $key => $value) {
                $main = $dom->createElement($key);
                if (is_object($value)):
                    foreach ($value as $firstKey => $firstValue) {
                        if($firstKey == 'Line'):
                            foreach($firstValue as $secondKey => $secondValue):
                                foreach($secondValue as $thridKey => $thridValue):
                                    print_r($thridKey);
                                    $element1 = $dom->createELement($thridKey);
                                    if(is_object($thridValue)){
                                        foreach($thridValue as $fourthKey => $fourthValue):
                                            $element2 = $dom->createELement($fourthKey);
                                            if(is_object($fourthValue)){
                                                foreach ($fourthValue as $fivethKey => $fivethValue) {
                                                    $thirdElement = $dom->createElement($fivethKey);
                                                    $thirdElement->appendChild($dom->createTextNode($fivethValue));
                                                    $element2->appendChild($thirdElement);
                                                }
                                            }
                                            else{
                                                $element2->appendChild($dom->createTextNode($fourthValue));
                                            }    
                                            $element1->appendChild($element2);
                                        endforeach;
                                    }
                                    else{
                                        $element1->appendChild($dom->createTextNode($thridValue));
                                    }
                                    $main->appendChild($element1);
                                endforeach;
                            endforeach;
                        elseif($firstKey == 'DocumentTotals'):
                            $element1 = $dom->createELement($firstKey);
                            if(is_object($firstValue)){
                                foreach($firstValue as $secondKey => $secondValue):
                                    foreach($secondValue as $thridKey => $thridValue):
                                        $element2 = $dom->createELement($thridKey);
                                        if(is_object($thridValue)){
                                            foreach($thridValue as $fourthKey => $fourthValue):
                                                $thirdElement = $dom->createElement($fourthKey);
                                                $thirdElement->appendChild($dom->createTextNode($fourthValue));
                                                $element2->appendChild($thirdElement);
                                            endforeach;
                                        }
                                        else{
                                            $element2->appendChild($dom->createTextNode($thridValue));
                                        }
                                        $element1->appendChild($element2);
                                    endforeach;
                                endforeach;
                            }
                            else{
                                print_r($firstValue);
                                $element1->appendChild($dom->createTextNode($firstValue));
                            }
                            $main->appendChild($element1);
                        else:    
                            $element1 = $dom->createELement($firstKey);
                            if(is_object($firstValue)){
                                foreach($firstValue as $secondKey => $secondValue):
                                    $element2 = $dom->createELement($secondKey);
                                    if(is_object($secondValue)){
                                        foreach($secondValue as $secondKey => $secondValue):
                                            $thirdElement = $dom->createElement($secondKey);
                                            $thirdElement->appendChild($dom->createTextNode($secondValue));
                                            $element2->appendChild($thirdElement);
                                        endforeach;
                                    }
                                    else{
                                        $element2->appendChild($dom->createTextNode($secondValue));
                                    }
                                    $element1->appendChild($element2);
                                endforeach;
                            }
                            else{
                                print_r($firstValue);
                                $element1->appendChild($dom->createTextNode($firstValue));
                            }
                            $main->appendChild($element1);
                        endif;    
                    }
                else:
                     $main->appendChild($dom->createTextNode($value));
                endif;
                $this->Documents->append($main);
            }
        });
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
}
