<?php
    $x = explode("/", $_SERVER["REQUEST_URI"]);
    // print_r($x);
    // $y = __DIR__ . '/' . $x[1] . '.html?id=' . (count($arr) > 2 ? $x[2] : '') ;

    $y = __DIR__ . '/' . $x[1] . '.html' . (count($x) > 2 ? ('?id=' . $x[2]) : '');
    // echo $y;
    require $y;
?>