/**
 * overlay_modal.js
 * 
 * Exibe um modal de overlay centralizado sobre a tela.
 * 
 * @param {object} options
 *   - fade_in: boolean (opcional) - se true, aplica fadeIn nos elementos jQuery filhos do modal; se false, exibe imediatamente.
 *   - style: string (opcional) - string de atributos CSS para customizar o overlay principal
 *   - width_desktop: string (opcional) - largura do modal no desktop (ex: '80vw', '600px', etc)
 *   - width_mobile: string (opcional) - largura do modal no mobile (ex: '98vw', '100vw', etc)
 *   - height_desktop: string (opcional) - altura do modal no desktop (ex: '80vh', '600px', etc)
 *   - height_mobile: string (opcional) - altura do modal no mobile (ex: '98vh', '100vh', etc)
 *   - bg_light: string (opcional) - cor de fundo para modo light
 *   - bg_dark: string (opcional) - cor de fundo para modo dark
 *   - color_light: string (opcional) - cor do texto para modo light
 *   - color_dark: string (opcional) - cor do texto para modo dark
 * 
 * @returns {jQuery} - o elemento modal inserido (jQuery)
 * 
 * O modal é sempre inserido diretamente no <body> e recebe SEMPRE o id "of-overlay-modal".
 * Qualquer elemento referenciado por esse id será renderizado por cima do overlay, sem quebrar a página de fundo.
 */

export default function overlay_modal(options = {}) {
    // Parâmetros principais
    const styleString = typeof options.style === 'string' ? options.style : '';
    const fadeIn = options.fade_in === true;
    const width_desktop = options.width_desktop;
    const width_mobile = options.width_mobile;
    const height_desktop = options.height_desktop;
    const height_mobile = options.height_mobile;
    const bg_light = options.bg_light;
    const bg_dark = options.bg_dark;
    const color_light = options.color_light;
    const color_dark = options.color_dark;

    // Id e classe fixos para o overlay modal
    const modalId = "of-overlay-modal";
    const modalClass = "of-overlay-modal-container";

    // Remove qualquer overlay anterior para evitar duplicidade
    $(`#${modalId}`).remove();
    $(`style[id^="style-${modalId}"]`).remove();

    // Monta CSS exclusivo para esta instância
    let customCSS = `
        <style id="style-${modalId}">
        #${modalId} {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            width: 100vw; height: 100vh;
            background: rgba(0,0,0,.55);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            z-index: 99999;
            ${bg_light && !bg_dark ? `background: ${bg_light} !important;` : ''}
            ${bg_dark && !bg_light ? `background: ${bg_dark} !important;` : ''}
            ${color_light && !color_dark ? `color: ${color_light} !important;` : ''}
            ${color_dark && !color_light ? `color: ${color_dark} !important;` : ''}
            ${width_desktop ? `width: ${width_desktop} !important;` : ''}
            ${height_desktop ? `height: ${height_desktop} !important;` : ''}
        }
        @media (max-width: 1000px) {
            #${modalId} {
                ${width_mobile ? `width: ${width_mobile} !important;` : ''}
                ${height_mobile ? `height: ${height_mobile} !important;` : ''}
            }
        }
        @media (prefers-color-scheme: dark) {
            #${modalId} {
                ${bg_dark ? `background: ${bg_dark} !important;` : ''}
                ${color_dark ? `color: ${color_dark} !important;` : ''}
            }
        }
        @media (prefers-color-scheme: light) {
            #${modalId} {
                ${bg_light ? `background: ${bg_light} !important;` : ''}
                ${color_light ? `color: ${color_light} !important;` : ''}
            }
        }
        </style>
    `;
    $('head').append(customCSS);

    // Cria o elemento modal com id fixo
    const $modal = $(`<div id="${modalId}" class="${modalClass}"></div>`);

    // Aplica o estilo customizado se fornecido
    if (styleString) {
        // Se já existe algum style inline, concatena
        const prevStyle = $modal.attr('style') || '';
        $modal.attr('style', prevStyle + (prevStyle && styleString ? ';' : '') + styleString);
    }

    // Insere o modal diretamente no body
    $('body').append($modal);

    // Se fade_in, observa a adição de filhos e faz fadeIn neles
    if (fadeIn) {
        // MutationObserver para detectar filhos adicionados
        const observer = new MutationObserver(function(mutationsList) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    $(mutation.addedNodes).each(function() {
                        // Só faz fadeIn se for elemento jQuery (nodeType 1)
                        if (this.nodeType === 1) {
                            // Esconde imediatamente e faz fadeIn
                            $(this).css('display', 'none').fadeIn(800);
                        }
                    });
                }
            }
        });
        observer.observe($modal[0], { childList: true });
    }

    // Retorna o elemento inserido
    return $modal;
}

/*
Exemplo de uso:
import overlay_modal from './overlay_modal.js';

const $modal = overlay_modal({
    fade_in: true,
    style: "align-items: flex-start;",
    width_desktop: "600px",
    width_mobile: "98vw",
    height_desktop: "400px",
    height_mobile: "80vh",
    bg_light: "#fff",
    bg_dark: "#222",
    color_light: "#222",
    color_dark: "#fff"
});

// Depois, adicione elementos jQuery normalmente:
$modal.append($('<div>').text('Conteúdo do modal'));
$modal.append($('<button>').text('Fechar'));

// Os elementos filhos do modal (inseridos depois) aparecerão com fadeIn se fade_in for true.
*/