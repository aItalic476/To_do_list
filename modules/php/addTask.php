<?php
include_once('database.php');

$content = file_get_contents("php://input");
$data = json_decode($content,true);
$stmt = $db->prepare("INSERT INTO task(id,title,description) VALUES(NULL,:title,:details)");
$stmt->execute([':title'=> $data['title'],':details'=>$data['details']]);
var_dump($data)
?>