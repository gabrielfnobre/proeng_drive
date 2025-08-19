/**
 * Adiciona um container estilizado tipo "box" em um container com id cnt_created.
 * 
 * @param {string} cnt_created - id do container a ser criado (ex: 'dinamics1')
 * @param {object} options - parâmetros do box:
 *      - box_content: string|HTMLElement|Array<string|HTMLElement> - conteúdo(s) a ser(em) inserido(s) dentro do box
 *      - style: string (opcional) - string de CSS inline para customizar o box
 *      - id: string (opcional) - id a ser atribuído ao box gerado
 *      - on_click: function (opcional) - função a ser executada ao clicar no box
 *      - on_function: function (opcional) - função qualquer a ser executada (executada imediatamente após a criação do box)
 *      - width_desktop: string (opcional) - largura do componente no desktop (ex: '50%', '300px', etc)
 *      - width_mobile: string (opcional) - largura do componente no mobile (ex: '90%', '100vw', etc)
 *      - height_desktop: string (opcional) - altura do componente no desktop (ex: '40px', 'auto', etc)
 *      - height_mobile: string (opcional) - altura do componente no mobile (ex: '60px', 'auto', etc)
 *      - bg_light: string (opcional) - cor de fundo para modo light
 *      - bg_dark: string (opcional) - cor de fundo para modo dark
 *      - color_light: string (opcional) - cor do texto para modo light
 *      - color_dark: string (opcional) - cor do texto para modo dark
 *      - qualquer outro parâmetro CSS pode ser passado com o mesmo nome do atributo em CSS (ex: background, border, font-size, etc)
 *
 * Observação: Cada box gerado é independente, e estilos/responsividade passados via options afetam apenas aquele box.
 */
