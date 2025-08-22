/**
 * select_option.js
 * Retorna um elemento jQuery de select (dropdown) com opções, pronto para ser inserido em um container.
 * 
 * @param {object} options - Parâmetros de configuração:
 *      - label: string (label do campo, default: 'Selecione uma opção')
 *      - name: string (atributo name do select, default: 'select_option')
 *      - value: string (valor inicial selecionado, default: '')
 *      - required: boolean (se o campo é obrigatório, default: false)
 *      - select_id: string (id do select, default: gerado único)
 *      - on_function: function ou string (função a ser executada no evento change, recebe valor e evento)
 *      - on_click: function (callback para clique no select ou container, recebe evento)
 *      - style: string (CSS inline para customizar o container principal)
 *      - width_desktop: string (largura do componente no desktop, ex: '80%', '400px')
 *      - width_mobile: string (largura do componente no mobile, ex: '95%', '100vw')
 *      - height_desktop: string (altura do componente no desktop, ex: 'auto', '60px')
 *      - height_mobile: string (altura do componente no mobile, ex: 'auto', '80px')
 *      - bg_light: string (cor de fundo para modo light)
 *      - bg_dark: string (cor de fundo para modo dark)
 *      - color_light: string (cor do texto para modo light)
 *      - color_dark: string (cor do texto para modo dark)
 *      - options: array de strings (lista de opções para o select)
 *      - qualquer outro parâmetro CSS pode ser passado com o mesmo nome do atributo em CSS (ex: background, border, box-shadow, etc)
 * @returns {jQuery} - Elemento jQuery pronto para uso
 * @copia_rapida_de_parametros
    {label: 'Selecione uma opção', name: 'select_option', value: '', required: false, select_id: '', on_function: null, on_click: null, style: '', width_desktop: '', width_mobile: '', height_desktop: '', height_mobile: '', bg_light: '', bg_dark: '', color_light: '', color_dark: '', options: []}
 */

let selectOptionIdCounter = 0;

