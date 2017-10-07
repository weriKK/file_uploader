<?php

$allowed = array('png', 'jpg', 'gif', 'bmp', 'zip', '7z');

$files = NULL;
if(isset($_FILES['upl']){
    $files = $_FILES['upl'];
}

if((NULL != $files) && $files['error'] == 0){
    $ext = pathinfo($files['name'], PATHINFO_EXTENSION);
    if(!in_array(strtolower($ext), $allowed)){
        echo '{"status":"error"}';
        exit;
    }

    if(move_uploaded_file($files['tmp_name'], '/home/uploads/'.$files['name'])){
        echo '{"status":"success"}';
        exit;
    }
}

echo '{"status":"error"}';
exit;

