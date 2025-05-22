import { Bone, BoxGeometry, Color, Float32BufferAttribute, MeshStandardMaterial, Skeleton, SkinnedMesh, Uint16BufferAttribute, Vector3, } from "three";
export class Geometry {
    static PAGE_WIDTH = 1.28;
    static PAGE_HEIGHT = 1.71;
    static PAGE_DEPTH = 0.003;
    static PAGE_SEGMENTS = 30;
    static TURN_EASE_FACTOR = 0.5;
    static FOLD_EASE_FACTOR = 0.3;
    static WHITE = new Color("#fff");
    static EMISSIVE = new Color("orange");
    static INSIDE_CURVE_STRENGTH = 0.18;
    static OUTSITE_CURVE_STRENGTH = 0.05;
    static TURNING_CURVE_STRENGTH = 0.09;
    static SEGMENT_WIDTH = this.PAGE_WIDTH / this.PAGE_SEGMENTS;
    static pageGeometry = new BoxGeometry(this.PAGE_WIDTH, this.PAGE_HEIGHT, this.PAGE_DEPTH, this.PAGE_SEGMENTS, 2);
    static pageMaterials = [
        new MeshStandardMaterial({ color: this.WHITE }),
        new MeshStandardMaterial({ color: "#111" }),
        new MeshStandardMaterial({ color: this.WHITE }),
        new MeshStandardMaterial({ color: this.WHITE }),
    ];
    static {
        this.pageGeometry.translate(this.PAGE_WIDTH / 2, 0, 0);
        const { position } = this.pageGeometry.attributes;
        const vertex = new Vector3();
        const skinIndices = [];
        const skinWeights = [];
        const { count } = position;
        for (let i = 0; i < count; i++) {
            vertex.fromBufferAttribute(position, i);
            const { x } = vertex;
            const skinIndex = Math.max(0, Math.floor(x / this.SEGMENT_WIDTH));
            const skinWeight = (x % this.SEGMENT_WIDTH) / this.SEGMENT_WIDTH;
            skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
            skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
        }
        this.pageGeometry.setAttribute("skinIndex", new Uint16BufferAttribute(skinIndices, 4));
        this.pageGeometry.setAttribute("skinWeight", new Float32BufferAttribute(skinWeights, 4));
    }
    static createSkinnedMesh(frontImage, backImage) {
        const bones = this.createBones();
        const skeleton = new Skeleton(bones);
        const materials = this.createPageMaterials(frontImage, backImage);
        const mesh = new SkinnedMesh(this.pageGeometry, materials);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;
        mesh.add(bones[0]);
        mesh.bind(skeleton);
        return mesh;
    }
    static createBones() {
        const bones = [];
        for (let i = 0; i < this.PAGE_SEGMENTS; i++) {
            const bone = new Bone();
            if (i === 0) {
                bone.position.x = 0;
            }
            else {
                bone.position.x = this.SEGMENT_WIDTH * i;
            }
            bones?.[i - 1]?.attach?.(bone);
            bones.push(bone);
        }
        return bones;
    }
    static createPageMaterials(frontImage, backImage) {
        return [
            ...this.pageMaterials,
            new MeshStandardMaterial({
                color: this.WHITE,
                map: frontImage,
                roughness: 0.1,
                emissive: this.EMISSIVE,
                emissiveIntensity: 0,
            }),
            new MeshStandardMaterial({
                color: this.WHITE,
                map: backImage,
                roughness: 0.1,
                emissive: this.EMISSIVE,
                emissiveIntensity: 0,
            }),
        ];
    }
}
