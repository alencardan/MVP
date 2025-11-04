import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Loader2, Plus, Apple, Users, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: credits, isLoading: creditsLoading } = trpc.credits.getMyCredits.useQuery();
  const { data: myListings, isLoading: listingsLoading } = trpc.foods.myListings.useQuery(undefined, {
    enabled: user?.userType === "donor",
  });
  const { data: myReservations, isLoading: reservationsLoading } = trpc.reservations.getMyReservations.useQuery(undefined, {
    enabled: user?.userType === "receiver",
  });

  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "reserved":
        return "bg-yellow-100 text-yellow-800";
      case "donated":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      available: "Disponível",
      reserved: "Reservado",
      donated: "Doado",
      pending: "Pendente",
      confirmed: "Confirmado",
      completed: "Concluído",
      expired: "Expirado",
      cancelled: "Cancelado",
    };
    return labels[status] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <img src="/logo-refood-icon.png" alt="ReFood" className="h-12 w-12" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bem-vindo, {user.name}!</h1>
            <p className="text-gray-600 mt-2">
              {user.userType === "donor" ? "Painel de Doador" : "Painel de Receptor"}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Créditos</CardTitle>
            </CardHeader>
            <CardContent>
              {creditsLoading ? (
                <Loader2 className="h-8 w-8 animate-spin text-green-700" />
              ) : (
                <div className="text-3xl font-bold text-green-700">{credits?.credits || 0}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Alimentos {user.userType === "donor" ? "Doados" : "Recebidos"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {creditsLoading ? (
                <Loader2 className="h-8 w-8 animate-spin text-green-700" />
              ) : (
                <div className="text-3xl font-bold text-green-700">
                  {user.userType === "donor" ? credits?.foodsDonated : credits?.foodsReceived}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Impacto</CardTitle>
            </CardHeader>
            <CardContent>
              {creditsLoading ? (
                <Loader2 className="h-8 w-8 animate-spin text-green-700" />
              ) : (
                <div className="text-3xl font-bold text-green-700">{credits?.impactScore || 0}</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Actions */}
          <div className="md:col-span-2">
            {user.userType === "donor" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Meus Alimentos</CardTitle>
                  <CardDescription>Gerencie os alimentos que você está doando</CardDescription>
                </CardHeader>
                <CardContent>
                  {listingsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-green-700" />
                    </div>
                  ) : myListings && myListings.length > 0 ? (
                    <div className="space-y-4">
                      {myListings.map((food: any) => (
                        <div key={food.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{food.name}</h3>
                            <p className="text-sm text-gray-600">{food.category}</p>
                            <p className="text-sm text-gray-600">{food.quantity}</p>
                            <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(food.status)}`}>
                              {getStatusLabel(food.status)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Apple className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Você ainda não cadastrou nenhum alimento</p>
                      <Link href="/add-food">
                        <Button className="bg-green-700 hover:bg-green-800">
                          <Plus className="h-4 w-4 mr-2" />
                          Cadastrar Alimento
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Minhas Reservas</CardTitle>
                  <CardDescription>Acompanhe suas reservas de alimentos</CardDescription>
                </CardHeader>
                <CardContent>
                  {reservationsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-green-700" />
                    </div>
                  ) : myReservations && myReservations.length > 0 ? (
                    <div className="space-y-4">
                      {myReservations.map((reservation: any) => (
                        <div key={reservation.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-gray-900">Reserva #{reservation.id}</p>
                              <p className="text-sm text-gray-600">Alimento ID: {reservation.foodId}</p>
                              <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(reservation.status)}`}>
                                {getStatusLabel(reservation.status)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Você ainda não fez nenhuma reserva</p>
                      <Link href="/marketplace">
                        <Button className="bg-green-700 hover:bg-green-800">
                          Explorar Marketplace
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {user.userType === "donor" ? (
                  <>
                    <Link href="/add-food">
                      <Button className="w-full bg-green-700 hover:bg-green-800">
                        <Plus className="h-4 w-4 mr-2" />
                        Cadastrar Alimento
                      </Button>
                    </Link>
                    <Link href="/marketplace">
                      <Button variant="outline" className="w-full">
                        Ver Marketplace
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/marketplace">
                      <Button className="w-full bg-green-700 hover:bg-green-800">
                        Explorar Alimentos
                      </Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Seu Impacto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-green-700" />
                    <div>
                      <p className="text-sm text-gray-600">Pontuação de Impacto</p>
                      <p className="font-semibold text-gray-900">{credits?.impactScore || 0} pontos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
