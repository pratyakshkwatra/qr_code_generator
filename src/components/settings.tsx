"use client";

import { getQRSettings, QRSettings, saveQRSettings } from "@/utils/qr_settings";
import { useState, useEffect } from "react";
import { ImagePlus } from "lucide-react";

export default function Settings({
  onChange,
}: {
  onChange: (s: QRSettings) => void;
}) {
  const [settings, setSettings] = useState<QRSettings>(getQRSettings());

  useEffect(() => {
    saveQRSettings(settings);
    onChange(settings);
  }, [settings]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setSettings((prev) => ({
        ...prev,
        imageDataUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 p-6 rounded-2xl bg-neutral-900 text-sm text-gray-100 border border-white/10 backdrop-blur-md shadow-inner">
      <div className="p-4 rounded-xl bg-neutral-800 border border-white/10 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-white mb-2">Colors</h3>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-start">
            <label className="text-xs mb-1 text-gray-300">Foreground</label>
            <input
              type="color"
              value={settings.fgColor}
              onChange={(e) =>
                setSettings({ ...settings, fgColor: e.target.value })
              }
              className="h-8 w-12 rounded border border-gray-500 cursor-pointer bg-transparent"
            />
          </div>

          <div className="flex flex-col items-start">
            <label className="text-xs mb-1 text-gray-300">Background</label>
            <input
              type="color"
              value={settings.bgColor}
              onChange={(e) =>
                setSettings({ ...settings, bgColor: e.target.value })
              }
              className="h-8 w-12 rounded border border-gray-500 cursor-pointer bg-transparent"
            />
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-neutral-800 border border-white/10 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-white mb-2">Logo</h3>
        <label className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md bg-neutral-700 text-gray-100 hover:bg-neutral-600 transition cursor-pointer gap-2">
          <ImagePlus size={16} className="text-gray-100" />
          <span>Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {settings.imageDataUrl && (
          <img
            src={settings.imageDataUrl}
            alt="Embedded"
            className="mt-2 w-20 h-20 object-contain rounded shadow-md border border-white/20"
          />
        )}
      </div>
    </div>
  );
}
