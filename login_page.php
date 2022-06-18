<?php
if(isset($_POST['submit']))
{
    if($_POST["uname"]=="matija.pucarevic" && $_POST["psw"]=="Matija123")
    {
        header("Location: https://master--voluble-griffin-819d77.netlify.app/mapOpenLayer.html");
    }
}
?>