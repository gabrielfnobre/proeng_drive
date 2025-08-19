/**
 * Cria e retorna um elemento jQuery de botão de fechar customizável, para ser usado como conteúdo em box_container.
 * 
 * @param {object} options - parâmetros do botão:
 *      - background: string - cor de fundo do botão (ex: '#222', 'red', 'transparent')
 *      - color: string - cor do "X" (opcional, se não informado, segue padrão do sistema)
 *      - bg_light: string - cor de fundo do botão no modo light (opcional)
 *      - bg_dark: string - cor de fundo do botão no modo dark (opcional)
 *      - color_light: string - cor do "X" no modo light (opcional)
 *      - color_dark: string - cor do "X" no modo dark (opcional)
 *      - box-shadow: boolean|string - se terá sombra (default: false) ou valor de sombra customizado
 *      - on_click: function|string|null - função JS a ser executada no clique OU string de código JS (default: null)
 *      - tag: string - tag HTML a ser usada no lugar do <button> (default: 'button')
 *      - style: string - string de CSS inline para customização adicional (opcional)
 *      - width_desktop: string - largura do botão no desktop (ex: '44px', '3em', '100%')
 *      - width_mobile: string - largura do botão no mobile (ex: '32px', '90vw')
 *      - height_desktop: string - altura do botão no desktop (ex: '44px', '3em')
 *      - height_mobile: string - altura do botão no mobile (ex: '32px', 'auto')
 *      - Qualquer outro parâmetro CSS pode ser passado usando o nome CSS (ex: 'border-radius', 'font-size', etc)
 * 
 * @returns {jQuery} - elemento jQuery pronto para ser inserido em outro container
 * @for_print
 * background
 * color
 * bg_light
 * bg_dark
 * color_light
 * color_dark
 * box_shadow
 * on_click
 * tag
 * style
 * width_desktop
 * width_mobile
 * height_desktop
 * height_mobile
 */
