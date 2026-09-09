export interface Camera {
  id: number;
  name: string;
  zone: string;
  video: string;
}

export const cameras: Camera[] = [
  {
    id: 1,
    name: "Loading Dock Camera",
    zone: "Zone A - Loading Bay",
    video: "/assets/videos/Truck_Loading_Time_Demo_h264.mp4",
  },
  {
    id: 2,
    name: "Safety Zone Monitor",
    zone: "Zone B - Restricted Area",
    video: "/assets/videos/Person_Out_Of_Safety_Area_Demo_h264.mp4",
  },
  {
    id: 3,
    name: "Pallet Jack Tracking",
    zone: "Zone C - Main Floor",
    video: "/assets/videos/Pallet_Jack_Intervention_Demo_h264.mp4",
  },
  {
    id: 4,
    name: "Traffic Flow Camera",
    zone: "Zone D - Intersection",
    video: "/assets/videos/Direction_Compliance_Demo_2_h264.mp4",
  },
];