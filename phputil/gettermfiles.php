<?php

$dir    = '../terminalfiles';
$files1 = scandir($dir);
echo json_encode($files1);

?>
