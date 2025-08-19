/**
 * spacer.js
 * 
 * Retorna um elemento jQuery de espaçador flexível universal, pronto para ser inserido em qualquer container (flex ou grid).
 * 
 * Parâmetros esperados (objeto options):
 *   - flex (string|number, opcional): valor para a propriedade flex (ex: '1 1 0', 1, '2 2 0', etc). Padrão: '1 1 0'.
 *   - class_name (string, opcional): classes extras para adicionar ao elemento.
 *   - style (string, opcional): string com atributos CSS adicionais (ex: "margin-left: 10px; background: red;").
 *   - width_desktop (string, opcional): largura do componente no desktop (ex: '50px', '10vw', etc)
 *   - width_mobile (string, opcional): largura do componente no mobile (ex: '100vw', '90%', etc)
 *   - height_desktop (string, opcional): altura do componente no desktop (ex: '20px', 'auto', etc)
 *   - height_mobile (string, opcional): altura do componente no mobile (ex: '40px', 'auto', etc)
 * 
 * Exemplo de uso:
 * import spacer from './spacer.js';
 * $('#algum_container').append([
 *   $('<div>').text('A'),
 *   spacer({ width_desktop: '50px', width_mobile: '100vw' }),
 *   $('<div>').text('B')
 * ]);
 */

export default function spacer(options = {}) {
    // Gera um identificador único para esta instância
    const uniqueId = 'spacer-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
    const spacerClass = `of-spacer-${uniqueId}`;

    // Parâmetros principais
    const {
        flex = '1 1 0',
        class_name = '',
        style = '',
        width_desktop,
        width_mobile,
        height_desktop,
        height_mobile
    } = options;

    // Monta CSS exclusivo para esta instância (garante isolamento)
    let customCSS = `
        <style id="style-${spacerClass}">
        .${spacerClass} {
            display: flex;
            flex: ${flex};
            min-width: 0;
            min-height: 0;
            height: auto;
            width: auto;
            background: none;
            border: none;
            margin: 0;
            padding: 0;
            pointer-events: none;
            user-select: none;
            ${width_desktop ? `width: ${width_desktop} !important;` : ''}
            ${height_desktop ? `height: ${height_desktop} !important;` : ''}
        }
        ${width_mobile || height_mobile ? `
        @media (max-width: 1000px) {
            .${spacerClass} {
                ${width_mobile ? `width: ${width_mobile} !important;` : ''}
                ${height_mobile ? `height: ${height_mobile} !important;` : ''}
            }
        }
        ` : ''}
        </style>
    `;
    $('head').append(customCSS);

    // Cria o elemento spacer com classes únicas
    const $spacer = $('<div>', {
        class: `of-spacer ${spacerClass}${class_name ? ' ' + class_name : ''}`,
        'aria-hidden': 'true'
    });

    // Aplica o style string, se fornecido
    if (typeof style === 'string' && style.trim() !== '') {
        // Se já existe algum style inline, concatena
        const prevStyle = $spacer.attr('style') || '';
        $spacer.attr('style', prevStyle + (prevStyle && style ? ';' : '') + style);
    }

    return $spacer;
}