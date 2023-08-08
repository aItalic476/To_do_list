<?php
$host = 'localhost';
$dbname = 'planner';
$charset = 'utf8';
$user ='root';
$pass='';

$dsn="mysql:host=$host;dbname=$dbname;charset=$charset";

$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
try{
    $db = new PDO($dsn,$user,$pass,$opt);
}
catch(PDOException $exception){
    $err = $exception->getMessage();
    echo "<h3>Error $err<h3>";
};

?>