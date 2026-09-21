export declare class Material {
    static parseXml(elem: Element): Material;
    private constructor();
    getAmbientColorIndex(): number | null;
    getDiffuseColorIndex(): number | null;
    getEmissiveColorIndex(): number | null;
    getSpecularColorIndex(): number | null;
    getAmbientAlpha(): number;
    getDiffuseAlpha(): number;
    getEmissiveAlpha(): number;
    getSpecularAlpha(): number;
    getShininess(): number;
    private readonly _ambientAlpha;
    private readonly _diffuseAlpha;
    private readonly _emissiveAlpha;
    private readonly _specularAlpha;
    private readonly _shininess;
    private readonly _ambientIndex;
    private readonly _diffuseIndex;
    private readonly _emissiveIndex;
    private readonly _specularIndex;
}