export default function select_option(options = {}) {
    // Gera um identificador único para esta instância
    const uniqueId = 'select-option-' + Date.now() + '-' + (++selectOptionIdCounter);

    // Cópia rápida de parâmetros
    const label = options.label !== undefined ? options.label : 'Selecione uma opção';
    const name = options.name !== undefined ? options.name : 'select_option';
    const value = options.value !== undefined ? options.value : '';
    const required = options.required !== undefined ? !!options.required : false;
    const on_function = options.on_function !== undefined ? options.on_function : null;
    const on_click = typeof options.on_click === 'function' ? options.on_click : null;
    const styleString = typeof options.style === 'string' ? options.style : '';
    const select_id = options.select_id || uniqueId;
    const optionsArray = Array.isArray(options.options) ? options.options : [];

    // Novos parâmetros para responsividade e tema
    const width_desktop = options.width_desktop;
    const width_mobile = options.width_mobile;
    const height_desktop = options.height_desktop;
    const height_mobile = options.height_mobile;
    const bg_light = options.bg_light;
    const bg_dark = options.bg_dark;
    const color_light = options.color_light;
    const color_dark = options.color_dark;

    // Extrai atributos CSS extras (além dos já tratados)
    const cssAttrs = {};
    for (const key in options) {
        if (
            key !== 'label' &&
            key !== 'name' &&
            key !== 'value' &&
            key !== 'required' &&
            key !== 'select_id' &&
            key !== 'on_function' &&
            key !== 'on_click' &&
            key !== 'style' &&
            key !== 'width_desktop' &&
            key !== 'width_mobile' &&
            key !== 'height_desktop' &&
            key !== 'height_mobile' &&
            key !== 'bg_light' &&
            key !== 'bg_dark' &&
            key !== 'color_light' &&
            key !== 'color_dark' &&
            key !== 'options'
        ) {
            // Converte camelCase para kebab-case se necessário
            const cssKey = key.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
            cssAttrs[cssKey] = options[key];
        }
    }

    // Classes únicas para esta instância
    const containerClass = `select-option-container-${uniqueId}`;
    const labelClass = `select-option-label-${uniqueId}`;
    const fieldClass = `select-option-field-${uniqueId}`;
    const errorClass = `select-option-error-${uniqueId}`;

    // Cores padrão
    function getDefaultBgColor(isDark) {
        return isDark ? '#181818' : '#fff';
    }
    function getDefaultTextColor(isDark) {
        return isDark ? '#cdcdcd' : '#222';
    }
    function isDarkMode() {
        if (typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return true;
        }
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') return true;
        return false;
    }

    // Resolve cores para modo atual
    let resolvedBg, resolvedColor;
    if (isDarkMode()) {
        resolvedBg = bg_dark !== undefined && bg_dark !== '' ? bg_dark : getDefaultBgColor(true);
        resolvedColor = color_dark !== undefined && color_dark !== '' ? color_dark : getDefaultTextColor(true);
    } else {
        resolvedBg = bg_light !== undefined && bg_light !== '' ? bg_light : getDefaultBgColor(false);
        resolvedColor = color_light !== undefined && color_light !== '' ? color_light : getDefaultTextColor(false);
    }

    // Monta CSS exclusivo para esta instância
    let customCSS = `
        <style id="select-option-style-${uniqueId}">
        .${containerClass} {
            width: ${width_desktop ? width_desktop : '80%'};
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 2% auto;
            padding: 4% 2.5%;
            background: ${resolvedBg};
            border-radius: 5px;
            color: ${resolvedColor};
            ${height_desktop ? `height: ${height_desktop};` : ''}
        }
        .${labelClass} {
            margin-bottom: 1.5%;
            font-size: 100%;
            font-weight: 500;
        }
        .${fieldClass} {
            padding: 4% 3%;
            border-radius: 5px;
            font-size: 100%;
            background: ${isDarkMode() ? '#222' : '#ededed'};
            color: ${resolvedColor};
            outline: none;
            border: none;
            transition: border 0.2s;
            min-height: 36px;
        }
        .${fieldClass}:focus {
            border: 1.5px solid #4a90e2;
        }
        .${errorClass} {
            color: #e74c3c;
            font-size: 90%;
            margin-top: 4px;
            min-height: 18px;
            display: block;
        }
        @media (max-width: 1000px) {
            .${containerClass} {
                width: ${width_mobile ? width_mobile : '95%'};
                padding: 2.5% 1.5%;
                ${height_mobile ? `height: ${height_mobile};` : ''}
            }
        }
        @media (prefers-color-scheme: light) {
            .${containerClass} {
                background: ${bg_light ? bg_light : '#fff'};
                color: ${color_light ? color_light : '#222'};
            }
            .${fieldClass} {
                background: #ededed;
                color: ${color_light ? color_light : '#222'};
                border: .5px solid #bbb;
            }
        }
        @media (prefers-color-scheme: dark) {
            .${containerClass} {
                background: ${bg_dark ? bg_dark : '#181818'};
                color: ${color_dark ? color_dark : '#cdcdcd'};
            }
            .${fieldClass} {
                background: #272727;
                color: ${color_dark ? color_dark : '#cdcdcd'};
                border: .5px solid #888;
            }
        }
        </style>
    `;
    $('head').append(customCSS);

    // Cria elementos
    const $container = $(`<div class="${containerClass}"></div>`);
    const $label = $(`<label class="${labelClass}" for="${select_id}"></label>`).text(label);

    const $select = $(`<select
        class="${fieldClass}"
        id="${select_id}"
        name="${name}"
        ${required ? 'required' : ''}
        autocomplete="off"
    ></select>`);

    // Adiciona opções
    if (!required) {
        $select.append(`<option value="">Selecione...</option>`);
    }
    optionsArray.forEach(opt => {
        $select.append(`<option value="${opt}">${opt}</option>`);
    });

    // Define valor inicial se fornecido
    if (value !== undefined && value !== null && value !== '') {
        $select.val(value);
    }

    // Mensagem de erro
    const $error = $(`<span class="${errorClass}"></span>`);

    // Aplica atributos CSS extras no container (ex: background, border, box-shadow, etc)
    if (Object.keys(cssAttrs).length > 0) {
        $container.css(cssAttrs);
    }

    // Aplica estilo inline se fornecido (sobrescreve outros)
    if (styleString && typeof styleString === 'string') {
        const prevStyle = $container.attr('style') || '';
        $container.attr('style', prevStyle + (prevStyle && styleString ? ';' : '') + styleString);
    }

    $container.append($label, $select, $error);

    // Adiciona evento de clique se fornecido
    if (on_click) {
        $container.on('click', on_click);
    }

    // Função de validação (se required, não pode ser vazio)
    function validateSelect(val) {
        if (required && (!val || val === '')) {
            return false;
        }
        return true;
    }

    // Evento de change para executar a função passada em on_function e validar
    $select.on('change', function(e) {
        let val = this.value;

        // Validação
        if (!validateSelect(val)) {
            $error.text('Selecione uma opção.');
        } else {
            $error.text('');
        }

        // Executa função de callback se fornecida
        if (typeof on_function === 'function') {
            on_function(val, e);
        } else if (typeof on_function === 'string') {
            try {
                // eslint-disable-next-line no-new-func
                const fn = new Function('value', 'event', on_function);
                fn(val, e);
            } catch (err) {
                console.error('Erro ao executar on_function:', err);
            }
        }
    });

    // NÃO mostrar mensagem de erro inicial ao carregar, só mostrar se o usuário interagir

    // Retorna o container jQuery
    return $container;
}

/*
Exemplo de uso:
import select_option from './select_option.js';

const $select = select_option({
    label: 'Escolha uma fruta',
    name: 'fruta',
    value: '',
    required: true,
    options: ['Maçã', 'Banana', 'Laranja', 'Uva'],
    on_function: (val, e) => { console.log('Selecionado:', val); },
    // ou:
    // on_function: "alert('Selecionou: ' + value)",
    on_click: (e) => { alert('Cliquei no select!'); },
    style: 'background: #f5f5f5; border: 2px solid #4a90e2;',
    'box-shadow': '0 2px 8px 0 rgba(0,0,0,0.08)',
    width_desktop: '60%',
    width_mobile: '98%',
    height_desktop: '60px',
    height_mobile: '80px',
    bg_light: '#f9f9f9',
    bg_dark: '#222',
    color_light: '#222',
    color_dark: '#fff'
});

$('#algum-container').append($select);

// Cópia rápida de parâmetros:
// {label: 'Selecione uma opção', name: 'select_option', value: '', required: false, select_id: '', on_function: null, on_click: null, style: '', width_desktop: '', width_mobile: '', height_desktop: '', height_mobile: '', bg_light: '', bg_dark: '', color_light: '', color_dark: '', options: []}
*/