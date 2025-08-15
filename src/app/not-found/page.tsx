import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Home, ArrowLeft, Search, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <h1 className="text-2xl font-bold text-gray-900">welfare.id</h1>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">Sistem Bantuan Sosial Transparan</span>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm text-center">
          <CardHeader className="space-y-4 pb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl mx-auto">
              <AlertTriangle className="w-10 h-10 text-orange-500" />
            </div>
            <div>
              <CardTitle className="text-6xl font-bold text-gray-900 mb-2">404</CardTitle>
              <CardTitle className="text-2xl text-gray-800 mb-2">Halaman Tidak Ditemukan</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Maaf, halaman yang Anda cari tidak dapat ditemukan atau mungkin telah dipindahkan
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                <Search className="w-4 h-4 mr-2" />
                URL yang dicari:
              </h3>
              <code className="text-sm text-gray-600 bg-white px-2 py-1 rounded border break-all">
                {window.location.origin}{location.pathname}
              </code>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">Beberapa hal yang bisa Anda lakukan:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-left">
                  <h4 className="font-medium text-blue-800 mb-2">Periksa URL</h4>
                  <p className="text-sm text-blue-600">
                    Pastikan alamat yang diketik sudah benar dan tidak ada kesalahan penulisan
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-left">
                  <h4 className="font-medium text-purple-800 mb-2">Kembali ke Halaman Utama</h4>
                  <p className="text-sm text-purple-600">
                    Mulai dari halaman utama untuk mengakses fitur yang tersedia
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 flex items-center">
                  <Home className="w-4 h-4 mr-2" />
                  Halaman Utama
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="border-2 border-gray-300 hover:border-gray-400 px-6 py-2 flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">
                Butuh bantuan? Hubungi tim support kami
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
                <span className="text-gray-600">Email: support@welfare.id.go.id</span>
                <span className="hidden sm:inline text-gray-400">|</span>
                <span className="text-gray-600">Telepon: (021) 1234-5678</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2024 welfare.id. Semua hak dilindungi undang-undang.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
