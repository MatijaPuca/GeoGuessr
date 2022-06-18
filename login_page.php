<?php
if(isset($_POST['submit']))
{
    if($_POST["uname"]=="matija.pucarevic" && $_POST["psw"]=="Matija123")
    {
        echo file_get_contents("mapOpenLayer.html");
    }
}
?>