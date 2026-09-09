export interface WarehouseZone {
  id: string;
  name: string;
  shortName: string;
  people: number;
  capacity: number;
  area: number;

  position: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}

/* =========================================================
   WAREHOUSE ZONES
   Single source of truth for the application
   ========================================================= */

export const warehouseZones: WarehouseZone[] = [
  {
    id: "grading",
    name: "Grading Area",
    shortName: "Grading",
    people: 8,
    capacity: 25,
    area: 500,
    position: {
      left: 4,
      top: 5,
      width: 34,
      height: 34,
    },
  },

  {
    id: "packaging",
    name: "Packaging",
    shortName: "Packaging",
    people: 28,
    capacity: 36,
    area: 450,
    position: {
      left: 62,
      top: 5,
      width: 34,
      height: 34,
    },
  },

  {
    id: "storage",
    name: "Storage",
    shortName: "Storage",
    people: 15,
    capacity: 23,
    area: 800,
    position: {
      left: 4,
      top: 42,
      width: 58,
      height: 53,
    },
  },

  {
    id: "canteen",
    name: "Canteen",
    shortName: "Canteen",
    people: 34,
    capacity: 36,
    area: 350,
    position: {
      left: 62,
      top: 42,
      width: 34,
      height: 33,
    },
  },

  {
    id: "loading",
    name: "Loading Dock",
    shortName: "Loading",
    people: 12,
    capacity: 14,
    area: 350,
    position: {
      left: 62,
      top: 77,
      width: 34,
      height: 18,
    },
  },
];

/* =========================================================
   ZONE UTILIZATION
   ========================================================= */

export function getUtilization(zone: WarehouseZone): number {
  if (zone.capacity === 0) return 0;

  return Math.round(
    (zone.people / zone.capacity) * 100
  );
}

/* =========================================================
   UTILIZATION STATUS
   ========================================================= */

export function getUtilizationStatus(
  zone: WarehouseZone
): "low" | "medium" | "high" | "critical" {
  const utilization = getUtilization(zone);

  if (utilization >= 90) {
    return "critical";
  }

  if (utilization >= 70) {
    return "high";
  }

  if (utilization >= 40) {
    return "medium";
  }

  return "low";
}

/* =========================================================
   TOTAL PEOPLE
   ========================================================= */

export function getTotalPeople(): number {
  return warehouseZones.reduce(
    (total, zone) => total + zone.people,
    0
  );
}

/* =========================================================
   TOTAL CAPACITY
   ========================================================= */

export function getTotalCapacity(): number {
  return warehouseZones.reduce(
    (total, zone) => total + zone.capacity,
    0
  );
}

/* =========================================================
   TOTAL AREA
   ========================================================= */

export function getTotalArea(): number {
  return warehouseZones.reduce(
    (total, zone) => total + zone.area,
    0
  );
}

/* =========================================================
   OVERALL UTILIZATION
   ========================================================= */

export function getOverallUtilization(): number {
  const totalPeople = getTotalPeople();
  const totalCapacity = getTotalCapacity();

  if (totalCapacity === 0) return 0;

  return Math.round(
    (totalPeople / totalCapacity) * 100
  );
}

/* =========================================================
   HIGHEST OCCUPANCY ZONE
   ========================================================= */

export function getHighestOccupancyZone(): WarehouseZone {
  return warehouseZones.reduce(
    (highest, zone) => {
      return getUtilization(zone) >
        getUtilization(highest)
        ? zone
        : highest;
    },
    warehouseZones[0]
  );
}

/* =========================================================
   LOWEST OCCUPANCY ZONE
   ========================================================= */

export function getLowestOccupancyZone(): WarehouseZone {
  return warehouseZones.reduce(
    (lowest, zone) => {
      return getUtilization(zone) <
        getUtilization(lowest)
        ? zone
        : lowest;
    },
    warehouseZones[0]
  );
}

/* =========================================================
   FIND ZONE BY ID
   ========================================================= */

export function getZoneById(
  id: string
): WarehouseZone | undefined {
  return warehouseZones.find(
    (zone) => zone.id === id
  );
}

/* =========================================================
   CRITICAL ZONES
   ========================================================= */

export function getCriticalZones(): WarehouseZone[] {
  return warehouseZones.filter(
    (zone) => getUtilization(zone) >= 90
  );
}

/* =========================================================
   HIGH UTILIZATION ZONES
   ========================================================= */

export function getHighUtilizationZones(): WarehouseZone[] {
  return warehouseZones.filter(
    (zone) => getUtilization(zone) >= 70
  );
}