/**
 * Cria e retorna um elemento jQuery de âncora customizável, para ser usado como conteúdo em box_container.
 * 
 * @param {object} options - parâmetros da âncora:
 *      - text: string - texto da âncora (default: 'Âncora')
 *      - color: string - cor do texto da âncora (ex: '#007ff1' ou 'linear-gradient(...)', default: '#007ff1')
 *      - on_click: function|string|null - função JS a ser executada no clique OU string de URL (default: null)
 *      - style: string - string de atributos CSS para customizar a tag principal (ex: "background: #f0f0f0; border-radius: 8px;")
 *      - width_desktop: string - largura do componente no desktop (ex: '50%', '300px', etc)
 *      - width_mobile: string - largura do componente no mobile (ex: '90%', '100vw', etc)
 *      - height_desktop: string - altura do componente no desktop (ex: '40px', 'auto', etc)
 *      - height_mobile: string - altura do componente no mobile (ex: '60px', 'auto', etc)
 *      - bg_light: string - cor de fundo para modo light (opcional)
 *      - bg_dark: string - cor de fundo para modo dark (opcional)
 *      - color_light: string - cor do texto para modo light (opcional)
 *      - color_dark: string - cor do texto para modo dark (opcional)
 *      - qualquer outro atributo CSS pode ser passado com o mesmo nome do atributo em CSS (ex: background, border, fontSize, etc)
 * 
 * @returns {jQuery} - elemento jQuery pronto para ser inserido em outro container
 */
