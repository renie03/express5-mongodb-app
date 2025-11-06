import { useState } from "react";

const SmartImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      loading="lazy"
      className={`
          ${loaded ? "" : "bg-bgSoft animate-pulse"}					
          ${className}
        `}
    />
  );
};

export default SmartImage;
