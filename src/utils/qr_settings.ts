export type QRSettings = {
  fgColor: string;
  bgColor: string;
  imageDataUrl?: string;
};

const SETTINGS_KEY = "qrSettings";

export function getQRSettings(): QRSettings {
  if (typeof window === "undefined") return { fgColor: "#000000", bgColor: "#ffffff" };
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)!) || {
      fgColor: "#000000",
      bgColor: "#ffffff",
    };
  } catch {
    return { fgColor: "#000000", bgColor: "#ffffff" };
  }
}

export function saveQRSettings(settings: QRSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
