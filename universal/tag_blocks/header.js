/**
 * Header flexível para uso em containers, inspirado no header.php.
 * 
 * @param {string} cnt_created - id do container já existente onde o header será inserido
 * @param {object} options
 *   - header_content: array|string|jQuery - conteúdo HTML ou array de conteúdos (strings, jQuery, ou funções que retornam jQuery)
 *   - style: string (opcional) - string de CSS inline para customizar o header (sobrescreve qualquer outro)
 *   - on_click: function (opcional) - função a ser executada ao clicar no header
 *   - width_desktop: string (opcional) - largura do header no desktop (ex: '100%', '900px', etc)
 *   - width_mobile: string (opcional) - largura do header no mobile (ex: '100vw', '90%', etc)
 *   - height_desktop: string (opcional) - altura do header no desktop (ex: '10vh', '80px', etc)
 *   - height_mobile: string (opcional) - altura do header no mobile (ex: '56px', 'auto', etc)
 *   - bg_light: string (opcional) - cor de fundo para modo light
 *   - bg_dark: string (opcional) - cor de fundo para modo dark
 *   - color_light: string (opcional) - cor do texto para modo light
 *   - color_dark: string (opcional) - cor do texto para modo dark
 *   - qualquer outro parâmetro CSS pode ser passado com o mesmo nome do atributo em CSS (ex: background, border, font-size, etc)
 * @returns {jQuery} - o header inserido (jQuery)
 * 
 * @for_print
 * cnt_created
 * header_content
 * style
 * on_click
 * width_desktop
 * width_mobile
 * height_desktop
 * height_mobile
 * bg_light
 * bg_dark
 * color_light
 * color_dark
 * (qualquer parâmetro css)
 */
