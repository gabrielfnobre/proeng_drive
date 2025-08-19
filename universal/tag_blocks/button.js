/**
 * Cria e retorna um elemento jQuery de botão customizável, para ser usado como conteúdo em box_container.
 * 
 * @param {object} options - parâmetros do botão:
 *      - text: string - texto do botão (default: 'Botão')
 *      - background: string - cor de fundo do botão (ex: '#007ff1' ou 'linear-gradient(...)', default: '#007ff1')
 *      - color: string - cor do texto do botão (ex: '#fff', default: '#fff')
 *      - bg_light: string - cor de fundo para modo light (opcional)
 *      - bg_dark: string - cor de fundo para modo dark (opcional)
 *      - color_light: string - cor do texto para modo light (opcional)
 *      - color_dark: string - cor do texto para modo dark (opcional)
 *      - on_click: function|string|null - função JS a ser executada no clique OU string de código JS (default: null)
 *      - style: string - string de CSS inline para customização adicional (opcional)
 *      - width_desktop: string - largura do botão no desktop (ex: '50%', '300px', etc)
 *      - width_mobile: string - largura do botão no mobile (ex: '90%', '100vw', etc)
 *      - height_desktop: string - altura do botão no desktop (ex: '40px', 'auto', etc)
 *      - height_mobile: string - altura do botão no mobile (ex: '60px', 'auto', etc)
 *      - Qualquer outro parâmetro CSS pode ser passado usando o nome CSS (ex: 'border-radius', 'font-size', etc)
 * 
 * @returns {jQuery} - elemento jQuery pronto para ser inserido em outro container
 */
