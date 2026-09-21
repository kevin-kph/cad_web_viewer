export declare enum BasicUnit {
    unitUnknown = 0,
    unitLength = 1,
    unitMass = 2,
    unitTime = 3,
    unitElectricCurrent = 4,
    unitThermoTemperature = 5,
    unitSubstanceAmount = 6,
    unitLuminosityIntensity = 7,
    unitPlaneAngle = 8,
    unitSolidAngle = 9,
    unitFrequency = 10,
    unitForce = 11,
    unitPressure = 12,
    unitEnergy = 13,
    unitPower = 14,
    unitElectricCharge = 15,
    unitElectromotiveForce = 16,
    unitCapacitance = 17,
    unitElectricResistance = 18,
    unitElectricConductance = 19,
    unitMagneticFlux = 20,
    unitMagneticFluxDensity = 21,
    unitInductance = 22,
    unitLuminousFlux = 23,
    unitIlluminance = 24,
    unitActivityRadionuclide = 25,
    unitKerma = 26,
    unitDoseEquivalent = 27,
    unitCatalyticActivity = 28
}
export interface UnitElement {
    basicUnit: BasicUnit;
    exponent: number;
    factor: number;
}
