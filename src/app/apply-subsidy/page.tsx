"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  ArrowLeft, 
  DollarSign, 
  Home, 
  Users, 
  Zap,
  Building,
  Send,
  CheckCircle,
  Calculator,
  FileText,
  Info
} from "lucide-react";

interface FormData {
  monthlyIncome: string;
  monthlyExpenses: string;
  electricityBill: string;
  propertyTax: string;
  familyMembers: string;
}

export default function SubsidyApplication() {
  const [formData, setFormData] = useState<FormData>({
    monthlyIncome: "",
    monthlyExpenses: "",
    electricityBill: "",
    propertyTax: "",
    familyMembers: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (value: string) => {
    const number = parseFloat(value.replace(/[^0-9]/g, ''));
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('id-ID').format(number);
  };

  const handleCurrencyInput = (field: keyof FormData, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setFormData(prev => ({ ...prev, [field]: numericValue }));
  };

  const calculateNetIncome = () => {
    const income = parseFloat(formData.monthlyIncome) || 0;
    const expenses = parseFloat(formData.monthlyExpenses) || 0;
    const electricity = parseFloat(formData.electricityBill) || 0;
    const tax = parseFloat(formData.propertyTax) || 0;
    return income - expenses - electricity - tax;
  };

  const getEligibilityStatus = () => {
    const netIncome = calculateNetIncome();
    const familyMembers = parseInt(formData.familyMembers) || 0;
    const incomePerPerson = familyMembers > 0 ? netIncome / familyMembers : netIncome;
    
    if (incomePerPerson <= 500000) return { status: "Sangat Layak", color: "text-green-600", bg: "bg-green-50" };
    if (incomePerPerson <= 1000000) return { status: "Layak", color: "text-blue-600", bg: "bg-blue-50" };
    if (incomePerPerson <= 1500000) return { status: "Cukup Layak", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { status: "Perlu Evaluasi", color: "text-red-600", bg: "bg-red-50" };
  };

  const validateForm = () => {
    const requiredFields = ['monthlyIncome', 'monthlyExpenses', 'electricityBill', 'propertyTax', 'familyMembers'];
    return requiredFields.every(field => formData[field as keyof FormData].trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }

    if (parseInt(formData.familyMembers) < 1) {
      alert("Jumlah anggota keluarga harus minimal 1 orang.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          monthlyIncome: "",
          monthlyExpenses: "",
          electricityBill: "",
          propertyTax: "",
          familyMembers: ""
        });
        setIsSubmitted(false);
      }, 4000);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Pengajuan Berhasil Dikirim!
            </h3>
            <p className="text-gray-600 mb-6">
              Data pengajuan bantuan sosial Anda telah diterima. Tim verifikasi akan meninjau dokumen dalam 3-5 hari kerja.
            </p>
            <Link href="/dashboard">
              <Button>Kembali ke Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const eligibility = getEligibilityStatus();
  const netIncome = calculateNetIncome();

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
                <h1 className="text-xl font-bold text-gray-900">Pengajuan Bantuan</h1>
                <p className="text-xs text-gray-600">Sistem Bantuan Sosial</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pengajuan Bantuan Sosial
          </h1>
          <p className="text-gray-600 text-lg">
            Lengkapi informasi keuangan dan keluarga untuk pengajuan bantuan sosial
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Data Keuangan dan Keluarga
                </CardTitle>
                <CardDescription>
                  Isi formulir di bawah ini dengan data yang akurat dan terbaru
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Financial Information Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Informasi Keuangan
                    </h3>

                    {/* Monthly Income */}
                    <div className="space-y-2">
                      <Label htmlFor="monthlyIncome" className="text-sm font-medium text-gray-700">
                        Pendapatan Bulanan <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          Rp
                        </div>
                        <Input
                          id="monthlyIncome"
                          type="text"
                          placeholder="0"
                          value={formatCurrency(formData.monthlyIncome)}
                          onChange={(e) => handleCurrencyInput("monthlyIncome", e.target.value)}
                          className="pl-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    {/* Monthly Expenses */}
                    <div className="space-y-2">
                      <Label htmlFor="monthlyExpenses" className="text-sm font-medium text-gray-700">
                        Pengeluaran Bulanan <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          Rp
                        </div>
                        <Input
                          id="monthlyExpenses"
                          type="text"
                          placeholder="0"
                          value={formatCurrency(formData.monthlyExpenses)}
                          onChange={(e) => handleCurrencyInput("monthlyExpenses", e.target.value)}
                          className="pl-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    {/* Electricity Bill */}
                    <div className="space-y-2">
                      <Label htmlFor="electricityBill" className="text-sm font-medium text-gray-700">
                        Tagihan Listrik per Bulan <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500">
                          Rp
                        </div>
                        <Input
                          id="electricityBill"
                          type="text"
                          placeholder="0"
                          value={formatCurrency(formData.electricityBill)}
                          onChange={(e) => handleCurrencyInput("electricityBill", e.target.value)}
                          className="pl-16 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    {/* Property Tax */}
                    <div className="space-y-2">
                      <Label htmlFor="propertyTax" className="text-sm font-medium text-gray-700">
                        Pajak Bumi dan Bangunan (PBB) per Bulan <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          <Building className="w-4 h-4" />
                        </div>
                        <div className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-500">
                          Rp
                        </div>
                        <Input
                          id="propertyTax"
                          type="text"
                          placeholder="0"
                          value={formatCurrency(formData.propertyTax)}
                          onChange={(e) => handleCurrencyInput("propertyTax", e.target.value)}
                          className="pl-16 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Family Information Section */}
                  <div className="space-y-4 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Informasi Keluarga
                    </h3>

                    {/* Family Members */}
                    <div className="space-y-2">
                      <Label htmlFor="familyMembers" className="text-sm font-medium text-gray-700">
                        Jumlah Anggota Keluarga Tanggungan <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          <Users className="w-4 h-4" />
                        </div>
                        <Input
                          id="familyMembers"
                          type="number"
                          min="1"
                          max="20"
                          placeholder="0"
                          value={formData.familyMembers}
                          onChange={(e) => handleInputChange("familyMembers", e.target.value)}
                          className="pl-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Termasuk Anda dan semua anggota keluarga yang menjadi tanggungan
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !validateForm()}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Memproses...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Kirim Pengajuan
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calculation Summary */}
            {(formData.monthlyIncome || formData.monthlyExpenses || formData.electricityBill || formData.propertyTax) && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Ringkasan Perhitungan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pendapatan:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(formData.monthlyIncome) ? `Rp ${formatCurrency(formData.monthlyIncome)}` : 'Rp 0'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pengeluaran:</span>
                      <span className="font-medium text-red-600">
                        -{formatCurrency(formData.monthlyExpenses) ? `Rp ${formatCurrency(formData.monthlyExpenses)}` : 'Rp 0'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Listrik:</span>
                      <span className="font-medium text-red-600">
                        -{formatCurrency(formData.electricityBill) ? `Rp ${formatCurrency(formData.electricityBill)}` : 'Rp 0'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">PBB:</span>
                      <span className="font-medium text-red-600">
                        -{formatCurrency(formData.propertyTax) ? `Rp ${formatCurrency(formData.propertyTax)}` : 'Rp 0'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Pendapatan Bersih:</span>
                      <span className={netIncome >= 0 ? 'text-green-600' : 'text-red-600'}>
                        Rp {formatCurrency(netIncome.toString())}
                      </span>
                    </div>
                    {formData.familyMembers && (
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Per anggota keluarga:</span>
                        <span>
                          Rp {formatCurrency((netIncome / parseInt(formData.familyMembers)).toString())}
                        </span>
                      </div>
                    )}
                  </div>

                  {formData.familyMembers && (
                    <div className={`p-3 rounded-lg ${eligibility.bg} border`}>
                      <div className="text-center">
                        <p className="text-xs text-gray-600 mb-1">Status Kelayakan:</p>
                        <p className={`font-semibold ${eligibility.color}`}>
                          {eligibility.status}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Information Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Informasi Penting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Proses Verifikasi</h4>
                  <p className="text-sm text-gray-600">
                    Tim verifikasi akan meninjau data dalam 3-5 hari kerja dan melakukan kunjungan jika diperlukan.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Dokumen Pendukung</h4>
                  <p className="text-sm text-gray-600">
                    Siapkan slip gaji, tagihan listrik, dan PBB untuk verifikasi data.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Kriteria Kelayakan</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Pendapatan per orang ≤ Rp 500.000: Sangat Layak</li>
                    <li>• Pendapatan per orang ≤ Rp 1.000.000: Layak</li>
                    <li>• Pendapatan per orang ≤ Rp 1.500.000: Cukup Layak</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Butuh Bantuan?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-blue-900">Hotline welfare.id</h4>
                  <p className="text-blue-700">0800-1234-5678</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Email</h4>
                  <p className="text-blue-700">bantuan@welfare.id.go.id</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Jam Layanan</h4>
                  <p className="text-blue-700">Senin - Jumat: 08:00 - 16:00 WIB</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
