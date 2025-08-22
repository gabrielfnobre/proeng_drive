/**
 * input_float.js
 * Retorna um elemento jQuery de input do tipo número flutuante, pronto para ser inserido em um container.
 * 
 * @param {object} options - Parâmetros de configuração:
 *      - label: string (label do campo, default: 'Número')
 *      - name: string (atributo name do input, default: 'input_float')
 *      - placeholder: string (placeholder do input, default: 'Digite um número')
 *      - value: string|number (valor inicial do input, default: '')
 *      - required: boolean (se o campo é obrigatório, default: false)
 *      - input_id: string (id do input, default: gerado único)
 *      - on_function: function ou string (função a ser executada no evento input, recebe valor e evento)
 *      - on_click: function (callback para clique no input ou container, recebe evento)
 *      - style: string (CSS inline para customizar o container principal)
 *      - width_desktop: string (largura do componente no desktop, ex: '80%', '400px')
 *      - width_mobile: string (largura do componente no mobile, ex: '95%', '100vw')
 *      - height_desktop: string (altura do componente no desktop, ex: 'auto', '60px')
 *      - height_mobile: string (altura do componente no mobile, ex: 'auto', '80px')
 *      - bg_light: string (cor de fundo para modo light)
 *      - bg_dark: string (cor de fundo para modo dark)
 *      - color_light: string (cor do texto para modo light)
 *      - color_dark: string (cor do texto para modo dark)
 *      - pos_dot: number (quantidade de casas decimais permitidas após a vírgula, default: 2)
 *      - type_coin: string (moeda a ser exibida antes do número, ex: "R$", default: '')
 *      - qualquer outro parâmetro CSS pode ser passado com o mesmo nome do atributo em CSS (ex: background, border, box-shadow, etc)
 * @returns {jQuery} - Elemento jQuery pronto para uso
 * @copia_rapida_de_parametros
    {label: 'Número', name: 'input_float', placeholder: 'Digite um número', value: '', required: false, input_id: '', on_function: null, on_click: null, style: '', width_desktop: '', width_mobile: '', height_desktop: '', height_mobile: '', bg_light: '', bg_dark: '', color_light: '', color_dark: '', pos_dot: 2, type_coin: ''}
 */

let inputFloatIdCounter = 0;

