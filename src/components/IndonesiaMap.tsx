"use client";

import { useEffect, useState } from "react";
import * as d3 from "d3-geo";
import indonesiaGeoJSON from "@/data/indonesia-provinces.json"; // store your GeoJSON locally

interface Province {
  id: number;
  name: string;
  region: string;
  subsidies: {
    [key: string]: {
      name: string;
      total: number;
    };
  };
}

interface IndonesiaMapProps {
  provinces: Province[];
  selectedProvince: number | null;
  onProvinceClick: (id: number) => void;
}

export default function IndonesiaMap({
  provinces,
  selectedProvince,
  onProvinceClick,
}: IndonesiaMapProps) {
  const [hoveredProvince, setHoveredProvince] = useState<number | null>(null);
  const [paths, setPaths] = useState<{ d: string; name: string }[]>([]);

  const width = 1200;
  const height = 600;

  const getProvinceColor = (provinceName: string) => {
    const province = provinces.find(
      (p) => p.name.toLowerCase() === provinceName.toLowerCase()
    );
    if (!province) return "#6b7280";

    if (selectedProvince === province.id) return "#fbbf24";
    if (hoveredProvince === province.id) return "#f59e0b";

    const regionColors = {
      Jawa: "#3b82f6",
      Sumatera: "#10b981",
      Kalimantan: "#8b5cf6",
      Sulawesi: "#f97316",
      "Nusa Tenggara": "#ec4899",
      Papua: "#ef4444",
      Maluku: "#6366f1",
    };
    return regionColors[province.region as keyof typeof regionColors] || "#6b7280";
  };

  const getStrokeWidth = (provinceName: string) => {
    const province = provinces.find(
      (p) => p.name.toLowerCase() === provinceName.toLowerCase()
    );
    if (!province) return "1";
    if (selectedProvince === province.id) return "3";
    if (hoveredProvince === province.id) return "2";
    return "1";
  };

  const getFilter = (provinceName: string) => {
    const province = provinces.find(
      (p) => p.name.toLowerCase() === provinceName.toLowerCase()
    );
    if (province && selectedProvince === province.id) {
      return "drop-shadow(0 0 20px rgba(251, 191, 36, 0.8))";
    }
    return "";
  };

  useEffect(() => {
    const projection = d3.geoMercator().center([120, -2]).scale(1600).translate([width / 2, height / 2]);
    const pathGenerator = d3.geoPath().projection(projection);

    const newPaths = (indonesiaGeoJSON as any).features.map((feature: any) => ({
      d: pathGenerator(feature) || "",
      name: feature.properties.Propinsi,
    }));

    setPaths(newPaths);
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <text
          x={width / 2}
          y={30}
          textAnchor="middle"
          className="text-xl font-bold fill-gray-800"
        >
          Peta Provinsi Indonesia
        </text>

        {
            paths.map((provincePath, idx) => {
          const province = provinces.find(
            (p) => p.name.toLowerCase() === provincePath.name.toLowerCase()
          );

          return (
            <path
              key={idx}
              d={provincePath.d}
              fill={getProvinceColor(provincePath.name)}
              stroke="#fff"
              strokeWidth={getStrokeWidth(provincePath.name)}
              className="cursor-pointer transition-all duration-300"
              style={{ filter: getFilter(provincePath.name) }}
              onClick={() => province && onProvinceClick(province.id)}
              onMouseEnter={() =>
                province && setHoveredProvince(province.id)
              }
              onMouseLeave={() => setHoveredProvince(null)}
            />
          );
        })}

        <text
          x={width / 2}
          y={height - 20}
          textAnchor="middle"
          className="text-sm fill-gray-600"
        >
          Klik pada provinsi untuk melihat detail bantuan sosial
        </text>
      </svg>
    </div>
  );
}
