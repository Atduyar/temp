<?php
    $x = explode("/", $_SERVER["REQUEST_URI"]);
    // print_r($x);
    // print_r($x);
    // $y = __DIR__ . '/' . $x[1] . '.html?id=' . (count($arr) > 2 ? $x[2] : '') ;
    
    if ($count($x) > 2){
        $y = __DIR__ . '/' . $x[1] . '.html';
        require $y;
    }else {
        $y = __DIR__ . '/' . $x[1] . '.html';
        require $y;
        echo '<script type="text/javascript">',
             'setParam("' . $x[2] . '");',
             '</script>';
    }
    // echo count($x);
?>