export default function box_container(cnt_created, options = {}) {
    // Extrai opções principais
    const box_content = options.box_content !== undefined ? options.box_content : '';
    const styleString = options.style !== undefined ? options.style : '';
    const box_id = options.id !== undefined ? options.id : null;
    const on_click = typeof options.on_click === 'function' ? options.on_click : null;
    const on_function = typeof options.on_function === 'function' ? options.on_function : null;

    // Novos parâmetros para responsividade
    const width_desktop = options.width_desktop;
    const width_mobile = options.width_mobile;
    const height_desktop = options.height_desktop;
    const height_mobile = options.height_mobile;

    // Novos parâmetros para tema
    const bg_light = options.bg_light;
    const bg_dark = options.bg_dark;
    const color_light = options.color_light;
    const color_dark = options.color_dark;

    // Extrai atributos CSS extras (além dos já tratados)
    const cssAttrs = {};
    for (const key in options) {
        if (
            key !== 'box_content' &&
            key !== 'style' &&
            key !== 'on_click' &&
            key !== 'on_function' &&
            key !== 'id' &&
            key !== 'width_desktop' &&
            key !== 'width_mobile' &&
            key !== 'height_desktop' &&
            key !== 'height_mobile' &&
            key !== 'bg_light' &&
            key !== 'bg_dark' &&
            key !== 'color_light' &&
            key !== 'color_dark'
        ) {
            // Converte camelCase para kebab-case se necessário
            const cssKey = key.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
            cssAttrs[cssKey] = options[key];
        }
    }

    // Garante que o container existe
    if ($(`#${cnt_created}`).length === 0 && cnt_created === 'of-overlay-modal') {
        return;
    }
    if ($(`#${cnt_created}`).length === 0) {
        $('body').append(`<div id="${cnt_created}"></div>`);
    }

    // Monta o CSS do box (apenas uma vez por página)
    if (!document.getElementById('box-container-style')) {
        const style = `
            <style id="box-container-style">
            .box-container {
                width: 25%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin: 3% auto;
                box-shadow: 0 8px 32px rgba(0,0,0,0.25), 0 1.5px 6px rgba(0,0,0,0.18);
                padding: 2.5% 2%;
                padding-bottom: 6%;
                background: #181818;
                color: #cdcdcd;
                transition: background 0.2s, color 0.2s, transform 0.15s;
                border-radius: 10px;
            }
            @media (max-width: 1000px) {
                .box-container {
                    width: 80%;
                    padding: 4% 4%;
                    padding-bottom: 15%;
                }
            }
            @media (prefers-color-scheme: light) {
                .box-container {
                    background: #fff;
                    color: #222;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 1.5px 6px rgba(0,0,0,0.12);
                }
            }
            @media (prefers-color-scheme: dark) {
                .box-container {
                    background: #181818;
                    color: #cdcdcd;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.32), 0 1.5px 6px rgba(0,0,0,0.22);
                }
            }
            .box-container.box-has-action {
                cursor: pointer;
            }
            .box-container.box-has-action:hover {
                transform: scale(1.025);
            }
            </style>
        `;
        $('head').append(style);
    }

    // Monta o HTML do box
    const $box = $('<div class="box-container"></div>');

    // Aplica id se fornecido
    if (box_id && typeof box_id === 'string') {
        $box.attr('id', box_id);
    }

    // Aplica atributos CSS extras na tag principal
    if (styleString && typeof styleString === 'string') {
        $box.attr('style', styleString);
    }
    // Aplica atributos CSS passados diretamente (ex: background, border, font-size, etc)
    if (Object.keys(cssAttrs).length > 0) {
        $box.css(cssAttrs);
    }

    // Aplica width/height customizados para desktop/mobile, se fornecidos
    // Usamos classes únicas para cada box se algum parâmetro customizado for passado
    let customClass = '';
    let customThemeCSS = '';
    let hasCustomTheme = !!(bg_light || bg_dark || color_light || color_dark);
    if (width_desktop || width_mobile || height_desktop || height_mobile || hasCustomTheme) {
        // Gera uma classe única baseada em timestamp e random
        customClass = 'box-custom-' + Date.now() + Math.floor(Math.random() * 10000);
        $box.addClass(customClass);

        // Monta o CSS customizado
        let customCSS = `<style id="style-${customClass}">\n`;

        // Desktop (default)
        customCSS += `.${customClass} {`;
        if (width_desktop) customCSS += `width: ${width_desktop} !important;`;
        if (height_desktop) customCSS += `height: ${height_desktop} !important;`;
        customCSS += `}\n`;

        // Mobile (max-width: 1000px)
        if (width_mobile || height_mobile) {
            customCSS += `@media (max-width: 1000px) { .${customClass} {`;
            if (width_mobile) customCSS += `width: ${width_mobile} !important;`;
            if (height_mobile) customCSS += `height: ${height_mobile} !important;`;
            customCSS += `} }\n`;
        }

        // Tema claro/escuro customizado
        if (hasCustomTheme) {
            // Light
            if (bg_light || color_light) {
                customCSS += `@media (prefers-color-scheme: light) { .${customClass} {`;
                if (bg_light) customCSS += `background: ${bg_light} !important;`;
                if (color_light) customCSS += `color: ${color_light} !important;`;
                customCSS += `} }\n`;
            }
            // Dark
            if (bg_dark || color_dark) {
                customCSS += `@media (prefers-color-scheme: dark) { .${customClass} {`;
                if (bg_dark) customCSS += `background: ${bg_dark} !important;`;
                if (color_dark) customCSS += `color: ${color_dark} !important;`;
                customCSS += `} }\n`;
            }
        }

        customCSS += `</style>`;
        $('head').append(customCSS);
    }

    // Se on_click ou on_function forem passados, adiciona a classe de ação
    if (on_click || on_function) {
        $box.addClass('box-has-action');
    }

    // Adiciona evento de clique, se fornecido
    if (on_click) {
        $box.on('click', on_click);
    }

    // Adiciona o conteúdo
    if (Array.isArray(box_content)) {
        box_content.forEach(content => {
            if (typeof content === 'string') {
                $box.append(content);
            } else if (content instanceof HTMLElement) {
                $box.append(content);
            } else if (content instanceof jQuery) {
                $box.append(content);
            }
        });
    } else if (typeof box_content === 'string') {
        $box.append(box_content);
    } else if (box_content instanceof HTMLElement) {
        $box.append(box_content);
    } else if (box_content instanceof jQuery) {
        $box.append(box_content);
    }

    // Adiciona o box ao container
    $(`#${cnt_created}`).append($box);

    // Executa função customizada, se fornecida
    if (on_function) {
        on_function($box, cnt_created, options);
    }
}