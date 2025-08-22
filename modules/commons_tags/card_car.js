import * as gt from '../../universal/tag_blocks/global_tags.js';
import * as ct from './commons.js';

export default function card_car(car_name, plate, year, status, location, image_car){
    return gt.div('overview', {
        bg_dark: "#2a2a2a",
        id: 'cars_details',
        on_click: () => window.location.href = './modules/dashboard/pages/to_use_car.html',
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
            // CNT CAR
            ct.cnt_car_description('car_details', image_car, car_name, plate, year, status, location),
        ]
    });
}
