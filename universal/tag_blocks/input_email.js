/**
 * input_email.js
 * Retorna um elemento jQuery de input de e-mail com validação, pronto para ser inserido em um container.
 * 
 * @param {object} options - Parâmetros de configuração:
 *      - email_label: string (label do campo, default: 'E-mail')
 *      - email_name: string (atributo name do input, default: 'email')
 *      - email_placeholder: string (placeholder do input, default: 'Digite seu e-mail')
 *      - email_value: string (valor inicial do input, default: '')
 *      - required: boolean (se o campo é obrigatório, default: true)
 *      - input_id: string (id do input, default: gerado único)
 *      - on_valid: function (callback quando e-mail válido, recebe valor)
 *      - on_invalid: function (callback quando e-mail inválido, recebe valor)
 *      - on_click: function (callback executado ao clicar no input)
 *      - style: string (CSS customizado para sobrescrever estilos do container)
 *      - width_desktop: string (largura do componente no desktop, ex: '80%', '400px')
 *      - width_mobile: string (largura do componente no mobile, ex: '95%', '100vw')
 *      - height_desktop: string (altura do componente no desktop, ex: 'auto', '60px')
 *      - height_mobile: string (altura do componente no mobile, ex: 'auto', '80px')
 *      - bg_light: string (cor de fundo para modo light)
 *      - bg_dark: string (cor de fundo para modo dark)
 *      - color_light: string (cor do texto para modo light)
 *      - color_dark: string (cor do texto para modo dark)
 *      - Qualquer outro parâmetro de CSS pode ser passado usando o nome exato da propriedade CSS (ex: background, color, border, etc)
 * @returns {jQuery} - Elemento jQuery pronto para uso
 * @copia_rapida_de_parametros
    {email_label: 'E-mail', email_name: 'email', email_placeholder: 'Digite seu e-mail', email_value: '', required: true, input_id: '', on_valid: null, on_invalid: null, on_click: null, style: '', width_desktop: '', width_mobile: '', height_desktop: '', height_mobile: '', bg_light: '', bg_dark: '', color_light: '', color_dark: ''}
 */

let inputEmailIdCounter = 0;

