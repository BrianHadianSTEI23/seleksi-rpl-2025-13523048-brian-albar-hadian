// landing page

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Users, 
  Eye, 
  MessageSquare, 
  Bell, 
  Settings, 
  CheckCircle, 
  ArrowRight,
  Heart,
  Building2,
  FileText,
  BarChart3
} from "lucide-react";

export default function Landing() {
  const publicFeatures = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Pengajuan Bantuan Sosial",
      description: "Ajukan permohonan bantuan sosial secara online dengan mudah dan transparan"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Pengawasan Transparan",
      description: "Pantau proses alokasi, pemberian bantuan sosial, dan akurasi data secara real-time"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Sistem Aduan",
      description: "Laporkan keluhan terkait proses pemberian bantuan sosial untuk perbaikan layanan"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Notifikasi Status",
      description: "Dapatkan pemberitahuan real-time mengenai status pengajuan bantuan sosial Anda"
    }
  ];

  const governmentFeatures = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Alokasi Bantuan",
      description: "Kelola alokasi bantuan sosial berdasarkan data masyarakat yang akurat dan terverifikasi"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Manajemen Bantuan",
      description: "Sistem manajemen komprehensif untuk mengelola seluruh program bantuan sosial"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SiBansos</h1>
                <p className="text-xs text-gray-600">Sistem Bantuan Sosial Transparan</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                  Masuk
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Daftar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-8">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Sistem Bantuan Sosial
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Transparan & Akuntabel
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Platform digital untuk memberikan kewenangan kepada masyarakat dalam mengawasi 
            proses pembagian subsidi dan memastikan ketepatan alokasi bantuan sosial
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg">
                Mulai Sekarang
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-gray-400 px-8 py-3 text-lg">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </section>

      {/* Features for Public */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Untuk Masyarakat
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fitur lengkap untuk membantu masyarakat dalam mengakses dan mengawasi bantuan sosial
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {publicFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl mb-4 mx-auto">
                    <div className="text-blue-600">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features for Government */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Untuk Petugas Pemerintah
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tools profesional untuk mengelola dan mengalokasikan bantuan sosial secara efisien
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {governmentFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl mb-4 mx-auto">
                    <div className="text-purple-600">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Mengapa Memilih SiBansos?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
            Sistem yang dirancang untuk menciptakan transparansi dan akuntabilitas dalam penyaluran bantuan sosial
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Transparan</h3>
              <p className="text-blue-100">
                Semua proses dapat dipantau secara real-time oleh masyarakat
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Akuntabel</h3>
              <p className="text-blue-100">
                Sistem pertanggungjawaban yang jelas dan dapat diverifikasi
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Efektif</h3>
              <p className="text-blue-100">
                Bantuan tepat sasaran dengan proses yang efisien
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Siap Memulai Perubahan?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Bergabunglah dengan sistem bantuan sosial yang transparan dan akuntabel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
                Daftar Sebagai Warga
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="lg" variant="outline" className="border-2 border-purple-300 hover:border-purple-400 text-purple-600 hover:text-purple-700 px-8 py-3 text-lg">
                Daftar Sebagai PNS
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">SiBansos</h3>
                  <p className="text-gray-400 text-sm">Sistem Bantuan Sosial Transparan</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Platform digital untuk menciptakan transparansi dan akuntabilitas dalam penyaluran bantuan sosial kepada masyarakat.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Fitur</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Pengajuan Bantuan</li>
                <li>Pengawasan Transparan</li>
                <li>Sistem Aduan</li>
                <li>Notifikasi Real-time</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Bantuan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Panduan Penggunaan</li>
                <li>FAQ</li>
                <li>Kontak Support</li>
                <li>Lapor Bug</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 SiBansos. Semua hak dilindungi undang-undang.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
