"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Magazine = void 0;
const react_1 = require("react");
const Context_1 = require("./Context");
const Page_1 = require("./Page");
const Magazine = ({ images, sound }) => {
    const { current } = (0, react_1.use)(Context_1.MagazineContext);
    const [deferredPage, setDeferredPage] = (0, react_1.useState)(current);
    const slides = (0, react_1.useMemo)(() => compileImages(images), [images]);
    const length = (0, react_1.useMemo)(() => slides.length, [slides.length]);
    const timeout = (0, react_1.useRef)(null);
    const goToPage = (0, react_1.useCallback)(() => {
        setDeferredPage(deferredPage => {
            if (current === deferredPage) {
                return deferredPage;
            }
            timeout.current = setTimeout(() => {
                goToPage();
            }, Math.abs(current - deferredPage) > 2 ? 50 : 150);
            if (current > deferredPage) {
                return deferredPage + 1;
            }
            return deferredPage - 1;
        });
    }, [current]);
    (0, react_1.useEffect)(() => {
        goToPage();
        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, [current, goToPage]);
    (0, react_1.useEffect)(() => {
        if (sound) {
            const pageTurn = new Audio("/page-flip.mp3");
            void pageTurn.play();
        }
    }, [current, sound]);
    return (<group rotation-y={-Math.PI / 2}>
      {slides.map((image, index) => (<Page_1.Page key={index} {...image} index={index} current={deferredPage} opened={deferredPage > index} bookClosed={deferredPage === 0 || deferredPage === length}/>))}
    </group>);
};
exports.Magazine = Magazine;
function compileImages(images) {
    const photos = [];
    const { length } = images;
    for (let i = 0; i < length; i += 2) {
        photos.push({
            front: images[i % length],
            back: images[(i + 1) % length],
        });
    }
    return photos;
}
