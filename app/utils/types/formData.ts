export interface ClientInformation {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientBirthday: string;
}

export interface VehicleInformation {
  carVIN: string;
  carIssue: string;
  carChassis: string;
  carPlate: string;
  carMake: string;
  carYear: number;
  carColour: string;
  odometer: number;
  dateSelected: string;
  customerRequest: string;
  descriptionOfWork: string;
}

export interface ExteriorChecks {
  windShieldCracks: boolean;
  bodyPanelMatch: boolean;
  magnetAdheres: boolean;
  freshPaintJob: boolean;
  seamsAligned: boolean;
  freeBodyScratches: boolean;
  freeBodyDents: boolean;
  headlightsFunctional: boolean;
  [key: string]: boolean;
}

export interface BrakeChecks {
  straightSteering: boolean;
  parkingBrakeWorks: boolean;
  noGrindingNoise: boolean;
  antiLockBrakesWork: boolean;
  [key: string]: boolean;
}

export interface SuspensionChecks {
  vehicleRestsLevelly: boolean;
  bounceWithoutNoise: boolean;
  cornersRespondEqually: boolean;
  [key: string]: boolean;
}

export interface EngineChecks {
  freeLeaks: boolean;
  oilFillerClean: boolean;
  batteryTerminalsClean: boolean;
  dipStickOilQuality: boolean;
  noOdoursRunning: boolean;
  exhaustEmissionsNormal: boolean;
  [key: string]: boolean;
}

export interface InteriorChecks {
  seatsCondition: boolean;
  allDoorsWork: boolean;
  trunkOpens: boolean;
  gaugesWork: boolean;
  dashboardLightsOff: boolean;
  stereoWorks: boolean;
  heatersWork: boolean;
  acWorks: boolean;
  windshieldWipersWork: boolean;
  seatBeltsFunctional: boolean;
  seatAdjustsWell: boolean;
  sunRoofOpensWell: boolean;
  carAlarmWorks: boolean;
  driverSideLocksAndUnlocksWithKey: boolean;
  hazardLightWorks: boolean;
  headlightWorksProperly: boolean;
  [key: string]: boolean;
}

export interface TyreChecks {
  reputableBrand: boolean;
  sameType: boolean;
  freeFromDamage: boolean;
  treadEvenWear: boolean;
  spareTireAvailable: boolean;
  spareTireInflated: boolean;
  [key: string]: boolean;
}

export interface SteeringChecks {
  doesNotOneSide: boolean;
  vehicleIsStable: boolean;
  noResistance: boolean;
  noClicking: boolean;
  [key: string]: boolean;
}

export interface BatteryChecks {
  batteryPresent: boolean;
  batteryLevel: boolean;
  [key: string]: boolean;
}

export interface MiscellaneousChecks {
  manualAvailable: boolean;
  accessoriesInstructions: boolean;
  serviceRecordsAvailable: boolean;
  ownerHasTitle: boolean;
  [key: string]: boolean;
}

export interface UnderHoodChecks {
  oilLevels: boolean;
  brakeFluid: boolean;
  coolantLevels: boolean;
  airFilter: boolean;
  [key: string]: boolean;
}

export interface BodyCheckList {
  windscreenCracks: boolean;
  lightsFunctional: boolean;
  spareTireEquipment: boolean;
  steeringButtons: boolean;
  centralLockWorks: boolean;
  radioFunctional: boolean;
  windshieldWipersDispense: boolean;
  hornWorks: boolean;
  seatAdjustable: boolean;
  acCooling: boolean;
  engineCover: boolean;
  reverseCamera: boolean;
  [key: string]: boolean;
}

export interface JobOrderFormData {
  sectionA: {
    clientInformation: ClientInformation;
    vehicleInformation: VehicleInformation;
  };
  sectionB: {
    exterior: ExteriorChecks;
    brake: BrakeChecks;
    suspension: SuspensionChecks;
    engine: EngineChecks;
    interior: InteriorChecks;
    tyres: TyreChecks;
    automaticTransmission: {
      fluidIsClean: boolean;
    };
    steering: SteeringChecks;
    battery: BatteryChecks;
    miscellaneous: MiscellaneousChecks;
    underHood: UnderHoodChecks;
  };
  sectionC: {
    bodyCheckList: BodyCheckList;
    fuelLevel: number;
  };
  sectionD: {
    assignTechnicians: string;
    customerJobOrderStatus: "Approve" | "Disapprove";
    jobOrderStatus: "Demurrage" | "Delivered" | "Inprogress";
    repairStatus: "Pending" | "Ongoing" | "Completed";
    carReceivedBy: string;
  };
}

export interface JobOrderData {
  _id: string;
  jobOrderId: string;
  sectionA: {
    clientInformation: ClientInformation;
    vehicleInformation: VehicleInformation;
  };
  sectionB: {
    exterior: ExteriorChecks;
    brake: BrakeChecks;
    suspension: SuspensionChecks;
    engine: EngineChecks;
    interior: InteriorChecks;
    tyres: TyreChecks;
    automaticTransmission: {
      fluidIsClean: boolean;
    };
    steering: SteeringChecks;
    battery: BatteryChecks;
    miscellaneous: MiscellaneousChecks;
    underHood: UnderHoodChecks;
  };
  sectionC: {
    bodyCheckList: BodyCheckList;
    fuelLevel: number;
  };
  sectionD: {
    assignTechnicians: string;
    customerJobOrderStatus: "Approve" | "Disapprove";
    jobOrderStatus: "Demurrage" | "Delivered" | "Inprogress";
    repairStatus: "Pending" | "Ongoing" | "Completed";
    carReceivedBy: string;
  };
  createdAt: string;
  updatedAt: string;
}
