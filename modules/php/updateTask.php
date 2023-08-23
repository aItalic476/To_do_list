<?php
include_once('database.php');
include_once('helpers.php');
 $content = file_get_contents("php://input");
 $data = json_decode($content,true);
 $data = validate_form($data);
 $stmt = $db->prepare("UPDATE `task` SET `title`=:title,`description`=:details WHERE `id`=:id");
 $stmt->execute([':title'=> $data['title'],':details'=>$data['details'],':id'=>$data['id']]);
 echo(json_encode("200"));
?>