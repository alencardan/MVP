import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Eye, ShoppingCart } from "lucide-react";

interface Food {
  id: number;
  name: string;
  category: string;
  quantity: string;
  location: string;
  donor: string;
  description?: string;
  expiryDate?: string;
}

export default function Marketplace() {
  const [foods, setFoods] = useState<Food[]>([
    {
      id: 1,
      name: "Maçãs Gala",
      category: "Frutas",
      quantity: "10 kg",
      location: "Rua das Flores, 123",
      donor: "Supermercado XYZ",
      description: "Maçãs frescas e saudáveis",
      expiryDate: "2024-11-10",
    },
    {
      id: 2,
      name: "Pão Integral",
      category: "Padaria",
      quantity: "20 unidades",
      location: "Av. Principal, 456",
      donor: "Padaria do João",
      description: "Pão integral quentinho",
      expiryDate: "2024-11-05",
    },
    {
      id: 3,
      name: "Tomates Frescos",
      category: "Vegetais",
      quantity: "15 kg",
      location: "Feira Central, 789",
      donor: "Produtor Local",
      description: "Tomates colhidos hoje",
      expiryDate: "2024-11-08",
    },
  ]);

  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<number[]>([]);

  const handleSelectFood = (foodId: number) => {
    setSelectedFoods((prev) =>
      prev.includes(foodId) ? prev.filter((id) => id !== foodId) : [...prev, foodId]
    );
  };

  const handleViewDetails = (food: Food) => {
    setSelectedFood(food);
    setShowDetails(true);
  };

  const handleDeleteFood = (foodId: number) => {
    setFoods((prev) => prev.filter((f) => f.id !== foodId));
    setSelectedFoods((prev) => prev.filter((id) => id !== foodId));
    alert("Alimento removido com sucesso!");
  };

  const handleDeleteSelected = () => {
    if (selectedFoods.length === 0) {
      alert("Selecione pelo menos um alimento para deletar");
      return;
    }
    setFoods((prev) => prev.filter((f) => !selectedFoods.includes(f.id)));
    setSelectedFoods([]);
    alert(`${selectedFoods.length} alimento(s) removido(s) com sucesso!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <img src="/logo-refood-icon.png" alt="ReFood" className="h-12 w-12" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Marketplace ReFood</h1>
            <p className="text-gray-600 mt-2">Descubra alimentos disponíveis para doação</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Selected Foods Info */}
        {selectedFoods.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-900">
              {selectedFoods.length} alimento(s) selecionado(s)
            </p>
            <Button
              onClick={handleDeleteSelected}
              variant="destructive"
              className="mt-2"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Deletar Selecionados
            </Button>
          </div>
        )}

        {/* Foods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <Card
              key={food.id}
              className={`cursor-pointer transition-all ${
                selectedFoods.includes(food.id)
                  ? "ring-2 ring-green-500 bg-green-50"
                  : "hover:shadow-lg"
              }`}
              onClick={() => handleSelectFood(food.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{food.name}</CardTitle>
                    <CardDescription>{food.category}</CardDescription>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedFoods.includes(food.id)}
                    onChange={() => handleSelectFood(food.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Quantidade:</strong> {food.quantity}
                  </p>
                  <p>
                    <strong>Localização:</strong> {food.location}
                  </p>
                  <p>
                    <strong>Doador:</strong> {food.donor}
                  </p>
                  {food.expiryDate && (
                    <p>
                      <strong>Validade:</strong> {new Date(food.expiryDate).toLocaleDateString("pt-BR")}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(food);
                    }}
                    variant="outline"
                    className="flex-1"
                    size="sm"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Analisar
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFood(food.id);
                    }}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {foods.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Nenhum alimento disponível no momento</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetails && selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>{selectedFood.name}</CardTitle>
              <CardDescription>{selectedFood.category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Descrição</p>
                  <p className="text-gray-900">{selectedFood.description || "Sem descrição"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Quantidade</p>
                  <p className="text-gray-900">{selectedFood.quantity}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Localização</p>
                  <p className="text-gray-900">{selectedFood.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Doador</p>
                  <p className="text-gray-900">{selectedFood.donor}</p>
                </div>
                {selectedFood.expiryDate && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">Data de Validade</p>
                    <p className="text-gray-900">
                      {new Date(selectedFood.expiryDate).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => setShowDetails(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Fechar
                </Button>
                <Button className="flex-1 bg-green-700 hover:bg-green-800">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Reservar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
