/**
 * menu_sidebar.js
 * Sidebar vertical flexível e responsiva ao tema do navegador, para ser renderizada em um container pelo id.
 * 
 * @param {string} container_id - id do container já existente onde a sidebar será inserida
 * @param {object} options
 *   - background / background-color: string - cor CSS (ex: "#fff", "linear-gradient(...)"), opcional
 *   - sidebar_content: array - array de elementos jQuery, strings HTML, ou funções que retornam jQuery/HTML
 *   - on_click: function - função a ser executada ao clicar na sidebar (opcional)
 *   - style: string - CSS customizado para sobrescrever estilos do container (inline)
 *   - width_desktop: string - largura no desktop (ex: '18vw', '300px', etc)
 *   - width_mobile: string - largura no mobile (ex: '95vw', '100vw', etc)
 *   - height_desktop: string - altura no desktop (ex: '100vh', 'auto', etc)
 *   - height_mobile: string - altura no mobile (ex: 'auto', '80vh', etc)
 *   - bg_light: string - cor de fundo para modo light (opcional)
 *   - bg_dark: string - cor de fundo para modo dark (opcional)
 *   - color_light: string - cor do texto para modo light (opcional)
 *   - color_dark: string - cor do texto para modo dark (opcional)
 *   - Qualquer outro parâmetro de CSS pode ser passado usando o nome exato da propriedade CSS (ex: color, border, etc)
 * 
 * @returns {jQuery} - o elemento sidebar inserido (jQuery)
 * 
 * @copia_rapida_de_parametros
 * {
 *   background: "linear-gradient(180deg, #4e54c8 0%, #8f94fb 100%)",
 *   sidebar_content: [
 *      element_1,
 *      element_2,
 *   ],
 *   on_click: () => alert('Sidebar clicada!'),
 *   style: "border-radius: 20px; border: 2px solid red;",
 *   width_desktop: "20vw",
 *   width_mobile: "95vw",
 *   height_desktop: "100vh",
 *   height_mobile: "auto",
 *   bg_light: "#fff",
 *   bg_dark: "#181818",
 *   color_light: "#222",
 *   color_dark: "#cdcdcd"
 * }
 */

