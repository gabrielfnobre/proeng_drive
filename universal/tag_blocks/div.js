/**
 * Cria uma div totalmente neutra, permitindo configurar tudo via atributo style, definir id opcional, inserir qualquer conteúdo (string, HTMLElement, jQuery, array)
 * e inserir a div em um container de sua escolha via cnt_created.
 * 
 * @param {string} cnt_created - id do container onde a div será inserida (opcional, se não passar, retorna apenas a div)
 * @param {object} options - opções para a div:
 *      - content: string|HTMLElement|jQuery|Array - conteúdo(s) a ser(em) inserido(s) dentro da div
 *      - style: string (opcional) - string de CSS inline para customizar a div
 *      - id: string (opcional) - id a ser atribuído à div
 *      - on_click: function|string (opcional) - função ou string de função a ser executada no click
 *      - width_desktop: string (opcional) - largura da div no desktop (ex: '50%', '300px', etc)
 *      - width_mobile: string (opcional) - largura da div no mobile (ex: '90%', '100vw', etc)
 *      - height_desktop: string (opcional) - altura da div no desktop (ex: '40px', 'auto', etc)
 *      - height_mobile: string (opcional) - altura da div no mobile (ex: '60px', 'auto', etc)
 *      - flex_desktop: string (opcional) - 'row' ou 'column' para flex-direction no desktop (default: 'column')
 *      - flex_mobile: string (opcional) - 'row' ou 'column' para flex-direction no mobile (default: 'column')
 *      - align_desktop: string (opcional) - valor de align-items no desktop
 *      - align_mobile: string (opcional) - valor de align-items no mobile
 *      - justify_desktop: string (opcional) - valor de justify-content no desktop
 *      - justify_mobile: string (opcional) - valor de justify-content no mobile
 *      - bg_light: string (opcional) - cor de fundo para modo light
 *      - bg_dark: string (opcional) - cor de fundo para modo dark
 *      - color_light: string (opcional) - cor do texto para modo light
 *      - color_dark: string (opcional) - cor do texto para modo dark
 *      - qualquer outro atributo HTML pode ser passado (ex: class, data-*, etc)
 * @returns {jQuery} - elemento jQuery da div criada
 */
