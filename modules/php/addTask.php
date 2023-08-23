<?php
include_once('database.php');
include_once('helpers.php');
$content = file_get_contents("php://input");
$data = json_decode($content,true);
$data = validate_form($data);
$stmt = $db->prepare("INSERT INTO task(id,title,description) VALUES(NULL,:title,:details)");
$stmt->execute([':title'=> $data['title'],':details'=>$data['details']]);
echo(json_encode("200"));
?>