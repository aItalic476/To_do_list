<?php
include_once('database.php');

/* $id = $_REQUEST['id'];
$stmt = $db->prepare("SELECT * FROM `task` WHERE `id`=:id");

$stmt->execute([':id'=>$id]);

$task=$stmt->fetch();
echo(json_encode($task)); */
$content = file_get_contents("php://input");
$decoded=json_decode($content,true);
$stmt = $db->prepare("SELECT * FROM `task` WHERE `id`=:id");
$stmt->execute([':id'=>$decoded['id']]);
$task=$stmt->fetch();
echo(json_encode($task))
?>