<?php
if($_POST) {
    $headers = getallheaders();
    $pito = $_POST['pito'];
    var_dump($pito);
}
?>

<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
            <h2>
                <?php echo isset($pito) ? $pito : ''; ?>
            </h2>
            <input name='pito' for='pito' type="text">
            <input type="submit" value="petomane">
        </form>
    </body>
</html>
