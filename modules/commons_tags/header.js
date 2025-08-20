import * as gt from '../../universal/tag_blocks/global_tags.js';

export default function header(){
    return gt.header('dinamics', {
        bg_dark: "#181818",
        height_desktop: "14vh",
        header_fixed: true,
        height_mobile: "10vh",
        padding: '10px',
        style: `
        background: white;
        border-bottom: .5px solid #ccc;
        padding: 1vh;
        `,
        header_content: [
            
            // LOGO
            gt.image_center({
                height_desktop: '100%',
                image_size_desktop: '20vh',
                image_size_mobile: '9vh',
                on_click: () => window.location.href = "./modules/dashboard/pages/dashboard.html",
                size_percent: 90,
                style: "margin-left: 10px",
                width_desktop: '20%',
                width_mobile: '30%',
            }),
            
            gt.spacer(),
    
            // USUÁRIO
            gt.user_top_page({ 
                user_photo: false, 
                user_name: 'João da Silva', 
                user_profession: 'Desenvolvedor', 
                user_pending_count: 3, 
                user_status_text: 'Online', 
                user_status_color: '#2ecc40', 
                on_click: () => alert('Clicou no topo do usuário!'), 
                width_desktop: '20%',
                width_mobile: '55%',
            }),
        ],
    });
}
