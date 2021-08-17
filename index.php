<?php
    echo "Hello World";
    
    $x = explode("/", $_SERVER["REQUEST_URI"]);
    print_r($x);
    print( __DIR__ . '/' . $x[1] . '.html?id=' . (count($arr) > 2 ? $x[2] : '') );
    require __DIR__ . '/' . $x[1] . '.html?id=' . (count($arr) > 2 ? $x[2] : '') ;
?>