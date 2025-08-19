import {getAjaxPHP} from './getAjaxPHP.js';

/**
 * "Documentei alguma coisa"
 * @param {*} id 
 * @param {*} id_temp_to_loading 
 * @param {*} gt 
 * @returns 
 */
async function SELECT_ALL_FROM(id, id_temp_to_loading, gt, renderFunction, conn_details) {
    gt.div(id, {id: id_temp_to_loading, style: "width: 100%", content: gt.image_center({style:"width: 8vh", image_path: './universal/images/loading_blue.gif'})})

    let values = await getAjaxPHP('/one_flow/commons/php/X_select_all_from.php', 
        'host', 'aplicacao_db.vpshost11579.mysql.dbaas.com.br', 
        'user', 'aplicacao_db', 
        'password', 'Aplicacao@2025', 
        'db_name', conn_details.db,
        'table', conn_details.table,
        'order_by', conn_details.order_by,
        'sorting_by', conn_details.sorting_by,
        'casting_integer', conn_details.casting_integer ? conn_details.casting_integer : 'false',
        'casting_date', conn_details.casting_date ? conn_details.casting_date : 'false',
        'set_columns', conn_details.columns,
    ).then(value => JSON.parse(value));
    
    $(`#${id_temp_to_loading}`).remove();

    (async _ => {
        renderFunction(gt, values, id);
        return values;
    })();
    
}

async function SELECT_ONE_FROM_WHERE(conn_details) {
    let response = await getAjaxPHP(
        '/one_flow/commons/php/X_search_for_a_single_record_using_order_column.php',
        'host', 'aplicacao_db.vpshost11579.mysql.dbaas.com.br',
        'user', 'aplicacao_db',
        'password', 'Aplicacao@2025',
        'db_name', conn_details.db,
        'table', conn_details.table,
        'column', conn_details.column ?? 'ID',
        'singular_value', conn_details.singular_value ?? '',
        'order_column', conn_details.order_column ?? 'ID',
        'asc_or_desc', conn_details.asc_or_desc ?? 'DESC',
    );

    let values;
    try {
        // Se já for objeto, não tenta fazer parse
        if (typeof response === "object") {
            values = response;
        } else if (
            typeof response === "string" &&
            (response.trim().startsWith("{") || response.trim().startsWith("["))
        ) {
            values = JSON.parse(response);
        } else if (
            typeof response === "string" &&
            response.trim() === "[object Object]"
        ) {
            // Corrige caso o PHP faça echo de um array/objeto sem json_encode
            console.error("Resposta do PHP não está em JSON. Verifique se está usando json_encode no PHP.", response);
            values = null;
        } else {
            // Tenta parsear mesmo assim, mas provavelmente vai dar erro
            values = JSON.parse(response);
        }
    } catch (e) {
        console.error("Erro ao fazer parse do JSON retornado:", e, response);
        values = null;
    }

    return values;
}

async function SELECT_ALL_FROM_WHERE(id, id_temp_to_loading, gt, pre_render_callback, render_callback, conn_details) {

    pre_render_callback(gt, id);

    if ($(`#${id_temp_to_loading}_results`).length === 0) {
        $(`#${id}`).append(`<div id="${id_temp_to_loading}_results" style="width: 100%"></div>`);
    }

    $(`#${id}_search`).off('input.conn_db').on('input.conn_db', async () => {
        let input_value = $(`#${id}_search`).val();
        $(`#${id_temp_to_loading}_results`).html('');
        gt.div(`${id_temp_to_loading}_results`, { style: "width: 100%", content: gt.text({text_content: 'Sem Resultados'})});

        let values = await getAjaxPHP('/one_flow/commons/php/X_select_columns_from_case_column.php', 
            'host', 'aplicacao_db.vpshost11579.mysql.dbaas.com.br', 
            'user', 'aplicacao_db', 
            'password', 'Aplicacao@2025', 
            'db_name', conn_details.db,
            'table', conn_details.table,
            'order_by', conn_details.order_by,
            'sorting_by', conn_details.sorting_by,
            'casting_integer', conn_details.casting_integer ? conn_details.casting_integer : 'false',
            'casting_date', conn_details.casting_date ? conn_details.casting_date : 'false',
            'set_columns', conn_details.columns,
            'column1', conn_details.column1 ? conn_details.column1 : 'ID',
            'value1', conn_details.value1 ? conn_details.value1 : input_value,
            'column2', conn_details.column2 ? conn_details.column2 : (conn_details.column1 ? conn_details.column1 : 'ID'),
            'value2', conn_details.value2 ? conn_details.value2 : (conn_details.value1 ? conn_details.value1 : input_value),
        )
        .then(value => JSON.parse(value));

        $(`#${id_temp_to_loading}_results`).html('');

        render_callback(gt, values, `${id_temp_to_loading}_results`);
    });
}

export {
   SELECT_ALL_FROM,
   SELECT_ALL_FROM_WHERE,
   SELECT_ONE_FROM_WHERE,
}