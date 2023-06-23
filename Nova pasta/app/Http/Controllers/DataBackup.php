<?php

namespace App\Http\Controllers;

use App\Traits\HttpResponseTrait;
use App\Traits\PrivilegeTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Psy\VersionUpdater\Downloader;
use Spatie\DbDumper\Databases\MySql;
class DataBackup extends Controller
{
    use PrivilegeTrait;
    use HttpResponseTrait;
    
    public function safTExportFile() {    
        try {
            if($this->doIfAdmin()) {    
                return response()->download('/storage/app/dump.sql');
            }

            return $this->error(exception: [], code: 403);
        }catch(\Throwable $exception){
                return $this->error(exception: $exception);
        }
    }
    
    public function databaseBackup() {
       try {
            if($this->doIfAdmin()) {
                MySql::create()
                    ->setDbName(env('DB_DATABASE'))
                    ->setUserName(env('DB_USERNAME'))
                    ->setPassword(env('DB_PASSWORD'))
                    ->doNotUseColumnStatistics()
                    ->dumpToFile('/storage/app/dump.sql');

                return response()->download('/storage/app/dump.sql');
            }

            return $this->error(exception: [], code: 403);
       }catch(\Throwable $exception){
            return $this->error(exception: $exception);
       }
    }
}
