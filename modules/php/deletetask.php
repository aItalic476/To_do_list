<?php
include_once('database.php');

$content = file_get_contents("php://input");
$decoded = json_decode($content,true);
$stmt = $db->prepare("DELETE FROM `task` WHERE `id`=:id");
$stmt->execute([':id'=>$decoded['id']])
?>