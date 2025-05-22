"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Geometry = void 0;
const three_1 = require("three");
class Geometry {
    static createSkinnedMesh(frontImage, backImage) {
        const bones = this.createBones();
        const skeleton = new three_1.Skeleton(bones);
        const materials = this.createPageMaterials(frontImage, backImage);
        const mesh = new three_1.SkinnedMesh(this.pageGeometry, materials);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;
        mesh.add(bones[0]);
        mesh.bind(skeleton);
        return mesh;
    }
    static createBones() {
        var _b, _c;
        const bones = [];
        for (let i = 0; i < this.PAGE_SEGMENTS; i++) {
            const bone = new three_1.Bone();
            if (i === 0) {
                bone.position.x = 0;
            }
            else {
                bone.position.x = this.SEGMENT_WIDTH * i;
            }
            (_c = (_b = bones === null || bones === void 0 ? void 0 : bones[i - 1]) === null || _b === void 0 ? void 0 : _b.attach) === null || _c === void 0 ? void 0 : _c.call(_b, bone);
            bones.push(bone);
        }
        return bones;
    }
    static createPageMaterials(frontImage, backImage) {
        return [
            ...this.pageMaterials,
            new three_1.MeshStandardMaterial({
                color: this.WHITE,
                map: frontImage,
                roughness: 0.1,
                emissive: this.EMISSIVE,
                emissiveIntensity: 0,
            }),
            new three_1.MeshStandardMaterial({
                color: this.WHITE,
                map: backImage,
                roughness: 0.1,
                emissive: this.EMISSIVE,
                emissiveIntensity: 0,
            }),
        ];
    }
}
exports.Geometry = Geometry;
_a = Geometry;
Geometry.PAGE_WIDTH = 1.28;
Geometry.PAGE_HEIGHT = 1.71;
Geometry.PAGE_DEPTH = 0.003;
Geometry.PAGE_SEGMENTS = 30;
Geometry.TURN_EASE_FACTOR = 0.5;
Geometry.FOLD_EASE_FACTOR = 0.3;
Geometry.WHITE = new three_1.Color("#fff");
Geometry.EMISSIVE = new three_1.Color("orange");
Geometry.INSIDE_CURVE_STRENGTH = 0.18;
Geometry.OUTSITE_CURVE_STRENGTH = 0.05;
Geometry.TURNING_CURVE_STRENGTH = 0.09;
Geometry.SEGMENT_WIDTH = _a.PAGE_WIDTH / _a.PAGE_SEGMENTS;
Geometry.pageGeometry = new three_1.BoxGeometry(_a.PAGE_WIDTH, _a.PAGE_HEIGHT, _a.PAGE_DEPTH, _a.PAGE_SEGMENTS, 2);
Geometry.pageMaterials = [
    new three_1.MeshStandardMaterial({ color: _a.WHITE }),
    new three_1.MeshStandardMaterial({ color: "#111" }),
    new three_1.MeshStandardMaterial({ color: _a.WHITE }),
    new three_1.MeshStandardMaterial({ color: _a.WHITE }),
];
(() => {
    _a.pageGeometry.translate(_a.PAGE_WIDTH / 2, 0, 0);
    const { position } = _a.pageGeometry.attributes;
    const vertex = new three_1.Vector3();
    const skinIndices = [];
    const skinWeights = [];
    const { count } = position;
    for (let i = 0; i < count; i++) {
        vertex.fromBufferAttribute(position, i);
        const { x } = vertex;
        const skinIndex = Math.max(0, Math.floor(x / _a.SEGMENT_WIDTH));
        const skinWeight = (x % _a.SEGMENT_WIDTH) / _a.SEGMENT_WIDTH;
        skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
        skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
    }
    _a.pageGeometry.setAttribute("skinIndex", new three_1.Uint16BufferAttribute(skinIndices, 4));
    _a.pageGeometry.setAttribute("skinWeight", new three_1.Float32BufferAttribute(skinWeights, 4));
})();
