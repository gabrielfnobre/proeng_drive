/**
 * Reads a JSON file from a given path and returns it as a key-value object.
 * @param {string} path - Path to the JSON file.
 * @returns {Promise<Object>} - Returns a Promise that resolves to the JSON object.
 */
export async function readMyJSON(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Error reading JSON file: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error reading JSON:", error);
        throw error;
    }
}

