import { captalize } from "../../../commons/js/captalize.js";
import * as conn from "../../../commons/js/conn_db.js";

function detailsOfCollab(gt, line){
    let values
    (async _ => {
        values = await conn.SELECT_ONE_FROM_WHERE({
            db: 'aplicacao_db',
            table: 'SRA',
            column: 'Nome',
            singular_value: line['Nome'],
            order_column: 'Matricula',
            asc_or_desc: 'DESC',
        })
        
        gt.overlay_modal({fade_in: true})
        gt.box_container('of-overlay-modal', {
            style: "width: 50%",
            box_content: [
                gt.close_button({close_btn_shadow: 'true'}),
                gt.text({text_content: `
                    <h3 style="color: #12ab12">Detalhes...</h3>
                    <p>
                        <b>Nome:</b> ${captalize(values['Nome'])}<br>
                        <hr>
                        <b>Matrícula:</b> ${values['Matricula']}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Data nascimento:</b> ${values['Data Nasc.']}<br>
                    </p>
                `,
                style: "text-align: left"
                }),
            ]
        })

    })();
}

function iWantKnowMore(gt){
    gt.overlay_modal({fade_in: true})
    gt.box_container('of-overlay-modal', {
        box_content: [
            gt.close_button({close_btn_shadow: 'true'}),
            gt.text({text_content: `
                <h1 style="color: #12ab12">Bem-vindo<br>ao OneFlow 🚀</h1>
                <p>
                    O OneFlow foi criado para facilitar a coleta e o trânsito de informações entre os departamentos da empresa 🏭.<br><br>
                    
                    Com ele, você preenche dados de forma simples, acompanha status de solicitações com agilidade e garante que todos estejam sempre atualizados!<br><br>
                    
                    <span style="color: #12ab12"><b>Mais agilidade, organização e transparência para o seu dia a dia.</b></span> 😉
                </p>
            `,
            style: "text-align: left",
            }),
        ],
        width_desktop: "45%"
    })
}

function inputSearch(gt, id){
    gt.div(id, {
        style: "width: 100%; padding: 1.5vh; border-radius: 1vh; box-shadow: 2px 2px 8px rgba(0,0,0,.5); margin: 1vh",
        content: [
            gt.input_text({
                label: "Procurar Colaborador",
                name: "Search",
                placeholder: "Digite o nome...",
                required: "",
                input_id: `${id}_search`,
                style: "width: 100%; padding: 0; background: transparent",
            })
        ]
    })
}

function searchAnyInDB(gt, id, id_temp_to_loading, pre_render_callback){

    values.forEach((line, idx) => {
        gt.div(id, {
            style: `
                box-shadow: 2px 2px 8px rgba(0,0,0,.5);
                border-radius: 1vh;
                margin: 10px;
                padding: 3vh;
                width: 100%;
            `,
            on_click: () => detailsOfCollab(gt, line),
            content: [
                gt.text({style: "font-size: .80vw; font-weight: bold", text_content: JSON.stringify(line['Nome']).replaceAll('"', '')}),
                gt.text({style: "font-size: .80vw; font-weight: bold", text_content: JSON.stringify(line['Data Nasc.']).replaceAll('"', '')}),
            ]
        });
    });
}

function showCardOfAll(gt, values, id){
    values.forEach((line, idx) => {
        gt.div(id, {
            style: `
                box-shadow: 2px 2px 8px rgba(0,0,0,.5);
                border-radius: 1vh;
                margin: 10px;
                padding: 3vh;
                width: 100%;
            `,
            on_click: () => detailsOfCollab(gt, line),
            content: [
                gt.text({style: "font-size: .80vw; font-weight: bold", text_content: JSON.stringify(line['Nome']).replaceAll('"', '')}),
            ]
        });
    });
}

export { 
    iWantKnowMore,
    inputSearch,
    searchAnyInDB,
    showCardOfAll,
};