import * as gt from '../../universal/tag_blocks/global_tags.js';
import * as ct from './commons.js';

export default function form_to_use_car(){
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
            gt.select_option({
                bg_dark: 'transparent',
                label: 'ESTE CARRO VAI FICAR...',
                options: [
                    "em uso",
                    "reservado", 
                ],
                required: true, 
                style: `
                    padding: 0;
                `,
            }),
            gt.input_text({
                bg_dark: 'transparent',
                label: 'PARA ONDE VOCÊ VAI COM ESTE CARRO?',
                placeholder: 'Lugar para onde você vai...',
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
                text: 'USAR',
                submit: true,
                on_click: () => alert('Carro foi devolvido!'),
            })
        ] 
    });
}
