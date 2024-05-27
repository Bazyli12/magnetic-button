import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Framer({ children }) {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSmooth = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const ySmooth = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } =
            ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        x.set(middleX);
        y.set(middleY);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ position: "relative", x: xSmooth, y: ySmooth }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1,
            }}
        >
            {children}
        </motion.div>
    );
}
