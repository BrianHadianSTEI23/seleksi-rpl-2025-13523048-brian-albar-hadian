"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  User,
  CreditCard,
  FileText,
  Home,
  Zap,
  Building,
  Users,
  Calendar,
  CheckCheck,
  X
} from "lucide-react";

interface DocumentStatus {
  id: string;
  name: string;
  status: "pass" | "fail" | "pending";
  requirement: string;
  actualValue?: string;
  notes?: string;
}

interface Applicant {
  id: string;
  name: string;
  nik: string;
  applicationDate: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  electricityBill: number;
  propertyTax: number;
  familyMembers: number;
  status: "pending" | "approved" | "rejected";
}

// Mock data for the applicant
const mockApplicant: Applicant = {
  id: "APP-2024-001",
  name: "Siti Nurhaliza",
  nik: "3201234567890123",
  applicationDate: "2024-01-15",
  monthlyIncome: 2500000,
  monthlyExpenses: 1800000,
  electricityBill: 350000,
  propertyTax: 150000,
  familyMembers: 4,
  status: "pending"
};

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export default function ApplicationReview() {
  const router = useRouter();
  const [applicant] = useState<Applicant>(mockApplicant);
  const [documents, setDocuments] = useState<DocumentStatus[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Initialize document verification checklist based on applicant data
    const netIncome = applicant.monthlyIncome - applicant.monthlyExpenses - applicant.electricityBill - applicant.propertyTax;
    const incomePerPerson = netIncome / applicant.familyMembers;

    const initialDocuments: DocumentStatus[] = [
      {
        id: "income-verification",
        name: "Verifikasi Pendapatan",
        status: applicant.monthlyIncome <= 5000000 ? "pass" : "fail",
        requirement: "Pendapatan bulanan ≤ Rp 5.000.000",
        actualValue: formatRupiah(applicant.monthlyIncome),
        notes: applicant.monthlyIncome <= 5000000 ? "Memenuhi batas maksimal pendapatan" : "Melebihi batas maksimal pendapatan"
      },
      {
        id: "family-size",
        name: "Jumlah Anggota Keluarga",
        status: applicant.familyMembers >= 2 ? "pass" : "fail",
        requirement: "Minimal 2 anggota keluarga",
        actualValue: `${applicant.familyMembers} orang`,
        notes: applicant.familyMembers >= 2 ? "Memenuhi kriteria jumlah anggota keluarga" : "Tidak memenuhi kriteria minimal"
      },
      {
        id: "income-per-person",
        name: "Pendapatan per Anggota Keluarga",
        status: incomePerPerson <= 1500000 ? "pass" : "fail",
        requirement: "Pendapatan bersih per orang ≤ Rp 1.500.000",
        actualValue: formatRupiah(incomePerPerson),
        notes: incomePerPerson <= 1500000 ? "Memenuhi kriteria pendapatan per kapita" : "Melebihi batas pendapatan per kapita"
      },
      {
        id: "electricity-bill",
        name: "Tagihan Listrik",
        status: applicant.electricityBill <= 500000 ? "pass" : "fail",
        requirement: "Tagihan listrik ≤ Rp 500.000",
        actualValue: formatRupiah(applicant.electricityBill),
        notes: applicant.electricityBill <= 500000 ? "Memenuhi batas tagihan listrik" : "Tagihan listrik terlalu tinggi"
      },
      {
        id: "property-tax",
        name: "Pajak Bumi dan Bangunan",
        status: applicant.propertyTax <= 200000 ? "pass" : "fail",
        requirement: "PBB per bulan ≤ Rp 200.000",
        actualValue: formatRupiah(applicant.propertyTax),
        notes: applicant.propertyTax <= 200000 ? "Memenuhi batas PBB" : "PBB terlalu tinggi"
      },
      {
        id: "nik-verification",
        name: "Verifikasi NIK",
        status: applicant.nik.length === 16 ? "pass" : "fail",
        requirement: "NIK valid (16 digit)",
        actualValue: applicant.nik,
        notes: applicant.nik.length === 16 ? "NIK valid dan terverifikasi" : "Format NIK tidak valid"
      }
    ];

    setDocuments(initialDocuments);
  }, [applicant]);

  const getStatusIcon = (status: "pass" | "fail" | "pending") => {
    switch (status) {
      case "pass":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "fail":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: "pass" | "fail" | "pending") => {
    switch (status) {
      case "pass":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Lulus</Badge>;
      case "fail":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Tidak Lulus</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    }
  };

  const updateDocumentStatus = (documentId: string, newStatus: "pass" | "fail" | "pending") => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === documentId ? { ...doc, status: newStatus } : doc
      )
    );
  };

  const getOverallStatus = () => {
    const passCount = documents.filter(doc => doc.status === "pass").length;
    const failCount = documents.filter(doc => doc.status === "fail").length;
    const pendingCount = documents.filter(doc => doc.status === "pending").length;

    if (failCount > 0) return { status: "rejected", color: "text-red-600", bg: "bg-red-50" };
    if (pendingCount > 0) return { status: "review", color: "text-yellow-600", bg: "bg-yellow-50" };
    if (passCount === documents.length) return { status: "approved", color: "text-green-600", bg: "bg-green-50" };
    return { status: "review", color: "text-yellow-600", bg: "bg-yellow-50" };
  };

  const handleApprove = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
        alert("Aplikasi berhasil disetujui!");
        setIsProcessing(false);
        router.push("/admin/applications"); // Next.js navigation
    }, 2000);
    };

    const handleReject = async () => {
    if (!notes.trim()) {
        alert("Mohon berikan alasan penolakan.");
        return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
        alert("Aplikasi berhasil ditolak!");
        setIsProcessing(false);
        router.push("/admin/applications"); // Next.js navigation
    }, 2000);
    };


  const overallStatus = getOverallStatus();
  const netIncome = applicant.monthlyIncome - applicant.monthlyExpenses - applicant.electricityBill - applicant.propertyTax;

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
                <h1 className="text-xl font-bold text-gray-900">Review Aplikasi</h1>
                <p className="text-xs text-gray-600">Verifikasi Dokumen Bantuan Sosial</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-sm">
                ID: {applicant.id}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Applicant Information */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Informasi Pemohon
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Nama Lengkap</Label>
                    <p className="text-lg font-semibold text-gray-900 mt-1">{applicant.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">NIK</Label>
                    <p className="text-lg font-mono font-semibold text-gray-900 mt-1 flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      {applicant.nik}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Tanggal Pengajuan</Label>
                    <p className="text-gray-900 mt-1 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(applicant.applicationDate).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Status Aplikasi</Label>
                    <div className="mt-1">
                      <Badge className={`${overallStatus.bg} ${overallStatus.color} hover:${overallStatus.bg}`}>
                        {overallStatus.status === "approved" && "Disetujui"}
                        {overallStatus.status === "rejected" && "Ditolak"}
                        {overallStatus.status === "review" && "Dalam Review"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Information */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Data Keuangan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Home className="w-4 h-4 mr-2" />
                        Pendapatan
                      </span>
                      <span className="font-semibold text-green-600">
                        {formatRupiah(applicant.monthlyIncome)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Pengeluaran</span>
                      <span className="font-semibold text-red-600">
                        -{formatRupiah(applicant.monthlyExpenses)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Zap className="w-4 h-4 mr-2" />
                        Listrik
                      </span>
                      <span className="font-semibold text-red-600">
                        -{formatRupiah(applicant.electricityBill)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        PBB
                      </span>
                      <span className="font-semibold text-red-600">
                        -{formatRupiah(applicant.propertyTax)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
                      <div className="text-center">
                        <p className="text-xs text-gray-600 mb-1">Pendapatan Bersih</p>
                        <p className="font-bold text-blue-600 text-lg">
                          {formatRupiah(netIncome)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
                      <div className="text-center">
                        <p className="text-xs text-gray-600 mb-1">Per Anggota Keluarga</p>
                        <p className="font-bold text-purple-600">
                          {formatRupiah(netIncome / applicant.familyMembers)}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center justify-center mt-1">
                          <Users className="w-3 h-3 mr-1" />
                          {applicant.familyMembers} orang
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Document Verification */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCheck className="w-5 h-5 mr-2" />
                  Verifikasi Dokumen
                </CardTitle>
                <CardDescription>
                  Status verifikasi setiap dokumen dan persyaratan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(doc.status)}
                        <div>
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <p className="text-xs text-gray-600">{doc.requirement}</p>
                        </div>
                      </div>
                      {getStatusBadge(doc.status)}
                    </div>
                    
                    <div className="bg-gray-50 rounded p-2 text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-600">Nilai Aktual:</span>
                        <span className="font-medium">{doc.actualValue}</span>
                      </div>
                      <p className="text-gray-700 text-xs">{doc.notes}</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={doc.status === "pass" ? "default" : "outline"}
                        onClick={() => updateDocumentStatus(doc.id, "pass")}
                        className={doc.status === "pass" ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Lulus
                      </Button>
                      <Button
                        size="sm"
                        variant={doc.status === "fail" ? "destructive" : "outline"}
                        onClick={() => updateDocumentStatus(doc.id, "fail")}
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        Gagal
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Catatan Review</CardTitle>
                <CardDescription>
                  Tambahkan catatan untuk keputusan aplikasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notes">Catatan (wajib jika menolak aplikasi)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Berikan alasan detail untuk keputusan Anda..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={handleApprove}
                disabled={isProcessing || overallStatus.status === "rejected"}
                className="flex-1 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                {isProcessing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <CheckCircle className="w-4 h-4 mr-2" />
                )}
                Setujui Aplikasi
              </Button>
              
              <Button
                onClick={handleReject}
                disabled={isProcessing}
                variant="destructive"
                className="flex-1 h-12"
              >
                {isProcessing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <X className="w-4 h-4 mr-2" />
                )}
                Tolak Aplikasi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
