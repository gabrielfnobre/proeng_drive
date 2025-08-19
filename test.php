<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="universal/css/universal.css">
    <title>Tests</title>
</head>
<body style="background-color: black; color: #cdcdcd;">
    <h1>Testandolo...</h1>
    <div id="test" style="width: 90vw; min-height: 70vh; background-color: #0e0e0e; color: #cdcdcd; display: flex; flex-direction: column; align-items: center; font-weight: bold; border-radius: 10px; padding: 20px; margin: 20px; border: 1px solid #cdcdcd;">
        <?php
            #FOOTER 
            $footerParams = [
                'backgroundColor' => '#1a1a1a',
                'centralText' => "© " . date('Y') . " My aplication. Todos os direitos reservados.",
                ];
            extract($footerParams);
            include 'universal/tag_blocks/footer.php';
        ?>
    </div>
    
</body>
<script src="./commons/js/jquery-3.7.1.js"></script>
<script type="module">
        import { getAjaxPHP } from './commons/js/getAjaxPHP.js';
        import { readMyJSON } from './commons/js/readMyJSON.js';
        const test = document.getElementById('test');
        

        
        // readMyJSON('./json_rules/credentials_database_aplicacao_db.json').then(resp => console.log(resp))
        
        // let conn = getAjaxPHP('./commons/php/X_select_all_from.php', 
        //     'host', 'aplicacao_db.vpshost11579.mysql.dbaas.com.br', 
        //     'user', 'aplicacao_db', 
        //     'password', 'Aplicacao@2025', 
        //     'db_name', 'aplicacao_db',
        //     'table', 'SRA',
        //     'set_columns', ["Matricula", "Nome"]
        // )
        // .then(value => JSON.parse(value))
        // .then(value => {
        //     const ul = document.createElement('ul');
        //     value.forEach(i => {
        //         const li = document.createElement('li');
        //         li.textContent = i.Nome;
        //         ul.appendChild(li);
        //     });
        //     test.innerHTML = '';
        //     test.appendChild(ul);
        // })

        // let conn = getAjaxPHP('./commons/php/X_delete_values.php', 
        // 'host', 'aplicacao_db.vpshost11579.mysql.dbaas.com.br', 
        // 'user', 'aplicacao_db', 
        // 'password', 'Aplicacao@2025', 
        // 'db_name', 'aplicacao_db',
        // 'table', 'collaborators',
        // 'columns', ['REGISTER'], 
        // 'values', ['999998']
        // )
        // .then(value => console.log(value))
        
        // let conn = getAjaxPHP('./commons/php/X_send_email.php', 
        //     'name', 'Destinatário Teste',
        //     'email', 'nobrecoder@gmail.com',
        //     'subject', 'Teste de envio de email',
        //     'body', '<b>Olá!</b> Este é um teste de envio de email via X_send_email.php.',
        //     'user', 'administrator@proengnet.com.br',
        //     'user_name', 'administrator@proengnet.com.br',
        //     'password', 'Admin@270569',
        //     'host', 'email-ssl.com.br',
        //     'port', '587',
        //     'image_assignature', './universal/images/design_example.png' // opcional
        // )
        // .then(value => console.log(value))
        
    </script>
</html>