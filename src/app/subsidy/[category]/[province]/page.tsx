"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation"; // <-- App Router
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, ArrowLeft, Building2, Target, Calendar, TrendingUp, Package, Wallet } from "lucide-react";

// Mock data for detailed subsidy information
const subsidyDetailData = {
  "A": {
    name: "Bantuan Pangan Non Tunai",
    description: "Program bantuan pangan untuk keluarga kurang mampu melalui sistem elektronik",
    packets: [
      { id: "A1", name: "Paket Sembako Keluarga", value: 35000000000, status: "completed" },
      { id: "A2", name: "Paket Nutrisi Anak", value: 25000000000, status: "in-progress" },
      { id: "A3", name: "Paket Pangan Lansia", value: 16500000000, status: "pending" }
    ],
    vendor: {
      name: "PT Distribusi Pangan Nusantara",
      contact: "distribusi@pangan.co.id",
      phone: "(021) 5555-1234"
    },
    sources: [
      { name: "APBN Kementerian Sosial", value: 45000000000 },
      { name: "Dana Alokasi Khusus", value: 20000000000 },
      { name: "APBD Provinsi", value: 11500000000 }
    ],
    target: 89000000000,
    deadline: "2024-12-31",
    progress: 86
  },
  "B": {
    name: "Program Keluarga Harapan",
    description: "Program bantuan sosial bersyarat untuk keluarga sangat miskin",
    packets: [
      { id: "B1", name: "Bantuan Pendidikan", value: 28000000000, status: "completed" },
      { id: "B2", name: "Bantuan Kesehatan", value: 20000000000, status: "completed" },
      { id: "B3", name: "Bantuan Gizi", value: 11800000000, status: "in-progress" }
    ],
    vendor: {
      name: "PT Solusi Kesejahteraan Sosial",
      contact: "info@solusisos.co.id",
      phone: "(021) 5555-5678"
    },
    sources: [
      { name: "APBN Direktorat Jaminan Sosial", value: 35000000000 },
      { name: "Bantuan Luar Negeri", value: 15000000000 },
      { name: "CSR Perusahaan", value: 9800000000 }
    ],
    target: 65000000000,
    deadline: "2024-11-30",
    progress: 92
  },
  "C": {
    name: "Bantuan Sosial Tunai",
    description: "Bantuan langsung tunai untuk masyarakat terdampak krisis ekonomi",
    packets: [
      { id: "C1", name: "BST Keluarga Miskin", value: 22000000000, status: "completed" },
      { id: "C2", name: "BST Pekerja Informal", value: 15000000000, status: "in-progress" },
      { id: "C3", name: "BST Lansia", value: 11700000000, status: "in-progress" }
    ],
    vendor: {
      name: "Bank Rakyat Indonesia",
      contact: "bansos@bri.co.id",
      phone: "14017"
    },
    sources: [
      { name: "APBN Kemenkeu", value: 30000000000 },
      { name: "Dana Cadangan Pemerintah", value: 12000000000 },
      { name: "APBD Kabupaten/Kota", value: 6700000000 }
    ],
    target: 55000000000,
    deadline: "2024-10-31",
    progress: 89
  },
  "D": {
    name: "Kartu Indonesia Pintar",
    description: "Program bantuan pendidikan untuk anak-anak dari keluarga kurang mampu",
    packets: [
      { id: "D1", name: "KIP SD/MI", value: 18000000000, status: "completed" },
      { id: "D2", name: "KIP SMP/MTs", value: 13000000000, status: "completed" },
      { id: "D3", name: "KIP SMA/SMK", value: 8200000000, status: "in-progress" }
    ],
    vendor: {
      name: "PT Kartu Pendidikan Indonesia",
      contact: "support@kip.kemendikbud.go.id",
      phone: "(021) 5555-9012"
    },
    sources: [
      { name: "APBN Kemendikbud", value: 25000000000 },
      { name: "Dana BOS", value: 10000000000 },
      { name: "APBD Provinsi Pendidikan", value: 4200000000 }
    ],
    target: 42000000000,
    deadline: "2024-12-15",
    progress: 93
  }
};

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-100 text-green-800";
    case "in-progress": return "bg-yellow-100 text-yellow-800";
    case "pending": return "bg-gray-100 text-gray-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "completed": return "Selesai";
    case "in-progress": return "Berlangsung";
    case "pending": return "Menunggu";
    default: return "Unknown";
  }
};

