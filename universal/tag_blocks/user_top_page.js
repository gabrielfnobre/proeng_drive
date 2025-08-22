/**
 * user_top_page.js
 * 
 * Retorna um elemento jQuery de "topo de usuário" (foto, nome, profissão, status, badge de pendências), pronto para ser inserido em qualquer container.
 * 
 * Parâmetros esperados (objeto options):
 *   - user_photo: string - URL da foto do usuário (opcional, se não informado usa padrão)
 *   - user_name: string - nome do usuário
 *   - user_profession: string - profissão do usuário
 *   - user_pending_count: int - número de pendências (opcional, padrão 0)
 *   - user_status_text: string - texto do status ("Online", "Offline", etc.)
 *   - user_status_color: string - cor do texto do status (ex: '#2ecc40' para online, '#b0b0b0' para offline)
 *   - user_top_page_width: string|int - largura do container (ex: '480px', '100%', 320, etc; opcional, padrão '20vw')
 *   - width_desktop: string|int - largura do componente no desktop (ex: '480px', '100%', 320, etc; opcional)
 *   - width_mobile: string|int - largura do componente no mobile (ex: '90vw', '100vw', etc; opcional)
 *   - height_desktop: string|int - altura do componente no desktop (ex: '74px', 'auto', etc; opcional)
 *   - height_mobile: string|int - altura do componente no mobile (ex: '54px', 'auto', etc; opcional)
 *   - bg_light: string - cor de fundo para modo light (opcional)
 *   - bg_dark: string - cor de fundo para modo dark (opcional)
 *   - color_light: string - cor do texto para modo light (opcional)
 *   - color_dark: string - cor do texto para modo dark (opcional)
 *   - on_click: function|string - função JS a ser executada no clique do container (opcional, ex: ()=>alert('oi'), "minhaFuncao()", etc)
 *   - style: string - atributos CSS inline para customizar o container principal (opcional)
 * 
 * Exemplo de uso:
 * import user_top_page from './user_top_page.js';
 * $('#algum_container').append(user_top_page({
 *   user_photo: '/caminho/para/foto.jpg',
 *   user_name: 'João da Silva',
 *   user_profession: 'Desenvolvedor',
 *   user_pending_count: 3,
 *   user_status_text: 'Online',
 *   user_status_color: '#2ecc40',
 *   user_top_page_width: '350px',
 *   width_desktop: '400px',
 *   width_mobile: '95vw',
 *   height_desktop: '90px',
 *   height_mobile: '60px',
 *   bg_light: '#fff',
 *   bg_dark: '#232323',
 *   color_light: '#232323',
 *   color_dark: '#f1f1f1',
 *   on_click: () => alert('Clicou no topo do usuário!'),
 *   style: 'background: #f0f0f0; border: 1px solid #ccc;'
 * }));
 */

