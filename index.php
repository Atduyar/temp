<?php
    $x = explode("/", $_SERVER["REQUEST_URI"]);
    // print_r($x);
    if (count($x) > 2){
        if($x[1] == "blogView"){

            $y = __DIR__ . '/' . $x[1] . '.html';
            echo '<meta name="description" content="Test ile bizimle bilimi kesfedin.">',
                 '<meta property="og:title" content="Test">',
                 '<meta property="og:description" content="Test ile bizimle bilimi kesfedin.">',
                 '<meta property="og:image" content="https://api.atduyar.com/ConstImage/titleBanner.png">',
                 '<meta property="og:site_name" content="Test">',
                 '<meta name="twitter:title" content="Test">',
                 '<meta name="twitter:description" content="Test ile bizimle bilimi kesfedin.">',
                 '<meta name="twitter:image" content="https://api.atduyar.com/ConstImage/titleBanner.png">',
                 '<meta name="twitter:card" content="https://api.atduyar.com/ConstImage/titleBanner.png">';

            require $y;
            echo '<script type="text/javascript">',
                 'console.log("blogView");',
                 'setParam("' . $x[2] . '");',
                 '</script>';
        }
        else{
            $y = __DIR__ . '/' . $x[1] . '.html';
            require $y;
            echo '<script type="text/javascript">',
                 'setParam("' . $x[2] . '");',
                 '</script>';
        }
    }
    elseif(strpos($x[1], '.xml') !== false){
        $y = __DIR__ . '/' . $x[1] ;
    }
    elseif(count($x) > 1 and $x[1] != ''){
        $y = __DIR__ . '/' . $x[1] . '.html';
        require $y;
    }else {
        $y = __DIR__ . '/blogs.html';
        require $y;
    }
?>