export default function input_email(options = {}) {
    // Gera um identificador único para esta instância
    const uniqueId = 'input-email-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);

    // Cópia rápida de parâmetros
    const email_label = options.email_label !== undefined ? options.email_label : 'E-mail';
    const email_name = options.email_name !== undefined ? options.email_name : 'email';
    const email_placeholder = options.email_placeholder !== undefined ? options.email_placeholder : 'Digite seu e-mail';
    const email_value = options.email_value !== undefined ? options.email_value : '';
    const required = options.required !== undefined ? !!options.required : true;
    const on_valid = typeof options.on_valid === 'function' ? options.on_valid : null;
    const on_invalid = typeof options.on_invalid === 'function' ? options.on_invalid : null;
    const on_click = typeof options.on_click === 'function' ? options.on_click : null;
    const input_id = options.input_id || `${uniqueId}-field`;
    const customStyle = typeof options.style === 'string' ? options.style : '';

    // Novos parâmetros para responsividade e modo light/dark
    const width_desktop = options.width_desktop;
    const width_mobile = options.width_mobile;
    const height_desktop = options.height_desktop;
    const height_mobile = options.height_mobile;
    const bg_light = options.bg_light;
    const bg_dark = options.bg_dark;
    const color_light = options.color_light;
    const color_dark = options.color_dark;

    // Coleta propriedades CSS customizadas passadas diretamente (ex: background, color, border, etc)
    // Só aplica em container, label, field, error
    const cssTargets = {
        container: [
            "width", "display", "flex-direction", "justify-content", "margin", "padding", "background", "border-radius", "color", "border", "box-shadow"
        ],
        label: [
            "margin-bottom", "font-size", "font-weight", "color"
        ],
        field: [
            "padding", "border", "border-radius", "font-size", "background", "color", "outline", "transition", "box-shadow"
        ],
        error: [
            "color", "font-size", "margin-top", "min-height"
        ]
    };
    // Monta objetos de css para cada target
    const containerCss = {};
    const labelCss = {};
    const fieldCss = {};
    const errorCss = {};
    for (const key in options) {
        if (cssTargets.container.includes(key)) containerCss[key] = options[key];
        if (cssTargets.label.includes(key)) labelCss[key] = options[key];
        if (cssTargets.field.includes(key)) fieldCss[key] = options[key];
        if (cssTargets.error.includes(key)) errorCss[key] = options[key];
    }

    // Classes únicas para esta instância
    const containerClass = `input-email-container-${uniqueId}`;
    const labelClass = `input-email-label-${uniqueId}`;
    const fieldClass = `input-email-field-${uniqueId}`;
    const errorClass = `input-email-error-${uniqueId}`;

    // Monta CSS exclusivo para esta instância
    let customCSS = `
        .${containerClass} {
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 2% auto;
            padding: 4% 2.5%;
            background: #181818;
            border-radius: 5px;
            color: #cdcdcd;
            ${width_desktop ? `width: ${width_desktop} !important;` : ''}
            ${height_desktop ? `height: ${height_desktop} !important;` : ''}
            ${bg_dark && !bg_light ? `background: ${bg_dark} !important;` : ''}
            ${color_dark && !color_light ? `color: ${color_dark} !important;` : ''}
        }
        .${labelClass} {
            margin-bottom: 1.5%;
            font-size: 100%;
            font-weight: 500;
            ${labelCss['margin-bottom'] ? `margin-bottom: ${labelCss['margin-bottom']} !important;` : ''}
            ${labelCss['font-size'] ? `font-size: ${labelCss['font-size']} !important;` : ''}
            ${labelCss['font-weight'] ? `font-weight: ${labelCss['font-weight']} !important;` : ''}
            ${labelCss['color'] ? `color: ${labelCss['color']} !important;` : ''}
        }
        .${fieldClass} {
            padding: 4% 3%;
            border-radius: 5px;
            font-size: 100%;
            background: #222;
            color: #cdcdcd;
            outline: none;
            transition: border 0.2s;
            border: none;
            ${fieldCss['padding'] ? `padding: ${fieldCss['padding']} !important;` : ''}
            ${fieldCss['border'] ? `border: ${fieldCss['border']} !important;` : ''}
            ${fieldCss['border-radius'] ? `border-radius: ${fieldCss['border-radius']} !important;` : ''}
            ${fieldCss['font-size'] ? `font-size: ${fieldCss['font-size']} !important;` : ''}
            ${fieldCss['background'] ? `background: ${fieldCss['background']} !important;` : ''}
            ${fieldCss['color'] ? `color: ${fieldCss['color']} !important;` : ''}
            ${fieldCss['outline'] ? `outline: ${fieldCss['outline']} !important;` : ''}
            ${fieldCss['transition'] ? `transition: ${fieldCss['transition']} !important;` : ''}
            ${fieldCss['box-shadow'] ? `box-shadow: ${fieldCss['box-shadow']} !important;` : ''}
        }
        .${fieldClass}:focus {
            border-color: #4a90e2;
        }
        .${errorClass} {
            color: #e74c3c;
            font-size: 95%;
            margin-top: 1.2%;
            min-height: 2.5%;
            ${errorCss['color'] ? `color: ${errorCss['color']} !important;` : ''}
            ${errorCss['font-size'] ? `font-size: ${errorCss['font-size']} !important;` : ''}
            ${errorCss['margin-top'] ? `margin-top: ${errorCss['margin-top']} !important;` : ''}
            ${errorCss['min-height'] ? `min-height: ${errorCss['min-height']} !important;` : ''}
        }
        @media (max-width: 1000px) {
            .${containerClass} {
                ${width_mobile ? `width: ${width_mobile} !important;` : 'width: 95%;'}
                ${height_mobile ? `height: ${height_mobile} !important;` : ''}
                padding: 2.5% 1.5%;
            }
        }
        @media (prefers-color-scheme: light) {
            .${containerClass} {
                ${bg_light ? `background: ${bg_light} !important;` : 'background: #fff;'}
                ${color_light ? `color: ${color_light} !important;` : 'color: #222;'}
            }
            .${fieldClass} {
                background: #ededed;
                color: #222;
                border: 0.3% solid #bbb;
                ${fieldCss['background'] ? `background: ${fieldCss['background']} !important;` : ''}
                ${fieldCss['color'] ? `color: ${fieldCss['color']} !important;` : ''}
                ${fieldCss['border'] ? `border: ${fieldCss['border']} !important;` : ''}
            }
        }
        @media (prefers-color-scheme: dark) {
            .${containerClass} {
                ${bg_dark ? `background: ${bg_dark} !important;` : 'background: #181818;'}
                ${color_dark ? `color: ${color_dark} !important;` : 'color: #cdcdcd;'}
            }
            .${fieldClass} {
                background: #222;
                color: #cdcdcd;
                border: 0.3% solid #888;
                ${fieldCss['background'] ? `background: ${fieldCss['background']} !important;` : ''}
                ${fieldCss['color'] ? `color: ${fieldCss['color']} !important;` : ''}
                ${fieldCss['border'] ? `border: ${fieldCss['border']} !important;` : ''}
            }
        }
    `;

    // Garante que o CSS é exclusivo para esta instância
    $(`<style id="style-${uniqueId}">${customCSS}</style>`).appendTo('head');

    // Cria elementos
    const $container = $(`<div class="${containerClass}"></div>`);
    const $label = $(`<label class="${labelClass}" for="${input_id}"></label>`).text(email_label);
    const $input = $(`<input
        type="email"
        class="${fieldClass}"
        id="${input_id}"
        name="${email_name}"
        placeholder="${email_placeholder}"
        autocomplete="email"
        ${required ? 'required' : ''}
    >`);
    $input.val(email_value);
    const $error = $(`<div class="${errorClass}" id="${input_id}-error"></div>`);

    $container.append($label, $input, $error);

    // Aplica CSS customizado via objeto (propriedades passadas por parâmetro)
    // (Já aplicadas via CSS exclusivo acima, mas se quiser sobrescrever inline, pode descomentar abaixo)
    // if (Object.keys(containerCss).length) $container.css(containerCss);
    // if (Object.keys(labelCss).length) $label.css(labelCss);
    // if (Object.keys(fieldCss).length) $input.css(fieldCss);
    // if (Object.keys(errorCss).length) $error.css(errorCss);

    // Aplica CSS customizado via string (parametro "style") no CONTAINER
    if (customStyle && typeof customStyle === 'string') {
        $container.attr('style', ($container.attr('style') || '') + ';' + customStyle);
    }

    // Função de validação de e-mail
    function validateEmail(inputElem, errorElem) {
        const value = inputElem.value.trim();
        // Regex cobre a maioria dos e-mails válidos
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (value === '') {
            errorElem.text('O e-mail é obrigatório.');
            inputElem.setCustomValidity('E-mail obrigatório');
            if (on_invalid) on_invalid(value);
        } else if (!emailRegex.test(value)) {
            errorElem.text('Digite um e-mail válido.');
            inputElem.setCustomValidity('E-mail inválido');
            if (on_invalid) on_invalid(value);
        } else {
            errorElem.text('');
            inputElem.setCustomValidity('');
            if (on_valid) on_valid(value);
        }
    }

    // Eventos
    $input.on('input', function() {
        validateEmail(this, $error);
    });

    // Evento de click customizado
    if (on_click) {
        $input.on('click', function(e) {
            on_click(e, $input, $container);
        });
    }

    // Validação inicial se já tem valor
    if (email_value) {
        setTimeout(() => validateEmail($input[0], $error), 0);
    }

    // Retorna o container jQuery
    return $container;
}

