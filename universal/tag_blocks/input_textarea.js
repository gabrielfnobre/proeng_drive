/**
 * input_textarea.js
 * Retorna um elemento jQuery de textarea, pronto para ser inserido em um container.
 * 
 * @param {object} options - Parâmetros de configuração:
 *      - label: string (label do campo, default: 'Texto')
 *      - name: string (atributo name do textarea, default: 'input_textarea')
 *      - placeholder: string (placeholder do textarea, default: 'Digite aqui')
 *      - value: string (valor inicial do textarea, default: '')
 *      - required: boolean (se o campo é obrigatório, default: false)
 *      - input_id: string (id do textarea, default: gerado único)
 *      - min_text: number (mínimo de caracteres, default: 0)
 *      - max_text: number (máximo de caracteres, default: 500)
 *      - on_function: function ou string (função a ser executada no evento input, recebe valor e evento)
 *      - on_click: function (callback para clique no textarea ou container, recebe evento)
 *      - style: string (CSS inline para customizar o container principal)
 *      - width_desktop: string (largura do componente no desktop, ex: '80%', '400px')
 *      - width_mobile: string (largura do componente no mobile, ex: '95%', '100vw')
 *      - height_desktop: string (altura do componente no desktop, ex: 'auto', '120px')
 *      - height_mobile: string (altura do componente no mobile, ex: 'auto', '160px')
 *      - bg_light: string (cor de fundo para modo light)
 *      - bg_dark: string (cor de fundo para modo dark)
 *      - color_light: string (cor do texto para modo light)
 *      - color_dark: string (cor do texto para modo dark)
 *      - qualquer outro parâmetro CSS pode ser passado com o mesmo nome do atributo em CSS (ex: background, border, box-shadow, etc)
 * @returns {jQuery} - Elemento jQuery pronto para uso
 * @copia_rapida_de_parametros
    {label: 'Texto', name: 'input_textarea', placeholder: 'Digite aqui', value: '', required: false, input_id: '', min_text: 0, max_text: 500, on_function: null, on_click: null, style: '', width_desktop: '', width_mobile: '', height_desktop: '', height_mobile: '', bg_light: '', bg_dark: '', color_light: '', color_dark: ''}
 */

let inputTextareaIdCounter = 0;

