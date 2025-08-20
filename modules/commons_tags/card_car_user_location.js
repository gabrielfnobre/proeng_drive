import * as gt from '../../universal/tag_blocks/global_tags.js';
import * as ct from './commons.js';

export default function card_car_user_location(car_name, plate, year, status, location, driver_title, driver_name, department, destiny_title, destiny, image_car, image_driver, image_destiny){
    return gt.div('overview', {
        bg_dark: "#2a2a2a",
        id: 'cars_details',
        style: `
        border-radius: 10px;
        box-shadow: 4px 4px 10px rgba(39, 28, 28, 0.5);
        display: flex;
        flex-direction: column;
        padding: 10px;
        `,
        width_desktop: '50vw',
        width_mobile: '100%',
        content: [

            // CNT CARRO
            ct.cnt_car_description('car_details', image_car, car_name, plate, year, status, location),
            
            gt.line_separator(),

            gt.div('cars_details', {
                flex_desktop: 'row',
                content: [
                    // CNT DESCRICAO
                    ct.cnt_driver_lite_description('car_details', image_driver, driver_title, driver_name, department),

                    //CONTAINER HORIZONTAL - LOCALIZAÇÃO
                    ct.cnt_location_description('car_details', destiny, image_destiny, destiny_title)
                ]
            }),
        ],
    });
}
