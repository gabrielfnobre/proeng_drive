/**
 * option_btn_img.js
 * Retorna um elemento jQuery de botão de opção com ícone e texto, pronto para ser inserido em um container.
 * 
 * Parâmetros esperados (objeto options):
 *   - option_btn_img_icon: string - caminho da imagem do ícone
 *   - option_btn_img_text: string - texto do link
 *   - option_btn_img_onclick: function|string - função JS a ser executada no clique (ex: ()=>alert('oi'), ou string "minhaFuncao()")
 *   - option_btn_img_bottom: bool - se true, força o botão a ficar no final do container pai flex (ex: sidebar)
 *   - option_btn_img_icon_size: string - tamanho do ícone no desktop (ex: '2.5em', '32px', etc) (opcional)
 *   - option_btn_img_icon_size_mobile: string - tamanho do ícone no mobile (opcional)
 *   - width_desktop: string - largura do componente no desktop (ex: '18vw', '300px', etc) (opcional)
 *   - width_mobile: string - largura do componente no mobile (ex: '95vw', '100vw', etc) (opcional)
 *   - height_desktop: string - altura do componente no desktop (ex: '100vh', 'auto', etc) (opcional)
 *   - height_mobile: string - altura do componente no mobile (ex: 'auto', '80vh', etc) (opcional)
 *   - bg_light: string - cor de fundo para modo light (opcional)
 *   - bg_dark: string - cor de fundo para modo dark (opcional)
 *   - color_light: string - cor do texto para modo light (opcional)
 *   - color_dark: string - cor do texto para modo dark (opcional)
 *   - style: string - CSS customizado para sobrescrever estilos do container (inline)
 * 
 * Exemplo de uso:
 * import option_btn_img from './option_btn_img.js';
 * $('#sidebar').append(option_btn_img({
 *   option_btn_img_icon: '/caminho/do/icone.svg',
 *   option_btn_img_text: 'Opção do menu',
 *   option_btn_img_onclick: () => alert('Clicou no link!'),
 *   option_btn_img_bottom: true,
 *   option_btn_img_icon_size: '3em',
 *   option_btn_img_icon_size_mobile: '2em',
 *   width_desktop: '300px',
 *   width_mobile: '95vw',
 *   height_desktop: '60px',
 *   height_mobile: '48px',
 *   bg_light: '#fff',
 *   bg_dark: '#222',
 *   color_light: '#222',
 *   color_dark: '#fff',
 *   style: "background: #f0f0f0; border-radius: 10px; color: red;"
 * }));
 */