export default function input_float(options = {}) {
    // Gera um identificador único para esta instância
    const uniqueId = 'input-float-' + Date.now() + '-' + (++inputFloatIdCounter);

    // Cópia rápida de parâmetros
    const label = options.label !== undefined ? options.label : 'Número';
    const name = options.name !== undefined ? options.name : 'input_float';
    const placeholder = options.placeholder !== undefined ? options.placeholder : 'Digite um número';
    const value = options.value !== undefined ? options.value : '';
    const required = options.required !== undefined ? !!options.required : false;
    const on_function = options.on_function !== undefined ? options.on_function : null;
    const on_click = typeof options.on_click === 'function' ? options.on_click : null;
    const styleString = typeof options.style === 'string' ? options.style : '';
    const input_id = options.input_id || uniqueId;
    const pos_dot = Number.isInteger(options.pos_dot) && options.pos_dot >= 0 ? options.pos_dot : 2;
    const type_coin = typeof options.type_coin === 'string' ? options.type_coin : '';

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
            key !== 'pos_dot' &&
            key !== 'type_coin'
        ) {
            // Converte camelCase para kebab-case se necessário
            const cssKey = key.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
            cssAttrs[cssKey] = options[key];
        }
    }

    // Classes únicas para esta instância
    const containerClass = `input-float-container-${uniqueId}`;
    const labelClass = `input-float-label-${uniqueId}`;
    const fieldClass = `input-float-field-${uniqueId}`;
    const errorClass = `input-float-error-${uniqueId}`;
    const coinClass = `input-float-coin-${uniqueId}`;

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
        <style id="input-float-style-${uniqueId}">
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
            ${type_coin ? 'padding-left: 2.5em;' : ''}
        }
        .${fieldClass}:focus {
            border-color: #4a90e2;
        }
        .${errorClass} {
            color: #e74c3c;
            font-size: 90%;
            margin-top: 4px;
            min-height: 18px;
            display: block;
        }
        .${coinClass} {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 100%;
            color: #888;
            pointer-events: none;
            z-index: 2;
        }
        .${containerClass} .input-float-input-wrapper {
            position: relative;
            width: 100%;
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

    // Wrapper para moeda e input
    const $inputWrapper = $(`<div class="input-float-input-wrapper"></div>`);
    let $coin = null;
    if (type_coin) {
        $coin = $(`<span class="${coinClass}"></span>`).text(type_coin);
        $inputWrapper.append($coin);
    }

    const $input = $(`<input
        type="text"
        inputmode="decimal"
        pattern="[0-9]*[.,]?[0-9]*"
        class="${fieldClass}"
        id="${input_id}"
        name="${name}"
        placeholder="${placeholder}"
        ${required ? 'required' : ''}
        spellcheck="false"
        autocomplete="off"
        style="${type_coin ? 'padding-left: 2.5em;' : ''}"
    >`);
    $input.val(value);

    $inputWrapper.append($input);

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

    $container.append($label, $inputWrapper, $error);

    // Adiciona evento de clique se fornecido
    if (on_click) {
        $container.on('click', on_click);
    }

    // Função de validação de float
    function validateFloat(val) {
        // Aceita apenas números, ponto ou vírgula, e no máximo uma vírgula/ponto
        // Permite string vazia se não for required
        if (val === '' && !required) return true;
        // Aceita: 123, 123.45, 123,45, .45, 0.45, 0,45
        return /^(\d+([.,]\d*)?|[.,]\d+)$/.test(val);
    }

    // Função para formatar e limitar casas decimais
    function formatFloat(val) {
        if (val === '') return '';
        // Troca vírgula por ponto para parse
        let num = val.replace(',', '.');
        if (isNaN(num)) return '';
        let floatVal = parseFloat(num);
        if (isNaN(floatVal)) return '';
        // Limita casas decimais
        let parts = num.split('.');
        if (parts.length === 2) {
            // Arredonda para cima se casas decimais excederem pos_dot
            let dec = parts[1].slice(0, pos_dot);
            if (parts[1].length > pos_dot) {
                // arredonda para cima
                let factor = Math.pow(10, pos_dot);
                floatVal = Math.ceil(floatVal * factor) / factor;
                return floatVal.toFixed(pos_dot).replace('.', ',');
            } else {
                // mantém como está
                return parts[0] + ',' + dec;
            }
        } else {
            // inteiro
            return parts[0];
        }
    }

    // Evento de input para executar a função passada em on_function e validar
    $input.on('input', function(e) {
        let val = this.value;

        // Remove caracteres inválidos (permite apenas dígitos, vírgula, ponto)
        let filtered = val.replace(/[^0-9.,]/g, '');

        // Troca múltiplos pontos/vírgulas por apenas um separador decimal
        let firstComma = filtered.indexOf(',');
        let firstDot = filtered.indexOf('.');
        let sepIndex = firstComma >= 0 ? firstComma : firstDot;
        if (sepIndex >= 0) {
            // Remove outros separadores depois do primeiro
            let before = filtered.slice(0, sepIndex + 1);
            let after = filtered.slice(sepIndex + 1).replace(/[.,]/g, '');
            filtered = before + after;
        }

        // Formata e limita casas decimais
        let formatted = formatFloat(filtered);

        // Atualiza valor do input
        if (this.value !== formatted) {
            this.value = formatted;
            val = formatted;
        } else {
            val = formatted;
        }

        // Validação
        if (!validateFloat(val)) {
            $error.text('Digite um número válido.');
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

    // NÃO mostrar mensagem de erro inicial ao carregar, só mostrar se o usuário digitar algo inválido

    // Retorna o container jQuery
    return $container;
}

/*
Exemplo de uso:
import input_float from './input_float.js';

const $input = input_float({
    label: 'Valor',
    name: 'valor_produto',
    placeholder: 'Digite o valor',
    value: '',
    required: true,
    on_function: (val, e) => { console.log('Valor digitado:', val); },
    // ou:
    // on_function: "alert('Valor digitado: ' + value)",
    on_click: (e) => { alert('Cliquei no input!'); },
    style: 'background: #f5f5f5; border: 2px solid #4a90e2;',
    'box-shadow': '0 2px 8px 0 rgba(0,0,0,0.08)',
    width_desktop: '60%',
    width_mobile: '98%',
    height_desktop: '60px',
    height_mobile: '80px',
    bg_light: '#f9f9f9',
    bg_dark: '#222',
    color_light: '#222',
    color_dark: '#fff',
    pos_dot: 2,
    type_coin: 'R$'
});

$('#algum-container').append($input);

// Cópia rápida de parâmetros:
// {label: 'Número', name: 'input_float', placeholder: 'Digite um número', value: '', required: false, input_id: '', on_function: null, on_click: null, style: '', width_desktop: '', width_mobile: '', height_desktop: '', height_mobile: '', bg_light: '', bg_dark: '', color_light: '', color_dark: '', pos_dot: 2, type_coin: ''}
*/