/**
 * input_password.js
 * Retorna um elemento jQuery de input de senha com botão de mostrar/ocultar e validação opcional, pronto para ser inserido em um container.
 * 
 * @param {object} options - Parâmetros de configuração:
 *      - password_label: string (label do campo, default: 'Senha')
 *      - password_name: string (atributo name do input, default: 'password')
 *      - password_placeholder: string (placeholder do input, default: 'Sua senha')
 *      - password_value: string (valor inicial do input, default: '')
 *      - required: boolean (se o campo é obrigatório, default: true)
 *      - input_id: string (id do input, default: gerado único)
 *      - password_exists_func: function (callback para validar senha, recebe valor, pode ser async, default: null)
 *      - on_click: function (callback executado ao clicar no input, default: null)
 *      - style: string (CSS customizado para sobrescrever estilos do container)
 *      - width_desktop: string (largura do componente no desktop, ex: '80%', '400px')
 *      - width_mobile: string (largura do componente no mobile, ex: '95%', '100vw')
 *      - height_desktop: string (altura do componente no desktop, ex: 'auto', '60px')
 *      - height_mobile: string (altura do componente no mobile, ex: 'auto', '60px')
 *      - bg_light: string (cor de fundo para modo light, ex: '#fff')
 *      - bg_dark: string (cor de fundo para modo dark, ex: '#181818')
 *      - color_light: string (cor do texto para modo light, ex: '#222')
 *      - color_dark: string (cor do texto para modo dark, ex: '#cdcdcd')
 *      - Qualquer outro parâmetro de CSS pode ser passado usando o nome exato da propriedade CSS (ex: background, color, border, etc)
 * @returns {jQuery} - Elemento jQuery pronto para uso
 * @copia_rapida_de_parametros
    {password_label: 'Senha', password_name: 'password', password_placeholder: 'Sua senha', password_value: '', required: true, input_id: '', password_exists_func: null, on_click: null, style: '', width_desktop: '', width_mobile: '', height_desktop: '', height_mobile: '', bg_light: '', bg_dark: '', color_light: '', color_dark: ''}
 */

let inputPasswordIdCounter = 0;

