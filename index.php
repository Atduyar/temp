<?php
    echo "Hello World";
    
    $x = explode("/", $_SERVER["REQUEST_URI"]);
    print_r($x);
    
    require __DIR__ . '/' . $x[1] ;
?>