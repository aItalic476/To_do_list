<?php
include_once('database.php');
$stmt = $db->prepare("SELECT * FROM `task`");
$stmt->execute();
$tasks=$stmt->fetchAll();

echo (json_encode($tasks));
?>