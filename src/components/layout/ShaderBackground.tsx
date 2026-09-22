import { ShaderBackground } from "@/components/motion/shader-background";
import { useTheme } from "../theme-provider";
import { useEffect, useState } from "react";

export function AppShaderBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getResolvedTheme = () => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return theme;
  };

  const isDark = getResolvedTheme() === "dark";

  return (
    <div className="fixed inset-0 -z-10">
      <ShaderBackground
        variant="grain-gradient"
        colors={
          isDark
            ? [
                "#FF6B35", // Orange sunset
                "#FF8C61", // Coral
                "#FFA587", // Peach
                "#E63946", // Red sunset
                "#A8344D", // Deep rose
                "#6A1B9A", // Purple twilight
              ]
            : [
                "#FFE5EC", // Pastel pink
                "#FFC9DE", // Soft rose
                "#FFD5E5", // Light pink
                "#E5F3FF", // Pastel blue
                "#D4E5FF", // Sky blue
                "#F0E5FF", // Lavender
              ]
        }
        colorBack={isDark ? "#1a1a2e" : "#fafafa"}
        shape="wave"
        softness={0.8}
        intensity={0.5}
        noise={0.7}
        speed={0.3}
      />
    </div>
  );
}