export default function user_top_page(options = {}) {
    // Defaults
    const user_photo = options.user_photo || '/one_flow/universal/images/avatar_generics.png';
    const user_name = options.user_name || 'User';
    const user_profession = options.user_profession || 'Profissão não informada';
    const user_pending_count = typeof options.user_pending_count === 'number' ? options.user_pending_count : 0;
    const user_status_text = options.user_status_text || 'Offline';
    const user_status_color = options.user_status_color || '#b0b0b0';

    // Novos parâmetros para responsividade e modo light/dark
    let user_top_page_width = options.user_top_page_width;
    if (!user_top_page_width) {
        user_top_page_width = '20vw';
    } else if (typeof user_top_page_width === 'number') {
        user_top_page_width = user_top_page_width + 'px';
    }
    let width_desktop = options.width_desktop;
    if (typeof width_desktop === 'number') width_desktop = width_desktop + 'px';
    let width_mobile = options.width_mobile;
    if (typeof width_mobile === 'number') width_mobile = width_mobile + 'px';
    let height_desktop = options.height_desktop;
    if (typeof height_desktop === 'number') height_desktop = height_desktop + 'px';
    let height_mobile = options.height_mobile;
    if (typeof height_mobile === 'number') height_mobile = height_mobile + 'px';

    const bg_light = options.bg_light;
    const bg_dark = options.bg_dark;
    const color_light = options.color_light;
    const color_dark = options.color_dark;

    const on_click = options.on_click || null;
    const styleString = typeof options.style === 'string' ? options.style : '';

    // Gera um id único para o componente para isolar o CSS
    const uniqueId = 'user-top-page-' + Math.random().toString(36).substr(2, 9);

    // Monta CSS customizado para este componente
    let customCSS = `
    <style id="${uniqueId}-style">
    .${uniqueId}-container {
        width: ${width_desktop || user_top_page_width};
        ${height_desktop ? `height: ${height_desktop};` : ''}
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 18px;
        transition: transform 0.18s cubic-bezier(.4,0,.2,1);
        cursor: pointer;
        gap: 22px;
        box-shadow: none;
        background: ${bg_light ? bg_light : 'transparent'};
        color: ${color_light ? color_light : '#232323'};
        ${styleString ? styleString : ''}
    }
    .${uniqueId}-container:hover {
        transform: scale(1.025);
    }
    .${uniqueId}-photo-wrapper {
        position: relative;
        width: ${height_desktop || '74px'};
        height: ${height_desktop || '74px'};
        min-width: ${height_desktop || '74px'};
        min-height: ${height_desktop || '74px'};
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .${uniqueId}-photo-img {
        width: ${height_desktop || '74px'};
        height: ${height_desktop || '74px'};
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
        border: 2.5px solid #e6e6e6;
        background: #f5f5f5;
        display: block;
    }
    .${uniqueId}-pending-badge {
        position: absolute;
        bottom: 0;
        right: -6px;
        width: 28px;
        height: 28px;
        background: #ff3b3b;
        color: #fff;
        border-radius: 50%;
        border: 2.5px solid #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.85em;
        font-weight: 600;
        box-shadow: none;
        z-index: 2;
    }
    .${uniqueId}-pending-badge[data-count="0"] {
        display: none;
    }
    .${uniqueId}-info-block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        min-width: 0;
        text-align: left;
        align-items: flex-start;
    }
    .${uniqueId}-name {
        font-size: 1em;
        font-weight: 700;
        color: ${color_light ? color_light : '#232323'};
        margin-bottom: 2px;
        line-height: 1.18;
        word-break: break-word;
        text-align: left;
    }
    .${uniqueId}-profession {
        font-size: 0.85em;
        color: #666;
        font-weight: 500;
        margin-bottom: 7px;
        line-height: 1.12;
        word-break: break-word;
        text-align: left;
    }
    .${uniqueId}-status {
        font-size: 0.82em;
        font-weight: 600;
        color: ${user_status_color};
        background: transparent;
        padding: 0;
        border-radius: 0;
        display: inline-block;
        width: fit-content;
        margin-top: 2px;
        letter-spacing: 0.01em;
        box-shadow: none;
        text-align: left;
    }
    @media (prefers-color-scheme: dark) {
        .${uniqueId}-container {
            background: ${bg_dark ? bg_dark : 'transparent'};
            color: ${color_dark ? color_dark : '#f1f1f1'};
        }
        .${uniqueId}-photo-img {
            border-color: #333;
            background: #232323;
        }
        .${uniqueId}-name {
            color: ${color_dark ? color_dark : '#f1f1f1'};
        }
        .${uniqueId}-profession {
            color: #b0b0b0;
        }
        .${uniqueId}-status {
            color: ${
                (() => {
                    let status_col = (user_status_color + '').trim().toLowerCase();
                    return ['#b0b0b0', '#cccccc', '#e0e0e0', '#f5f5f5', '#fff', '#ffffff'].includes(status_col)
                        ? '#b0b0b0'
                        : user_status_color;
                })()
            };
        }
        .${uniqueId}-pending-badge {
            border-color: #232323;
            background: #ff3b3b;
            color: #fff;
        }
    }
    @media (max-width: 1000px) {
        .${uniqueId}-container {
            width: ${width_mobile || '70vw'};
            ${height_mobile ? `height: ${height_mobile};` : ''}
            padding: 14px 8px;
            gap: 13px;
        }
        .${uniqueId}-photo-wrapper, .${uniqueId}-photo-img {
            width: ${height_mobile || '54px'};
            height: ${height_mobile || '54px'};
            min-width: ${height_mobile || '54px'};
            min-height: ${height_mobile || '54px'};
            margin: 0;
            align-self: flex-start;
            justify-content: flex-start;
        }
        .${uniqueId}-photo-wrapper {
            margin-bottom: 0;
        }
        .${uniqueId}-pending-badge {
            width: 20px;
            height: 20px;
            font-size: 0.75em;
            right: -4px;
        }
        .${uniqueId}-info-block {
            align-items: flex-start;
            text-align: left;
            margin-top: 8px;
            width: 100%;
        }
        .${uniqueId}-name {
            font-size: 0.92em;
            text-align: left;
        }
        .${uniqueId}-profession {
            font-size: 0.75em;
            text-align: left;
        }
        .${uniqueId}-status {
            font-size: 0.73em;
            text-align: left;
        }
    }
    @media (max-width: 400px) {
        .${uniqueId}-container {
            width: 50vw;
            padding: 10px 2vw;
            gap: 8px;
        }
        .${uniqueId}-info-block {
            margin-top: 8px;
            width: 100%;
        }
    }
    </style>
    `;
    $('head').append(customCSS);

    // Cria elementos
    const $container = $('<div>', {
        class: `${uniqueId}-container`
    });

    // Handler de click
    if (on_click) {
        if (typeof on_click === 'function') {
            $container.css('user-select', 'none');
            $container.attr('tabindex', 0);
            $container.attr('role', 'button');
            $container.on('click', on_click);
            $container.on('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    on_click(e);
                    e.preventDefault();
                }
            });
        } else if (typeof on_click === 'string' && on_click.trim()) {
            $container.css('user-select', 'none');
            $container.attr('tabindex', 0);
            $container.attr('role', 'button');
            $container.attr('onclick', on_click);
            $container.on('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    // eslint-disable-next-line no-eval
                    eval(on_click);
                    e.preventDefault();
                }
            });
        }
    }

    // Foto + badge
    const $photoWrapper = $('<div>', { class: `${uniqueId}-photo-wrapper` });
    const $photoImg = $('<img>', {
        class: `${uniqueId}-photo-img`,
        src: user_photo,
        alt: 'Foto de ' + user_name
    });
    const $badge = $('<div>', {
        class: `${uniqueId}-pending-badge`,
        'data-count': user_pending_count,
        text: user_pending_count
    });
    if (parseInt(user_pending_count) === 0) {
        $badge.css('display', 'none');
    }
    $photoWrapper.append($photoImg, $badge);

    // Info block
    const $infoBlock = $('<div>', { class: `${uniqueId}-info-block` });
    $infoBlock.append(
        $('<div>', { class: `${uniqueId}-name`, text: user_name }),
        $('<div>', { class: `${uniqueId}-profession`, text: user_profession }),
        $('<div>', { class: `${uniqueId}-status`, text: user_status_text })
    );

    $container.append($photoWrapper, $infoBlock);

    return $container;
}

/*
Parâmetros esperados:
user_top_page({
    user_photo: 'url da foto' (opcional),
    user_name: 'Nome do usuário',
    user_profession: 'Profissão',
    user_pending_count: 0,
    user_status_text: 'Online' ou 'Offline' etc,
    user_status_color: '#2ecc40' ou '#b0b0b0' etc,
    user_top_page_width: '480px' ou '100%' ou 320 etc,
    width_desktop: '400px' ou '100%' etc,
    width_mobile: '90vw' ou '100vw' etc,
    height_desktop: '74px' ou 'auto' etc,
    height_mobile: '54px' ou 'auto' etc,
    bg_light: '#fff' (opcional),
    bg_dark: '#232323' (opcional),
    color_light: '#232323' (opcional),
    color_dark: '#f1f1f1' (opcional),
    on_click: function|string (opcional, ex: ()=>alert('oi'), "minhaFuncao()"),
    style: 'background: #f0f0f0; border: 1px solid #ccc;' // opcional
})
*/