export default function neutral_div(cnt_created = null, options = {}) {
    // Extrai parâmetros principais e responsivos
    const {
        content = '',
        style = '',
        id = null,
        on_click = null,
        width_desktop,
        width_mobile,
        height_desktop,
        height_mobile,
        flex_desktop = 'column',
        flex_mobile = 'column',
        align_desktop,
        align_mobile,
        justify_desktop,
        justify_mobile,
        bg_light,
        bg_dark,
        color_light,
        color_dark,
        ...otherAttrs
    } = options;

    // Gera um identificador único para esta instância para garantir isolamento de estilos
    const uniqueId = 'neutral-div-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
    const uniqueClass = `neutral-div-custom-${uniqueId}`;

    const $div = $(`<div class="${uniqueClass}"></div>`);

    // Aplica id se fornecido
    if (id && typeof id === 'string') {
        $div.attr('id', id);
    }

    // Aplica style se fornecido
    if (style && typeof style === 'string') {
        $div.attr('style', style);
    }

    // Aplica outros atributos HTML (exceto os já tratados)
    for (const key in otherAttrs) {
        if (
            Object.prototype.hasOwnProperty.call(otherAttrs, key) &&
            key !== 'width_desktop' &&
            key !== 'width_mobile' &&
            key !== 'height_desktop' &&
            key !== 'height_mobile' &&
            key !== 'flex_desktop' &&
            key !== 'flex_mobile' &&
            key !== 'align_desktop' &&
            key !== 'align_mobile' &&
            key !== 'justify_desktop' &&
            key !== 'justify_mobile' &&
            key !== 'bg_light' &&
            key !== 'bg_dark' &&
            key !== 'color_light' &&
            key !== 'color_dark'
        ) {
            $div.attr(key, otherAttrs[key]);
        }
    }

    // Monta CSS customizado para width/height responsivos, flex, alinhamentos e tema, exclusivo para esta instância
    let customCSS = '';

    // Função para verificar se o style inline sobrescreve display
    function styleHasDisplay(styleStr) {
        if (!styleStr) return false;
        return /(^|;)\s*display\s*:/i.test(styleStr);
    }
    const hasDisplayInline = styleHasDisplay(style);

    // Desktop (default)
    customCSS += `.${uniqueClass} {`;
    // display/flex-direction/align/justify só se NÃO houver display no style inline
    if (!hasDisplayInline) {
        customCSS += `display: flex !important;`;
        customCSS += `flex-direction: ${flex_desktop || 'column'} !important;`;
        if (align_desktop) customCSS += `align-items: ${align_desktop} !important;`;
        if (justify_desktop) customCSS += `justify-content: ${justify_desktop} !important;`;
    }
    if (width_desktop) customCSS += `width: ${width_desktop} !important;`;
    if (height_desktop) customCSS += `height: ${height_desktop} !important;`;
    customCSS += `}\n`;

    // Mobile (max-width: 1000px)
    customCSS += `@media (max-width: 1000px) { .${uniqueClass} {`;
    if (!hasDisplayInline) {
        customCSS += `flex-direction: ${flex_mobile || 'column'} !important;`;
        if (align_mobile) customCSS += `align-items: ${align_mobile} !important;`;
        if (justify_mobile) customCSS += `justify-content: ${justify_mobile} !important;`;
    }
    if (width_mobile) customCSS += `width: ${width_mobile} !important;`;
    if (height_mobile) customCSS += `height: ${height_mobile} !important;`;
    customCSS += `} }\n`;

    // Tema: bg_light, bg_dark, color_light, color_dark
    // Defaults
    const defaultBgLight = "#fff";
    const defaultBgDark = "#18191a";
    const defaultColorLight = "#18191a";
    const defaultColorDark = "#fff";

    // Se algum parâmetro de tema foi passado, monta CSS para modo light/dark
    if (bg_light || bg_dark || color_light || color_dark) {
        // Light mode
        customCSS += `@media (prefers-color-scheme: light) { .${uniqueClass} {`;
        if (bg_light) {
            customCSS += `background: ${bg_light} !important;`;
        } else {
            customCSS += `background: ${defaultBgLight} !important;`;
        }
        if (color_light) {
            customCSS += `color: ${color_light} !important;`;
        } else {
            customCSS += `color: ${defaultColorLight} !important;`;
        }
        customCSS += `} }\n`;

        // Dark mode
        customCSS += `@media (prefers-color-scheme: dark) { .${uniqueClass} {`;
        if (bg_dark) {
            customCSS += `background: ${bg_dark} !important;`;
        } else {
            customCSS += `background: ${defaultBgDark} !important;`;
        }
        if (color_dark) {
            customCSS += `color: ${color_dark} !important;`;
        } else {
            customCSS += `color: ${defaultColorDark} !important;`;
        }
        customCSS += `} }\n`;
    }

    // Se algum CSS customizado foi gerado, injeta no <head> (garante isolamento)
    if (customCSS) {
        const styleTag = `<style id="style-${uniqueId}">\n${customCSS}</style>`;
        $('head').append(styleTag);
    }

    // Adiciona o evento de click e efeito de scale se fornecido
    if (on_click) {
        // Adiciona efeito de scale(1.025) ao passar o mouse/touch e remove ao sair
        $div.css('transition', ($div.css('transition') ? $div.css('transition') + ', ' : '') + 'transform 0.12s cubic-bezier(.4,0,.2,1)');
        $div.css('cursor', 'pointer');

        $div.on('mouseenter touchstart', function() {
            $(this).css('transform', 'scale(1.025)');
        });
        $div.on('mouseleave touchend touchcancel', function() {
            $(this).css('transform', '');
        });

        if (typeof on_click === 'function') {
            $div.on('click', function(e) {
                on_click.call(this, e);
            });
        } else if (typeof on_click === 'string') {
            $div.on('click', function(e) {
                // eslint-disable-next-line no-new-func
                (new Function('event', on_click)).call(this, e);
            });
        }
    }

    // Adiciona o conteúdo
    if (Array.isArray(content)) {
        content.forEach(item => {
            if (typeof item === 'string' || item instanceof HTMLElement || item instanceof jQuery) {
                $div.append(item);
            }
        });
    } else if (typeof content === 'string' || content instanceof HTMLElement || content instanceof jQuery) {
        $div.append(content);
    }

    // Se cnt_created for passado, insere a div no container correspondente
    if (cnt_created && typeof cnt_created === 'string' && $(`#${cnt_created}`).length > 0) {
        $(`#${cnt_created}`).append($div);
    }

    return $div;
}