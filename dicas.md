## Use o browser-sync para ver mudanças no php em tempo real

**Passo a passo:**

* Ative o xampp e certifique-se que seu projeto está na htdocs
* Veja se o browser-sync está instalado globalmente, se não instale *npm install -g browser-sync*
* Use o comando abaixo para ativar ele, a cada mudança em quaisquer um dos arquivos com as extensões abaixo, ele atualiza a página (vc pode incluir mais se quiser)

*browser-sync start --proxy "localhost/web_model_app" --files "**/*.php, **/*.html, **/*.css, **/*.js, **/*.png, **/*.jpg, **/*.py, **/*.svg" --no-open*

