/**
 * input_cpf.js
 * Retorna um elemento jQuery de input de CPF com máscara e validação, pronto para ser inserido em um container.
 * 
 * @param {object} options - Parâmetros de configuração:
 *      - cpf_label: string (label do campo, default: 'CPF')
 *      - cpf_name: string (atributo name do input, default: 'cpf')
 *      - cpf_placeholder: string (placeholder do input, default: 'Digite seu CPF')
 *      - cpf_value: string (valor inicial do input, default: '')
 *      - required: boolean (se o campo é obrigatório, default: true)
 *      - input_id: string (id do input, default: gerado único)
 *      - on_valid: function (callback quando CPF válido, recebe valor)
 *      - on_invalid: function (callback quando CPF inválido, recebe valor)
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
 *      - qualquer outro parâmetro CSS pode ser passado com o mesmo nome do atributo em CSS (ex: background, border, box-shadow, etc)
 * @returns {jQuery} - Elemento jQuery pronto para uso
 * @copia_rapida_de_parametros
    {cpf_label: 'CPF', cpf_name: 'cpf', cpf_placeholder: 'Digite seu CPF', cpf_value: '', required: true, input_id: '', on_valid: null, on_invalid: null, on_click: null, style: '', width_desktop: '', width_mobile: '', height_desktop: '', height_mobile: '', bg_light: '', bg_dark: '', color_light: '', color_dark: ''}
 */

let inputCpfIdCounter = 0;

