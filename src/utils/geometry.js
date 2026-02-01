// Geometry utilities for collision detection and positioning

/**
 * Check if two axis-aligned rectangles overlap
 * @param {Object} a - First rectangle with x, y, width, depth/height
 * @param {Object} b - Second rectangle with x, y, width, depth/height
 * @returns {boolean} - True if rectangles overlap
 */
export function rectsOverlap(a, b) {
  const aWidth = a.width;
  const aHeight = a.depth || a.height;
  const bWidth = b.width;
  const bHeight = b.depth || b.height;

  // Handle rotation by using bounding box
  // For 90/270 degree rotations, swap width and depth
  const aRotated = (a.rotation || 0) % 180 !== 0;
  const bRotated = (b.rotation || 0) % 180 !== 0;

  const aW = aRotated ? aHeight : aWidth;
  const aH = aRotated ? aWidth : aHeight;
  const bW = bRotated ? bHeight : bWidth;
  const bH = bRotated ? bWidth : bHeight;

  // Adjust positions for rotated items (rotation is around center)
  const aCenterX = a.x + aWidth / 2;
  const aCenterY = a.y + (a.depth || a.height) / 2;
  const bCenterX = b.x + bWidth / 2;
  const bCenterY = b.y + (b.depth || b.height) / 2;

  const aLeft = aCenterX - aW / 2;
  const aRight = aCenterX + aW / 2;
  const aTop = aCenterY - aH / 2;
  const aBottom = aCenterY + aH / 2;

  const bLeft = bCenterX - bW / 2;
  const bRight = bCenterX + bW / 2;
  const bTop = bCenterY - bH / 2;
  const bBottom = bCenterY + bH / 2;

  return !(aRight <= bLeft || aLeft >= bRight || aBottom <= bTop || aTop >= bBottom);
}

/**
 * Check if a furniture item overlaps with a traffic path
 * @param {Object} item - Furniture item with x, y, width, depth
 * @param {Object} path - Path with points array and width
 * @returns {boolean} - True if item blocks the path
 */
export function overlapsTrafficPath(item, path) {
  const itemWidth = item.width;
  const itemHeight = item.depth || item.height;

  // Handle rotation
  const rotated = (item.rotation || 0) % 180 !== 0;
  const w = rotated ? itemHeight : itemWidth;
  const h = rotated ? itemWidth : itemHeight;

  const centerX = item.x + itemWidth / 2;
  const centerY = item.y + (item.depth || item.height) / 2;

  const itemLeft = centerX - w / 2;
  const itemRight = centerX + w / 2;
  const itemTop = centerY - h / 2;
  const itemBottom = centerY + h / 2;

  const pathHalfWidth = path.width / 2;

  // Check each segment of the path
  for (let i = 0; i < path.points.length - 1; i++) {
    const p1 = path.points[i];
    const p2 = path.points[i + 1];

    // Calculate path segment bounding box
    const segLeft = Math.min(p1.x, p2.x) - pathHalfWidth;
    const segRight = Math.max(p1.x, p2.x) + pathHalfWidth;
    const segTop = Math.min(p1.y, p2.y) - pathHalfWidth;
    const segBottom = Math.max(p1.y, p2.y) + pathHalfWidth;

    // Check for overlap
    if (!(itemRight <= segLeft || itemLeft >= segRight || itemBottom <= segTop || itemTop >= segBottom)) {
      return true;
    }
  }

  return false;
}

/**
 * Snap a value to the nearest grid position
 * @param {number} value - Value to snap
 * @param {number} gridSize - Grid size in inches (default 6)
 * @returns {number} - Snapped value
 */
export function snapToGrid(value, gridSize = 6) {
  return Math.round(value / gridSize) * gridSize;
}

/**
 * Calculate distance between two points
 * @param {Object} p1 - First point with x, y
 * @param {Object} p2 - Second point with x, y
 * @returns {number} - Distance in inches
 */
export function distance(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Convert inches to feet and inches string
 * @param {number} inches - Value in inches
 * @returns {string} - Formatted string like "5'6""
 */
export function inchesToFeetString(inches) {
  const feet = Math.floor(inches / 12);
  const remainingInches = Math.round(inches % 12);
  if (remainingInches === 0) {
    return `${feet}'`;
  }
  return `${feet}'${remainingInches}"`;
}

export default {
  rectsOverlap,
  overlapsTrafficPath,
  snapToGrid,
  distance,
  inchesToFeetString,
};
