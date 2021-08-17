<?php
    echo "Hello World";
    
    $x = explode("/", $_SERVER["REQUEST_URI"]);
    print_r($x);
?>