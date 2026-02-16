
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className, strength = 40 }) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!buttonRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const moveX = (clientX - centerX) / (width / strength);
        const moveY = (clientY - centerY) / (height / strength);

        setPosition({ x: moveX, y: moveY });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default MagneticButton;
