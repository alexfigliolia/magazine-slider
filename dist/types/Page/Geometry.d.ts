import { BoxGeometry, Color, MeshStandardMaterial, SkinnedMesh, Texture } from "three";
export declare class Geometry {
    static readonly PAGE_WIDTH = 1.28;
    static readonly PAGE_HEIGHT = 1.71;
    static readonly PAGE_DEPTH = 0.003;
    static readonly PAGE_SEGMENTS = 30;
    static readonly TURN_EASE_FACTOR = 0.5;
    static readonly FOLD_EASE_FACTOR = 0.3;
    static readonly WHITE: Color;
    static readonly EMISSIVE: Color;
    static readonly INSIDE_CURVE_STRENGTH = 0.18;
    static readonly OUTSITE_CURVE_STRENGTH = 0.05;
    static readonly TURNING_CURVE_STRENGTH = 0.09;
    static readonly SEGMENT_WIDTH: number;
    static readonly pageGeometry: BoxGeometry;
    static readonly pageMaterials: MeshStandardMaterial[];
    static createSkinnedMesh(frontImage: Texture, backImage: Texture): SkinnedMesh<BoxGeometry, MeshStandardMaterial[], import("three").Object3DEventMap>;
    private static createBones;
    private static createPageMaterials;
}
