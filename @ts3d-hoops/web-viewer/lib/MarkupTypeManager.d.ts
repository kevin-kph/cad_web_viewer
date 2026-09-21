/**
 * The markup manager exports JSON data for markup in the scene. By default, it will export "views", "notes", "measurement", and "lines".
 * To add a custom markup class to be exported and imported along with other markup items, you can register a custom markup type manager.
 *
 * The custom markup manager needs two functions:
 * - exportMarkup creates an array of JSON markup data.
 * - loadData takes an array of JSON markup data and creates markup items.
 */
export declare class MarkupTypeManager {
    /**
     * @returns JSON Array containing markup data.
     */
    exportMarkup(): object[];
    /**
     * Loads JSON markup data
     * @param _ JSON Array containing markup data.
     */
    loadData(_: any[]): Promise<boolean[]>;
}
