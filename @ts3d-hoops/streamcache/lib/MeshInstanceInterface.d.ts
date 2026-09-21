import { IBox, FaceFaceDistanceObject, Matrix16, IRay, Vector3, Vector4 } from '@ts3d-hoops/common';
import { CullingVector } from './entities';
import { ColorType, CullingVectorSpace, DrawMode, ElementType, LinePatternLengthUnit, MaterialDescriptor, MaterialMask, TextureInterpolation, TextureMipMapping, TextureModifier, TextureParameterization, TextureTiling, ViewKey } from './misc';
import { OverlayIndex } from './overlays';
import { ImageId, InstanceInc, InstanceIncs, MatrixInc, MatrixIncs, MeshId, MeshIds } from './types';
import { SetShaderOptionsPayload } from './shader';
export interface MeshInstanceInterface {
    clearAllElementHighlight(incs: InstanceIncs): void;
    clearAllElementVisible(incs: InstanceIncs): void;
    clearAllElementXRay(incs: InstanceIncs): void;
    clearElementColors(incs: InstanceIncs, elementType: ElementType): void;
    clearElementHighlight(incs: InstanceIncs, elementType: ElementType): void;
    clearElementVisible(incs: InstanceIncs, elementType: ElementType): void;
    clearElementXRay(incs: InstanceIncs, elementType: ElementType): void;
    computeMinimalBodyBodyDistance(index: ViewKey, inc1: InstanceInc, inc2: InstanceInc): Promise<FaceFaceDistanceObject>;
    computeMinimalFaceFaceDistance(index: ViewKey, inc1: InstanceInc, faceIndex1: number, inc2: InstanceInc, faceIndex2: number): Promise<FaceFaceDistanceObject>;
    computeMinimalFaceLineDistance(index: ViewKey, inc: InstanceInc, faceIndex: number, ray: IRay): Promise<FaceFaceDistanceObject>;
    computeMinimalFaceRayDistance(index: ViewKey, inc: InstanceInc, faceIndex: number, ray: IRay): Promise<FaceFaceDistanceObject>;
    create(meshId: MeshId, matrixInc: MatrixInc, faceColor: Vector4, lineColor: Vector4, pointColor: Vector4, flags?: number, overlayIndex?: OverlayIndex, viewKey?: ViewKey): Promise<InstanceInc>;
    destroy(incs: InstanceIncs): Promise<void>;
    discardAnonymousMatrix(incs: InstanceIncs): Promise<void>;
    getAlwaysDraw(incs: InstanceIncs): Promise<boolean[]>;
    getCappingMeshData(incs: InstanceIncs): Promise<MeshIds>;
    getMaterial(incs: InstanceIncs): Promise<MaterialDescriptor[]>;
    resetMaterial(incs: InstanceIncs, params: MaterialMask): void;
    getColor(incs: InstanceIncs, elementType: ElementType, colorType: ColorType): Promise<(Vector3 | null)[]>;
    getCullingVector(incs: InstanceIncs): Promise<CullingVector[]>;
    getDoNotCut(incs: InstanceIncs): Promise<boolean[]>;
    getDoNotExplode(incs: InstanceIncs): Promise<boolean[]>;
    getDoNotLight(incs: InstanceIncs): Promise<boolean[]>;
    getDoNotOutlineHighlight(incs: InstanceIncs): Promise<boolean[]>;
    getDoNotSelect(incs: InstanceIncs): Promise<boolean[]>;
    getDoNotUseVertexColors(incs: InstanceIncs): Promise<boolean[]>;
    getDrawnWorldSpaceBounding(viewKey: ViewKey): Promise<IBox>;
    getDrawnWorldSpaceBounding(incs: InstanceIncs, viewKey: ViewKey): Promise<IBox>;
    getEffectiveColor(incs: InstanceIncs, elementType: ElementType, colorType: ColorType): Promise<Vector3[]>;
    getEffectiveElementColor(incs: InstanceIncs, viewKey: ViewKey, elementType: ElementType, index: number): Promise<Vector3[]>;
    getEffectiveOpacity(incs: InstanceIncs, elementType: ElementType): Promise<number[]>;
    getElementColor(incs: InstanceIncs, elementType: ElementType, index: number): Promise<(Vector3 | null)[]>;
    getElementHighlighted(incs: InstanceIncs, elementType: ElementType, elementIndex: number): Promise<boolean[]>;
    getElementVisible(incs: InstanceIncs, elementType: ElementType, elementIndex: number): Promise<boolean[]>;
    getElementXRay(incs: InstanceIncs, elementType: ElementType, elementIndex: number): Promise<boolean[]>;
    getExcludeBounding(incs: InstanceIncs): Promise<boolean[]>;
    getFaceElementBounding(elementIndices: number[], inc: InstanceInc): Promise<IBox>;
    getFacesVisible(incs: InstanceIncs): Promise<boolean[]>;
    getHighlighted(incs: InstanceIncs): Promise<boolean[]>;
    getLayerCount(): number;
    getLineElementBounding(elementIndices: number[], inc: InstanceInc): Promise<IBox>;
    getLinesVisible(incs: InstanceIncs): Promise<boolean[]>;
    getMatrix(incs: InstanceIncs, layer: number): Promise<MatrixIncs>;
    getMeshData(incs: InstanceIncs): Promise<MeshIds>;
    getMetallicRoughness(incs: InstanceIncs): Promise<number[]>;
    getObjectSpaceBounding(incs: InstanceIncs): Promise<IBox[]>;
    getOpacity(incs: InstanceIncs, elementType: ElementType): (number | null)[];
    getOverrideSceneVisibility(incs: InstanceIncs): Promise<boolean[]>;
    getPointElementBounding(elementIndices: number[], inc: InstanceInc): Promise<IBox>;
    getPointsVisible(incs: InstanceIncs): Promise<boolean[]>;
    getScreenOriented(incs: InstanceIncs): Promise<boolean[]>;
    getScreenSpace(incs: InstanceIncs): Promise<boolean[]>;
    getScreenSpaceStretched(incs: InstanceIncs): Promise<boolean[]>;
    getSuppressCameraScale(incs: InstanceIncs): Promise<boolean[]>;
    getWorldSpaceBounding(incs: InstanceIncs, ignoreInvisible: boolean, includeExcluded: boolean, tightBounding: boolean): Promise<IBox>;
    hasDepthRange(incs: InstanceIncs): Promise<boolean[]>;
    hasTransparency(incs: InstanceIncs, elementType: ElementType): Promise<boolean[]>;
    linesToIncidentFaces(elementIndices: number[], inc: InstanceInc): Promise<number[]>;
    matrixPreMultiply(incs: InstanceIncs, matrix: Matrix16): Promise<void>;
    reifyAnonymousMatrix(incs: InstanceIncs): Promise<MatrixIncs>;
    setAlwaysDraw(incs: InstanceIncs, value: boolean): void;
    setAmbientMix(incs: InstanceIncs, elementType: ElementType, value: number): void;
    setAnonymousMatrix(incs: InstanceIncs, matrix: Matrix16): void;
    setAnonymousMatrices(incs: InstanceIncs, matrices: number[]): void;
    setMaterial(incs: InstanceIncs, material: MaterialDescriptor): void;
    setColor(incs: InstanceIncs, elementType: ElementType, colorType: ColorType, color: Vector3): void;
    setSpecularIntensity(incs: InstanceIncs, elementType: ElementType, value: number): void;
    setCullingVector(incs: InstanceIncs, space: CullingVectorSpace, vector: Vector3, toleranceDegrees: number): void;
    setDepthRange(incs: InstanceIncs, min: number, max: number): void;
    setDoNotCut(incs: InstanceIncs, doNotCut: boolean): void;
    setDoNotExplode(incs: InstanceIncs, doNotExplode: boolean): void;
    setDoNotLight(incs: InstanceIncs, value: boolean): void;
    setDoNotOutlineHighlight(incs: InstanceIncs, value: boolean): void;
    setDoNotReset(incs: InstanceIncs, doNotReset: boolean): void;
    setDoNotSelect(incs: InstanceIncs, doNotSelect: boolean): void;
    setDoNotUseVertexColors(incs: InstanceIncs, value: boolean): void;
    setDoNotXRay(incs: InstanceIncs, value: boolean): void;
    setElementColor(incs: InstanceIncs, elementType: ElementType, elementOffset: number, elementCount: number, color: Vector3): void;
    setElementHighlighted(incs: InstanceIncs, elementType: ElementType, elementIndex: number, elementCount: number, value: boolean): void;
    /**
     * Sets the draw mode override for the given instances
     * @param incs Instances to apply the override to
     * @param mode the overridden mode
     * @param viewIds Array of view IDs to apply override to. Pass empty array to apply to all views.
     */
    setElementsDrawModeOverride(incs: InstanceIncs, viewIds: number[], mode: DrawMode): void;
    /**
     * Sets the visibility mask override for the given instances
     * @param incs Instances to apply the override to
     * @param viewIds Array of view IDs to apply override to. Pass empty array to apply to all views.
     * @param pointsVisible if points should be visible in the mask
     * @param linesVisible if lines should be visible in the mask
     * @param facesVisible if faces should be visible in the mask
     */
    setElementsVisibilityOverride(incs: InstanceIncs, viewIds: number[], pointsVisible: boolean, linesVisible: boolean, facesVisible: boolean): void;
    setElementVisible(incs: InstanceIncs, elementType: ElementType, elementIndex: number, elementCount: number, value: boolean): void;
    setElementXRay(incs: InstanceIncs, elementType: ElementType, elementIndex: number, elementCount: number, value: boolean): void;
    setExcludeBounding(incs: InstanceIncs, value: boolean): void;
    setFacesVisible(incs: InstanceIncs, visible: boolean): void;
    setHighlighted(incs: InstanceIncs, highlighted: boolean): void;
    setLinePattern(incs: InstanceIncs, pattern: number[] | Uint8Array, patternLength: number, patternLengthUnit: LinePatternLengthUnit): void;
    setLinesVisible(incs: InstanceIncs, visible: boolean): void;
    setMatrix(incs: InstanceIncs, layer: number, matrixInc: MatrixInc): Promise<void>;
    setMeshLevel(incs: InstanceIncs, meshLevel: number): void;
    setMetallicRoughness(incs: InstanceIncs, metallicFactor: number, roughnessFactor: number): void;
    unsetMetallicRoughness(incs: InstanceIncs): void;
    setOpacity(incs: InstanceIncs, elementType: ElementType, opacity: number): void;
    setOverlayId(incs: InstanceIncs, viewKey: ViewKey, index: OverlayIndex): void;
    setOverrideSceneVisibility(incs: InstanceIncs, overrideSceneVisibility: boolean): void;
    setPointsVisible(incs: InstanceIncs, visible: boolean): void;
    setShader(incs: InstanceIncs, vertexSource: string, fragmentSource: string, options?: SetShaderOptionsPayload): Promise<void>;
    setShaderUniforms(incs: InstanceIncs, uniforms: ArrayBuffer): void;
    setScreenOriented(incs: InstanceIncs, value: boolean): void;
    setScreenSpace(incs: InstanceIncs, value: boolean): void;
    setScreenSpaceStretched(incs: InstanceIncs, value: boolean): void;
    setStreamCutoffScale(value: number): void;
    setSuppressCameraScale(incs: InstanceIncs, suppressCameraScale: boolean): void;
    setTexture(incs: InstanceIncs, elementType: ElementType, imageId: ImageId, matrix: Matrix16, tiling: TextureTiling, interpolation: TextureInterpolation, mipMapping: TextureMipMapping, parameterization: TextureParameterization, modifiers: TextureModifier): Promise<void>;
    setVisible(incs: InstanceIncs, visible: boolean, onlyDemanded: boolean): void;
    setXRay(incs: InstanceIncs, value: boolean): void;
    synchronizeVisibilities(incs: InstanceIncs, visible: boolean): void;
    unsetColor(incs: InstanceIncs, elementType: ElementType, colorType: ColorType): void;
    unsetCullingVector(incs: InstanceIncs): void;
    unsetDepthRange(incs: InstanceIncs): void;
    unsetElementColor(incs: InstanceIncs, elementType: ElementType, elementOffset: number, elementCount: number): void;
    /**
     * Unsets the draw mode override for the given instances
     * @param incs Instances to apply the override to
     * @param viewIds Array of view IDs to remove override from. Pass empty array to remove from all views.
     */
    unsetElementsDrawModeOverride(incs: InstanceIncs, viewIds: number[]): void;
    /**
     * Unsets the visibility mask override for the given instances
     * @param incs Instances to apply the override to
     * @param viewIds Array of view IDs to remove override from. Pass empty array to remove from all views.
     */
    unsetElementsVisibilityOverride(incs: InstanceIncs, viewIds: number[]): void;
    unsetLinePattern(incs: InstanceIncs): void;
    unsetMatrix(incs: InstanceIncs, layer: number): Promise<void>;
    unsetOpacity(incs: InstanceIncs, elementType: ElementType): void;
    unsetSpecularIntensity(incs: InstanceIncs, elementType: ElementType): void;
    unsetTexture(incs: InstanceIncs, elementType: ElementType): void;
}
