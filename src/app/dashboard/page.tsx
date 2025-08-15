"use client"

import { useState } from "react";
import Link from "next/link"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TrendingUp, Users, LogOut } from "lucide-react";
import IndonesiaMap from "@/components/IndonesiaMap";
import welfareLogo from "../../../public/welfare.id-circle.png"

// Indonesian provinces data with mock subsidy information
const provincesData = [
  {
    id: 1,
    name: "DKI Jakarta",
    region: "Jawa",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 125000000000 },
      B: { name: "Program Keluarga Harapan", total: 89500000000 },
      C: { name: "Bantuan Sosial Tunai", total: 67800000000 },
      D: { name: "Kartu Indonesia Pintar", total: 45200000000 }
    }
  },
  {
    id: 2,
    name: "Jawa Barat",
    region: "Jawa",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 234000000000 },
      B: { name: "Program Keluarga Harapan", total: 178300000000 },
      C: { name: "Bantuan Sosial Tunai", total: 156700000000 },
      D: { name: "Kartu Indonesia Pintar", total: 123400000000 }
    }
  },
  {
    id: 3,
    name: "Jawa Tengah",
    region: "Jawa",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 198500000000 },
      B: { name: "Program Keluarga Harapan", total: 145600000000 },
      C: { name: "Bantuan Sosial Tunai", total: 134200000000 },
      D: { name: "Kartu Indonesia Pintar", total: 98700000000 }
    }
  },
  {
    id: 4,
    name: "Jawa Timur",
    region: "Jawa",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 267800000000 },
      B: { name: "Program Keluarga Harapan", total: 189400000000 },
      C: { name: "Bantuan Sosial Tunai", total: 167300000000 },
      D: { name: "Kartu Indonesia Pintar", total: 134500000000 }
    }
  },
  {
    id: 5,
    name: "Sumatera Utara",
    region: "Sumatera",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 156700000000 },
      B: { name: "Program Keluarga Harapan", total: 123400000000 },
      C: { name: "Bantuan Sosial Tunai", total: 109800000000 },
      D: { name: "Kartu Indonesia Pintar", total: 87600000000 }
    }
  },
  {
    id: 6,
    name: "Sumatera Barat",
    region: "Sumatera",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 87600000000 },
      B: { name: "Program Keluarga Harapan", total: 67800000000 },
      C: { name: "Bantuan Sosial Tunai", total: 56700000000 },
      D: { name: "Kartu Indonesia Pintar", total: 43200000000 }
    }
  },
  {
    id: 7,
    name: "Sumatera Selatan",
    region: "Sumatera",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 98700000000 },
      B: { name: "Program Keluarga Harapan", total: 76500000000 },
      C: { name: "Bantuan Sosial Tunai", total: 65400000000 },
      D: { name: "Kartu Indonesia Pintar", total: 52300000000 }
    }
  },
  {
    id: 8,
    name: "Kalimantan Timur",
    region: "Kalimantan",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 76500000000 },
      B: { name: "Program Keluarga Harapan", total: 54300000000 },
      C: { name: "Bantuan Sosial Tunai", total: 45600000000 },
      D: { name: "Kartu Indonesia Pintar", total: 34500000000 }
    }
  },
  {
    id: 9,
    name: "Kalimantan Selatan",
    region: "Kalimantan",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 65400000000 },
      B: { name: "Program Keluarga Harapan", total: 48700000000 },
      C: { name: "Bantuan Sosial Tunai", total: 39800000000 },
      D: { name: "Kartu Indonesia Pintar", total: 32100000000 }
    }
  },
  {
    id: 10,
    name: "Kalimantan Barat",
    region: "Kalimantan",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 54300000000 },
      B: { name: "Program Keluarga Harapan", total: 41200000000 },
      C: { name: "Bantuan Sosial Tunai", total: 34500000000 },
      D: { name: "Kartu Indonesia Pintar", total: 27600000000 }
    }
  },
  {
    id: 11,
    name: "Sulawesi Selatan",
    region: "Sulawesi",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 109800000000 },
      B: { name: "Program Keluarga Harapan", total: 87600000000 },
      C: { name: "Bantuan Sosial Tunai", total: 73400000000 },
      D: { name: "Kartu Indonesia Pintar", total: 58900000000 }
    }
  },
  {
    id: 12,
    name: "Sulawesi Utara",
    region: "Sulawesi",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 43200000000 },
      B: { name: "Program Keluarga Harapan", total: 32100000000 },
      C: { name: "Bantuan Sosial Tunai", total: 27600000000 },
      D: { name: "Kartu Indonesia Pintar", total: 21800000000 }
    }
  },
  {
    id: 13,
    name: "Bali",
    region: "Nusa Tenggara",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 56700000000 },
      B: { name: "Program Keluarga Harapan", total: 43200000000 },
      C: { name: "Bantuan Sosial Tunai", total: 36500000000 },
      D: { name: "Kartu Indonesia Pintar", total: 29800000000 }
    }
  },
  {
    id: 14,
    name: "Nusa Tenggara Barat",
    region: "Nusa Tenggara",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 67800000000 },
      B: { name: "Program Keluarga Harapan", total: 52300000000 },
      C: { name: "Bantuan Sosial Tunai", total: 43600000000 },
      D: { name: "Kartu Indonesia Pintar", total: 35400000000 }
    }
  },
  {
    id: 15,
    name: "Nusa Tenggara Timur",
    region: "Nusa Tenggara",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 76500000000 },
      B: { name: "Program Keluarga Harapan", total: 59800000000 },
      C: { name: "Bantuan Sosial Tunai", total: 48700000000 },
      D: { name: "Kartu Indonesia Pintar", total: 39200000000 }
    }
  },
  {
    id: 16,
    name: "Papua",
    region: "Papua",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 89500000000 },
      B: { name: "Program Keluarga Harapan", total: 67800000000 },
      C: { name: "Bantuan Sosial Tunai", total: 54300000000 },
      D: { name: "Kartu Indonesia Pintar", total: 43600000000 }
    }
  },
  {
    id: 17,
    name: "Papua Barat",
    region: "Papua",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 43200000000 },
      B: { name: "Program Keluarga Harapan", total: 32100000000 },
      C: { name: "Bantuan Sosial Tunai", total: 26800000000 },
      D: { name: "Kartu Indonesia Pintar", total: 21300000000 }
    }
  },
  {
    id: 18,
    name: "Maluku",
    region: "Maluku",
    subsidies: {
      A: { name: "Bantuan Pangan Non Tunai", total: 34500000000 },
      B: { name: "Program Keluarga Harapan", total: 26800000000 },
      C: { name: "Bantuan Sosial Tunai", total: 21300000000 },
      D: { name: "Kartu Indonesia Pintar", total: 17600000000 }
    }
  }
];

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export default function Dashboard() {
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const router = useRouter();

  const handleProvinceClick = (provinceId: number) => {
    setSelectedProvince(provinceId === selectedProvince ? null : provinceId);
  };

  const handleCategoryClick = (category: string, provinceName: string) => {
    router.push(`/subsidy/${category}/${encodeURIComponent(provinceName)}`);
  };

  const selectedProvinceData = selectedProvince 
    ? provincesData.find(p => p.id === selectedProvince) 
    : null;

  const getTotalSubsidies = (province: any) => {
    return Object.values(province.subsidies).reduce((total: number, subsidy: any) => total + subsidy.total, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
                <Image
                  src={welfareLogo}
                  height={50}
                  width={50}
                  alt="welfare.id logo"
                />
              <div>
                <h1 className="text-xl font-bold text-gray-900">welfare.id Dashboard</h1>
                <p className="text-xs text-gray-600">Monitoring Bantuan Sosial per Provinsi</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/complaint">
                <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                  Ajukan Pengaduan
                </Button>
              </Link>
              <Link href="/apply-subsidy">
                <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                  Ajukan Subsidi
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                  <LogOut className="w-4 h-4 mr-2" />
                  Keluar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Bantuan Sosial Indonesia
          </h1>
          <p className="text-gray-600">
            Klik pada provinsi untuk melihat detail alokasi bantuan sosial
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="h-[500px]">
                  <IndonesiaMap
                    provinces={provincesData}
                    selectedProvince={selectedProvince}
                    onProvinceClick={handleProvinceClick}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Province Details */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {selectedProvinceData ? (
                <Card className="shadow-xl bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      {selectedProvinceData.name}
                    </CardTitle>
                    <CardDescription className="text-gray-700">
                      Detail Alokasi Bantuan Sosial
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white/80 rounded-lg p-4 border border-yellow-200">
                      <div className="space-y-3">
                        {Object.entries(selectedProvinceData.subsidies).map(([key, subsidy]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50 rounded-lg px-2 transition-colors"
                            onClick={() => handleCategoryClick(key, selectedProvinceData.name)}
                          >                            <div className="flex items-center">
                              <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full mr-3">
                                {key}
                              </span>
                              <div>
                                <p className="font-medium text-gray-900">Kategori {key}</p>
                                <p className="text-sm text-gray-600">{subsidy.name}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600">
                                {formatRupiah(subsidy.total)}
                              </p>
                              <p className="text-xs text-gray-500">Klik untuk detail →</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg">Total Keseluruhan</h4>
                        <p className="text-2xl font-bold">
                          {formatRupiah(getTotalSubsidies(selectedProvinceData))}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Users className="w-12 h-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Pilih Provinsi
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Klik pada salah satu provinsi di sebelah kiri untuk melihat detail alokasi bantuan sosial
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
