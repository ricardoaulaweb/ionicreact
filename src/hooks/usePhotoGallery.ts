import { CameraResultType, CameraSource } from "@capacitor/core";
import { useCamera } from "@ionic/react-hooks/camera";
import { useState } from "react";

export function usePhotoGallery() {
  const { getPhoto } = useCamera();
  const [updateCount, forceUpdate] = useState(0);

  const takePhoto = async () => {
    return getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    }).then((photo) => {
      requestAnimationFrame(() => forceUpdate(updateCount + 1));
      return photo;
    });
  };

  return {
    takePhoto,
  };
}
