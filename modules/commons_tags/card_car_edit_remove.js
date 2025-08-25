import * as gt from '../../universal/tag_blocks/global_tags.js';
import * as ct from './commons.js';

export default function card_car_edit_remove(car_name, plate, year, status, location, image_car){
    return gt.div('overview', {
        bg_dark: "#2a2a2a",
        id: `cars_details_${plate}`,
        flex_desktop: 'row',
        flex_mobile: 'column',
        style: `
        border-radius: 10px;
        box-shadow: 4px 4px 10px rgba(39, 28, 28, 0.5);
        padding: 10px;
        `,
        width_desktop: '50vw',
        width_mobile: '100%',
        content: [
            gt.div('cars_details', {
                id: `cnt_car_${plate}`,
                width_desktop: '70%',
                width_mobile: '100%',
                content: [
                    // CNT CAR
                    ct.cnt_car_description('car_details', image_car, car_name, plate, year, status, location),
                ]
            }),
            gt.div('cars_details', {
                id: `cnt_edit_or_remove_${plate}`,
                flex_desktop: 'row',
                flex_mobile: 'row',
                style: `
                    align-items: center;
                    gap: 10px;
                    justify-content: center;
                `,
                width_desktop: '30%',
                width_mobile: '100%',
                content: [
                    //REMOVER CARRO
                    gt.div('overview', {
                        id: 'add_car',
                        height_desktop: '5vw',
                        height_mobile: '20vw',
                        style: `
                            background: linear-gradient(145deg, #fb5656, darkred);
                            border-radius: 50%;
                            justify-content: center;
                            min-height: 10vh;
                            padding: 10px;
                        `,
                        on_click: () => window.location.href = './modules/dashboard/pages/remove_car.html',
                        width_desktop: '5vw',
                        width_mobile: '20vw',
                        content: [
                            gt.text({
                                color: 'white',
                                style: `
                                    font-size: 1.2vh;
                                    font-weight: bold;
                                    margin: 0;
                                `,
                                text_content: 'REMOVER',
                            }),
                        ]
                    }),
                    //EDITAR CARRO
                    gt.div('overview', {
                        id: 'add_car',
                        height_desktop: '5vw',
                        height_mobile: '20vw',
                        style: `
                            background: linear-gradient(145deg, #3bc8f5, blue);
                            border-radius: 50%;
                            justify-content: center;
                            min-height: 10vh;
                            padding: 10px;
                        `,
                        on_click: () => window.location.href = './modules/dashboard/pages/edit_car.html',
                        width_desktop: '5vw',
                        width_mobile: '20vw',
                        content: [
                            gt.text({
                                color: 'white',
                                style: `
                                    font-size: 1.2vh;
                                    font-weight: bold;
                                    margin: 0;
                                `,
                                text_content: 'EDITAR',
                            }),
                        ]
                    }),
                ],
            })
        ]
    });
}
