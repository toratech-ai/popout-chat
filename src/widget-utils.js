/**
 * Deeply merges multiple objects. Later objects overwrite earlier ones.
 * @param {...Object} objects - The objects to merge.
 * @returns {Object} The merged object.
 */
export function deepMerge(...objects) {
  const result = {};

  for (const obj of objects) {
    if (obj) { // Ensure obj is not null or undefined
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            // If it's an object, recursively merge
            result[key] = deepMerge(result[key] || {}, obj[key]);
          } else {
            // Otherwise, assign the value
            result[key] = obj[key];
          }
        }
      }
    }
  }
  return result;
}

/**
 * Checks if an item is a plain object (not an array or null).
 * @param {*} item - The item to check.
 * @returns {boolean} True if the item is a plain object.
 */
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Logs a message to the console if debugging is enabled.
 * @param {string} message - The message to log.
 * @param {string} [type='info'] - The type of log ('info' or 'error').
 * @param {Object} config - The widget configuration object.
 */
export function log(message, type = 'info', config) {
  if (config?.advanced?.debug) {
    console[type === 'error' ? 'error' : 'log'](`[Toratech AI Chat] ${message}`);
  }
}

/**
 * Generates a unique session ID.
 * @returns {string} A unique session ID.
 */
export function generateSessionId() {
  return 'tt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}
