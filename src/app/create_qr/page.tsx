"use client";

import { JSX, useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import {
  Download,
  TextCursorInput,
  Link,
  Mail,
  Phone,
  Contact,
  MessageSquareText,
  Wifi,
  MapPin,
  Calendar,
} from "lucide-react";
import ListItem from "@/components/list_item";
import Settings from "@/components/settings";
import { QRSettings, getQRSettings, saveQRSettings } from "@/utils/qr_settings";

const tabs = [
  { label: "Text", icon: TextCursorInput, type: "text" },
  { label: "URL", icon: Link, type: "url" },
  { label: "Email", icon: Mail, type: "email" },
  { label: "Phone", icon: Phone, type: "phone" },
  { label: "Contact", icon: Contact, type: "contact" },
  { label: "SMS", icon: MessageSquareText, type: "sms" },
  { label: "WiFi", icon: Wifi, type: "wifi" },
  { label: "Geo", icon: MapPin, type: "geo" },
  { label: "Event", icon: Calendar, type: "event" },
] as const;

type QRType = (typeof tabs)[number]["type"];

export default function CreateQR() {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<QRCodeStyling | null>(null);
  const [activeTab, setActiveTab] = useState<QRType>("text");
  const [settings, setSettings] = useState<QRSettings>(getQRSettings());
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [qrValue, setQrValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    saveQRSettings(settings);
    qrInstance.current = new QRCodeStyling({
      width: 250,
      height: 250,
      type: "svg",
      data: qrValue,
      image: settings.imageDataUrl || undefined,
      dotsOptions: {
        color: settings.fgColor,
        type: "rounded",
      },
      backgroundOptions: {
        color: settings.bgColor,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
      },
    });
  }, []);

  useEffect(() => {
    if (qrInstance.current && qrValue) {
      qrInstance.current.update({
        data: qrValue,
        image: settings.imageDataUrl || undefined,
        dotsOptions: { color: settings.fgColor },
        backgroundOptions: { color: settings.bgColor },
      });
      qrInstance.current.append(qrRef.current!);
    }
  }, [qrValue, settings]);

  const generateQRValue = (): string => {
    switch (activeTab) {
      case "text":
        return formData.text || "";
      case "url":
        return formData.url || "";
      case "email":
        return `mailto:${formData.email}`;
      case "phone":
        return `tel:${formData.phone}`;
      case "contact":
        return `MECARD:N:${formData.name};TEL:${formData.phone};EMAIL:${formData.email};;`;
      case "sms":
        return `SMSTO:${formData.phone}:${formData.message}`;
      case "wifi":
        return `WIFI:T:WPA;S:${formData.ssid};P:${formData.password};;`;
      case "geo":
        return `geo:${formData.lat},${formData.lng}`;
      case "event":
        return `BEGIN:VEVENT\nSUMMARY:${formData.eventTitle}\nDTSTART:${formData.eventStart}\nDTEND:${formData.eventEnd}\nEND:VEVENT`;
      default:
        return "";
    }
  };

  const handleGenerate = () => {
    const val = generateQRValue();
    if (!val || val.endsWith(":")) {
      setError("Please enter valid input.");
      return;
    }
    setError("");
    setQrValue(val);
  };

  const downloadQRCode = () => {
    if (!qrInstance.current) return;
    qrInstance.current.download({ name: "qr-code", extension: "png" });
  };

  const onInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white placeholder-gray-400";

  const renderInputs = () => {
    const el = (key: string, placeholder: string, type = "text") => (
      <input
        key={key}
        type={type}
        placeholder={placeholder}
        className={inputStyle}
        value={formData[key] || ""}
        onChange={(e) => onInputChange(key, e.target.value)}
      />
    );

    const common: Record<QRType, JSX.Element> = {
      text: el("text", "Enter text"),
      url: el("url", "https://qr.pratyakshkwatra.com", "url"),
      email: el("email", "test@test.com", "email"),
      phone: el("phone", "+91 999999999", "tel"),
      contact: (
        <div className="space-y-3">
          {el("name", "Full Name")}
          {el("email", "Email", "email")}
          {el("phone", "Phone", "tel")}
        </div>
      ),
      sms: (
        <div className="space-y-3">
          {el("phone", "Phone", "tel")}
          {el("message", "Message")}
        </div>
      ),
      wifi: (
        <div className="space-y-3">
          {el("ssid", "SSID")}
          {el("password", "Password")}
        </div>
      ),
      geo: (
        <div className="space-y-3">
          {el("lat", "Latitude")}
          {el("lng", "Longitude")}
        </div>
      ),
      event: (
        <div className="space-y-3">
          {el("eventTitle", "Event Title")}
          {el("eventStart", "Start Time", "datetime-local")}
          {el("eventEnd", "End Time", "datetime-local")}
        </div>
      ),
    };
    return common[activeTab];
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="flex w-full max-w-6xl rounded-2xl shadow-xl overflow-hidden border bg-white">
        <div className="flex-[0.9] p-6 border-r bg-white">
          <ul className="space-y-1">
            {tabs.map((tab) => (
              <ListItem
                key={tab.type}
                text={tab.label}
                icon={tab.icon}
                active={activeTab === tab.type}
                onClick={() => {
                  setActiveTab(tab.type);
                  setFormData({});
                  setQrValue("");
                  setError("");
                }}
              />
            ))}
          </ul>
          <div className="mt-6">
            <Settings onChange={setSettings} />
          </div>
        </div>

        <div className="flex-[3.1] p-8 flex flex-col items-center justify-center bg-gray-50">
          <div className="bg-white p-4 rounded-lg shadow">
            <div ref={qrRef} className="w-[250px] h-[250px]" />
          </div>

          <div className="w-full mt-6 space-y-4">{renderInputs()}</div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="flex w-full gap-3 mt-4">
            <button
              onClick={handleGenerate}
              className="flex-1 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900"
            >
              Generate QR
            </button>
            {qrValue && (
              <button
                onClick={downloadQRCode}
                className="bg-gray-100 border px-4 py-3 rounded-xl hover:bg-gray-200"
              >
                <Download className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
