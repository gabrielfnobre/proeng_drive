import * as gt from '../../universal/tag_blocks/global_tags.js';
import * as ct from './commons.js';

export default function form_return_car(name, plate, year, initial_km, actual_km, location=undefined, status=undefined){
    return gt.form('overview', {
        align_desktop: 'center',
        align_mobile: 'flex-start',
        id: 'form_return',
        style: 'margin-bottom: 50px',
        width_desktop: '80%',
        width_mobile: '100%',
        content: [
            gt.input_text({
                bg_dark: 'transparent',
                label: 'NOME E MARCA DO CARRO:',
                placeholder: name,
                required: true, 
                style: `
                    padding: 0;
                `,
            }),
            gt.input_text({
                bg_dark: 'transparent',
                label: 'PLACA DO CARRO:',
                placeholder: plate,
                required: true, 
                style: `
                    padding: 0;
                `,
            }),
            gt.input_integer({
                bg_dark: 'transparent',
                label: 'ANO DO CARRO:',
                placeholder: year, 
                required: true, 
                style: `
                    padding: 0; 
                    width_desktop: "100%";
                `,
            }),
            gt.input_integer({
                bg_dark: 'transparent',
                label: 'KM INICIAL DO CARRO (km do carro assim que a empresa começou a utilizá-lo):',
                placeholder: initial_km, 
                required: true, 
                style: `
                    padding: 0; 
                    width_desktop: "100%";
                `,
            }),
            gt.input_integer({
                bg_dark: 'transparent',
                label: 'KM ATUAL DO CARRO:',
                placeholder: actual_km, 
                required: true, 
                style: `
                    padding: 0; 
                    width_desktop: "100%";
                `,
            }),
            gt.input_text({
                bg_dark: 'transparent',
                label: 'LOCALIZAÇÃO DO CARRO',
                placeholder: location,
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
                        text: 'SALVAR ALTERAÇÕES',
                        on_click: () => alert('Carro foi removido!'),
                        submit: true,
                    }),
                ]
            }),
        ] 
    });
}
