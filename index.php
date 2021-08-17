<?php
    echo "Hello World";
    
    $params = explode( "/", $_GET['url'] );
    for($i = 0; $i < count($params); $i+=2) {

      echo $params[$i] ." has value: ". $params[$i+1] ."<br />";

    }
?>