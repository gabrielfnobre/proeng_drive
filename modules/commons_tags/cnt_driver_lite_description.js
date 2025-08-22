import * as gt from '../../universal/tag_blocks/global_tags.js';

export default function cnt_driver_lite_description(id, image_path = './universal/images/avatar_generics.png', name_title='Motorista', name, department){
    return gt.div(id, {
        style: "display: flex",
        width_desktop: '100%',
        width_mobile: '100%',
        content: [
            //CONTAINER VERTICAL - IMAGEM DO USUARIO
            gt.div(id, {
                style: `
                justify-content: center;
                display: flex;
                flex-direction: column;
                padding: 10px;
                `,
                width_desktop: '30%',
                width_mobile: '30%',
                content: [
                    gt.image_center({
                        bg_dark: 'transparent', 
                        image_size_desktop: '5vw', image_size_mobile: '15vw',
                        image_path: image_path,
                        is_circle: true,
                        style: `
                        background-color: lightgray;
                        box-shadow: 4px 4px 10px rgba(0,0,0,.5);
                        `,
                        width_mobile: '20vw'}),
                ],
            }),

            //CONTAINER VERTICAL - DESCRIÇÕES DO USUARIO
            gt.div(id, {
                style: "display: flex; flex-direction: column; padding: 10px; justify-content: center; margin-left: 10px",
                width_desktop: '70%',
                width_mobile: '70%',
                content: [
                    gt.text({
                        text_content: `<b>${name_title}:</b> ${name}`,
                        style: `
                        text-align: left;
                        margin: 0;
                        width: 100%;
                        `,
                    }),
                    gt.text({
                        text_content: `<b>Departamento:</b> ${department}`,
                        style: `
                        text-align: left;
                        margin: 0;
                        width: 100%;
                        `,
                    }),
                ],
            }),
        ],
    });
}