export default function menu_sidebar(container_id, options = {}) {
    // Gera um identificador único para esta instância
    const uniqueId = 'sidebar-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
    const sidebarClass = `of-sidebar-${uniqueId}`;

    // Parâmetros principais
    const background = options.background ?? options['background-color'] ?? options.sidebar_color ?? null;
    const sidebar_content = Array.isArray(options.sidebar_content) ? options.sidebar_content : [];
    const on_click = typeof options.on_click === 'function' ? options.on_click : null;
    const customStyle = typeof options.style === 'string' ? options.style : '';

    // Novos parâmetros para responsividade e modo light/dark
    const width_desktop = options.width_desktop;
    const width_mobile = options.width_mobile;
    const height_desktop = options.height_desktop;
    const height_mobile = options.height_mobile;
    const bg_light = options.bg_light;
    const bg_dark = options.bg_dark;
    const color_light = options.color_light;
    const color_dark = options.color_dark;

    // Coleta propriedades CSS customizadas passadas diretamente (ex: background, color, border, etc)
    // Só aplica nesta instância
    const cssTargets = [
        "background", "background-color", "color", "border", "border-radius", "box-shadow", "width", "min-width", "max-width", "min-height", "padding", "margin", "z-index", "top", "left", "right", "bottom", "transition", "font-size", "font-family", "display", "flex-direction", "align-items", "justify-content"
    ];
    const inlineCss = {};
    for (const key in options) {
        if (cssTargets.includes(key)) inlineCss[key] = options[key];
    }
    // Se background foi passado, prioriza ele
    if (background) {
        inlineCss.background = background;
    }

    // Garante que o container existe
    if ($(`#${container_id}`).length === 0) {
        $('body').append(`<div id="${container_id}"></div>`);
    }

    // Monta CSS exclusivo para esta instância
    let customCSS = `
        <style id="of-sidebar-style-${uniqueId}">
        .${sidebarClass} {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;
            width: ${width_desktop ? width_desktop : '18vw'};
            min-width: 160px;
            max-width: 25vw;
            min-height: ${height_desktop ? height_desktop : '100vh'};
            box-shadow: 0 0.2vw 0.8vw rgba(0,0,0,0.08);
            border-right: 0.1vw solid rgba(0,0,0,0.07);
            padding: 2vh 1vw;
            box-sizing: border-box;
            top: 0;
            left: 0;
            z-index: 100;
            transition: background 0.2s, color 0.2s;
            position: fixed;
            background: ${bg_light ? bg_light : '#fff'};
            color: ${color_light ? color_light : '#222'};
            box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 1.5px 6px rgba(0,0,0,0.12);
        }
        .${sidebarClass} > * {
            margin-bottom: 2vh;
        }
        .${sidebarClass} > *:last-child {
            margin-bottom: 0;
        }
        /* Tema escuro */
        @media (prefers-color-scheme: dark) {
            .${sidebarClass} {
                background: ${bg_dark ? bg_dark : '#181818'};
                color: ${color_dark ? color_dark : '#cdcdcd'};
                box-shadow: 0 8px 32px rgba(0,0,0,0.32), 0 1.5px 6px rgba(0,0,0,0.22);
                border-right: 0.1vw solid rgba(255,255,255,0.07);
            }
        }
        /* Tema claro */
        @media (prefers-color-scheme: light) {
            .${sidebarClass} {
                background: ${bg_light ? bg_light : '#fff'};
                color: ${color_light ? color_light : '#222'};
                box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 1.5px 6px rgba(0,0,0,0.12);
                border-right: 0.1vw solid rgba(0,0,0,0.07);
            }
        }
        /* Responsividade para mobile (até 1000px) */
        @media (max-width: 1000px) {
            .${sidebarClass} {
                width: ${width_mobile ? width_mobile : '95vw'};
                min-width: unset;
                max-width: unset;
                min-height: ${height_mobile ? height_mobile : 'auto'};
                padding: 2vh 2vw;
                position: fixed;
                left: 0;
                top: 0;
                border-radius: 0 12px 12px 0;
                display: flex;
            }
        }
        /* Esconde a sidebar em telas muito pequenas (ex: celular pequeno) */
        @media (max-width: 480px) {
            .${sidebarClass} {
                display: none !important;
            }
        }
        </style>
    `;
    $('head').append(customCSS);

    // Cria o elemento sidebar com classe única
    const $sidebar = $(`<div class="of-sidebar ${sidebarClass}"></div>`);

    // Aplica CSS customizado via .css()
    if (Object.keys(inlineCss).length > 0) {
        $sidebar.css(inlineCss);
    }

    // Aplica style inline se passado
    if (customStyle) {
        $sidebar.attr('style', ($sidebar.attr('style') || '') + ';' + customStyle);
    }

    // Adiciona evento de clique se fornecido
    if (on_click) {
        $sidebar.on('click', on_click);
    }

    // Adiciona o conteúdo
    sidebar_content.forEach(item => {
        if (typeof item === 'function') {
            const result = item();
            $sidebar.append(result);
        } else {
            $sidebar.append(item);
        }
    });

    // Insere no container
    $(`#${container_id}`).prepend($sidebar);

    // Retorna o elemento inserido
    return $sidebar;
}

/*
Exemplo de uso:
import menu_sidebar from './menu_sidebar.js';

menu_sidebar('meu-container', {
    background: "linear-gradient(180deg, #4e54c8 0%, #8f94fb 100%)",
    sidebar_content: [
        $('<div>').text('Item 1'),
        $('<button>').text('Botão'),
        () => $('<div>').html('<b>Outro bloco</b>')
    ],
    on_click: () => alert('Sidebar clicada!'),
    style: "border-radius: 20px; border: 2px solid red;",
    width_desktop: "20vw",
    width_mobile: "95vw",
    height_desktop: "100vh",
    height_mobile: "auto",
    bg_light: "#fff",
    bg_dark: "#181818",
    color_light: "#222",
    color_dark: "#cdcdcd"
});

// O sidebar já será inserido dentro do container com id "meu-container"
*/