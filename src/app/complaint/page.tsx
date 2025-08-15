"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  ArrowLeft, 
  Upload, 
  FileText, 
  X, 
  AlertCircle,
  Send,
  CheckCircle
} from "lucide-react";

interface UploadedFile {
  file: File;
  id: string;
  name: string;
  size: number;
  type: string;
}

export default function Complaint() {
  const [formData, setFormData] = useState({
    subject: "",
    content: ""
  });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    Array.from(files).forEach(file => {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} terlalu besar. Maksimal 10MB.`);
        return;
      }

      // Check file type
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];

      if (!allowedTypes.includes(file.type)) {
        alert(`Tipe file ${file.name} tidak didukung.`);
        return;
      }

      const uploadedFile: UploadedFile = {
        file,
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type
      };

      newFiles.push(uploadedFile);
    });

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-green-600 text-xs font-bold">IMG</div>;
    }
    if (fileType === 'application/pdf') {
      return <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center text-red-600 text-xs font-bold">PDF</div>;
    }
    if (fileType.includes('word') || fileType.includes('document')) {
      return <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-blue-600 text-xs font-bold">DOC</div>;
    }
    return <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-600 text-xs font-bold">FILE</div>;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject.trim() || !formData.content.trim()) {
      alert("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ subject: "", content: "" });
        setUploadedFiles([]);
        setIsSubmitted(false);
      }, 3000);
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
              Pengaduan Berhasil Dikirim!
            </h3>
            <p className="text-gray-600 mb-6">
              Terima kasih atas pengaduan Anda. Tim kami akan meninjau dan merespons dalam 2-3 hari kerja.
            </p>
            <Link href="/dashboard">
              <Button>Kembali ke Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                <h1 className="text-xl font-bold text-gray-900">Pengaduan</h1>
                <p className="text-xs text-gray-600">Sistem Bantuan Sosial</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ajukan Pengaduan
          </h1>
          <p className="text-gray-600 text-lg">
            Sampaikan keluhan atau masukan Anda terkait program bantuan sosial
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Form Pengaduan</CardTitle>
                <CardDescription>
                  Isi formulir di bawah ini dengan lengkap dan jelas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                      Subjek Pengaduan <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Contoh: Bantuan tidak tersalurkan dengan tepat"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                      Isi Pengaduan <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="content"
                      placeholder="Jelaskan secara detail permasalahan yang Anda alami, termasuk waktu, tempat, dan kronologi kejadian..."
                      value={formData.content}
                      onChange={(e) => handleInputChange("content", e.target.value)}
                      className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Dokumen Pendukung
                    </Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive 
                          ? "border-blue-400 bg-blue-50" 
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Drag & drop file di sini, atau{" "}
                        <label className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                          pilih file
                          <input
                            type="file"
                            multiple
                            accept="image/*,.pdf,.doc,.docx,.txt"
                            onChange={(e) => handleFileUpload(e.target.files)}
                            className="hidden"
                          />
                        </label>
                      </p>
                      <p className="text-xs text-gray-500">
                        Format: JPG, PNG, PDF, DOC, TXT (Maks. 10MB per file)
                      </p>
                    </div>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2 mt-4">
                        <Label className="text-sm font-medium text-gray-700">
                          File yang Diunggah ({uploadedFiles.length})
                        </Label>
                        <div className="space-y-2">
                          {uploadedFiles.map((file) => (
                            <div
                              key={file.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                            >
                              <div className="flex items-center space-x-3">
                                {getFileIcon(file.type)}
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {formatFileSize(file.size)}
                                  </p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(file.id)}
                                className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Kirim Pengaduan
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Info Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Informasi Penting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Waktu Respons</h4>
                  <p className="text-sm text-gray-600">
                    Tim kami akan merespons pengaduan Anda dalam 2-3 hari kerja.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">File Pendukung</h4>
                  <p className="text-sm text-gray-600">
                    Lampirkan foto, dokumen, atau bukti lain yang mendukung pengaduan Anda.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Kerahasiaan</h4>
                  <p className="text-sm text-gray-600">
                    Identitas pelapor akan dijaga kerahasiaannya sesuai ketentuan yang berlaku.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className=" shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Kontak Darurat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-blue-900">Hotline SiBansos</h4>
                  <p className="text-blue-700">0800-1234-5678</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Email</h4>
                  <p className="text-blue-700">pengaduan@sibansos.go.id</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">Jam Operasional</h4>
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
