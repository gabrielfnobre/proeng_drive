import * as gt from '../../universal/tag_blocks/global_tags.js';

export default function cnt_location_description(id, description, image_path = './universal/images/location.png', title = 'Destino'){
    return gt.div(id, {
        style: `
        display: flex;
        `,
        width_desktop: '50%',
        width_mobile: '100%',
        content: [

            //CONTAINER VERTICAL - IMAGEM DA LOCALIZAÇÃO
            gt.div(id, {
                style: `
                display: flex;
                flex-direction: column;
                padding: 10px;
                `,
                width_desktop: '30%',
                width_mobile: '30%',
                content: [
                    gt.image_center({
                        bg_dark: 'transparent',
                        image_size_desktop: '5vw',
                        image_size_mobile: '15vw',
                        image_path: image_path,
                        is_circle: true,
                        style: `
                        background-color: lightgray;
                        box-shadow: 4px 4px 10px rgba(0,0,0,.5);
                        `,
                        height_mobile: '20vw',
                        width_mobile: '20vw',
                    }),
                ],
            }),

            //CONTAINER VERTICAL - DESCRIÇÕES DA LOCALIZAÇÃO
            gt.div(id, {
                style: `
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: 10px;
                padding: 10px;
                `,
                width_desktop: '70%',
                width_mobile: '70%',
                content: [
                    gt.text({
                        text_content: `${title}`,
                        style: `
                        font-size: 2.4vh;
                        font-weight: bold;
                        text-align: left;
                        margin: 0;
                        width: 100%;
                        `,
                    }),
                    gt.text({
                        text_content: `${description}`,
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
