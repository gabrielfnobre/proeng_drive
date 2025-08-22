import * as gt from '../../universal/tag_blocks/global_tags.js';
import * as ct from './commons.js';

export default function form_return_car(){
    return gt.form('overview', {
        align_desktop: 'center',
        align_mobile: 'flex-start',
        id: 'form_return',
        style: 'margin-bottom: 50px',
        width_desktop: '80%',
        width_mobile: '100%',
        content: [
            gt.input_integer({
                bg_dark: 'transparent',
                label: 'QUAL O KM DO CARRO AGORA?',
                placeholder: 'Km atual', 
                required: true, 
                style: `
                    padding: 0; 
                    width_desktop: "100%";
                `,
            }),
            gt.div('form_return',{
                align_desktop: 'center',
                id: 'cnt_gasoline',
                flex_desktop: 'row',
                width_desktop: '80%',
                content: [
                    gt.select_option({
                        bg_dark: 'transparent',
                        label: 'FOI ABASTECIDO?',
                        options: ["SIM", "NÃO"],
                        required: true, 
                        style: `
                            margin-right: 10px;
                            padding: 0;
                        `,
                        width_desktop: '50%',
                     }),
                    gt.input_float({
                        bg_dark: 'transparent',
                        type_coin: 'R$',
                        label: 'VALOR',
                        placeholder: '0,00',
                        required: true, 
                        style: `
                            padding: 0;
                        `,
                        width_desktop: '50%',
                    })
                ]
            }),
            gt.select_option({
                bg_dark: 'transparent',
                label: 'ESTE CARRO VAI FICAR...',
                options: [
                    "disponível",
                    "bloqueado",
                    "em manutenção", 
                ],
                required: true, 
                style: `
                    padding: 0;
                `,
            }),
            gt.input_text({
                bg_dark: 'transparent',
                label: 'ONDE VOCÊ ESTÁ DEIXANDO O CARRO?',
                placeholder: 'Local onde o carro vai ficar...',
                required: true, 
                style: `
                    padding: 0;
                `,
            }),
            gt.input_textarea({
                bg_dark: 'transparent',
                label: 'OBSERVAÇÕES',
                placeholder: 'Digite alguma observação que você deseje deixar...',
                max_text: 200,
                style: `
                    padding: 0;
                `,
            }),
            gt.button({
                text: 'DEVOLVER',
                submit: true,
                on_click: () => alert('Carro foi devolvido!'),
            })
        ] 
    });
}