export default function anchor(options = {}) {
    // Parâmetros principais
    const text = options.text !== undefined ? options.text : 'Âncora';
    const color = options.color !== undefined ? options.color : '#007ff1';
    const on_click = options.on_click !== undefined ? options.on_click : null;
    const styleString = options.style !== undefined ? options.style : '';

    // Novos parâmetros para responsividade
    const width_desktop = options.width_desktop;
    const width_mobile = options.width_mobile;
    const height_desktop = options.height_desktop;
    const height_mobile = options.height_mobile;

    // Parâmetros para modo light/dark
    const bg_light = options.bg_light;
    const bg_dark = options.bg_dark;
    const color_light = options.color_light;
    const color_dark = options.color_dark;

    // Extrai atributos CSS extras (além dos já tratados)
    const cssAttrs = {};
    for (const key in options) {
        if (
            key !== 'text' &&
            key !== 'color' &&
            key !== 'on_click' &&
            key !== 'style' &&
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

    // Função para escurecer cor hexadecimal (apenas para hex simples, não para gradientes)
    function darkenColor(hex, factor = 0.82) {
        if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) return hex;
        let c = hex.substring(1);
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        let rgb = [
            parseInt(c.substring(0, 2), 16),
            parseInt(c.substring(2, 4), 16),
            parseInt(c.substring(4, 6), 16)
        ];
        rgb = rgb.map(v => Math.max(0, Math.floor(v * factor)));
        return `#${rgb.map(v => v.toString(16).padStart(2, '0')).join('')}`;
    }

    // Gera um identificador único para esta instância
    const uniqueId = 'anchor-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);

    // Classes únicas para esta instância
    const containerClass = `generic-anchor-container-${uniqueId}`;
    const textClass = `generic-anchor-text-${uniqueId}`;
    const linkClass = `generic-anchor-link-${uniqueId}`;

    // Cores para o link (modo light/dark)
    // Se color_light/color_dark não forem passados, usa color padrão
    const anchor_text_color_light = color_light !== undefined ? color_light : color;
    const anchor_text_color_dark = color_dark !== undefined ? color_dark : color;
    const anchor_text_color_hover_light = darkenColor(anchor_text_color_light, 0.82);
    const anchor_text_color_hover_dark = darkenColor(anchor_text_color_dark, 0.82);

    // Monta CSS exclusivo para esta instância
    let customResponsiveCSS = '';
    // Desktop
    if (width_desktop || height_desktop) {
        customResponsiveCSS += `
            .${textClass} {
                ${width_desktop ? `width: ${width_desktop} !important;` : ''}
                ${height_desktop ? `height: ${height_desktop} !important;` : ''}
            }
        `;
    }
    // Mobile
    if (width_mobile || height_mobile) {
        customResponsiveCSS += `
            @media (max-width: 1000px) {
                .${textClass} {
                    ${width_mobile ? `width: ${width_mobile} !important;` : ''}
                    ${height_mobile ? `height: ${height_mobile} !important;` : ''}
                    ${width_mobile ? '' : 'width: 90%;'}
                    font-size: 1em;
                    margin-top: 16px;
                    margin-bottom: 16px;
                }
            }
        `;
    } else {
        // Se não passar width_mobile nem height_mobile, mantém padrão antigo só mudando o breakpoint
        customResponsiveCSS += `
            @media (max-width: 1000px) {
                .${textClass} {
                    width: 90%;
                    font-size: 1em;
                    margin-top: 16px;
                    margin-bottom: 16px;
                }
            }
        `;
    }

    // CSS para modo light/dark
    let customModeCSS = '';
    // Container background
    if (bg_light || bg_dark) {
        customModeCSS += `
            @media (prefers-color-scheme: light) {
                .${containerClass} {
                    ${bg_light ? `background: ${bg_light} !important;` : ''}
                }
            }
            @media (prefers-color-scheme: dark) {
                .${containerClass} {
                    ${bg_dark ? `background: ${bg_dark} !important;` : ''}
                }
            }
        `;
    }
    // Texto do link (cor)
    if (color_light || color_dark) {
        customModeCSS += `
            @media (prefers-color-scheme: light) {
                .${linkClass} {
                    color: ${anchor_text_color_light} !important;
                }
                .${linkClass}:hover,
                .${linkClass}:focus-visible {
                    color: ${anchor_text_color_hover_light} !important;
                }
            }
            @media (prefers-color-scheme: dark) {
                .${linkClass} {
                    color: ${anchor_text_color_dark} !important;
                }
                .${linkClass}:hover,
                .${linkClass}:focus-visible {
                    color: ${anchor_text_color_hover_dark} !important;
                }
            }
        `;
    }

    // Garante que o CSS é exclusivo para esta instância
    const style = `
        <style id="style-${uniqueId}">
        .${containerClass} {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            ${bg_light && !bg_dark ? `background: ${bg_light};` : ''}
            ${bg_dark && !bg_light ? `background: ${bg_dark};` : ''}
        }
        .${textClass} {
            width: 50%;
            text-align: center;
            font-size: 0.95em;
            font-weight: 500;
            word-break: break-word;
            overflow-wrap: anywhere;
            margin-top: 12px;
            margin-bottom: 12px;
            ${width_desktop ? `width: ${width_desktop} !important;` : ''}
            ${height_desktop ? `height: ${height_desktop} !important;` : ''}
        }
        ${customResponsiveCSS}
        .${linkClass} {
            color: ${color_light || color_dark ? anchor_text_color_light : color};
            text-decoration: underline;
            background: none;
            border: none;
            cursor: pointer;
            display: inline-block;
            font: inherit;
            padding: 0;
            transition: color 0.15s, transform 0.15s;
        }
        .${linkClass}:hover,
        .${linkClass}:focus-visible {
            transform: scale(1.025);
            color: ${color_light || color_dark ? anchor_text_color_hover_light : darkenColor(color, 0.82)};
            text-decoration: underline;
        }
        ${customModeCSS}
        </style>
    `;
    $('head').append(style);

    // Cria o elemento jQuery com classes únicas
    const $container = $(`<div class="${containerClass}"></div>`);
    const $text = $(`<div class="${textClass}"></div>`);
    const $a = $(`<a class="${linkClass}" tabindex="0"></a>`).text(text);

    // Aplica atributos CSS extras na tag principal
    if (styleString && typeof styleString === 'string') {
        $container.attr('style', styleString);
    }
    // Aplica atributos CSS individuais (sobrescreve styleString se houver conflito)
    if (Object.keys(cssAttrs).length > 0) {
        $container.css(cssAttrs);
    }

    // Define comportamento do link
    if (typeof on_click === 'function') {
        $a.attr('href', 'javascript:void(0);');
        $a.on('click', on_click);
    } else if (typeof on_click === 'string' && on_click.trim() !== '') {
        // Se for string, assume que é uma URL
        $a.attr('href', on_click);
        $a.attr('target', '_blank');
        $a.attr('rel', 'noopener noreferrer');
    } else {
        $a.attr('href', 'javascript:void(0);');
    }

    $text.append($a);
    $container.append($text);

    return $container;
}
