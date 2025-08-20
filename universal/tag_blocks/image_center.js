/**
 * Cria e retorna um elemento jQuery de imagem centralizada customizável, para ser usado como conteúdo em box_container.
 * 
 * @param {object} options - parâmetros da imagem e CSS:
 *      - image_path: string - caminho da imagem (default: 'universal/images/logo_one_flow_com_proeng.png')
 *      - is_circle: bool - true para border-radius 50%, false para normal (default: false)
 *      - is_dark: bool - se true, aplica filter: invert(1) na imagem apenas no modo dark (default: false)
 *      - image_size_desktop: string - ex: '15vw', '120px' (opcional, default: '15vw')
 *      - image_size_mobile: string - ex: '50vw', '80px' (opcional, default: '50vw')
 *      - width_desktop: string - largura do componente no desktop (ex: '15vw', '120px', etc)
 *      - width_mobile: string - largura do componente no mobile (ex: '50vw', '80px', etc)
 *      - height_desktop: string - altura do componente no desktop (ex: '15vw', '120px', etc)
 *      - height_mobile: string - altura do componente no mobile (ex: '50vw', '80px', etc)
 *      - bg_light: string - cor de fundo para modo light (opcional)
 *      - bg_dark: string - cor de fundo para modo dark (opcional)
 *      - color_light: string - cor do texto para modo light (opcional)
 *      - color_dark: string - cor do texto para modo dark (opcional)
 *      - on_click: function|string|null - função JS a ser executada no clique OU string de código JS OU url (default: null)
 *      - style: string (opcional) - string de CSS inline para customizar o elemento principal (sobrescreve qualquer outro)
 *      - size_percent: number (opcional) - percentual do tamanho da imagem em relação ao container (ex: 80 para 80%, default: 100)
 *      - qualquer outro parâmetro CSS pode ser passado com o mesmo nome do atributo em CSS (ex: background, border, box-shadow, etc)
 * 
 * @returns {jQuery} - elemento jQuery pronto para ser inserido em outro container
 * @copia_rapida_de_parametros
    {image_path: 'universal/images/logo_one_flow_comum.png', is_circle: '', is_dark: false, image_size_desktop: '15vw', image_size_mobile: '50vw', width_desktop: '15vw', width_mobile: '50vw', height_desktop: '15vw', height_mobile: '50vw', on_click: 'https//jw.org ou () => function()', style: 'border: 2px solid red;', size_percent: 80}
 */
