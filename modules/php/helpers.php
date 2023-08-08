<?php

function validate_form($data){

    foreach (array_keys($data) as $key){
        $data[$key] = trim($data[$key]);
        $data[$key] = htmlspecialchars($data[$key]);
    };

    return $data;
}

?>