export default function close_button(options = {}) {
    // Parâmetros principais
    const background = options.background !== undefined ? options.background : 'transparent';
    const color = options.color !== undefined ? options.color : null;
    const tag = options.tag !== undefined ? options.tag : 'button';
    const styleString = options.style !== undefined ? options.style : '';
    const on_click = options.on_click !== undefined ? options.on_click : closeOverlay;

    // Novos parâmetros para responsividade
    const width_desktop = options.width_desktop;
    const width_mobile = options.width_mobile;
    const height_desktop = options.height_desktop;
    const height_mobile = options.height_mobile;

    // Parâmetros para tema
    const bg_light = options.bg_light;
    const bg_dark = options.bg_dark;
    const color_light = options.color_light;
    const color_dark = options.color_dark;

    // Gera um identificador único para esta instância
    const uniqueId = 'close-btn-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
    const containerClass = `close-btn-container-${uniqueId}`;
    const btnClass = `close-btn-square-${uniqueId}`;

    // box-shadow pode ser boolean (true para padrão) ou string (customizado)
    let boxShadow = 'none';
    let boxShadowHover = 'none';
    if (typeof options['box_shadow'] === 'string') {
        boxShadow = options['box_shadow'];
        boxShadowHover = options['box_shadow'];
    } else if (!!options['box_shadow']) {
        boxShadow = '0 3px 18px 0 rgba(0,0,0,0.32), 0 2.5px 8px 0 rgba(0,0,0,0.24)';
        boxShadowHover = '0 5px 24px 0 rgba(0,0,0,0.36), 0 3.5px 12px 0 rgba(0,0,0,0.28)';
    }

    // Lista de propriedades CSS válidas para aplicar via .css()
    // (pega todas as chaves que são nomes CSS válidos, exceto os parâmetros reservados)
    const reserved = [
        'on_click', 'tag', 'style',
        'width_desktop', 'width_mobile', 'height_desktop', 'height_mobile',
        'bg_light', 'bg_dark', 'color_light', 'color_dark'
    ];
    const cssProps = {};
    for (const key in options) {
        if (
            !reserved.includes(key) &&
            (/^[a-z\-]+$/.test(key))
        ) {
            // background, color, box-shadow, etc.
            cssProps[key] = options[key];
        }
    }

    // Hover color logic (manual mapping for common colors)
    function getHoverColor(color) {
        if (!color || color === 'transparent' || color.toLowerCase() === 'none') return 'rgba(0,0,0,0.10)';
        const hover_map = {
            '#fff': '#e0e0e0',
            '#ffffff': '#e0e0e0',
            '#222': '#111',
            '#000': '#222',
            '#007ff1': '#005bb8',
            'red': '#b30000',
            'blue': '#003366',
            'green': '#006622',
            'orange': '#b36b00',
            'yellow': '#b3b300',
            'purple': '#4b006e',
            'pink': '#b3005b',
            'gray': '#444',
            'grey': '#444',
        };
        const key = color.toLowerCase();
        return hover_map[key] || color;
    }

    // Função para obter o tema atual
    function getCurrentTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    // Determina background e color por tema
    function getThemeValue(lightVal, darkVal, fallback) {
        const theme = getCurrentTheme();
        if (theme === 'dark' && darkVal !== undefined) return darkVal;
        if (theme === 'light' && lightVal !== undefined) return lightVal;
        return fallback;
    }

    // Determina background inicial e hover para cada tema
    const background_light = bg_light !== undefined ? bg_light : background;
    const background_dark = bg_dark !== undefined ? bg_dark : background;
    const color_light_final = color_light !== undefined ? color_light : (color !== null ? color : null);
    const color_dark_final = color_dark !== undefined ? color_dark : (color !== null ? color : null);

    // Hover backgrounds
    const background_hover_light = getHoverColor(background_light);
    const background_hover_dark = getHoverColor(background_dark);

    // Monta CSS exclusivo para esta instância
    let customResponsiveCSS = '';
    // Desktop
    if (width_desktop || height_desktop) {
        customResponsiveCSS += `
            .${btnClass} {
                ${width_desktop ? `width: ${width_desktop} !important; min-width: ${width_desktop} !important; max-width: ${width_desktop} !important;` : ''}
                ${height_desktop ? `height: ${height_desktop} !important; min-height: ${height_desktop} !important; max-height: ${height_desktop} !important;` : ''}
            }
        `;
    }
    // Mobile
    if (width_mobile || height_mobile) {
        customResponsiveCSS += `
            @media (max-width: 1000px) {
                .${btnClass} {
                    ${width_mobile ? `width: ${width_mobile} !important; min-width: ${width_mobile} !important; max-width: ${width_mobile} !important;` : ''}
                    ${height_mobile ? `height: ${height_mobile} !important; min-height: ${height_mobile} !important; max-height: ${height_mobile} !important;` : ''}
                    ${width_mobile ? '' : 'width: 32px; min-width: 32px; max-width: 32px;'}
                    ${height_mobile ? '' : 'height: 32px; min-height: 32px; max-height: 32px;'}
                    font-size: 1.3em;
                    margin: 7px 7px 0 0;
                }
            }
        `;
    } else {
        // Se não passar width_mobile nem height_mobile, mantém padrão antigo só mudando o breakpoint
        customResponsiveCSS += `
            @media (max-width: 1000px) {
                .${btnClass} {
                    width: 32px;
                    height: 32px;
                    min-width: 32px;
                    min-height: 32px;
                    max-width: 32px;
                    max-height: 32px;
                    font-size: 1.3em;
                    margin: 7px 7px 0 0;
                }
            }
        `;
    }

    // CSS para temas
    let themeCSS = '';
    // Só gera CSS de tema se algum parâmetro de tema foi passado
    if (bg_light !== undefined || bg_dark !== undefined || color_light !== undefined || color_dark !== undefined) {
        themeCSS += `
        @media (prefers-color-scheme: dark) {
            .${btnClass} {
                background: ${background_dark} !important;
                ${color_dark_final !== null && color_dark_final !== undefined ? `color: ${color_dark_final} !important;` : ''}
            }
            .${btnClass}:hover,
            .${btnClass}:focus-visible {
                background: ${background_hover_dark} !important;
            }
        }
        @media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {
            .${btnClass} {
                background: ${background_light} !important;
                ${color_light_final !== null && color_light_final !== undefined ? `color: ${color_light_final} !important;` : ''}
            }
            .${btnClass}:hover,
            .${btnClass}:focus-visible {
                background: ${background_hover_light} !important;
            }
        }
        `;
    }

    // Adiciona o CSS exclusivo para esta instância
    const style = `
        <style id="close-btn-style-${uniqueId}">
        .${containerClass} {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: flex-start;
        }
        .${btnClass} {
            width: 44px;
            height: 44px;
            min-width: 44px;
            min-height: 44px;
            max-width: 52px;
            max-height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${background};
            border: none;
            border-radius: 8px;
            font-size: 2.1em;
            font-weight: 700;
            cursor: pointer;
            box-shadow: ${boxShadow};
            transition: background 0.18s, color 0.18s, transform 0.12s, box-shadow 0.18s;
            outline: none;
            user-select: none;
            ${width_desktop ? `width: ${width_desktop} !important; min-width: ${width_desktop} !important; max-width: ${width_desktop} !important;` : ''}
            ${height_desktop ? `height: ${height_desktop} !important; min-height: ${height_desktop} !important; max-height: ${height_desktop} !important;` : ''}
            ${color !== null && color !== undefined ? `color: ${color} !important;` : ''}
        }
        .${btnClass}:hover,
        .${btnClass}:focus-visible {
            background: ${getHoverColor(background)};
            transform: scale(1.14);
            box-shadow: ${boxShadowHover};
        }
        ${customResponsiveCSS}
        /* Cores do X por tema, se não houver customização */
        .${btnClass}[data-x-theme="light"] { color: #222; }
        .${btnClass}[data-x-theme="dark"] { color: #fff; }
        ${themeCSS}
        </style>
    `;
    $('head').append(style);

    // Cria o container
    const $container = $(`<div class="${containerClass}"></div>`);

    // Cria o botão (ou outra tag)
    const $btn = $(`<${tag} type="button" class="close-btn-square ${btnClass}" aria-label="Fechar" tabindex="0">&#10005;</${tag}>`);

    // Aplica propriedades CSS passadas via options (usando nomes CSS)
    for (const prop in cssProps) {
        $btn.css(prop, cssProps[prop]);
    }

    // Aplica o style inline, se fornecido
    if (styleString && typeof styleString === 'string') {
        $btn.attr('style', ($btn.attr('style') || '') + ';' + styleString);
    }

    // Aplica estilos dinâmicos padrão se não sobrescrito por options
    if (!('background' in cssProps)) $btn.css('background', background);
    if (!('box-shadow' in cssProps)) $btn.css('box-shadow', boxShadow);
    if (!('color' in cssProps) && color !== null && color !== undefined) $btn.css('color', color);

    // Se não houver cor customizada do X, aplica por tema via data-attr (para CSS)
    if (
        !color && !('color' in cssProps) &&
        color_light === undefined && color_dark === undefined
    ) {
        // Detecta tema (fallback para light)
        const theme = getCurrentTheme();
        $btn.attr('data-x-theme', theme);
        // Atualiza ao mudar o tema
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                $btn.attr('data-x-theme', e.matches ? 'dark' : 'light');
            });
        }
    }

    // Hover/Focus: aplica via JS para as variáveis dinâmicas, exceto se sobrescrito por style/cssProps
    $btn.on('mouseenter focusin', function() {
        // Se customização de tema, aplica o hover correto
        if (bg_light !== undefined || bg_dark !== undefined) {
            const theme = getCurrentTheme();
            if (!('background' in cssProps)) {
                if (theme === 'dark') {
                    $(this).css('background', background_hover_dark);
                } else {
                    $(this).css('background', background_hover_light);
                }
            }
        } else {
            if (!('background' in cssProps)) $(this).css('background', getHoverColor(background));
        }
        $(this).css('transform', 'scale(1.14)');
        if (!('box-shadow' in cssProps)) $(this).css('box-shadow', boxShadowHover);
    });
    $btn.on('mouseleave focusout', function() {
        // Se customização de tema, aplica o background correto
        if (bg_light !== undefined || bg_dark !== undefined) {
            const theme = getCurrentTheme();
            if (!('background' in cssProps)) {
                if (theme === 'dark') {
                    $(this).css('background', background_dark);
                } else {
                    $(this).css('background', background_light);
                }
            }
        } else {
            if (!('background' in cssProps)) $(this).css('background', background);
        }
        $(this).css('transform', '');
        if (!('box-shadow' in cssProps)) $(this).css('box-shadow', boxShadow);
    });

    // Define comportamento do botão
    if (typeof on_click === 'function') {
        $btn.on('click', on_click);
    } else if (typeof on_click === 'string' && on_click.trim() !== '') {
        // Se for string, verifica se é uma URL (começa com http:// ou https://)
        if (/^https?:\/\//i.test(on_click.trim())) {
            $btn.on('click', function(e) {
                window.open(on_click.trim(), '_blank', 'noopener,noreferrer');
            });
        } else {
            // Se não for URL, assume que é código JS a ser executado
            $btn.on('click', function(e) {
                // eslint-disable-next-line no-eval
                eval(on_click);
            });
        }
    }

    $container.append($btn);

    return $container;
}

/*
Exemplo de uso:
import close_button from './close_button.js';

const $close = close_button({
    background: '#222',
    color: '#fff',
    bg_light: '#fff',
    bg_dark: '#222',
    color_light: '#222',
    color_dark: '#fff',
    'box-shadow': true,
    on_click: () => alert('Fechou!'),
    tag: 'button', // ou 'a', 'div', etc.
    style: 'border-radius: 50%; font-size: 2.5em;',
    'font-size': '2em',
    'border-radius': '12px',
    width_desktop: '60px',
    width_mobile: '40px',
    height_desktop: '60px',
    height_mobile: '40px'
});

$('#algum-container').append($close);
*/

function closeOverlay(){
    const el = document.getElementById('of-overlay-modal');
    if (el) {
        el.style.display = 'none';
        el.innerHTML = '';
    }
}