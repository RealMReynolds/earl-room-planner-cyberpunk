// The Earl Studio Apartment - Unit S-01, 1JR-03
// All measurements in inches
// Floor plan orientation: Top = Window, Left = Kitchen, Bottom = Entry/Bathroom

export const SCALE = 2; // 1 inch = 2 pixels

// Main room dimensions from floor plan
export const ROOM = {
  // Living/Kitchen area (top section)
  livingWidth: 208, // 17'4"
  livingDepth: 156, // 13'0"

  // Bedroom area (bottom section, separated by dividing wall)
  bedroomWidth: 96, // 8'0"
  bedroomDepth: 118, // 9'10"

  // Kitchen appliances along left wall
  kitchenWidth: 30, // Depth of kitchen counter/appliances from left wall
  kitchenLength: 120, // How far down the appliances run

  // Physical measurements from Matthias
  measuredLivingWidth: 154, // Actual usable width
  measuredLivingDepth: 94, // From couch area to TV corner
  kitchenCounterDepth: 29, // Counter protrusion
};

// Fixed architectural elements with positions
// Coordinate system: (0,0) = top-left corner of living area
// X increases to the right, Y increases downward
export const FIXED_ELEMENTS = {
  // Living/Kitchen outer bounds
  livingArea: {
    x: 0,
    y: 0,
    width: ROOM.livingWidth,
    height: ROOM.livingDepth,
  },

  // Kitchen appliances (left wall, running top to bottom)
  kitchenCounter: {
    x: 0,
    y: 20, // Start below window corner
    width: ROOM.kitchenWidth,
    height: ROOM.kitchenLength,
    label: 'Kitchen',
  },

  // Dishwasher (top of kitchen run)
  dishwasher: {
    x: 0,
    y: 20,
    width: 24,
    height: 24,
    label: 'DW',
  },

  // Microwave
  microwave: {
    x: 0,
    y: 68,
    width: 24,
    height: 18,
    label: 'Micro',
  },

  // Refrigerator (bottom of kitchen run)
  refrigerator: {
    x: 0,
    y: 100,
    width: 36,
    height: 30,
    label: 'REF',
  },

  // Window/Patio (top wall - user has solid window, no balcony)
  window: {
    x: 40, // Offset from kitchen corner
    y: 0,
    width: 140, // Most of top wall
    height: 6,
    label: 'Window (Floor-to-Ceiling)',
  },

  // Dividing wall between Living and Bedroom
  dividingWall: {
    x: 0,
    y: ROOM.livingDepth,
    width: ROOM.livingWidth * 0.65, // Partial wall with doorway opening
    height: 6,
    label: 'Dividing Wall',
  },

  // Doorway opening in dividing wall
  dividingDoorway: {
    x: ROOM.livingWidth * 0.65,
    y: ROOM.livingDepth,
    width: 36,
    height: 6,
  },

  // Bedroom area (below dividing wall)
  bedroomArea: {
    x: ROOM.livingWidth - ROOM.bedroomWidth - 20,
    y: ROOM.livingDepth + 6,
    width: ROOM.bedroomWidth,
    height: ROOM.bedroomDepth,
    label: 'Bedroom',
  },

  // Bathroom (bottom left area)
  bathroom: {
    x: 0,
    y: ROOM.livingDepth + 6,
    width: 60,
    height: 80,
    label: 'Bathroom',
  },

  // Walk-in Closet (bottom right)
  walkInCloset: {
    x: ROOM.livingWidth - 50,
    y: ROOM.livingDepth + ROOM.bedroomDepth - 40,
    width: 50,
    height: 40,
    label: 'Walk-in Closet',
  },

  // Entry door (swings into bedroom area)
  entryDoor: {
    x: 70,
    y: ROOM.livingDepth + ROOM.bedroomDepth,
    width: 36,
    height: 4,
    swingRadius: 36,
    label: 'Entry',
  },

  // W/D (Washer/Dryer) - bottom left
  washerDryer: {
    x: 0,
    y: ROOM.livingDepth + 90,
    width: 30,
    height: 30,
    label: 'W/D',
  },

  // Storage shelves (S marks on floor plan)
  storageShelf1: {
    x: 60,
    y: ROOM.livingDepth + ROOM.bedroomDepth - 20,
    width: 24,
    height: 20,
    label: 'S',
  },

  // TV area marker (corner where kitchen meets main living space)
  tvCorner: {
    x: ROOM.kitchenWidth,
    y: ROOM.kitchenLength + 20,
    label: 'TV Wall',
  },
};

// Traffic flow paths - 30" wide corridors
export const TRAFFIC_PATHS = [
  // Entry to Living area (through bedroom, through doorway)
  {
    id: 'entry-to-living',
    points: [
      { x: 88, y: ROOM.livingDepth + ROOM.bedroomDepth },
      { x: 88, y: ROOM.livingDepth + 40 },
      { x: ROOM.livingWidth * 0.65 + 18, y: ROOM.livingDepth + 40 },
      { x: ROOM.livingWidth * 0.65 + 18, y: ROOM.livingDepth - 20 },
    ],
    width: 30,
    label: 'Entry Path',
  },
  // Living to Kitchen
  {
    id: 'living-to-kitchen',
    points: [
      { x: 80, y: ROOM.livingDepth / 2 },
      { x: 40, y: ROOM.livingDepth / 2 },
    ],
    width: 30,
    label: 'Kitchen Access',
  },
  // Living to Bedroom
  {
    id: 'living-to-bedroom',
    points: [
      { x: ROOM.livingWidth * 0.65 + 18, y: ROOM.livingDepth - 20 },
      { x: ROOM.livingWidth * 0.65 + 18, y: ROOM.livingDepth + 40 },
    ],
    width: 30,
    label: 'To Bedroom',
  },
];

// Zones for visual overlay
export const ZONES = {
  living: {
    x: ROOM.kitchenWidth + 10,
    y: 20,
    width: ROOM.livingWidth - ROOM.kitchenWidth - 40,
    height: ROOM.livingDepth - 40,
    color: 'rgba(59, 130, 246, 0.1)', // Blue tint
    label: 'Living Area',
  },
  kitchen: {
    x: 0,
    y: 0,
    width: ROOM.kitchenWidth + 30,
    height: ROOM.kitchenLength + 40,
    color: 'rgba(234, 179, 8, 0.1)', // Yellow tint
    label: 'Kitchen',
  },
  tvViewing: {
    x: ROOM.kitchenWidth + 10,
    y: ROOM.kitchenLength - 20,
    width: 100,
    height: 80,
    color: 'rgba(239, 68, 68, 0.1)', // Red tint
    label: 'TV Viewing',
  },
  bedroom: {
    x: ROOM.livingWidth - ROOM.bedroomWidth,
    y: ROOM.livingDepth + 10,
    width: ROOM.bedroomWidth - 10,
    height: ROOM.bedroomDepth - 50,
    color: 'rgba(147, 51, 234, 0.1)', // Purple tint
    label: 'Sleep Area',
  },
};

export default {
  SCALE,
  ROOM,
  FIXED_ELEMENTS,
  TRAFFIC_PATHS,
  ZONES,
};
