
import { dirname } from 'path'
import { fileURLToPath } from 'url'

// * In ES Modules, __dirname is not available by default *
// However, you can derive it using the url module's fileURLToPath function 
//  along with import.meta.url and the path module's dirname function.

/**
 * @params {string} importMetaUrl - import.meta.url
*/
export function getDirname(importMetaUrl) {
	return dirname(fileURLToPath(importMetaUrl))
}