export default function input_password(options = {}) {
    // Cópia rápida de parâmetros
    const password_label = options.password_label !== undefined ? options.password_label : 'Senha';
    const password_name = options.password_name !== undefined ? options.password_name : 'password';
    const password_placeholder = options.password_placeholder !== undefined ? options.password_placeholder : 'Sua senha';
    const password_value = options.password_value !== undefined ? options.password_value : '';
    const required = options.required !== undefined ? !!options.required : true;
    const password_exists_func = typeof options.password_exists_func === 'function' ? options.password_exists_func : null;
    const on_click = typeof options.on_click === 'function' ? options.on_click : null;
    const input_id = options.input_id || `input-password-${++inputPasswordIdCounter}`;
    const customStyle = typeof options.style === 'string' ? options.style : '';

    // Novos parâmetros para controle de tamanho e cores por modo
    const width_desktop = options.width_desktop || '';
    const width_mobile = options.width_mobile || '';
    const height_desktop = options.height_desktop || '';
    const height_mobile = options.height_mobile || '';
    const bg_light = options.bg_light || '';
    const bg_dark = options.bg_dark || '';
    const color_light = options.color_light || '';
    const color_dark = options.color_dark || '';

    // Coleta propriedades CSS customizadas passadas diretamente (ex: background, color, border, etc)
    // Só aplica em .input-password-container, .input-password-label, .input-password-field, .input-password-error
    const cssTargets = {
        container: [
            "width", "display", "flex-direction", "justify-content", "margin", "padding", "background", "border-radius", "color", "border", "box-shadow", "height"
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

    // Cria elementos
    const $container = $('<div class="input-password-container"></div>');
    const $label = $(`<label class="input-password-label" for="${input_id}"></label>`).text(password_label);
    const $fieldWrapper = $('<div class="input-password-field-wrapper"></div>');
    const $input = $(`<input
        type="password"
        id="${input_id}"
        class="input-password-field"
        name="${password_name}"
        placeholder="${password_placeholder}"
        autocomplete="current-password"
        ${required ? 'required' : ''}
    >`);
    $input.val(password_value);

    // Aplica CSS customizado no container, se houver
    if (Object.keys(containerCss).length > 0) {
        $container.css(containerCss);
    }
    // Aplica CSS customizado no label, se houver
    if (Object.keys(labelCss).length > 0) {
        $label.css(labelCss);
    }
    // Aplica CSS customizado no input, se houver
    if (Object.keys(fieldCss).length > 0) {
        $input.css(fieldCss);
    }

    // Botão de mostrar/ocultar senha
    const $toggleBtn = $(`
        <button type="button" class="input-password-toggle" tabindex="0" aria-label="Mostrar/ocultar senha">
            <svg id="eye-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path id="eye-open" d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8a3 3 0 100 6 3 3 0 000-6z" fill="currentColor"/>
                <path id="eye-closed" style="display:none" d="M1 1l22 22M17.94 17.94A9.77 9.77 0 0112 19c-5 0-9.27-3.11-11-7a11.72 11.72 0 013.06-4.44M6.1 6.1A9.77 9.77 0 0112 5c5 0 9.27 3.11 11 7a11.72 11.72 0 01-2.1 3.18M9.5 9.5a3 3 0 004.24 4.24" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
        </button>
    `);

    const $error = $(`<div class="input-password-error" id="${input_id}-error"></div>`);
    // Aplica CSS customizado no erro, se houver
    if (Object.keys(errorCss).length > 0) {
        $error.css(errorCss);
    }

    $fieldWrapper.append($input, $toggleBtn);
    $container.append($label, $fieldWrapper, $error);

    // Aplica style string customizada no container, se houver
    if (customStyle) {
        $container.attr('style', ($container.attr('style') || '') + ';' + customStyle);
    }

    // Gera um id único para o bloco de estilos deste componente
    const styleId = `input-password-style-${input_id}`;
    if (!document.getElementById(styleId)) {
        // CSS base (não interfere em outros componentes)
        let style = `
            <style id="${styleId}">
            #${input_id}.input-password-container {
                width: ${width_desktop || '80%'};
                ${height_desktop ? `height: ${height_desktop};` : ''}
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin: 2% auto;
                padding: 4% 2.5%;
                background: ${bg_dark || '#181818'};
                border-radius: 5px;
                color: ${color_dark || '#cdcdcd'};
                box-sizing: border-box;
            }
            #${input_id} .input-password-label {
                margin-bottom: 1.5%;
                font-size: 100%;
                font-weight: 500;
            }
            #${input_id} .input-password-field-wrapper {
                position: relative;
                width: 100%;
                display: flex;
                align-items: center;
            }
            #${input_id} .input-password-field {
                padding: 4% 3%;
                border: 0.3% solid #888;
                border-radius: 5px;
                font-size: 100%;
                background: #222;
                color: #cdcdcd;
                outline: none;
                transition: border 0.2s;
                border: none;
                width: 100%;
                box-sizing: border-box;
            }
            #${input_id} .input-password-field:focus {
                border-color: #4a90e2;
            }
            #${input_id} .input-password-toggle {
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                cursor: pointer;
                padding: 0 6px;
                display: flex;
                align-items: center;
                color: #888;
                font-size: 1.2em;
            }
            #${input_id} .input-password-toggle:focus {
                outline: none;
                color: #4a90e2;
            }
            #${input_id} .input-password-error {
                color: #e74c3c;
                font-size: 95%;
                margin-top: 1.2%;
                min-height: 2.5%;
            }
            @media (max-width: 1000px) {
                #${input_id}.input-password-container {
                    width: ${width_mobile || '95%'};
                    ${height_mobile ? `height: ${height_mobile};` : ''}
                    padding: 2.5% 1.5%;
                }
            }
            @media (prefers-color-scheme: light) {
                #${input_id}.input-password-container {
                    background: ${bg_light || '#fff'};
                    color: ${color_light || '#222'};
                }
                #${input_id} .input-password-field {
                    background: #ededed;
                    color: ${color_light || '#222'};
                    border: 0.3% solid #bbb;
                }
                #${input_id} .input-password-toggle {
                    color: #888;
                }
            }
            @media (prefers-color-scheme: dark) {
                #${input_id}.input-password-container {
                    background: ${bg_dark || '#181818'};
                    color: ${color_dark || '#cdcdcd'};
                }
                #${input_id} .input-password-field {
                    background: #222;
                    color: ${color_dark || '#cdcdcd'};
                    border: 0.3% solid #888;
                }
                #${input_id} .input-password-toggle {
                    color: #888;
                }
            }
            </style>
        `;
        $('head').append(style);
    }

    // Garante que o container tenha o id único para o escopo do CSS
    $container.attr('id', input_id);

    // Função de validação de senha
    function validatePassword(inputElem, errorElem, passwordExistsFunc) {
        const value = inputElem.value;

        if (value === '') {
            errorElem.text('A senha é obrigatória.');
            inputElem.setCustomValidity('Senha obrigatória');
            return;
        }

        if (typeof passwordExistsFunc !== 'function') {
            errorElem.text('');
            inputElem.setCustomValidity('');
            return;
        }

        // Suporta função async (Promise)
        const result = passwordExistsFunc(value);
        if (result instanceof Promise) {
            result.then(function(exists) {
                if (!exists) {
                    errorElem.text('Senha incorreta ou não encontrada.');
                    inputElem.setCustomValidity('Senha inválida');
                } else {
                    errorElem.text('');
                    inputElem.setCustomValidity('');
                }
            }).catch(function() {
                errorElem.text('Erro ao validar senha.');
                inputElem.setCustomValidity('Erro ao validar senha');
            });
        } else {
            if (!result) {
                errorElem.text('Senha incorreta ou não encontrada.');
                inputElem.setCustomValidity('Senha inválida');
            } else {
                errorElem.text('');
                inputElem.setCustomValidity('');
            }
        }
    }

    // Alterna a visibilidade do campo de senha e o ícone do olho
    function togglePasswordVisibility($input, $btn) {
        const svg = $btn.find('svg')[0];
        if (!$input.length || !svg) return;
        const eyeOpen = svg.querySelector('#eye-open');
        const eyeClosed = svg.querySelector('#eye-closed');
        if ($input.attr('type') === "password") {
            $input.attr('type', 'text');
            if (eyeOpen && eyeClosed) {
                eyeOpen.style.display = "none";
                eyeClosed.style.display = "";
            }
        } else {
            $input.attr('type', 'password');
            if (eyeOpen && eyeClosed) {
                eyeOpen.style.display = "";
                eyeClosed.style.display = "none";
            }
        }
    }

    // Eventos
    $input.on('input', function() {
        validatePassword(this, $error, password_exists_func);
    });

    // on_click customizado no input, se fornecido
    if (on_click) {
        $input.on('click', function(e) {
            on_click.call(this, e);
        });
    }

    $toggleBtn.on('click', function() {
        togglePasswordVisibility($input, $toggleBtn);
    });

    // Validação inicial se já tem valor
    if (password_value) {
        setTimeout(() => validatePassword($input[0], $error, password_exists_func), 0);
    }

    // Retorna o container jQuery
    return $container;
}

/*
Exemplo de uso:
import input_password from './input_password.js';

const $senha = input_password({
    password_label: 'Senha do usuário',
    password_name: 'senha_usuario',
    password_placeholder: 'Digite a senha',
    password_value: '',
    required: true,
    password_exists_func: (senha) => { return senha === '123456'; }, // ou async
    on_click: function(e) { alert('Input clicado!'); },
    style: 'background: #f5f5f5; border: 2px solid #4a90e2;',
    width_desktop: '400px',
    width_mobile: '98vw',
    height_desktop: 'auto',
    height_mobile: 'auto',
    bg_light: '#f9f9f9',
    bg_dark: '#222',
    color_light: '#333',
    color_dark: '#eee'
});

$('#algum-container').append($senha);

// Cópia rápida de parâmetros:
// {password_label: 'Senha', password_name: 'password', password_placeholder: 'Sua senha', password_value: '', required: true, input_id: '', password_exists_func: null, on_click: null, style: '', width_desktop: '', width_mobile: '', height_desktop: '', height_mobile: '', bg_light: '', bg_dark: '', color_light: '', color_dark: ''}
*/