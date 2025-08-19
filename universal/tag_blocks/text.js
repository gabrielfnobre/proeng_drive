/**
 * text.js
 * 
 * Retorna um elemento jQuery de texto customizável, pronto para ser inserido em qualquer container.
 * 
 * Parâmetros esperados (objeto options):
 *   - text_content: string - texto a ser exibido (default: 'Texto de exemplo')
 *   - color: string - cor do texto (ex: '#222', 'red', 'linear-gradient(...)', etc). Se não informado, segue padrão do sistema.
 *   - on_click: function (opcional) - função a ser executada ao clicar no texto/container
 *   - style: string (opcional) - string de atributos CSS para customizar o container principal
 *   - width_desktop: string - largura do componente no desktop (ex: '85%', '400px', etc) (opcional)
 *   - width_mobile: string - largura do componente no mobile (ex: '95vw', '100vw', etc) (opcional)
 *   - height_desktop: string - altura do componente no desktop (ex: 'auto', '60px', etc) (opcional)
 *   - height_mobile: string - altura do componente no mobile (ex: 'auto', '80px', etc) (opcional)
 *   - bg_light: string - cor de fundo para modo light (opcional)
 *   - bg_dark: string - cor de fundo para modo dark (opcional)
 *   - color_light: string - cor do texto para modo light (opcional)
 *   - color_dark: string - cor do texto para modo dark (opcional)
 *   - qualquer outro parâmetro CSS pode ser passado com o mesmo nome do atributo em CSS (ex: background, border, font-size, etc)
 * 
 * Exemplo de uso:
 * import text from './text.js';
 * $('#algum_container').append(text({
 *   text_content: 'Seu texto aqui',
 *   color: '#007ff1',
 *   on_click: () => alert('clicou!'),
 *   style: 'font-size: 1.2em;',
 *   width_desktop: '400px',
 *   width_mobile: '95vw',
 *   bg_light: '#fff',
 *   bg_dark: '#222',
 *   color_light: '#222',
 *   color_dark: '#fff'
 * }));
 */

export default function text(options = {}) {
    // Parâmetros principais
    const text_content = options.text_content !== undefined ? options.text_content : 'Texto de exemplo';
    const color = options.color || options.text_color || '';
    const on_click = typeof options.on_click === 'function' ? options.on_click : null;
    const styleString = typeof options.style === 'string' ? options.style : '';

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
    const uniqueId = 'text-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
    const containerClass = `generic-text-container-${uniqueId}`;
    const contentClass = `generic-text-content-${uniqueId}`;

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
    const text_color_light = color_light !== undefined ? color_light : (color ? color : '#222');
    const text_color_dark = color_dark !== undefined ? color_dark : (color ? color : '#cdcdcd');
    const text_color_hover_light = darkenColor(text_color_light, 0.82);
    const text_color_hover_dark = darkenColor(text_color_dark, 0.82);

    // Monta CSS exclusivo para esta instância
    let customCSS = `
        <style id="style-${uniqueId}">
        .${containerClass} {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            ${bg_light && !bg_dark ? `background: ${bg_light};` : ''}
            ${bg_dark && !bg_light ? `background: ${bg_dark};` : ''}
        }
        .${contentClass} {
            width: 85%;
            text-align: center;
            font-size: 1em;
            font-weight: 500;
            word-break: break-word;
            overflow-wrap: anywhere;
            margin-top: 12px;
            margin-bottom: 12px;
            ${width_desktop ? `width: ${width_desktop} !important;` : ''}
            ${height_desktop ? `height: ${height_desktop} !important;` : ''}
            ${color && !color_light && !color_dark ? `color: ${color} !important;` : ''}
        }
        @media (max-width: 1000px) {
            .${contentClass} {
                ${width_mobile ? `width: ${width_mobile} !important;` : 'width: 90%;'}
                ${height_mobile ? `height: ${height_mobile} !important;` : ''}
                font-size: 1em;
                margin-top: 16px;
                margin-bottom: 16px;
            }
        }
        @media (prefers-color-scheme: light) {
            .${containerClass} {
                ${bg_light ? `background: ${bg_light} !important;` : ''}
            }
            .${contentClass} {
                color: ${text_color_light} !important;
            }
            .${contentClass}.of-text-clickable:hover,
            .${contentClass}.of-text-clickable:focus-visible {
                color: ${text_color_hover_light} !important;
            }
        }
        @media (prefers-color-scheme: dark) {
            .${containerClass} {
                ${bg_dark ? `background: ${bg_dark} !important;` : ''}
            }
            .${contentClass} {
                color: ${text_color_dark} !important;
            }
            .${contentClass}.of-text-clickable:hover,
            .${contentClass}.of-text-clickable:focus-visible {
                color: ${text_color_hover_dark} !important;
            }
        }
        /* Hover scale para texto clicável */
        .${containerClass}.of-text-clickable:hover {
            transform: scale(1.025);
        }
        .${containerClass}.of-text-clickable {
            transition: transform 0.18s cubic-bezier(.4,0,.2,1);
        }
        </style>
    `;
    $('head').append(customCSS);

    // Cria elementos
    const $container = $('<div>', { class: containerClass });
    const $content = $('<div>', { class: contentClass, html: text_content });

    // Aplica cor customizada se fornecida (apenas se não for usar color_light/color_dark)
    if (color && typeof color === 'string' && color.trim() !== '' && !color_light && !color_dark) {
        $content.css('color', color);
    }

    // Aplica outros parâmetros CSS passados diretamente (exceto os já tratados)
    Object.keys(options).forEach(key => {
        if (
            [
                'text_content', 'color', 'text_color', 'on_click', 'style',
                'width_desktop', 'width_mobile', 'height_desktop', 'height_mobile',
                'bg_light', 'bg_dark', 'color_light', 'color_dark'
            ].indexOf(key) === -1
        ) {
            // Só aplica se for um atributo CSS válido (simples, não valida profundamente)
            $content.css(key, options[key]);
        }
    });

    // Aplica o style inline customizado, se fornecido
    if (styleString) {
        // Se já existe algum style inline, concatena
        const prevStyle = $content.attr('style') || '';
        $content.attr('style', prevStyle + (prevStyle && styleString ? ';' : '') + styleString);
    }

    // Handler de click e hover scale
    if (on_click) {
        $container.css('cursor', 'pointer');
        $container.on('click', on_click);
        $container.attr('tabindex', 0);
        $container.attr('role', 'button');
        $container.addClass('of-text-clickable');
        $content.addClass('of-text-clickable');
        $container.on('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                on_click(e);
                e.preventDefault();
            }
        });
    }

    $container.append($content);

    return $container;
}

/*
Parâmetros esperados:
text({
    text_content: 'Texto a ser exibido',
    color: '#007ff1', // cor do texto (opcional)
    on_click: function, // função a ser executada ao clicar (opcional)
    style: 'font-size: 1.2em; background: #f0f0f0;', // customização extra (opcional)
    width_desktop: '400px', // largura no desktop (opcional)
    width_mobile: '95vw',   // largura no mobile (opcional)
    height_desktop: 'auto', // altura no desktop (opcional)
    height_mobile: 'auto',  // altura no mobile (opcional)
    bg_light: '#fff',       // cor de fundo modo light (opcional)
    bg_dark: '#222',        // cor de fundo modo dark (opcional)
    color_light: '#222',    // cor do texto modo light (opcional)
    color_dark: '#fff',     // cor do texto modo dark (opcional)
    // qualquer outro parâmetro CSS pode ser passado diretamente
})
*/