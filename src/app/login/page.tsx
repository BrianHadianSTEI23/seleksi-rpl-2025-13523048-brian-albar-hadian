import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, User, Shield, Building2 } from "lucide-react";

type UserRole = "warga" | "pns";

export default function Index() {
  const [userRole, setUserRole] = useState<UserRole>("warga");
  const [formData, setFormData] = useState({
    name: "",
    nik: "",
    dateOfBirth: "",
    placeOfBirth: "",
    password: "",
    nip: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", { role: userRole, ...formData });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      nik: "",
      dateOfBirth: "",
      placeOfBirth: "",
      password: "",
      nip: ""
    });
  };

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistem Registrasi
          </h1>
          <p className="text-gray-600">
            Silakan pilih jenis akun dan lengkapi data pendaftaran
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-4">
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
              <Button
                variant={userRole === "warga" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleRoleChange("warga")}
                className={`flex-1 transition-all duration-200 ${
                  userRole === "warga"
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                Warga
              </Button>
              <Button
                variant={userRole === "pns" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleRoleChange("pns")}
                className={`flex-1 transition-all duration-200 ${
                  userRole === "pns"
                    ? "bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                <Building2 className="w-4 h-4 mr-2" />
                PNS
              </Button>
            </div>
            <div>
              <CardTitle className="text-xl">
                {userRole === "warga" ? "Registrasi Warga" : "Registrasi PNS"}
              </CardTitle>
              <CardDescription>
                {userRole === "warga"
                  ? "Lengkapi data diri untuk registrasi sebagai warga"
                  : "Lengkapi data diri untuk registrasi sebagai Pegawai Negeri Sipil"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Nama Lengkap
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nik" className="text-sm font-medium text-gray-700">
                  NIK
                </Label>
                <Input
                  id="nik"
                  type="text"
                  placeholder="Nomor Induk Kependudukan"
                  value={formData.nik}
                  onChange={(e) => handleInputChange("nik", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                    Tanggal Lahir
                  </Label>
                  <div className="relative">
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="placeOfBirth" className="text-sm font-medium text-gray-700">
                    Tempat Lahir
                  </Label>
                  <Input
                    id="placeOfBirth"
                    type="text"
                    placeholder="Kota lahir"
                    value={formData.placeOfBirth}
                    onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {userRole === "pns" && (
                <div className="space-y-2">
                  <Label htmlFor="nip" className="text-sm font-medium text-gray-700">
                    NIP (Nomor Induk Pegawai)
                  </Label>
                  <Input
                    id="nip"
                    type="text"
                    placeholder="Nomor Induk Pegawai"
                    value={formData.nip}
                    onChange={(e) => handleInputChange("nip", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Buat password yang kuat"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <Button
                type="submit"
                className={`w-full h-12 text-white font-medium rounded-lg transition-all duration-200 shadow-lg ${
                  userRole === "warga"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
                    : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:shadow-xl"
                }`}
              >
                {userRole === "warga" ? "Daftar sebagai Warga" : "Daftar sebagai PNS"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Sudah punya akun?{" "}
                <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Masuk di sini
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2024 Sistem Registrasi. Semua hak dilindungi.</p>
        </div>
      </div>
    </div>
  );
}
