import { getAjaxPHP } from '/one_flow/commons/js/getAjaxPHP.js';
import { readMyJSON } from '/one_flow/commons/js/readMyJSON.js';

const test = document.getElementById('test');
readMyJSON('/one_flow/json_rules/credentials_database_aplicacao_db.json').then(r => console.log(r))

// let conn = getAjaxPHP('/one_flow/commons/php/X_select_all_from.php', 
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

// let conn = getAjaxPHP('/one_flow/commons/php/X_delete_values.php', 
//     'host', 'aplicacao_db.vpshost11579.mysql.dbaas.com.br', 
//     'user', 'aplicacao_db', 
//     'password', 'Aplicacao@2025', 
//     'db_name', 'aplicacao_db',
//     'table', 'collaborators',
//     'columns', ['REGISTER'], 
//     'values', ['999998']
// )
// .then(value => console.log(value))

// let conn = getAjaxPHP('/one_flow/commons/php/X_send_email.php', 
//     'name', 'Destinatário Teste',
//     'email', 'nobrecoder@gmail.com',
//     'subject', 'Teste de envio de email',
//     'body', '<b>Olá!</b> Este é um teste de envio de email via X_send_email.php.',
//     'user', 'administrator@proengnet.com.br',
//     'user_name', 'administrator@proengnet.com.br',
//     'password', 'Admin@270569',
//     'host', 'email-ssl.com.br',
//     'port', '587',
//     'image_assignature', '/one_flow/universal/images/design_example.png' // opcional
// )
// .then(value => console.log(value))