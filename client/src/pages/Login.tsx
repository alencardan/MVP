import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function Login() {
  const { isAuthenticated, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("receptor");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      alert(`Login como ${userType}: ${email}`);
      // Redirect to appropriate page
      window.location.href = userType === "doador" ? "/dashboard" : "/marketplace";
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Bem-vindo!</CardTitle>
            <CardDescription>Você está autenticado como {user?.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">Escolha uma opção:</p>
            <div className="space-y-2">
              <Button className="w-full bg-green-700 hover:bg-green-800" onClick={() => (window.location.href = "/dashboard")}>
                Ir para Dashboard
              </Button>
              <Button className="w-full bg-blue-700 hover:bg-blue-800" onClick={() => (window.location.href = "/marketplace")}>
                Ir para Marketplace
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-8 text-center">
        <img src="/logo-refood-icon.png" alt="ReFood" className="h-20 w-20 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-700">ReFood</h1>
        <p className="text-gray-600 mt-2">Plataforma de Reaproveitamento de Alimentos</p>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Entrar na Plataforma</CardTitle>
          <CardDescription>Faça login para acessar a ReFood</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Usuário
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    value="doador"
                    checked={userType === "doador"}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="ml-2 text-gray-700">Doador (Empresa/ONG)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="userType"
                    value="receptor"
                    checked={userType === "receptor"}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="ml-2 text-gray-700">Receptor (ONG/Consumidor)</span>
                </label>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="seu@email.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Login Button */}
            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white">
              Entrar
            </Button>
          </form>

          {/* OAuth Login */}
          <div className="mt-6 border-t pt-6">
            <p className="text-sm text-gray-600 text-center mb-3">Ou continue com:</p>
            <Button
              onClick={() => (window.location.href = getLoginUrl())}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Entrar com Google
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="text-sm text-gray-600 text-center mt-4">
            Não tem conta?{" "}
            <a href="#" className="text-green-700 hover:underline font-medium">
              Cadastre-se
            </a>
          </p>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="mt-12 max-w-md text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Por que se registrar?</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p>✓ Conecte-se com doadores e receptores</p>
          <p>✓ Acompanhe suas doações e impacto</p>
          <p>✓ Ganhe pontos e reconhecimento</p>
          <p>✓ Reduza o desperdício de alimentos</p>
        </div>
      </div>
    </div>
  );
}
