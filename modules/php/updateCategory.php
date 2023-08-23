<?php
include_once('database.php');
$content = file_get_contents("php://input");
$data = json_decode($content,true);
$stmt = $db->prepare("UPDATE `task` SET `category`=:category WHERE `id`=:id");
$stmt->execute([':category'=> $data['category'],':id'=>$data['id']]);
echo(json_encode("200"));
?>