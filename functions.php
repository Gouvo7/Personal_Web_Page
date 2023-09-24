<?php
declare(strict_types=1);
session_start();

function connectDB():PDO {
    try{
        $db = new PDO('mysql:host=localhost:3306;dbname=personal_web_db;charset=utf8', 'root', '1234');
        $db->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, "SET NAMES 'utf8' COLLATE 'utf8_general_ci' ");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $db;
    }
    catch(PDOException $ex) {
        die(json_encode(array('outcome' => false, 'message' => 'Unable to connect')));
    }
}
