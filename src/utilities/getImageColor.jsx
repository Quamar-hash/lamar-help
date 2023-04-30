export const getImageClassName = (imageName) => {
    switch (imageName) {
      case "/src/assets/icons/watermark.svg":
        return "bg-gray-800";
      case "/src/assets/icons/rebelAllianceWatermark.svg":
        return "bg-red-800";
      case "/src/assets/icons/noFactionWater.svg":
        return "bg-gray-400";
      case "/src/assets/icons/factionJedi.svg":
        return "bg-green-800/80";
      default:
    }
  };

  // fixed up colors