"use strict";
"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const maath_1 = require("maath");
const react_1 = require("react");
const three_1 = require("three");
const MathUtils_js_1 = require("three/src/math/MathUtils.js");
const drei_1 = require("@react-three/drei");
const fiber_1 = require("@react-three/fiber");
const Context_1 = require("../Context");
const Geometry_1 = require("./Geometry");
const Page = (_a) => {
    var { front, back, index, opened, current, bookClosed } = _a, rest = __rest(_a, ["front", "back", "index", "opened", "current", "bookClosed"]);
    const turnedAt = (0, react_1.useRef)(0);
    const lastOpened = (0, react_1.useRef)(opened);
    const group = (0, react_1.useRef)(null);
    const skinnedMesh = (0, react_1.useRef)(null);
    const { setCurrent } = (0, react_1.use)(Context_1.MagazineContext);
    const [highlighted, setHighlighted] = (0, react_1.useState)(false);
    (0, drei_1.useCursor)(highlighted);
    const [frontImage, backImage] = (0, drei_1.useTexture)([front, back]);
    frontImage.colorSpace = backImage.colorSpace = three_1.SRGBColorSpace;
    const manualSkinnedMesh = (0, react_1.useMemo)(() => Geometry_1.Geometry.createSkinnedMesh(frontImage, backImage), [frontImage, backImage]);
    (0, fiber_1.useFrame)((_, delta) => {
        if (!skinnedMesh.current || !group.current) {
            return;
        }
        const { material } = skinnedMesh.current;
        if (Array.isArray(material) && material[4]) {
            const intensity = highlighted ? 0.22 : 0;
            material[4].emissiveIntensity = intensity;
            material[5].emissiveIntensity = MathUtils_js_1.MathUtils.lerp(material[4].emissiveIntensity, intensity, 0.1);
        }
        if (lastOpened.current !== opened) {
            turnedAt.current = Date.now();
            lastOpened.current = opened;
        }
        const turnDuration = Math.sin((Math.min(400, Date.now() - turnedAt.current) / 400) * Math.PI);
        const rotation = Math.PI / 2;
        let targetRotation = opened ? -rotation : rotation;
        if (!bookClosed) {
            targetRotation += (0, MathUtils_js_1.degToRad)(index * 0.8);
        }
        // @ts-ignore
        const bones = skinnedMesh.current.skeleton.bones;
        const { length } = bones;
        for (let i = 0; i < length; i++) {
            const target = i === 0 ? group.current : bones[i];
            const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
            const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
            const turningIntesity = Math.sin(i * Math.PI * (1 / length)) * turnDuration;
            let foldAngle = (0, MathUtils_js_1.degToRad)(Math.sign(targetRotation) * 2);
            let turnAngle = 0;
            if (bookClosed) {
                if (i === 0) {
                    foldAngle = 0;
                    turnAngle = targetRotation;
                }
            }
            else {
                turnAngle =
                    Geometry_1.Geometry.INSIDE_CURVE_STRENGTH *
                        insideCurveIntensity *
                        targetRotation -
                        Geometry_1.Geometry.OUTSITE_CURVE_STRENGTH *
                            outsideCurveIntensity *
                            targetRotation +
                        Geometry_1.Geometry.TURNING_CURVE_STRENGTH * turningIntesity * targetRotation;
            }
            const foldIntensity = i > 8 ? Math.sin(i * Math.PI * (1 / length) - 0.5) * turnDuration : 0;
            maath_1.easing.dampAngle(target.rotation, "y", turnAngle, Geometry_1.Geometry.TURN_EASE_FACTOR, delta);
            maath_1.easing.dampAngle(target.rotation, "x", foldAngle * foldIntensity, Geometry_1.Geometry.FOLD_EASE_FACTOR, delta);
        }
    });
    const zPosition = (0, react_1.useMemo)(() => -index * Geometry_1.Geometry.PAGE_DEPTH + current * Geometry_1.Geometry.PAGE_DEPTH, [index, current]);
    const onPointerEnter = (0, react_1.useCallback)((e) => {
        e.stopPropagation();
        setHighlighted(true);
        console.log("highlighted");
    }, []);
    const onPointerLeave = (0, react_1.useCallback)((e) => {
        e.stopPropagation();
        setHighlighted(false);
        console.log("unhighlighted");
    }, []);
    const onClick = (0, react_1.useCallback)((e) => {
        e.stopPropagation();
        setCurrent(opened ? index : index + 1);
        setHighlighted(false);
    }, [opened, setCurrent, index]);
    return (<group ref={group} {...rest} onClick={onClick} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <primitive ref={skinnedMesh} object={manualSkinnedMesh} position-z={zPosition}/>
    </group>);
};
exports.Page = Page;
