import * as gt from '../../universal/tag_blocks/global_tags.js';
import * as ct from './commons.js';

export default function form_remove_car(){
    return gt.form('overview', {
        align_desktop: 'center',
        align_mobile: 'flex-start',
        id: 'form_remove',
        style: 'margin-bottom: 50px',
        width_desktop: '80%',
        width_mobile: '100%',
        content: [
            gt.input_textarea({
                bg_dark: 'transparent',
                label: 'QUAL O MOTIVO DA REMOÇÃO?',
                max_text: 200,
                placeholder: 'Você deve obrigatóriamente detalhar o motivo pelo qual o carro deve ser removido...',
                required: true,
                style: `
                    padding: 0;
                `,
            }),
            gt.div('form_remove', {
                id: 'cnt_buttons',
                flex_desktop: 'row',
                style: "gap: 20px;",
                width_desktop: '100%',
                content: [
                    gt.button({
                        text: 'VOLTAR',
                        on_click: () => window.history.back(),
                    }),
                    gt.button({
                        text: 'REMOVER',
                        on_click: () => alert('Carro foi removido!'),
                        style: "background: red",
                        submit: true,
                    }),
                ]
            }),
        ] 
    });
}
