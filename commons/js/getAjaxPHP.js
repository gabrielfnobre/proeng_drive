/**
 * @description Its a async function that calls a php document that executes a query sql, passing parameters through the post method.
 * @param {string} path string path
 * @param  {...any} params passing a string with key value sequentially, example: 'key', 'value', 'key', 'value'
 */
export async function getAjaxPHP(path, ...params){
    try {
        const response = await $.ajax({url: path,
                type: 'POST',
                data: toObjs(params)
            });
        return response;
    } catch (error){
        console.error("Error: ", error);
        throw error; 
    }
}

/**
 * @description This function receives an array with a list sequential of key and values, for example index 0 is a key, index 1 is a value. And transforms they on an object key value;
 * @param {Array} args 
 */
function toObjs(args){
    const obj = {};
    for(let i = 0; i < args.length; i += 2){
         const key = args[i];
         const value = args[i + 1];
         obj[key] = value;
    }
    return obj;
}