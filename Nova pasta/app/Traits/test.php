<?php

require '../../vendor/autoload.php';

$db = new \PDO('mysql:host=localhost;dbname=outono;','root', '');

$stmt = $db->prepare('select * from sales');
$stmt->execute();
$data = $stmt->fetchAll(\PDO::FETCH_OBJ);

print_r($data);