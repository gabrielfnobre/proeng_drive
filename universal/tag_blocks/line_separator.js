/**
 * line_separator.js
 * Retorna um elemento jQuery de linha separadora estilizada, pronto para ser inserido em um container.
 * 
 * @param {object} options - Parâmetros de configuração:
 *      - width: string (largura da linha, default: '95%')
 *      - margin: string (margem, default: '15px auto')
 *      - height: string (altura da linha, default: '1.5px')
 *      - width_desktop: string (largura no desktop, sobrescreve width se passado)
 *      - width_mobile: string (largura no mobile, sobrescreve width se passado)
 *      - height_desktop: string (altura no desktop, sobrescreve height se passado)
 *      - height_mobile: string (altura no mobile, sobrescreve height se passado)
 *      - bg_light: string (cor de fundo para modo light)
 *      - bg_dark: string (cor de fundo para modo dark)
 *      - color_light: string (cor da linha para modo light)
 *      - color_dark: string (cor da linha para modo dark)
 *      - class_name: string (classe extra para o hr, default: '')
 *      - style: string (CSS customizado para sobrescrever estilos do hr, default: '')
 *      - on_click: function (callback executado ao clicar no hr, default: null)
 *      - Qualquer outro parâmetro de CSS pode ser passado usando o nome exato da propriedade CSS (ex: background, color, border, etc)
 * @returns {jQuery} - Elemento jQuery pronto para uso
 * @copia_rapida_de_parametros
    {width: '95%', margin: '15px auto', height: '1.5px', width_desktop: '', width_mobile: '', height_desktop: '', height_mobile: '', bg_light: '', bg_dark: '', color_light: '', color_dark: '', class_name: '', style: '', on_click: null}
 */

export default function line_separator(options = {}) {
    // Gera um identificador único para esta instância
    const uniqueId = 'line-separator-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
    const separatorClass = `of-line-separator-${uniqueId}`;

    // Cópia rápida de parâmetros
    const width = options.width !== undefined ? options.width : '95%';
    const margin = options.margin !== undefined ? options.margin : '15px auto';
    const height = options.height !== undefined ? options.height : '1.5px';
    const width_desktop = options.width_desktop;
    const width_mobile = options.width_mobile;
    const height_desktop = options.height_desktop;
    const height_mobile = options.height_mobile;
    const bg_light = options.bg_light;
    const bg_dark = options.bg_dark;
    const color_light = options.color_light;
    const color_dark = options.color_dark;
    const class_name = options.class_name !== undefined ? options.class_name : '';
    const customStyle = typeof options.style === 'string' ? options.style : '';
    const on_click = typeof options.on_click === 'function' ? options.on_click : null;

    // Coleta propriedades CSS customizadas passadas diretamente (ex: background, color, border, etc)
    // Só aplica no hr
    const cssTargets = [
        "width", "margin", "height", "background", "border", "border-radius", "box-shadow", "color", "transition", "opacity"
    ];
    const inlineCss = {};
    for (const key in options) {
        if (cssTargets.includes(key)) inlineCss[key] = options[key];
    }
    // Garante que width/margin/height sempre sejam aplicados (mesmo se não estiverem em cssTargets)
    inlineCss.width = width;
    inlineCss.margin = margin;
    inlineCss.height = height;

    // Monta CSS exclusivo para esta instância
    let customCSS = `
        .${separatorClass} {
            width: ${width_desktop ? width_desktop : width};
            margin: ${margin};
            border: none;
            height: ${height_desktop ? height_desktop : height};
            background: linear-gradient(
                90deg,
                rgba(120,120,120,0.18) 0%,
                rgba(120,120,120,0.28) 50%,
                rgba(120,120,120,0.18) 100%
            );
            transition: background 0.2s;
            ${bg_light ? `background: ${bg_light};` : ''}
            ${color_light ? `color: ${color_light};` : ''}
        }
        @media (max-width: 1000px) {
            .${separatorClass} {
                ${width_mobile ? `width: ${width_mobile} !important;` : ''}
                ${height_mobile ? `height: ${height_mobile} !important;` : ''}
            }
        }
        @media (prefers-color-scheme: dark) {
            .${separatorClass} {
                background: linear-gradient(
                    90deg,
                    rgba(200,200,200,0.10) 0%,
                    rgba(200,200,200,0.22) 50%,
                    rgba(200,200,200,0.10) 100%
                );
                ${bg_dark ? `background: ${bg_dark} !important;` : ''}
                ${color_dark ? `color: ${color_dark} !important;` : ''}
            }
        }
    `;

    // Garante que o CSS é exclusivo para esta instância
    const styleTag = `<style id="style-${uniqueId}">${customCSS}</style>`;
    $('head').append(styleTag);

    // Cria o elemento
    const $hr = $(`<hr class="of-line-separator ${separatorClass}${class_name ? ' ' + class_name : ''}" />`);
    // Aplica CSS customizado via .css()
    $hr.css(inlineCss);

    // Aplica style string se fornecido
    if (customStyle) {
        $hr.attr('style', ($hr.attr('style') || '') + ';' + customStyle);
    }

    // Adiciona evento de click se fornecido
    if (on_click) {
        $hr.on('click', on_click);
    }

    return $hr;
}

/*
Exemplo de uso:
import line_separator from './line_separator.js';

const $sep = line_separator({
    width: '90%',
    margin: '20px auto',
    height: '2px',
    width_desktop: '80%',
    width_mobile: '98vw',
    height_desktop: '2.5px',
    height_mobile: '1px',
    bg_light: 'linear-gradient(90deg, #eee 0%, #ccc 100%)',
    bg_dark: 'linear-gradient(90deg, #222 0%, #444 100%)',
    color_light: '#888',
    color_dark: '#eee',
    class_name: 'minha-classe-extra',
    style: 'border-radius: 8px;',
    on_click: () => alert('Linha clicada!'),
    background: 'linear-gradient(90deg, #f00 0%, #0f0 100%)'
});

$('#algum-container').append($sep);

// Cópia rápida de parâmetros:
// {width: '95%', margin: '15px auto', height: '1.5px', width_desktop: '', width_mobile: '', height_desktop: '', height_mobile: '', bg_light: '', bg_dark: '', color_light: '', color_dark: '', class_name: '', style: '', on_click: null}
*/