export default function button(options = {}) {
    // Parâmetros principais
    const text = options.text !== undefined ? options.text : 'Botão';
    const on_click = options.on_click !== undefined ? options.on_click : null;
    const styleString = options.style !== undefined ? options.style : '';

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
    const uniqueId = 'button-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);

    // Classes únicas para esta instância
    const containerClass = `generic-button-container-${uniqueId}`;
    const buttonClass = `generic-button-${uniqueId}`;

    // Lista de propriedades CSS válidas para aplicar via .css()
    // (pega todas as chaves que são nomes CSS válidos, exceto os parâmetros reservados)
    const reserved = [
        'text', 'on_click', 'style',
        'width_desktop', 'width_mobile', 'height_desktop', 'height_mobile',
        'bg_light', 'bg_dark', 'color_light', 'color_dark'
    ];
    const cssProps = {};
    for (const key in options) {
        if (
            !reserved.includes(key) &&
            (/^[a-z\-]+$/.test(key))
        ) {
            cssProps[key] = options[key];
        }
    }

    // Monta CSS exclusivo para esta instância
    let customResponsiveCSS = '';
    // Desktop
    if (width_desktop || height_desktop) {
        customResponsiveCSS += `
            .${buttonClass} {
                ${width_desktop ? `width: ${width_desktop} !important;` : ''}
                ${height_desktop ? `height: ${height_desktop} !important;` : ''}
            }
        `;
    }
    // Mobile
    if (width_mobile || height_mobile) {
        customResponsiveCSS += `
            @media (max-width: 1000px) {
                .${buttonClass} {
                    ${width_mobile ? `width: ${width_mobile} !important;` : ''}
                    ${height_mobile ? `height: ${height_mobile} !important;` : ''}
                    ${width_mobile ? '' : 'width: 90%;'}
                    font-size: 1em;
                    padding: 12px 0;
                }
            }
        `;
    } else {
        // Se não passar width_mobile nem height_mobile, mantém padrão antigo só mudando o breakpoint
        customResponsiveCSS += `
            @media (max-width: 1000px) {
                .${buttonClass} {
                    width: 90%;
                    font-size: 1em;
                    padding: 12px 0;
                }
            }
        `;
    }

    // Monta CSS para tema claro/escuro se fornecido
    let themeCSS = '';
    if (bg_light || bg_dark || color_light || color_dark) {
        // Preferência: se passar bg_light/bg_dark, sobrescreve background; se passar color_light/color_dark, sobrescreve color
        if (bg_light) {
            themeCSS += `
                @media (prefers-color-scheme: light) {
                    .${buttonClass} {
                        background: ${bg_light} !important;
                    }
                }
                html[data-theme="light"] .${buttonClass} {
                    background: ${bg_light} !important;
                }
            `;
        }
        if (bg_dark) {
            themeCSS += `
                @media (prefers-color-scheme: dark) {
                    .${buttonClass} {
                        background: ${bg_dark} !important;
                    }
                }
                html[data-theme="dark"] .${buttonClass} {
                    background: ${bg_dark} !important;
                }
            `;
        }
        if (color_light) {
            themeCSS += `
                @media (prefers-color-scheme: light) {
                    .${buttonClass} {
                        color: ${color_light} !important;
                    }
                }
                html[data-theme="light"] .${buttonClass} {
                    color: ${color_light} !important;
                }
            `;
        }
        if (color_dark) {
            themeCSS += `
                @media (prefers-color-scheme: dark) {
                    .${buttonClass} {
                        color: ${color_dark} !important;
                    }
                }
                html[data-theme="dark"] .${buttonClass} {
                    color: ${color_dark} !important;
                }
            `;
        }
    }

    // Garante que o CSS base é adicionado apenas uma vez por página (para estilos globais)
    if (!document.getElementById('generic-button-style-base')) {
        const style = `
            <style id="generic-button-style-base">
            .generic-button-container {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .generic-button {
                width: 50%;
                outline: none;
                transition: background 0.2s, color 0.2s, box-shadow 0.2s, filter 0.18s, transform 0.18s;
                background: #007ff1;
                box-shadow: 0 8px 32px rgba(0,0,0,0.25), 0 1.5px 6px rgba(0,0,0,0.18);
                color: #fff;
                border: none;
                padding: 12px 32px;
                border-radius: 7px;
                font-size: 1.1em;
                font-weight: 500;
                cursor: pointer;
            }
            .generic-button:hover {
                transform: scale(1.025);
                filter: brightness(1.13);
            }
            .generic-button:active {
                box-shadow: 0 4px 16px rgba(0,0,0,0.18), 0 1.5px 6px rgba(0,0,0,0.12);
            }
            .generic-button:focus-visible {
                outline: 3px solid #ffb300;
                outline-offset: 2px;
                box-shadow: 0 0 0 4px rgba(255,179,0,0.18), 0 8px 32px rgba(0,0,0,0.25), 0 1.5px 6px rgba(0,0,0,0.18);
            }
            /* Removido o override de cor do texto por media query para permitir personalização */
            </style>
        `;
        $('head').append(style);
    }

    // Adiciona CSS exclusivo para esta instância
    const styleUnique = `
        <style id="style-${uniqueId}">
        .${containerClass} {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .${buttonClass} {
            width: 50%;
            outline: none;
            transition: background 0.2s, color 0.2s, box-shadow 0.2s, filter 0.18s, transform 0.18s;
            background: ${options.background !== undefined ? options.background : '#007ff1'};
            color: ${options.color !== undefined ? options.color : '#fff'};
            box-shadow: 0 8px 32px rgba(0,0,0,0.25), 0 1.5px 6px rgba(0,0,0,0.18);
            border: none;
            padding: 12px 32px;
            border-radius: 7px;
            font-size: 1.1em;
            font-weight: 500;
            cursor: pointer;
            ${width_desktop ? `width: ${width_desktop} !important;` : ''}
            ${height_desktop ? `height: ${height_desktop} !important;` : ''}
        }
        .${buttonClass}:hover {
            transform: scale(1.025);
            filter: brightness(1.13);
        }
        .${buttonClass}:active {
            box-shadow: 0 4px 16px rgba(0,0,0,0.18), 0 1.5px 6px rgba(0,0,0,0.12);
        }
        .${buttonClass}:focus-visible {
            outline: 3px solid #ffb300;
            outline-offset: 2px;
            box-shadow: 0 0 0 4px rgba(255,179,0,0.18), 0 8px 32px rgba(0,0,0,0.25), 0 1.5px 6px rgba(0,0,0,0.18);
        }
        ${customResponsiveCSS}
        ${themeCSS}
        </style>
    `;
    $('head').append(styleUnique);

    // Cria o elemento jQuery com classes únicas
    const $container = $(`<div class="generic-button-container ${containerClass}"></div>`);
    const $button = $(`<button type="button" class="generic-button ${buttonClass}"></button>`).text(text);

    // Aplica propriedades CSS passadas via options (usando nomes CSS)
    for (const prop in cssProps) {
        $button.css(prop, cssProps[prop]);
    }

    // Aplica o style inline, se fornecido
    if (styleString && typeof styleString === 'string') {
        $button.attr('style', ($button.attr('style') || '') + ';' + styleString);
    }

    // Define comportamento do botão
    if (typeof on_click === 'function') {
        $button.on('click', on_click);
    } else if (typeof on_click === 'string' && on_click.trim() !== '') {
        // Se for string, verifica se é uma URL (começa com http:// ou https://)
        if (/^https?:\/\//i.test(on_click.trim())) {
            $button.on('click', function(e) {
                window.open(on_click.trim(), '_blank', 'noopener,noreferrer');
            });
        } else {
            // Se não for URL, assume que é código JS a ser executado
            $button.on('click', function(e) {
                // eslint-disable-next-line no-eval
                eval(on_click);
            });
        }
    }

    $container.append($button);

    return $container;
}

/*
Exemplo de uso:
import button from './button.js';

const $btn = button({
    text: 'Clique aqui',
    background: 'linear-gradient(90deg, #4a90e2, #357ab8)',
    color: '#fff', // cor do texto (opcional, padrão: branco)
    on_click: function() { alert('Clicou!'); },
    'border-radius': '20px',
    'font-size': '1.3em',
    style: 'box-shadow: 0 0 0 4px #f00;',
    width_desktop: '60%',
    width_mobile: '95%',
    height_desktop: '48px',
    height_mobile: '60px',
    bg_light: '#fff', // cor de fundo para modo claro
    bg_dark: '#222',  // cor de fundo para modo escuro
    color_light: '#222', // cor do texto para modo claro
    color_dark: '#fff'   // cor do texto para modo escuro
});
// ou
const $btn2 = button({
    text: 'Outro botão',
    background: '#ff5722',
    color: '#222', // cor do texto customizada
    on_click: "console.log('Clicou via string!')",
    style: 'padding: 20px 40px;',
    width_desktop: '300px'
});

$('#algum-container').append($btn);
*/