export default function SubsidyDetail() {
  const [subsidyData, setSubsidyData] = useState<any>(null);
  const params = useParams(); // <-- App Router way
  const { category, province } = params; // URL: /subsidy/[category]/[province]

  if (!category || !province) return <p>Loading...</p>;

  useEffect(() => {
    if (category && subsidyDetailData[category as keyof typeof subsidyDetailData]) {
      setSubsidyData(subsidyDetailData[category as keyof typeof subsidyDetailData]);
    }
  }, [category]);

  if (!subsidyData || !category || !province) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Data tidak ditemukan</h1>
          <Link href="/">
            <Button>Kembali ke Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalRealized = subsidyData.packets.reduce((sum: number, packet: any) => sum + packet.value, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Detail Bantuan Sosial</h1>
                <p className="text-xs text-gray-600">Kategori {category} - {province}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-full">
              {category}
            </span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Subsidi {category} - {province}
              </h1>
              <p className="text-xl text-gray-600 mt-1">{subsidyData.name}</p>
            </div>
          </div>
          <p className="text-gray-700 text-lg">{subsidyData.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Realization Section */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Realisasi per Paket
                </CardTitle>
                <CardDescription>
                  Breakdown realisasi bantuan berdasarkan paket program
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {subsidyData.packets.map((packet: any) => (
                  <div key={packet.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="font-mono">
                          {packet.id}
                        </Badge>
                        <h4 className="font-semibold text-gray-900">{packet.name}</h4>
                      </div>
                      <Badge className={getStatusColor(packet.status)}>
                        {getStatusText(packet.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Nilai Realisasi:</span>
                      <span className="font-bold text-green-600 text-lg">
                        {formatRupiah(packet.value)}
                      </span>
                    </div>
                  </div>
                ))}
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Total Realisasi:</span>
                    <span className="font-bold text-green-600 text-xl">
                      {formatRupiah(totalRealized)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sources Section */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="w-5 h-5 mr-2" />
                  Sumber Dana
                </CardTitle>
                <CardDescription>
                  Sumber-sumber pendanaan untuk program bantuan sosial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {subsidyData.sources.map((source: any, index: number) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3" />
                      <span className="font-medium text-gray-900">{source.name}</span>
                    </div>
                    <span className="font-bold text-blue-600">
                      {formatRupiah(source.value)}
                    </span>
                  </div>
                ))}
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">Total Sumber Dana:</span>
                    <span className="font-bold text-blue-600 text-xl">
                      {formatRupiah(subsidyData.sources.reduce((sum: number, source: any) => sum + source.value, 0))}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vendor Section */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Vendor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{subsidyData.vendor.name}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center">
                      <span className="w-16">Email:</span>
                      <span>{subsidyData.vendor.contact}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="w-16">Telepon:</span>
                      <span>{subsidyData.vendor.phone}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Target & Deadline */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Target & Deadline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Target Value:</span>
                      <span className="font-bold text-purple-600">
                        {formatRupiah(subsidyData.target)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress:</span>
                      <span className="font-semibold text-gray-900">{subsidyData.progress}%</span>
                    </div>
                    <Progress value={subsidyData.progress} className="h-2" />
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Deadline:</span>
                    </div>
                    <p className="font-semibold text-gray-900 mt-1">
                      {new Date(subsidyData.deadline).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-800">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Ringkasan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Jumlah Paket:</span>
                  <span className="font-semibold">{subsidyData.packets.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Paket Selesai:</span>
                  <span className="font-semibold text-green-600">
                    {subsidyData.packets.filter((p: any) => p.status === 'completed').length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Sumber Dana:</span>
                  <span className="font-semibold">{subsidyData.sources.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
