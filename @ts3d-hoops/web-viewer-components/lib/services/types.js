const r = [
  "BcfService",
  "CameraService",
  "CuttingService",
  "ExplodeService",
  "SheetService",
  "IFCRelationshipsService",
  "MeasurementService",
  "NoteTextService",
  "PmiService",
  "RedlineService",
  "RenderOptionsService",
  "SelectionService",
  "SpaceMouseService",
  "ViewService",
  "FloorplanService",
  "WalkOperatorService",
  "MaterialService",
  "LogService"
];
function i(e) {
  return typeof e == "object" && e !== null && "serviceName" in e && typeof e.serviceName == "string";
}
function c(e) {
  return i(e) && "resetConfiguration" in e && typeof e.resetConfiguration == "function";
}
export {
  r as ServiceNames,
  c as isResettableConfigurationService,
  i as isService
};
