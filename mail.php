<?
if(!empty($_POST['name']) && !empty($_POST['phone']) && !empty($_POST['message'])) { 
    $to = 'glontyid@yandex.ru';
    $subject = 'Агрохим - Заявка';
    $message = '
          <html>
              <head>
                  <title>Агрохим - Заявка</title>
              </head>
              <body>
                  <p><b>ФИО:</b> '.$_POST['name'].'</p>
                  <p><b>Телефон:</b> '.$_POST['phone'].'</p>
                  <p><b>Текст обращения:</b> '.$_POST['message'].'</p>                          
              </body>
          </html>'; 
    $headers  = "Content-type: text/html; charset=utf-8 \r\n";
	$headers .= "From: Site <agrohim-pobeda@yandex.ru>\r\n"; 
    if (mail($to, $subject, $message, $headers)) {
      die(json_encode(['status' => 'success']));
    }
}
die(json_encode(['status' => 'error']));