export default function input_cpf(options = {}) {
    // Gera um identificador único para esta instância
    const uniqueId = 'input-cpf-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);

    // Cópia rápida de parâmetros
    const cpf_label = options.cpf_label !== undefined ? options.cpf_label : 'CPF';
    const cpf_name = options.cpf_name !== undefined ? options.cpf_name : 'cpf';
    const cpf_placeholder = options.cpf_placeholder !== undefined ? options.cpf_placeholder : 'Digite seu CPF';
    const cpf_value = options.cpf_value !== undefined ? options.cpf_value : '';
    const required = options.required !== undefined ? !!options.required : true;
    const on_valid = typeof options.on_valid === 'function' ? options.on_valid : null;
    const on_invalid = typeof options.on_invalid === 'function' ? options.on_invalid : null;
    const on_click = typeof options.on_click === 'function' ? options.on_click : null;
    const styleString = typeof options.style === 'string' ? options.style : '';
    const input_id = options.input_id || `input-cpf-${++inputCpfIdCounter}`;

    // Novos parâmetros para responsividade e modo light/dark
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
            key !== 'cpf_label' &&
            key !== 'cpf_name' &&
            key !== 'cpf_placeholder' &&
            key !== 'cpf_value' &&
            key !== 'required' &&
            key !== 'input_id' &&
            key !== 'on_valid' &&
            key !== 'on_invalid' &&
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
    const containerClass = `input-cpf-container-${uniqueId}`;
    const labelClass = `input-cpf-label-${uniqueId}`;
    const fieldClass = `input-cpf-field-${uniqueId}`;
    const errorClass = `input-cpf-error-${uniqueId}`;

    // Monta CSS exclusivo para esta instância
    let customCSS = `
        <style id="input-cpf-style-${uniqueId}">
        .${containerClass} {
            width: ${width_desktop ? width_desktop : '80%'};
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 2% auto;
            padding: 4% 2.5%;
            background: ${bg_dark ? bg_dark : '#181818'};
            border-radius: 5px;
            color: ${color_dark ? color_dark : '#cdcdcd'};
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
            background: #222;
            color: #cdcdcd;
            outline: none;
            transition: border 0.2s;
            border-radius: 5px;
            border: none;
        }
        .${fieldClass}:focus {
            border-color: #4a90e2;
        }
        .${errorClass} {
            color: #e74c3c;
            font-size: 95%;
            margin-top: 1.2%;
            min-height: 2.5%;
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
                color: #222;
                border: 0.3% solid #bbb;
            }
        }
        @media (prefers-color-scheme: dark) {
            .${containerClass} {
                background: ${bg_dark ? bg_dark : '#181818'};
                color: ${color_dark ? color_dark : '#cdcdcd'};
            }
            .${fieldClass} {
                background: #222;
                color: #cdcdcd;
                border: 0.3% solid #888;
            }
        }
        </style>
    `;
    $('head').append(customCSS);

    // Cria elementos com classes únicas
    const $container = $(`<div class="${containerClass}"></div>`);
    const $label = $(`<label class="${labelClass}" for="${input_id}"></label>`).text(cpf_label);
    const $input = $(`<input
        type="text"
        class="${fieldClass}"
        id="${input_id}"
        name="${cpf_name}"
        placeholder="${cpf_placeholder}"
        maxlength="14"
        autocomplete="off"
        inputmode="numeric"
        pattern="\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}"
        ${required ? 'required' : ''}
        spellcheck="false"
    >`);
    $input.val(cpf_value);
    const $error = $(`<div class="${errorClass}" id="${input_id}-error"></div>`);

    // Aplica atributos CSS extras no container (ex: background, border, box-shadow, etc)
    if (Object.keys(cssAttrs).length > 0) {
        $container.css(cssAttrs);
    }

    // Aplica estilo inline se fornecido (sobrescreve outros)
    if (styleString && typeof styleString === 'string') {
        const prevStyle = $container.attr('style') || '';
        $container.attr('style', prevStyle + (prevStyle && styleString ? ';' : '') + styleString);
    }

    $container.append($label, $input, $error);

    // Adiciona evento de clique se fornecido
    if (on_click) {
        $container.on('click', on_click);
    }

    // Função de máscara e validação
    function maskAndValidateCPF(inputElem, errorElem) {
        // Pega o valor sem máscara
        let value = inputElem.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        // Aplica a máscara
        let masked = '';
        if (value.length > 0) {
            if (value.length <= 3) {
                masked = value;
            } else if (value.length <= 6) {
                masked = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
            } else if (value.length <= 9) {
                masked = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
            } else {
                masked = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
            }
        }

        // Atualiza o valor do input SEM perder o cursor
        // (Ajuste simples: sempre coloca o cursor no final)
        // Só atualiza se mudou, para evitar bug de digitação sumir
        if (inputElem.value !== masked) {
            inputElem.value = masked;
            if (document.activeElement === inputElem) {
                inputElem.setSelectionRange(masked.length, masked.length);
            }
        }

        // Validação
        if (value === '') {
            errorElem.text('O CPF é obrigatório.');
            inputElem.setCustomValidity('CPF obrigatório');
            if (on_invalid) on_invalid(value);
        } else if (!isValidCPF(value)) {
            errorElem.text('Digite um CPF válido.');
            inputElem.setCustomValidity('CPF inválido');
            if (on_invalid) on_invalid(value);
        } else {
            errorElem.text('');
            inputElem.setCustomValidity('');
            if (on_valid) on_valid(value);
        }
    }

    // Função de validação de CPF
    function isValidCPF(cpf) {
        if (!cpf || cpf.length !== 11) return false;
        if (/^(\d)\1+$/.test(cpf)) return false;
        let sum = 0, rest;
        for (let i = 1; i <= 9; i++)
            sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
        rest = (sum * 10) % 11;
        if ((rest === 10) || (rest === 11)) rest = 0;
        if (rest !== parseInt(cpf.substring(9, 10))) return false;
        sum = 0;
        for (let i = 1; i <= 10; i++)
            sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
        rest = (sum * 10) % 11;
        if ((rest === 10) || (rest === 11)) rest = 0;
        if (rest !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    }

    // Eventos
    $input.on('input', function(e) {
        // O valor digitado deve SEMPRE aparecer no input
        // A máscara só é aplicada se o valor realmente mudou
        maskAndValidateCPF(this, $error);
    });

    // Validação inicial se já tem valor
    if (cpf_value) {
        setTimeout(() => maskAndValidateCPF($input[0], $error), 0);
    }

    // Retorna o container jQuery
    return $container;
}

/*
Exemplo de uso:
import input_cpf from './input_cpf.js';

const $cpf = input_cpf({
    cpf_label: 'CPF do usuário',
    cpf_name: 'cpf_usuario',
    cpf_placeholder: 'Digite o CPF',
    cpf_value: '',
    required: true,
    on_valid: (cpf) => { console.log('CPF válido:', cpf); },
    on_invalid: (cpf) => { console.log('CPF inválido:', cpf); },
    on_click: (e) => { alert('Cliquei no input!'); },
    style: 'background: #f5f5f5; border: 2px solid #4a90e2;',
    'box-shadow': '0 2px 8px 0 rgba(0,0,0,0.08)',
    width_desktop: '400px',
    width_mobile: '98vw',
    height_desktop: '60px',
    height_mobile: '80px',
    bg_light: '#f9f9f9',
    bg_dark: '#222',
    color_light: '#222',
    color_dark: '#fff'
});

$('#algum-container').append($cpf);

// Cópia rápida de parâmetros:
// {cpf_label: 'CPF', cpf_name: 'cpf', cpf_placeholder: 'Digite seu CPF', cpf_value: '', required: true, input_id: '', on_valid: null, on_invalid: null, on_click: null, style: '', width_desktop: '', width_mobile: '', height_desktop: '', height_mobile: '', bg_light: '', bg_dark: '', color_light: '', color_dark: ''}
*/