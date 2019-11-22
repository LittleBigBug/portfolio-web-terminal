<?php

$loginTime = file_get_contents("../lastlogin.txt");

$date = new DateTime();
$s = $date->format('D M d H:i:s Y');

$fp = fopen('../lastlogin.txt', 'w');
fwrite($fp, $s);
fclose($fp);

die($loginTime);

?>