export default function header(cnt_created, options = {}) {
    // Garante que o container existe
    if ($(`#${cnt_created}`).length === 0) {
        $('body').append(`<div id="${cnt_created}"></div>`);
    }

    // Parâmetros principais
    const header_content = options.header_content ?? '';
    const styleString = options.style !== undefined ? options.style : '';
    const on_click = typeof options.on_click === 'function' ? options.on_click : null;

    // Novos parâmetros para responsividade e tema
    const width_desktop = options.width_desktop;
    const width_mobile = options.width_mobile;
    const height_desktop = options.height_desktop;
    const height_mobile = options.height_mobile;
    const bg_light = options.bg_light;
    const bg_dark = options.bg_dark;
    const color_light = options.color_light;
    const color_dark = options.color_dark;

    // Gera um identificador único para esta instância
    const uniqueId = 'header-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);

    // Classes únicas para esta instância
    const headerClass = `header-flex-container-${uniqueId}`;
    const wrapperClass = `header-fixed-wrapper-${uniqueId}`;

    // Extrai atributos CSS extras (além dos já tratados)
    const cssAttrs = {};
    for (const key in options) {
        if (
            key !== 'header_content' &&
            key !== 'style' &&
            key !== 'on_click' &&
            key !== 'width_desktop' &&
            key !== 'width_mobile' &&
            key !== 'height_desktop' &&
            key !== 'height_mobile' &&
            key !== 'bg_light' &&
            key !== 'bg_dark' &&
            key !== 'color_light' &&
            key !== 'color_dark'
        ) {
            cssAttrs[key] = options[key];
        }
    }

    // Detecta tema (light/dark) para cor padrão do header fixo
    function getDefaultBgColor(isDark) {
        if (isDark) return '#18191a';
        return '#fff';
    }

    // Detecta cor de texto padrão para modo dark/light
    function getDefaultTextColor(isDark) {
        return isDark ? '#fff' : '#18191a';
    }

    // Função para detectar se está em dark mode
    function isDarkMode() {
        if (typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return true;
        }
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') return true;
        return false;
    }

    // Definir background e color padrão, mas permitir sobrescrever por bg_light/bg_dark/color_light/color_dark
    let resolvedBg, resolvedColor;
    if (isDarkMode()) {
        resolvedBg = bg_dark !== undefined ? bg_dark : getDefaultBgColor(true);
        resolvedColor = color_dark !== undefined ? color_dark : getDefaultTextColor(true);
    } else {
        resolvedBg = bg_light !== undefined ? bg_light : getDefaultBgColor(false);
        resolvedColor = color_light !== undefined ? color_light : getDefaultTextColor(false);
    }

    // Defaults para alguns atributos se não passados
    if (cssAttrs['background'] === undefined && cssAttrs['background-color'] === undefined) {
        if (options['header_fixed']) {
            cssAttrs['background'] = resolvedBg;
        } else {
            cssAttrs['background'] = 'transparent';
        }
    }
    if (cssAttrs['color'] === undefined) {
        cssAttrs['color'] = resolvedColor;
    }
    // Altura padrão só se não passar height_desktop nem height_mobile
    if (
        cssAttrs['height'] === undefined &&
        height_desktop === undefined &&
        height_mobile === undefined
    ) {
        if (options['header_fixed']) {
            cssAttrs['height'] = '10vh';
        } else {
            cssAttrs['height'] = 'auto';
        }
    }
    if (cssAttrs['padding'] === undefined && options['header_padding'] !== undefined) {
        cssAttrs['padding'] = options['header_padding'];
    }
    if (cssAttrs['border-bottom'] === undefined && options['header_border']) {
        cssAttrs['border-bottom'] = `1.5px solid ${options['header_border_color'] ?? '#e0e0e0'}`;
    }
    if (cssAttrs['box-shadow'] === undefined && (options['header_box_shadow'] === undefined || options['header_box_shadow'])) {
        let defaultBoxShadow = '0 2px 8px 0 rgba(0,0,0,0.08)';
        if (isDarkMode()) {
            defaultBoxShadow = '0 2px 8px 0 rgba(0,0,0,0.32)';
        }
        cssAttrs['box-shadow'] = options['header_box_shadow_value'] ?? defaultBoxShadow;
    }
    if (cssAttrs['box-shadow'] === undefined && options['header_box_shadow'] === false) {
        cssAttrs['box-shadow'] = 'none';
    }

    // Detecta se é 1 elemento ou múltiplos
    const is_array = Array.isArray(header_content);
    const element_count = is_array ? header_content.length : (header_content && typeof header_content === 'string' && header_content.trim() !== '' ? 1 : (header_content ? 1 : 0));

    // Define a classe de alinhamento
    let header_align_class = '';
    if (element_count === 1) {
        if (options['header_align'] === 'flex-end') {
            header_align_class = 'header-align-flex-end';
        } else if (options['header_align'] === 'flex-start') {
            header_align_class = 'header-align-flex-start';
        }
    }

    // Classes para header fixa
    const header_fixed_class = options['header_fixed'] ? ' header-fixed' : '';

    // Monta CSS exclusivo para esta instância
    let customResponsiveCSS = '';
    // Desktop
    if (width_desktop || height_desktop) {
        customResponsiveCSS += `
            .${headerClass} {
                ${width_desktop ? `width: ${width_desktop} !important;` : ''}
                ${height_desktop ? `height: ${height_desktop} !important;` : ''}
            }
        `;
    }
    // Mobile
    if (width_mobile || height_mobile) {
        customResponsiveCSS += `
            @media (max-width: 1000px) {
                .${headerClass} {
                    ${width_mobile ? `width: ${width_mobile} !important;` : ''}
                    ${height_mobile ? `height: ${height_mobile} !important;` : ''}
                }
            }
        `;
    } else {
        // Se não passar width_mobile nem height_mobile, mantém padrão antigo só mudando o breakpoint
        customResponsiveCSS += `
            @media (max-width: 1000px) {
                .${headerClass} {
                    /* Mantém altura padrão do header para mobile se header_fixed, senão herda do desktop */
                    ${options['header_fixed'] ? 'height: 56px !important;' : ''}
                }
            }
        `;
    }

    // CSS para tema light/dark customizado por instância
    let customThemeCSS = '';
    if (bg_light || bg_dark || color_light || color_dark) {
        // Light
        customThemeCSS += `
            html[data-theme="light"] .${headerClass},
            body:not([data-theme]), html:not([data-theme]) .${headerClass} {
                ${bg_light ? `background: ${bg_light} !important;` : ''}
                ${color_light ? `color: ${color_light} !important;` : ''}
            }
        `;
        // Dark
        customThemeCSS += `
            html[data-theme="dark"] .${headerClass} {
                ${bg_dark ? `background: ${bg_dark} !important;` : ''}
                ${color_dark ? `color: ${color_dark} !important;` : ''}
            }
        `;
        // Suporte para prefers-color-scheme
        customThemeCSS += `
            @media (prefers-color-scheme: dark) {
                html:not([data-theme]) .${headerClass}, body:not([data-theme]) .${headerClass} {
                    ${bg_dark ? `background: ${bg_dark} !important;` : ''}
                    ${color_dark ? `color: ${color_dark} !important;` : ''}
                }
            }
            @media (prefers-color-scheme: light) {
                html:not([data-theme]) .${headerClass}, body:not([data-theme]) .${headerClass} {
                    ${bg_light ? `background: ${bg_light} !important;` : ''}
                    ${color_light ? `color: ${color_light} !important;` : ''}
                }
            }
        `;
    }

    // Adiciona o CSS exclusivo para esta instância
    const style = `
        <style id="header-flex-style-${uniqueId}">
        .${headerClass} {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            transition: background 0.2s, height 0.2s, box-shadow 0.2s, border-bottom 0.2s;
            ${width_desktop ? `width: ${width_desktop} !important;` : ''}
            ${height_desktop ? `height: ${height_desktop} !important;` : ''}
        }
        .${headerClass}.header-align-flex-start {
            justify-content: flex-start !important;
        }
        .${headerClass}.header-align-flex-end {
            justify-content: flex-end !important;
        }
        .${headerClass}:not(.header-align-flex-start):not(.header-align-flex-end) {
            justify-content: space-between;
        }
        .${headerClass}.header-fixed {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            z-index: 9999;
        }
        ${customResponsiveCSS}
        ${customThemeCSS}
        </style>
    `;
    $('head').append(style);

    // Cria o wrapper principal
    const $wrapper = $(`<div class="${wrapperClass}" style="position: relative; width: 100%;"></div>`);

    // Cria o header
    const $header = $(`<header class="${headerClass}${header_align_class ? ' ' + header_align_class : ''}${header_fixed_class}"></header>`);

    // Aplica estilos dinâmicos (inline)
    if (styleString && typeof styleString === 'string') {
        $header.attr('style', styleString);
    } else {
        $header.css(cssAttrs);
    }

    // Adiciona o evento de click, se fornecido
    if (on_click) {
        $header.on('click', on_click);
    }

    // Adiciona o conteúdo
    if (header_content !== undefined && header_content !== null) {
        if (is_array) {
            header_content.forEach(item => {
                if (typeof item === 'function') {
                    $header.append(item());
                } else if (item instanceof jQuery) {
                    $header.append(item);
                } else {
                    $header.append(item);
                }
            });
        } else {
            if (typeof header_content === 'function') {
                $header.append(header_content());
            } else if (header_content instanceof jQuery) {
                $header.append(header_content);
            } else {
                $header.append(header_content);
            }
        }
    }

    $wrapper.append($header);

    // Função para ajustar margens e espaçadores (apenas para header fixa)
    function setHeaderSpacerAndMargins() {
        const wrapper = $wrapper[0];
        const header = wrapper ? wrapper.querySelector(`.${headerClass}.header-fixed`) : null;
        if (header && wrapper) {
            // Herdar margin do pai
            const computed = window.getComputedStyle(wrapper.parentElement);
            const marginLeft = computed.marginLeft;
            const marginRight = computed.marginRight;
            header.style.marginLeft = marginLeft;
            header.style.marginRight = marginRight;
            header.style.width = `calc(100% - ${marginLeft} - ${marginRight})`;
        }
        // Espaço para header fixa não sobrepor conteúdo
        if (header && wrapper && options['header_fixed']) {
            const id = `header-only-spacer-${uniqueId}`;
            let existing = document.getElementById(id);
            const parent = wrapper.parentElement;
            if (!existing) {
                const div = document.createElement('div');
                div.id = id;
                div.style.width = '100%';
                parent.insertBefore(div, wrapper.nextSibling);
                existing = div;
            }
            existing.style.height = header.offsetHeight + 'px';
        } else {
            const id = `header-only-spacer-${uniqueId}`;
            const existing = document.getElementById(id);
            if (existing && existing.parentElement) {
                existing.parentElement.removeChild(existing);
            }
        }
    }

    // Eventos para ajuste dinâmico
    setTimeout(setHeaderSpacerAndMargins, 0);
    $(window).on('resize orientationchange', setHeaderSpacerAndMargins);
    $(document).on('DOMContentLoaded', setHeaderSpacerAndMargins);

    // Insere o header no container especificado
    $(`#${cnt_created}`).prepend($wrapper);

    // Retorna o header inserido (wrapper jQuery)
    return $wrapper;
}

/*
Exemplo de uso:
import header from './header.js';

header('algum-container', {
    header_content: [
        '<div>Logo</div>',
        $('<div>').text('Título'),
        () => $('<button>').text('Sair')
    ],
    style: 'background: #fff; height: 10vh; border-bottom: 1.5px solid #e0e0e0; box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08); padding: 0.8em 1.2em;',
    on_click: () => alert('Clicou no header!'),
    // Ou qualquer atributo css:
    'background': '#fff',
    'height': '10vh',
    'border-bottom': '1.5px solid #e0e0e0',
    'box-shadow': '0 2px 8px 0 rgba(0,0,0,0.08)',
    'padding': '0.8em 1.2em',
    width_desktop: '900px',
    width_mobile: '100vw',
    height_desktop: '80px',
    height_mobile: '56px',
    bg_light: '#fff',
    bg_dark: '#222',
    color_light: '#222',
    color_dark: '#fff'
});

// O header já será inserido dentro do container com id "algum-container"
*/
