// Storage utilities for saving and loading layouts

const STORAGE_KEY = 'earl-room-planner-cyberpunk';
const CURRENT_LAYOUT_KEY = 'earl-current-layout-cyberpunk';

/**
 * Save the current layout to localStorage
 * @param {Array} furniture - Array of furniture items
 */
export function saveCurrentLayout(furniture) {
  try {
    localStorage.setItem(CURRENT_LAYOUT_KEY, JSON.stringify(furniture));
  } catch (e) {
    console.error('Failed to save current layout:', e);
  }
}

/**
 * Load the current layout from localStorage
 * @returns {Array|null} - Array of furniture items or null
 */
export function loadCurrentLayout() {
  try {
    const data = localStorage.getItem(CURRENT_LAYOUT_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to load current layout:', e);
    return null;
  }
}

/**
 * Save a named layout to localStorage
 * @param {string} name - Layout name
 * @param {Array} furniture - Array of furniture items
 */
export function saveLayout(name, furniture) {
  try {
    const layouts = getAllLayouts();
    layouts[name] = {
      furniture,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layouts));
  } catch (e) {
    console.error('Failed to save layout:', e);
  }
}

/**
 * Get all saved layouts
 * @returns {Object} - Object with layout names as keys
 */
export function getAllLayouts() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Failed to load layouts:', e);
    return {};
  }
}

/**
 * Delete a saved layout
 * @param {string} name - Layout name to delete
 */
export function deleteLayout(name) {
  try {
    const layouts = getAllLayouts();
    delete layouts[name];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layouts));
  } catch (e) {
    console.error('Failed to delete layout:', e);
  }
}

/**
 * Export a layout as a JSON file download
 * @param {string} name - Layout name
 * @param {Array} furniture - Array of furniture items
 */
export function exportLayoutAsJson(name, furniture) {
  const data = {
    name,
    version: '1.0',
    exportedAt: new Date().toISOString(),
    furniture,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Import a layout from a JSON file
 * @param {File} file - File object to import
 * @returns {Promise<Object>} - Parsed layout data
 */
export function importLayoutFromJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.furniture || !Array.isArray(data.furniture)) {
          reject(new Error('Invalid layout file: missing furniture array'));
          return;
        }
        resolve(data);
      } catch (err) {
        reject(new Error('Invalid JSON file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}

export default {
  saveCurrentLayout,
  loadCurrentLayout,
  saveLayout,
  getAllLayouts,
  deleteLayout,
  exportLayoutAsJson,
  importLayoutFromJson,
};
