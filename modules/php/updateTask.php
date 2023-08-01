<?php
include_once('database.php');

 $content = file_get_contents("php://input");
 $data = json_decode($content,true);
 $stmt = $db->prepare("UPDATE `task` SET `title`=:title,`description`=:details WHERE `id`=:id");
 $stmt->execute([':title'=> $data['title'],':details'=>$data['details'],':id'=>$data['id']]);

?>