import * as gt from '../../universal/tag_blocks/global_tags.js';

export default function cnt_car_description(id, image_path = './universal/images/black_car.png', car_name, plate, year, status, location=''){
    return gt.div(id, {
        height_desktop: '10vw',
        height_mobile: 'auto',
        style: `
        display: flex;
        `,
        width_desktop: '100%',
        width_mobile: '100%',
        content: [
            //CONTAINER VERTICAL - IMAGEM DO CARRO
            gt.div('car_details', {
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
                        height_desktop: '10vw',
                        height_mobile: 'auto',
                        image_size_mobile: '25vw',
                        image_path: image_path,
                        style:` 
                        background-size: 100%;
                        `,
                        width_mobile: '25vw',
                    }),
                ],
            }),

            //CONTAINER VERTICAL - DESCRIÇÕES DO CARRO
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
                        text_content: car_name, 
                        style: `
                        font-size: 2.4vh; 
                        font-weight: bold; 
                        margin: 0 0 0 10px;
                        text-align: left;
                        width: 100%;
                        `
                    }),
                    gt.text({
                        text_content: `<b>Placa:</b> ${plate}`, style: `
                        margin: 0 0 0 10px;
                        text-align: left;
                        width: 100%;
                        `
                    }),
                    gt.text({
                        text_content: `<b>Ano:</b> ${year}`,
                        style: `
                        text-align: left;
                        margin: 0 0 0 10px;
                        width: 100%;
                        `
                    }),
                    gt.text({
                        text_content: `<b>Status:</b> ${status}`,
                        style: `
                        text-align: left;
                        margin: 0 0 0 10px;
                        width: 100%;
                        `
                    }),
                    location != '' ? gt.text({
                        text_content: `<b>Localização:</b> ${location}`,
                        style: `
                        text-align: left;
                        margin: 0 0 0 10px;
                        width: 100%;
                        `
                    }) : null,
                ],
            }),
        ],
    });
}
