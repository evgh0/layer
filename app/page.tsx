"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import { useTheme } from "next-themes";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { title } from "@/components/primitives";
import { erzeugeLage, normalize } from "@/utils/nested-lists";
import { useLage } from "@/context/lagen-context";

// Drawing Helper: Recursively draw circles
function drawStructure(
  ctx: CanvasRenderingContext2D,
  structure: any[], // NestedList
  x: number,
  y: number,
  r: number,
  depth: number = 0
) {
  // Base circle style
  const hue = (depth * 40) % 360;
  ctx.strokeStyle = `hsl(${hue}, 70%, 50%)`;
  ctx.lineWidth = Math.max(1, r * 0.05); // dynamic line width
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();

  // If leaf (empty list), maybe fill slightly
  if (structure.length === 0) {
    ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.1)`;
    ctx.fill();
    return;
  }

  // Draw children
  const n = structure.length;
  
  let childR = 0;
  if (n === 1) {
    childR = r * 0.9; // Increased from 0.55 to take up almost everything

    drawStructure(ctx, structure[0], x, y, childR, depth + 1);
  } else {
    // Optimized packing for n > 1
    const sinVal = Math.sin(Math.PI / n);
    // Use an effective inner radius that accounts for the parent's stroke
    const R_inner = r * 0.97;
    // Calculate the maximum possible radius for n circles tangent to each other and R_inner
    const maxChildR = (R_inner * sinVal) / (1 + sinVal);
    
    // Scale slightly down to leave room for child strokes
    // Decreased from 0.95 to 0.85 to increase space between circles
    childR = maxChildR * 0.85;
    
    // Position children so they are tangent to the inner boundary
    const dist = R_inner - maxChildR;

    // Calculate child positions
    const childrenCoords: {x: number, y: number, angle: number}[] = [];
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const childX = x + Math.cos(angle) * dist;
      const childY = y + Math.sin(angle) * dist;
      childrenCoords.push({ x: childX, y: childY, angle });
    }

    for (let i = 0; i < n; i++) {
      drawStructure(ctx, structure[i], childrenCoords[i].x, childrenCoords[i].y, childR, depth + 1);
    }
  }
}

interface CanvasCardProps {
  structure: any[];
  index: number;
  isFullScreen?: boolean;
  onPress?: () => void;
}

const CanvasCard = forwardRef<HTMLCanvasElement, CanvasCardProps>(({ 
  structure, 
  index, 
  isFullScreen = false,
  onPress
}, ref) => {
  const { theme } = useTheme();
  const internalCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(internalCanvasRef.current);
      } else {
        (ref as React.MutableRefObject<HTMLCanvasElement | null>).current = internalCanvasRef.current;
      }
    }
  }, [ref]);

  useEffect(() => {
    const updateCanvas = () => {
      const canvas = internalCanvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = container.getBoundingClientRect();
      // Ensure we have dimensions
      if (rect.width === 0 || rect.height === 0) return;

      const width = rect.width;
      const height = rect.height;
      
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);
      
      if (isFullScreen) {
        ctx.fillStyle = theme === "dark" ? "#111" : "#fff";
        ctx.fillRect(0, 0, width, height);
      }

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 2 * 0.9; // 90% of half-size

      drawStructure(ctx, structure, centerX, centerY, radius);
    };

    updateCanvas();
    window.addEventListener("resize", updateCanvas);
    // Add a small timeout to allow layout to settle if needed
    setTimeout(updateCanvas, 10);
    return () => window.removeEventListener("resize", updateCanvas);
  }, [structure, isFullScreen, theme]);

  return (
    <Card 
      isHoverable 
      isPressable={!isFullScreen}
      onPress={onPress}
      className={isFullScreen ? "w-full h-full border-none shadow-none bg-transparent" : "h-[250px]"}
    >
      <CardBody className="overflow-hidden p-0 flex-grow flex justify-center items-center">
        <div ref={containerRef} className="w-full h-full">
          <canvas 
            ref={internalCanvasRef} 
            className="w-full h-full block"
          />
        </div>
      </CardBody>
    </Card>
  );
});
CanvasCard.displayName = "CanvasCard";

export default function Home() {
  const { lage } = useLage();
  const [structures, setStructures] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const fullScreenCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = () => {
    const canvas = fullScreenCanvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `pattern-lage-${lage + 1}-${selectedIndex}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  useEffect(() => {
    // Reset selection when level changes
    setSelectedIndex(null);
    setIsLoading(true);
    
    // Use setTimeout to yield to the main thread so React can render the loading state
    const timer = setTimeout(() => {
        const result = erzeugeLage(lage);
        setStructures(result);
        setIsLoading(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [lage]);

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4">
        <Spinner size="lg" color="primary" />
        <p className="text-default-500 text-lg font-medium">Muster für Lage {lage + 1} werden erzeugt...</p>
        <p className="text-default-400 text-sm">Dies kann bei höheren Lagen einen Moment dauern.</p>
      </div>
    );
  }

  if (selectedIndex !== null && structures[selectedIndex]) {
// ...
// (rest of the code omitted for brevity in oldString, but I should use enough context)

    return (
      <section className="relative flex flex-col w-full h-full">
        <div className="flex-grow flex items-center justify-center border-b border-divider overflow-hidden bg-content1 relative">
          <Button 
            className="absolute top-4 left-4 z-10"
            color="primary" 
            variant="flat" 
            onPress={() => setSelectedIndex(null)}
          >
            Zurück zur Galerie
          </Button>
          <Button
            className="absolute top-4 right-4 z-10"
            color="secondary"
            variant="flat"
            onPress={handleDownload}
          >
            Als Bild exportieren
          </Button>
          <CanvasCard 
            ref={fullScreenCanvasRef}
            structure={structures[selectedIndex]} 
            index={selectedIndex} 
            isFullScreen 
          />
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-start justify-start gap-4 py-8 md:py-10 px-6">
      <div className="inline-block max-w-xl text-left justify-start mb-8">
        <h1 className={title()}>Mustergalerie (Lage {lage + 1})</h1>
        <p className="text-default-500 mt-2">
          {structures.length} einzigartige Strukturen gefunden. Wählen Sie eine Karte aus, um Details anzuzeigen.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
        {structures.map((s, i) => (
          <CanvasCard 
            key={`${lage}-${i}`} 
            structure={s} 
            index={i} 
            onPress={() => setSelectedIndex(i)} 
          />
        ))}
      </div>
    </section>
  );
}