export default function image_center(options = {}) {
    // Parâmetros principais
    const image_path = options.image_path !== undefined ? options.image_path : 'universal/images/logo_one_flow_com_proeng.png';
    const is_circle = options.is_circle !== undefined ? options.is_circle : false;
    const is_dark = options.is_dark !== undefined ? options.is_dark : false;
    const image_size_desktop = options.image_size_desktop !== undefined && options.image_size_desktop !== null ? options.image_size_desktop : '15vw';
    const image_size_mobile = options.image_size_mobile !== undefined && options.image_size_mobile !== null ? options.image_size_mobile : '50vw';
    const width_desktop = options.width_desktop;
    const width_mobile = options.width_mobile;
    const height_desktop = options.height_desktop;
    const height_mobile = options.height_mobile;
    const bg_light = options.bg_light;
    const bg_dark = options.bg_dark;
    const color_light = options.color_light;
    const color_dark = options.color_dark;
    const on_click = options.on_click !== undefined ? options.on_click : null;
    const styleString = options.style !== undefined ? options.style : '';
    const size_percent = options.size_percent !== undefined && options.size_percent !== null ? options.size_percent : 100;

    // Gera um identificador único para esta instância
    const uniqueId = 'image-center-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
    const containerClass = `image-center-container-${uniqueId}`;
    const imageClass = `image-center-bg-${uniqueId}`;
    const imageInnerClass = `image-center-inner-${uniqueId}`;

    // Extrai atributos CSS extras (além dos já tratados)
    const cssAttrs = {};
    for (const key in options) {
        if (
            key !== 'image_path' &&
            key !== 'is_circle' &&
            key !== 'is_dark' &&
            key !== 'image_size_desktop' &&
            key !== 'image_size_mobile' &&
            key !== 'width_desktop' &&
            key !== 'width_mobile' &&
            key !== 'height_desktop' &&
            key !== 'height_mobile' &&
            key !== 'bg_light' &&
            key !== 'bg_dark' &&
            key !== 'color_light' &&
            key !== 'color_dark' &&
            key !== 'on_click' &&
            key !== 'style' &&
            key !== 'size_percent'
        ) {
            cssAttrs[key] = options[key];
        }
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

    // Cores padrão
    function getDefaultBgColor(isDark) {
        return isDark ? '#18191a' : '#fff';
    }
    function getDefaultTextColor(isDark) {
        return isDark ? '#fff' : '#18191a';
    }

    // Resolve cores para background e texto
    let resolvedBg, resolvedColor;
    if (isDarkMode()) {
        resolvedBg = bg_dark !== undefined ? bg_dark : getDefaultBgColor(true);
        resolvedColor = color_dark !== undefined ? color_dark : getDefaultTextColor(true);
    } else {
        resolvedBg = bg_light !== undefined ? bg_light : getDefaultBgColor(false);
        resolvedColor = color_light !== undefined ? color_light : getDefaultTextColor(false);
    }

    // Monta CSS exclusivo para esta instância
    let customResponsiveCSS = '';

    // --- Container (componente) largura/altura ---
    // Desktop
    if (width_desktop || height_desktop) {
        customResponsiveCSS += `
            .${containerClass} {
                ${width_desktop ? `width: ${width_desktop} !important;` : ''}
                ${height_desktop ? `height: ${height_desktop} !important;` : ''}
            }
        `;
    }
    // Mobile
    if (width_mobile || height_mobile) {
        customResponsiveCSS += `
            @media (max-width: 1000px) {
                .${containerClass} {
                    ${width_mobile ? `width: ${width_mobile} !important;` : ''}
                    ${height_mobile ? `height: ${height_mobile} !important;` : ''}
                }
            }
        `;
    }

    // --- Imagem (tamanho da imagem) ---
    // Desktop
    customResponsiveCSS += `
        .${imageClass} {
            width: ${image_size_desktop};
            height: ${image_size_desktop};
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .${imageInnerClass} {
            width: ${size_percent}%;
            height: ${size_percent}%;
        }
    `;
    // Mobile
    customResponsiveCSS += `
        @media (max-width: 1000px) {
            .${imageClass} {
                width: ${image_size_mobile} !important;
                height: ${image_size_mobile} !important;
            }
            .${imageInnerClass} {
                width: ${size_percent}%;
                height: ${size_percent}%;
            }
        }
    `;

    // CSS para modo light/dark
    let customModeCSS = '';
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
    if (color_light || color_dark) {
        customModeCSS += `
            @media (prefers-color-scheme: light) {
                .${imageClass} {
                    color: ${color_light ? color_light : getDefaultTextColor(false)} !important;
                }
            }
            @media (prefers-color-scheme: dark) {
                .${imageClass} {
                    color: ${color_dark ? color_dark : getDefaultTextColor(true)} !important;
                }
            }
        `;
    }

    // CSS para filter invert se is_dark for true
    let customDarkImageCSS = '';
    if (is_dark) {
        customDarkImageCSS += `
            @media (prefers-color-scheme: dark) {
                .${imageInnerClass} {
                    filter: invert(1) !important;
                }
            }
        `;
    }

    // Garante que o CSS é exclusivo para esta instância
    const styleTag = `
        <style id="style-${uniqueId}">
        .${containerClass} {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: ${bg_light && !bg_dark ? bg_light : (bg_dark && !bg_light ? bg_dark : resolvedBg)};
        }
        .${imageClass} {
            background: none !important;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            transition: border-radius 0.2s, transform 0.18s cubic-bezier(.4,1.3,.5,1.01);
            cursor: pointer;
            color: ${color_light || color_dark ? (color_light ? color_light : color_dark) : resolvedColor};
        }
        .${imageClass}.image-center-hoverable:hover {
            transform: scale(1.025);
        }
        .${imageInnerClass} {
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            display: block;
            margin: 0;
            transition: border-radius 0.2s;
        }
        ${customResponsiveCSS}
        ${customModeCSS}
        ${customDarkImageCSS}
        </style>
    `;
    $('head').append(styleTag);

    // Cria o elemento jQuery
    const $container = $(`<div class="${containerClass}"></div>`);
    const $imageDiv = $(`<div class="${imageClass}"></div>`);
    const $imageInnerDiv = $(`<div class="${imageInnerClass}"></div>`);

    // Aplica estilos padrão na inner (imagem)
    $imageInnerDiv.css({
        'background-image': `url('${image_path}')`,
        'border-radius': is_circle ? '50%' : '0'
    });

    // Aplica atributos CSS extras (ex: background, border, box-shadow, etc) na inner
    if (Object.keys(cssAttrs).length > 0) {
        $imageInnerDiv.css(cssAttrs);
    }

    // Aplica estilo inline se fornecido (sobrescreve outros) na inner
    if (styleString && typeof styleString === 'string') {
        $imageInnerDiv.attr('style', ($imageInnerDiv.attr('style') || '') + ';' + styleString);
    }

    // Se não for para ser clicável, remove o cursor pointer
    let isClickable = false;
    if (
        typeof on_click === 'function' ||
        (typeof on_click === 'string' && on_click.trim() !== '')
    ) {
        isClickable = true;
        $imageDiv.addClass('image-center-hoverable');
    } else {
        $imageDiv.css('cursor', 'default');
    }

    // Define comportamento do clique
    if (typeof on_click === 'function') {
        $imageDiv.on('click', on_click);
    } else if (typeof on_click === 'string' && on_click.trim() !== '') {
        // Se for string, verifica se é uma URL (começa com http:// ou https://)
        if (/^https?:\/\//i.test(on_click.trim())) {
            $imageDiv.on('click', function(e) {
                window.open(on_click.trim(), '_blank', 'noopener,noreferrer');
            });
        } else {
            // Se não for URL, assume que é código JS a ser executado
            $imageDiv.on('click', function(e) {
                // eslint-disable-next-line no-eval
                eval(on_click);
            });
        }
    }

    $imageDiv.append($imageInnerDiv);
    $container.append($imageDiv);

    return $container;
}

/*
Exemplo de uso:
import imageCenter from './image_center.js';

const $img = imageCenter({
    image_path: '/caminho/da/imagem.jpg',
    is_circle: true,
    is_dark: true,
    image_size_desktop: '12vw',
    image_size_mobile: '40vw',
    width_desktop: '12vw',
    width_mobile: '40vw',
    height_desktop: '12vw',
    height_mobile: '40vw',
    on_click: function() { alert('Clicou na imagem!'); },
    style: 'border: 2px solid red; box-shadow: 0 0 10px #000;',
    'background': '#fff',
    bg_light: '#fff',
    bg_dark: '#222',
    color_light: '#222',
    color_dark: '#fff',
    size_percent: 80
});
// ou
const $img2 = imageCenter({
    image_path: '/caminho/da/imagem2.jpg',
    is_circle: false,
    is_dark: false,
    on_click: "console.log('Imagem clicada via string!')",
    style: 'border-radius: 10px;',
    width_desktop: '120px',
    width_mobile: '80vw',
    size_percent: 60
});
// ou
const $img3 = imageCenter({
    image_path: '/caminho/da/imagem3.jpg',
    is_dark: true,
    on_click: "https://www.google.com",
    size_percent: 100
});

$('#algum-container').append($img);
*/