export default function input_textarea(options = {}) {
    // Gera um identificador único para esta instância
    const uniqueId = 'input-textarea-' + Date.now() + '-' + (++inputTextareaIdCounter);

    // Cópia rápida de parâmetros
    const label = options.label !== undefined ? options.label : 'Texto';
    const name = options.name !== undefined ? options.name : 'input_textarea';
    const placeholder = options.placeholder !== undefined ? options.placeholder : 'Digite aqui';
    const value = options.value !== undefined ? options.value : '';
    const required = options.required !== undefined ? !!options.required : false;
    const min_text = typeof options.min_text === 'number' ? options.min_text : 0;
    const max_text = typeof options.max_text === 'number' ? options.max_text : 500;
    const on_function = options.on_function !== undefined ? options.on_function : null;
    const on_click = typeof options.on_click === 'function' ? options.on_click : null;
    const styleString = typeof options.style === 'string' ? options.style : '';
    const input_id = options.input_id || uniqueId;

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
            key !== 'placeholder' &&
            key !== 'value' &&
            key !== 'required' &&
            key !== 'input_id' &&
            key !== 'min_text' &&
            key !== 'max_text' &&
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
            key !== 'color_dark'
        ) {
            // Converte camelCase para kebab-case se necessário
            const cssKey = key.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
            cssAttrs[cssKey] = options[key];
        }
    }

    // Classes únicas para esta instância
    const containerClass = `input-textarea-container-${uniqueId}`;
    const labelClass = `input-textarea-label-${uniqueId}`;
    const fieldClass = `input-textarea-field-${uniqueId}`;
    const counterClass = `input-textarea-counter-${uniqueId}`;
    const errorClass = `input-textarea-error-${uniqueId}`;

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
        <style id="input-textarea-style-${uniqueId}">
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
            border: 0.3% solid #888;
            border-radius: 1.2%;
            font-size: 100%;
            background: ${isDarkMode() ? '#222' : '#ededed'};
            color: ${resolvedColor};
            outline: none;
            transition: border 0.2s;
            border-radius: 5px;
            border: none;
            resize: vertical;
            min-height: 80px;
            max-height: 400px;
        }
        .${fieldClass}:focus {
            border-color: #4a90e2;
        }
        .${counterClass} {
            font-size: 90%;
            color: #888;
            align-self: flex-end;
            margin-top: 2px;
        }
        .${errorClass} {
            color: #e74c3c;
            font-size: 90%;
            margin-top: 2px;
            min-height: 18px;
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
    const $label = $(`<label class="${labelClass}" for="${input_id}"></label>`).text(label);
    const $textarea = $(`<textarea
        class="${fieldClass}"
        id="${input_id}"
        name="${name}"
        placeholder="${placeholder}"
        ${required ? 'required' : ''}
        spellcheck="true"
        autocomplete="off"
        rows="4"
        maxlength="${max_text}"
    ></textarea>`);
    $textarea.val(value);

    // Contador de caracteres
    const $counter = $(`<div class="${counterClass}"></div>`);
    // Mensagem de erro
    const $error = $(`<div class="${errorClass}"></div>`);

    // Função para atualizar contador e validação
    function updateCounterAndValidation() {
        const val = $textarea.val() || '';
        const len = val.length;
        $counter.text(`${len}/${max_text} caractere${max_text === 1 ? '' : 's'}`);
        let errorMsg = '';
        if (required && len === 0) {
            errorMsg = 'Campo obrigatório.';
        } else if (len < min_text && len > 0) {
            errorMsg = `Mínimo de ${min_text} caractere${min_text === 1 ? '' : 's'}.`;
        } else if (len > max_text) {
            errorMsg = `Máximo de ${max_text} caractere${max_text === 1 ? '' : 's'}.`;
        }
        $error.text(errorMsg);
        if (errorMsg) {
            $textarea.addClass('input-textarea-error-border');
        } else {
            $textarea.removeClass('input-textarea-error-border');
        }
    }

    // Aplica atributos CSS extras no container (ex: background, border, box-shadow, etc)
    if (Object.keys(cssAttrs).length > 0) {
        $container.css(cssAttrs);
    }

    // Aplica estilo inline se fornecido (sobrescreve outros)
    if (styleString && typeof styleString === 'string') {
        const prevStyle = $container.attr('style') || '';
        $container.attr('style', prevStyle + (prevStyle && styleString ? ';' : '') + styleString);
    }

    $container.append($label, $textarea, $counter, $error);

    // Adiciona evento de clique se fornecido
    if (on_click) {
        $container.on('click', on_click);
    }

    // Evento de input para executar a função passada em on_function e validação
    $textarea.on('input', function(e) {
        let val = this.value;
        // Limita o valor ao max_text
        if (val.length > max_text) {
            val = val.substring(0, max_text);
            $textarea.val(val);
        }
        updateCounterAndValidation();
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

    // Inicializa contador e validação
    setTimeout(updateCounterAndValidation, 0);

    // Retorna o container jQuery
    return $container;
}

/*
Exemplo de uso:
import input_textarea from './input_textarea.js';

const $textarea = input_textarea({
    label: 'Descrição',
    name: 'descricao',
    placeholder: 'Digite sua mensagem...',
    value: '',
    required: true,
    min_text: 10,
    max_text: 200,
    on_function: (val, e) => { console.log('Texto digitado:', val); },
    // ou:
    // on_function: "alert('Texto digitado: ' + value)",
    on_click: (e) => { alert('Cliquei no textarea!'); },
    style: 'background: #f5f5f5; border: 2px solid #4a90e2;',
    'box-shadow': '0 2px 8px 0 rgba(0,0,0,0.08)',
    width_desktop: '60%',
    width_mobile: '98%',
    height_desktop: '120px',
    height_mobile: '160px',
    bg_light: '#f9f9f9',
    bg_dark: '#222',
    color_light: '#222',
    color_dark: '#fff'
});

$('#algum-container').append($textarea);

// Cópia rápida de parâmetros:
// {label: 'Texto', name: 'input_textarea', placeholder: 'Digite aqui', value: '', required: false, input_id: '', min_text: 0, max_text: 500, on_function: null, on_click: null, style: '', width_desktop: '', width_mobile: '', height_desktop: '', height_mobile: '', bg_light: '', bg_dark: '', color_light: '', color_dark: ''}
*/