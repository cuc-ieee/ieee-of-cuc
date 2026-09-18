"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

export interface SkeletonImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  containerClassName?: string;
  skeletonClassName?: string;
  showSkeleton?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export function SkeletonImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = "",
  containerClassName = "",
  skeletonClassName = "",
  showSkeleton = true,
  onLoad,
  onError,
  sizes,
  ...rest
}: SkeletonImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div
      className={`relative overflow-hidden ${
        fill ? "w-full h-full" : "inline-block"
      } ${containerClassName}`}
    >
      {/* Animated Skeleton Shimmer (Visible until image loads) */}
      {showSkeleton && !isLoaded && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 z-10 bg-secondary/50 backdrop-blur-xs flex items-center justify-center transition-opacity duration-500 ${
            isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          } ${skeletonClassName}`}
        >
          {/* Shimmering Electric Blue Gradient Beam */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(56,189,248,0.12)_50%,transparent_100%)] bg-[length:200%_100%] animate-shimmer" />

          {/* Micro Pulse Grid Texture */}
          <div className="absolute inset-0 bg-white/[0.02] animate-pulse" />
        </div>
      )}

      {/* Image with Fade-in Transition */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes || (fill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined)}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[1.02] blur-[2px]"
        } ${className}`}
        {...rest}
      />
    </div>
  );
}