export default function option_btn_img(options = {}) {
    // Parâmetros principais
    const icon = options.option_btn_img_icon || '';
    const text = options.option_btn_img_text || 'Link';
    const onClick = options.option_btn_img_onclick || '';
    const bottom = !!options.option_btn_img_bottom;
    const iconSize = options.option_btn_img_icon_size || '';
    const iconSizeMobile = options.option_btn_img_icon_size_mobile || '';
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

    // Gera um identificador único para esta instância
    const uniqueId = 'option-btn-img-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
    const containerClass = `option-btn-img-container-${uniqueId}`;
    const contentClass = `option-btn-img-content-${uniqueId}`;
    const iconClass = `option-btn-img-icon-${uniqueId}`;
    const textClass = `option-btn-img-text-${uniqueId}`;

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

    // Cores para o texto (modo light/dark)
    const text_color_light = color_light !== undefined ? color_light : '';
    const text_color_dark = color_dark !== undefined ? color_dark : '';
    const text_color_hover_light = text_color_light ? darkenColor(text_color_light, 0.82) : '';
    const text_color_hover_dark = text_color_dark ? darkenColor(text_color_dark, 0.82) : '';

    // Monta CSS exclusivo para esta instância
    let style = `
    <style id="style-${uniqueId}">
    .${containerClass} {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transition: transform 0.18s;
        cursor: pointer;
        background: none;
        box-shadow: none;
        border: none;
        padding: 0;
        ${bg_light && !bg_dark ? `background: ${bg_light};` : ''}
        ${bg_dark && !bg_light ? `background: ${bg_dark};` : ''}
        ${width_desktop ? `width: ${width_desktop} !important;` : ''}
        ${height_desktop ? `height: ${height_desktop} !important;` : ''}
        ${text_color_light && !text_color_dark ? `color: ${text_color_light} !important;` : ''}
        ${text_color_dark && !text_color_light ? `color: ${text_color_dark} !important;` : ''}
    }
    .${containerClass}.option-btn-img-container-bottom {
        margin-top: auto !important;
    }
    .${containerClass}:hover {
        transform: scale(1.025);
    }
    .${contentClass} {
        display: flex;
        align-items: center;
        width: 90%;
        height: 100%;
        gap: 0.7em;
        justify-content: flex-start;
    }
    .${iconClass} {
        display: block;
        width: 2.5em;
        height: 2.5em;
        min-width: 1.7em;
        min-height: 1.7em;
        object-fit: contain;
        margin-right: 0.5em;
        transition: transform 0.25s cubic-bezier(.4,0,.2,1);
        will-change: transform;
    }
    .${containerClass}:hover .${iconClass} {
        transform: rotateY(180deg);
    }
    .${textClass} {
        display: block;
        font-size: 1.08em;
        font-weight: 500;
        color: inherit;
        text-decoration: none;
        white-space: nowrap;
        user-select: none;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
    }
    .${containerClass}:focus-visible {
        outline: 2px solid #ffb300;
        outline-offset: 2px;
    }
    @media (prefers-color-scheme: dark) {
        .${iconClass} {
            filter: invert(1) hue-rotate(180deg) !important;
        }
        .${containerClass} {
            ${bg_dark ? `background: ${bg_dark} !important;` : ''}
            ${text_color_dark ? `color: ${text_color_dark} !important;` : ''}
        }
        .${textClass} {
            ${text_color_dark ? `color: ${text_color_dark} !important;` : ''}
        }
        .${containerClass}:hover .${textClass} {
            ${text_color_hover_dark ? `color: ${text_color_hover_dark} !important;` : ''}
        }
    }
    @media (prefers-color-scheme: light) {
        .${containerClass} {
            ${bg_light ? `background: ${bg_light} !important;` : ''}
            ${text_color_light ? `color: ${text_color_light} !important;` : ''}
        }
        .${textClass} {
            ${text_color_light ? `color: ${text_color_light} !important;` : ''}
        }
        .${containerClass}:hover .${textClass} {
            ${text_color_hover_light ? `color: ${text_color_hover_light} !important;` : ''}
        }
    }
    `;

    // Responsividade desktop/mobile (breakpoint 1000px)
    if (width_desktop || height_desktop) {
        style += `
        .${containerClass} {
            ${width_desktop ? `width: ${width_desktop} !important;` : ''}
            ${height_desktop ? `height: ${height_desktop} !important;` : ''}
        }
        `;
    }
    if (width_mobile || height_mobile) {
        style += `
        @media (max-width: 1000px) {
            .${containerClass} {
                ${width_mobile ? `width: ${width_mobile} !important;` : ''}
                ${height_mobile ? `height: ${height_mobile} !important;` : ''}
            }
            .${contentClass} {
                width: 98%;
                gap: 0.5em;
            }
            .${iconClass} {
                width: 2em;
                height: 2em;
                min-width: 2em;
                min-height: 2em;
            }
            .${textClass} {
                font-size: 1em;
            }
        }
        `;
    } else {
        // Se não passar width_mobile nem height_mobile, mantém padrão antigo só mudando o breakpoint
        style += `
        @media (max-width: 1000px) {
            .${contentClass} {
                width: 98%;
                gap: 0.5em;
            }
            .${iconClass} {
                width: 2em;
                height: 2em;
                min-width: 2em;
                min-height: 2em;
            }
            .${textClass} {
                font-size: 1em;
            }
        }
        `;
    }

    // Tamanhos customizados do ícone (desktop)
    if (iconSize) {
        style += `
        .${iconClass} {
            width: ${iconSize} !important;
            height: ${iconSize} !important;
        }
        `;
    }
    // Tamanhos customizados do ícone (mobile)
    if (iconSizeMobile) {
        style += `
        @media (max-width: 1000px) {
            .${iconClass} {
                width: ${iconSizeMobile} !important;
                height: ${iconSizeMobile} !important;
            }
        }
        `;
    }

    style += `</style>`;
    $('head').append(style);

    // Cria elementos
    const $container = $('<div>', {
        class: `${containerClass} option-btn-img-container${bottom ? ' option-btn-img-container-bottom' : ''}`,
        tabindex: 0,
        style: customStyle
    });

    // Handler de click
    if (onClick) {
        // Suporta função ou string
        if (typeof onClick === 'function') {
            $container.on('click', onClick);
            $container.on('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick(e);
                    e.preventDefault();
                }
            });
        } else if (typeof onClick === 'string') {
            $container.attr('onclick', onClick);
            $container.on('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    // Executa string como código JS
                    // eslint-disable-next-line no-eval
                    eval(onClick);
                    e.preventDefault();
                }
            });
        }
    }

    const $content = $('<div>', { class: `${contentClass} option-btn-img-content` });
    if (icon) {
        $content.append(
            $('<img>', {
                src: icon,
                alt: '',
                class: `${iconClass} option-btn-img-icon`,
                draggable: false
            })
        );
    }
    $content.append(
        $('<span>', {
            class: `${textClass} option-btn-img-text`,
            text: text
        })
    );
    $container.append($content);

    return $container;
}

/*
Parâmetros esperados:
option_btn_img({
    option_btn_img_icon: 'CAMINHO/DO/ICONE',
    option_btn_img_text: 'Texto do link',
    option_btn_img_onclick: function|string (opcional),
    option_btn_img_bottom: true/false (opcional, default: false),
    option_btn_img_icon_size: '2.5em' (opcional, desktop),
    option_btn_img_icon_size_mobile: '2em' (opcional, mobile),
    width_desktop: '300px' (opcional),
    width_mobile: '95vw' (opcional),
    height_desktop: '60px' (opcional),
    height_mobile: '48px' (opcional),
    bg_light: '#fff' (opcional),
    bg_dark: '#222' (opcional),
    color_light: '#222' (opcional),
    color_dark: '#fff' (opcional),
    style: 'background: #f0f0f0; border-radius: 10px; color: red;' (opcional, sobrescreve estilos do container)
})
*/