/*
Exemplo de uso:
import input_email from './input_email.js';

const $email = input_email({
    email_label: 'E-mail do usuário',
    email_name: 'email_usuario',
    email_placeholder: 'Digite o e-mail',
    email_value: '',
    required: true,
    on_valid: (email) => { console.log('E-mail válido:', email); },
    on_invalid: (email) => { console.log('E-mail inválido:', email); },
    on_click: (e, $input, $container) => { alert('Clicou no input!'); },
    style: 'background: #ffe; color: #222; border: 2px solid #f90;',
    width_desktop: '60%',
    width_mobile: '98vw',
    height_desktop: 'auto',
    height_mobile: 'auto',
    bg_light: '#fff',
    bg_dark: '#222',
    color_light: '#222',
    color_dark: '#cdcdcd'
    // Você pode passar também qualquer propriedade CSS diretamente:
    // background: '#ffe', color: '#222', border: '2px solid #f90'
});

$('#algum-container').append($email);

// Cópia rápida de parâmetros:
// {email_label: 'E-mail', email_name: 'email', email_placeholder: 'Digite seu e-mail', email_value: '', required: true, input_id: '', on_valid: null, on_invalid: null, on_click: null, style: '', width_desktop: '', width_mobile: '', height_desktop: '', height_mobile: '', bg_light: '', bg_dark: '', color_light: '', color_dark: ''}
*/