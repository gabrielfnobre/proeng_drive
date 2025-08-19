# PHP FOLDER
# Documentação da Pasta `php`

Esta pasta contém scripts PHP reutilizáveis, organizados para fornecer funcionalidades comuns ao projeto. A padronização dos nomes dos arquivos e a separação das responsabilidades facilitam a manutenção, reutilização e entendimento do código.

## Padrão de Nomenclatura

- **Prefixo `X_`**: Arquivos que são scripts de entrada (endpoints) para chamadas AJAX ou requisições HTTP. Eles recebem dados via `POST`, processam usando funções auxiliares e retornam resultados simples (ex: `X_generate_a_new_token.php`, `X_get_session_token.php`, `X_have_a_session.php`).
- **Funções utilitárias**: Arquivos que implementam funções específicas, geralmente nomeados de acordo com a ação principal (ex: `generateANewToken.php`, `getSessionToken.php`, `dbConnect.php`, `dbDisconnect.php`, `isExistingMyOccurence.php`).

## Objetivo dos Arquivos

- **X_generate_a_new_token.php**: Endpoint para gerar um novo token único, recebendo parâmetros do banco de dados e retornando o token gerado.
- **generateANewToken.php**: Função que implementa a lógica de geração de token único, garantindo que não exista duplicidade no banco.
- **X_get_session_token.php**: Endpoint para retornar o valor do token de sessão armazenado em um cookie.
- **getSessionToken.php**: Função que obtém o valor de um cookie de sessão, retornando o token ou `null`.
- **X_have_a_session.php**: Endpoint para verificar se existe um cookie de sessão com o nome informado.
- **haveASessionID.php**: Função que verifica a existência de um cookie de sessão.
- **dbConnect.php / dbDisconnect.php**: Funções para conectar e desconectar do banco de dados MySQL.
- **isExistingMyOccurence.php**: Função para verificar se um valor já existe em uma coluna de uma tabela do banco.

## Resumo da Padronização

- **Responsabilidade única**: Cada arquivo tem uma função clara e isolada.
- **Separação entre endpoint e lógica**: Scripts `X_*.php` apenas recebem dados e retornam respostas, delegando a lógica para funções auxiliares.
- **Nomes descritivos**: Os nomes dos arquivos deixam claro seu propósito e facilitam a busca e manutenção.
- **Reutilização**: Funções utilitárias podem ser usadas em diferentes partes do projeto.

Essa padronização visa facilitar a escalabilidade, manutenção e entendimento do código PHP compartilhado nesta pasta.