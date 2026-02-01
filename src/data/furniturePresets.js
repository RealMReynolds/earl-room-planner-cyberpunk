// Furniture presets with dimensions in inches
// All furniture can be placed and rotated
// Room orientation: Top = Window, Left = Kitchen, Bottom = Entry

import { ROOM } from './roomDimensions';

export const FURNITURE_CATALOG = {
  // Current furniture
  couch: {
    id: 'couch',
    name: 'Couch (Poly & Bark Napa 72")',
    width: 72,
    depth: 36,
    height: 34,
    color: '#ff6600', // Cyberpunk orange
    category: 'seating',
    priority: true,
  },
  desk: {
    id: 'desk',
    name: 'Desk',
    width: 48,
    depth: 24,
    height: 30,
    color: '#00f0ff', // Cyberpunk cyan
    category: 'work',
  },
  officeChair: {
    id: 'officeChair',
    name: 'Office Chair',
    width: 26,
    depth: 26,
    height: 42,
    color: '#9933ff', // Cyberpunk purple
    category: 'work',
    isCircle: true,
  },
  tv: {
    id: 'tv',
    name: 'TV (55" Wall Mounted)',
    width: 50,
    depth: 4,
    height: 30,
    color: '#ff0066', // Cyberpunk pink
    category: 'entertainment',
  },
  coffeeTable: {
    id: 'coffeeTable',
    name: 'Coffee Table',
    width: 48,
    depth: 24,
    height: 18,
    color: '#ffcc00', // Cyberpunk yellow
    category: 'living',
  },
  sideTable: {
    id: 'sideTable',
    name: 'Side Table',
    width: 18,
    depth: 18,
    height: 24,
    color: '#ffcc00',
    category: 'living',
  },
  tableLamp: {
    id: 'tableLamp',
    name: 'Table Lamp',
    width: 10,
    depth: 10,
    height: 24,
    color: '#ffff00',
    category: 'lighting',
    isCircle: true,
  },
  stool: {
    id: 'stool',
    name: 'Small Stool',
    width: 14,
    depth: 14,
    height: 18,
    color: '#ff6600',
    category: 'seating',
  },

  // Bedroom furniture
  queenBed: {
    id: 'queenBed',
    name: 'Queen Bed (Future)',
    width: 60,
    depth: 80,
    height: 24,
    color: '#00ff88', // Cyberpunk green
    category: 'bedroom',
  },
  nightstand: {
    id: 'nightstand',
    name: 'Nightstand',
    width: 20,
    depth: 18,
    height: 24,
    color: '#ffcc00',
    category: 'bedroom',
  },
  airMattress: {
    id: 'airMattress',
    name: 'Air Mattress (Current)',
    width: 60,
    depth: 80,
    height: 8,
    color: '#00ff88',
    category: 'bedroom',
  },

  // Future PC setup
  pcTower: {
    id: 'pcTower',
    name: 'PC Tower',
    width: 8,
    depth: 18,
    height: 20,
    color: '#00f0ff',
    category: 'work',
  },
  dualMonitors: {
    id: 'dualMonitors',
    name: 'Dual Monitors',
    width: 48,
    depth: 8,
    height: 18,
    color: '#ff0066',
    category: 'work',
  },
};

// Default furniture placements (current setup from photos)
export const DEFAULT_FURNITURE = [
  {
    ...FURNITURE_CATALOG.desk,
    instanceId: 'desk-1',
    x: 100,
    y: 60,
    rotation: 0,
  },
  {
    ...FURNITURE_CATALOG.officeChair,
    instanceId: 'chair-1',
    x: 110,
    y: 90,
    rotation: 0,
  },
  {
    ...FURNITURE_CATALOG.tv,
    instanceId: 'tv-1',
    x: 35,
    y: 130,
    rotation: 0,
  },
  {
    ...FURNITURE_CATALOG.airMattress,
    instanceId: 'bed-1',
    x: 120,
    y: ROOM.livingDepth + 20,
    rotation: 0,
  },
];

// Layout presets to compare
export const LAYOUT_PRESETS = {
  layoutA: {
    name: 'Layout A: Couch Facing TV',
    description: 'Couch centered, facing TV wall',
    furniture: [
      {
        ...FURNITURE_CATALOG.couch,
        instanceId: 'couch-1',
        x: 70,
        y: 80,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.tv,
        instanceId: 'tv-1',
        x: 35,
        y: 80,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.coffeeTable,
        instanceId: 'coffee-1',
        x: 75,
        y: 60,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.desk,
        instanceId: 'desk-1',
        x: 150,
        y: 30,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.officeChair,
        instanceId: 'chair-1',
        x: 160,
        y: 60,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.airMattress,
        instanceId: 'bed-1',
        x: 120,
        y: ROOM.livingDepth + 20,
        rotation: 0,
      },
    ],
  },
  layoutB: {
    name: 'Layout B: Couch Near Window',
    description: 'Couch against window wall, faces TV',
    furniture: [
      {
        ...FURNITURE_CATALOG.couch,
        instanceId: 'couch-1',
        x: 100,
        y: 15,
        rotation: 180,
      },
      {
        ...FURNITURE_CATALOG.tv,
        instanceId: 'tv-1',
        x: 35,
        y: 100,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.coffeeTable,
        instanceId: 'coffee-1',
        x: 100,
        y: 60,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.desk,
        instanceId: 'desk-1',
        x: 100,
        y: 110,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.officeChair,
        instanceId: 'chair-1',
        x: 110,
        y: 140,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.airMattress,
        instanceId: 'bed-1',
        x: 120,
        y: ROOM.livingDepth + 20,
        rotation: 0,
      },
    ],
  },
  layoutC: {
    name: 'Layout C: Couch as Divider',
    description: 'Couch separates living from entry path',
    furniture: [
      {
        ...FURNITURE_CATALOG.couch,
        instanceId: 'couch-1',
        x: 60,
        y: 100,
        rotation: 90,
      },
      {
        ...FURNITURE_CATALOG.tv,
        instanceId: 'tv-1',
        x: 35,
        y: 70,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.coffeeTable,
        instanceId: 'coffee-1',
        x: 50,
        y: 80,
        rotation: 90,
      },
      {
        ...FURNITURE_CATALOG.desk,
        instanceId: 'desk-1',
        x: 150,
        y: 20,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.officeChair,
        instanceId: 'chair-1',
        x: 160,
        y: 50,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.airMattress,
        instanceId: 'bed-1',
        x: 120,
        y: ROOM.livingDepth + 20,
        rotation: 0,
      },
    ],
  },
  layoutD: {
    name: 'Layout D: TV Viewing Focus',
    description: 'Optimized 94" viewing distance',
    furniture: [
      {
        ...FURNITURE_CATALOG.couch,
        instanceId: 'couch-1',
        x: 90,
        y: 75,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.tv,
        instanceId: 'tv-1',
        x: 35,
        y: 75,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.coffeeTable,
        instanceId: 'coffee-1',
        x: 75,
        y: 60,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.sideTable,
        instanceId: 'side-1',
        x: 165,
        y: 80,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.tableLamp,
        instanceId: 'lamp-1',
        x: 168,
        y: 84,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.desk,
        instanceId: 'desk-1',
        x: 150,
        y: 20,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.officeChair,
        instanceId: 'chair-1',
        x: 160,
        y: 50,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.airMattress,
        instanceId: 'bed-1',
        x: 120,
        y: ROOM.livingDepth + 20,
        rotation: 0,
      },
    ],
  },
};

export default {
  FURNITURE_CATALOG,
  DEFAULT_FURNITURE,
  LAYOUT_PRESETS,
};
