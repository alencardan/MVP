import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Apple, Heart, TrendingUp, Users } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-amber-100 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo-refood-icon.png" alt="ReFood" className="h-10 w-10" />
            <span className="font-bold text-lg text-green-700">{APP_TITLE}</span>
          </div>
          <div className="flex gap-4 items-center">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Painel</Button>
                </Link>
                <Link href="/marketplace">
                  <Button variant="ghost">Marketplace</Button>
                </Link>
              </>
            ) : (
              <Button onClick={() => (window.location.href = '/login')}>
                Entrar
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mb-8">
          <img src="/logo-refood-icon.png" alt="ReFood" className="h-32 w-32 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Evitando o desperdício, <span className="text-green-700">conectando os consumidores</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            ReFood é uma plataforma colaborativa que conecta restaurantes, supermercados e feiras com ONGs e consumidores engajados na causa do reaproveitamento de alimentos.
          </p>
        </div>

        {!isAuthenticated && (
          <div className="flex gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => (window.location.href = getLoginUrl())}
              className="bg-green-700 hover:bg-green-800"
            >
              Comece Agora
            </Button>
            <Button size="lg" variant="outline">
              Saiba Mais
            </Button>
          </div>
        )}

        {isAuthenticated && (
          <div className="flex gap-4 justify-center mb-12">
            <Link href={user?.userType === "donor" ? "/my-listings" : "/marketplace"}>
              <Button size="lg" className="bg-green-700 hover:bg-green-800">
                {user?.userType === "donor" ? "Meus Alimentos" : "Explorar Alimentos"}
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                Meu Painel
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 border-t border-amber-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que usar ReFood?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-green-100">
              <CardHeader>
                <Apple className="h-8 w-8 text-green-700 mb-2" />
                <CardTitle>Plataforma Colaborativa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Conecta supermercados, restaurantes e feiras com ONGs e consumidores engajados em tempo real.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-green-700 mb-2" />
                <CardTitle>Gamificação</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ganhe créditos e pontos por cada doação. Acompanhe seu impacto social e ambiental.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <Heart className="h-8 w-8 text-green-700 mb-2" />
                <CardTitle>Impacto Social</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Reduza significativamente o desperdício de comida e ajude quem precisa de forma sustentável.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1,6M</div>
              <p className="text-green-100">Estabelecimentos no setor de Foodservice</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15-20%</div>
              <p className="text-green-100">De alimentos são descartados</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">90%</div>
              <p className="text-green-100">Das empresas têm interesse na plataforma</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Para Doadores</h3>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <p className="text-gray-700">Cadastre os alimentos disponíveis</p>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <p className="text-gray-700">Receba reservas de receptores</p>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <p className="text-gray-700">Confirme a doação e ganhe créditos</p>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">Para Receptores</h3>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <p className="text-gray-700">Explore alimentos disponíveis</p>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <p className="text-gray-700">Reserve os que deseja</p>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <p className="text-gray-700">Retire e ganhe pontos por impacto</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-50 py-20 border-t border-amber-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para fazer a diferença?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Junte-se a milhares de pessoas que estão ajudando a reduzir o desperdício de alimentos.
          </p>
          {!isAuthenticated && (
            <Button
              size="lg"
              onClick={() => (window.location.href = getLoginUrl())}
              className="bg-green-700 hover:bg-green-800"
            >
              Começar Agora
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 ReFood. Evitando o desperdício, conectando os consumidores.</p>
        </div>
      </footer>
    </div>
  );
}
