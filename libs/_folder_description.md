# FOLDER: libs

# Descrição da Pasta `libs`

Esta pasta é destinada exclusivamente ao armazenamento de bibliotecas (libs) reutilizáveis que podem ser utilizadas em diferentes partes do projeto. Aqui devem ser incluídas apenas bibliotecas, módulos ou pacotes de terceiros ou desenvolvidos internamente, que fornecem funcionalidades genéricas e independentes da lógica de negócio específica do projeto.

## Padrão de Organização

- **Apenas bibliotecas**: Esta pasta não deve conter scripts de aplicação, exemplos, ou arquivos de configuração específicos do projeto — apenas bibliotecas reutilizáveis.
- **Subpastas por linguagem ou categoria**: As bibliotecas podem ser organizadas em subpastas conforme a linguagem (ex: `php`, `js`, `python`) ou tipo de funcionalidade.
- **Documentação**: Cada subpasta pode conter um arquivo `_folder_description.md` explicando o propósito das libs ali presentes e instruções de uso.
- **Nomes descritivos**: As bibliotecas e subpastas devem ter nomes claros, indicando sua função ou tecnologia.

## Objetivo

- Centralizar todas as bibliotecas reutilizáveis do projeto em um único local.
- Facilitar a manutenção, atualização e reutilização de libs.
- Garantir que apenas código genérico e reaproveitável seja armazenado nesta pasta.
- Promover padronização e clareza na estrutura das bibliotecas do repositório.

Consulte sempre as descrições das subpastas para entender o uso e as recomendações de cada biblioteca compartilhada nesta pasta.