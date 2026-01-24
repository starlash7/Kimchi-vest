'use client';

import { useEffect, useState } from 'react';

export default function Background() {
    const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);

    useEffect(() => {
        const starCount = 50;
        const newStars = Array.from({ length: starCount }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 3 + 1}px`,
            duration: `${Math.random() * 3 + 2}s`,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="main-container">
            <div className="star-field">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="star"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: star.size,
                            height: star.size,
                            '--duration': star.duration,
                        } as any}
                    />
                ))}
            </div>
            <div className="grid-floor" />
        </div>
    );
}
