<?php

$allowed = array('png', 'jpg', 'gif', 'bmp', 'zip', '7z');

function echoResponse($status, $filename, $url){
    if($status === "success"){
        return '{"files": [ { "name": "'.$filename.'", "url": "'.$url.'" } ] }';
    }
    else {
        return '{"files": [ { "name": "'.$filename.'", "error": "error" } ] }';
    }
}

$files = NULL;
if(isset($_FILES['upl'])){
    $files = $_FILES['upl'];
}

if((NULL != $files) && $files['error'] == 0){
    $ext = pathinfo($files['name'], PATHINFO_EXTENSION);
    if(!in_array(strtolower($ext), $allowed)){
        echoResponse("error", $files['name'], NULL);
        exit;
    }

    $filename = tempnam('/home/uploads', '');
    unlink($filename);
    $filename .= '.'.$ext;
    if(move_uploaded_file($files['tmp_name'], $filename)){
        $url = "http://werik.com/dl?".basename($filename);
        echoResponse("success", $files['name'], $url);
        exit;
    }
}

echoResponse("error", NULL, NULL);
exit;

