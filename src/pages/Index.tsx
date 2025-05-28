import React, { useState, useEffect } from 'react';
import { Phone, Clock, Star, CheckCircle, ArrowRight, Users, ShoppingCart, CreditCard, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [leadForm, setLeadForm] = useState({ name: '', phone: '' });
  const [selectedTemperos, setSelectedTemperos] = useState<number[]>([]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const whatsappNumber = "5511982722426";
  const whatsappMessage = "Olá! Vi o site dos temperos artesanais e gostaria de fazer um pedido. Pode me ajudar?";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const comboMessage = "Olá! Quero aproveitar a oferta especial do Combo dos 5 temperos mais vendidos com 10% OFF!";
  const comboWhatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(comboMessage)}`;

  const temperos = [
    {
      id: 1,
      name: "Tempero Baiano Premium",
      description: "Mistura especial com pimentas, coentro e dendê",
      price: "R$ 24,90",
      image: "/placeholder.svg?height=200&width=200&text=Tempero+Baiano"
    },
    {
      id: 2,
      name: "Ervas Finas Gourmet",
      description: "Seleção de ervas frescas desidratadas",
      price: "R$ 19,90",
      image: "/placeholder.svg?height=200&width=200&text=Ervas+Finas"
    },
    {
      id: 3,
      name: "Pimenta Artesanal",
      description: "Blend de pimentas especiais da região",
      price: "R$ 22,90",
      image: "/placeholder.svg?height=200&width=200&text=Pimenta+Mix"
    },
    {
      id: 4,
      name: "Tempero para Churrasco",
      description: "O segredo do sabor perfeito na carne",
      price: "R$ 26,90",
      image: "/placeholder.svg?height=200&width=200&text=Churrasco"
    },
    {
      id: 5,
      name: "Alho e Ervas",
      description: "Combinação clássica para todos os pratos",
      price: "R$ 18,90",
      image: "/placeholder.svg?height=200&width=200&text=Alho+Ervas"
    },
    {
      id: 6,
      name: "Açafrão Premium",
      description: "Açafrão puro de alta qualidade",
      price: "R$ 32,90",
      image: "/placeholder.svg?height=200&width=200&text=Açafrão"
    },
    {
      id: 7,
      name: "Curry Caseiro",
      description: "Mistura aromática de especiarias indianas",
      price: "R$ 28,90",
      image: "/placeholder.svg?height=200&width=200&text=Curry"
    },
    {
      id: 8,
      name: "Páprica Defumada",
      description: "Sabor defumado especial para carnes",
      price: "R$ 21,90",
      image: "/placeholder.svg?height=200&width=200&text=Páprica"
    },
    {
      id: 9,
      name: "Tempero Italiano",
      description: "Herbs de Provence e manjericão",
      price: "R$ 23,90",
      image: "/placeholder.svg?height=200&width=200&text=Italiano"
    },
    {
      id: 10,
      name: "Mix Completo",
      description: "Nossa mistura mais popular e versátil",
      price: "R$ 29,90",
      image: "/placeholder.svg?height=200&width=200&text=Mix+Completo"
    }
  ];

  const depoimentos = [
    {
      name: "Maria Silva",
      text: "Meu tempero favorito! Transformou completamente minha comida.",
      image: "/placeholder.svg?height=60&width=60&text=M"
    },
    {
      name: "João Santos",
      text: "Qualidade incrível, entrega rápida. Super recomendo!",
      image: "/placeholder.svg?height=60&width=60&text=J"
    },
    {
      name: "Ana Costa",
      text: "O sabor é único, minha família adora! Já sou cliente fiel.",
      image: "/placeholder.svg?height=60&width=60&text=A"
    }
  ];

  const toggleTemperoSelection = (temperoId: number) => {
    setSelectedTemperos(prev => 
      prev.includes(temperoId) 
        ? prev.filter(id => id !== temperoId)
        : [...prev, temperoId]
    );
  };

  const handleSelectedTemperos = () => {
    if (selectedTemperos.length === 0) {
      toast({
        title: "Atenção!",
        description: "Selecione pelo menos um tempero antes de fazer o pedido.",
      });
      return;
    }

    const selectedItems = temperos.filter(tempero => selectedTemperos.includes(tempero.id));
    const itemsList = selectedItems.map(item => `- ${item.name} (${item.price})`).join('\n');
    const selectedMessage = `Olá! Gostaria de fazer um pedido dos seguintes temperos:\n\n${itemsList}\n\nPode me ajudar com o pedido?`;
    const selectedWhatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(selectedMessage)}`;
    
    window.open(selectedWhatsappLink, '_blank');
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadForm.name && leadForm.phone) {
      const leadMessage = `Olá! Meu nome é ${leadForm.name} e meu WhatsApp é ${leadForm.phone}. Gostaria de conhecer mais sobre os temperos artesanais!`;
      const leadWhatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(leadMessage)}`;
      window.open(leadWhatsappLink, '_blank');
      
      toast({
        title: "Sucesso!",
        description: "Redirecionando para o WhatsApp...",
      });
      
      setLeadForm({ name: '', phone: '' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed CTA Button */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <Button 
          onClick={handleSelectedTemperos}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg rounded-full shadow-lg animate-pulse"
        >
          🔥 Fazer Pedido no WhatsApp ({selectedTemperos.length} selecionados)
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-50 to-green-50 px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Sabor de verdade direto na sua cozinha!
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Conheça os temperos artesanais mais vendidos e receba em casa com pagamento fácil via Pix!
              </p>
              <Button 
                onClick={() => window.open(whatsappLink, '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-lg rounded-full shadow-lg transform transition hover:scale-105"
              >
                🔥 Fazer pedido pelo WhatsApp – 11 98272-2426
              </Button>
            </div>
            <div className="flex justify-center">
              <img 
                src="/placeholder.svg?height=400&width=400&text=Temperos+Artesanais" 
                alt="Temperos artesanais em potes e sacos" 
                className="rounded-2xl shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="bg-red-600 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            🎉 OFERTA ESPECIAL - SÓ HOJE! 🎉
          </h2>
          <p className="text-xl mb-4">Combo dos 5 mais vendidos com 10% OFF</p>
          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold">
              <Clock className="inline w-5 h-5 mr-1" />
              {String(timeLeft.hours).padStart(2, '0')}h
            </div>
            <div className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </div>
            <div className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </div>
          </div>
          <Button 
            onClick={() => window.open(comboWhatsappLink, '_blank')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-lg rounded-full shadow-lg"
          >
            🟢 QUERO ESTA OFERTA! (WhatsApp)
          </Button>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 bg-yellow-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Os 10 Temperos Mais Vendidos
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Clique nos temperos para selecioná-los e depois clique no botão verde para fazer seu pedido!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {temperos.map((tempero) => (
              <Card 
                key={tempero.id} 
                className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  selectedTemperos.includes(tempero.id) 
                    ? 'ring-2 ring-green-500 bg-green-50' 
                    : 'hover:scale-105'
                }`}
                onClick={() => toggleTemperoSelection(tempero.id)}
              >
                <CardContent className="p-4">
                  <div className="relative">
                    <img 
                      src={tempero.image} 
                      alt={tempero.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    {selectedTemperos.includes(tempero.id) && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{tempero.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{tempero.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-600">{tempero.price}</span>
                    <span className={`text-sm font-medium ${
                      selectedTemperos.includes(tempero.id) ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {selectedTemperos.includes(tempero.id) ? 'Selecionado!' : 'Clique para selecionar'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button 
              onClick={handleSelectedTemperos}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 text-xl rounded-full shadow-lg"
            >
              🟢 Quero esses sabores! Me chama no WhatsApp ({selectedTemperos.length} selecionados)
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Como Funciona
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">1. Selecione</h3>
              <p className="text-gray-600">Clique nos temperos que deseja</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">2. WhatsApp</h3>
              <p className="text-gray-600">Clique no botão verde para finalizar</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">3. Pague via Pix</h3>
              <p className="text-gray-600">Pagamento rápido e seguro</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">4. Receba em casa</h3>
              <p className="text-gray-600">Entrega rápida e segura</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            O que nossos clientes dizem
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {depoimentos.map((depoimento, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <img 
                    src={depoimento.image} 
                    alt={depoimento.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4"
                  />
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{depoimento.text}"</p>
                  <p className="font-bold text-gray-900">{depoimento.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="py-16 px-4 bg-red-600">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Receba ofertas exclusivas!
          </h2>
          <p className="text-red-100 mb-8">
            Deixe seus dados e receba promoções especiais direto no WhatsApp
          </p>
          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <Input 
              type="text"
              placeholder="Seu nome"
              value={leadForm.name}
              onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
              className="w-full"
              required
            />
            <Input 
              type="tel"
              placeholder="Seu WhatsApp"
              value={leadForm.phone}
              onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
              className="w-full"
              required
            />
            <Button 
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
            >
              Quero receber ofertas!
            </Button>
          </form>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Transforme sua comida com sabor de verdade
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Não perca mais tempo com temperos sem sabor. Experimente a diferença dos nossos temperos artesanais!
          </p>
          <Button 
            onClick={() => window.open(whatsappLink, '_blank')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-12 text-xl rounded-full shadow-lg transform transition hover:scale-105"
          >
            🟢 Quero fazer meu pedido! (WhatsApp)
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            © 2024 Quallity Temperos - Sabor de verdade na sua cozinha
          </p>
          <p className="text-gray-400">
            WhatsApp: (11) 98272-2426 | Pagamento via Pix | Entrega em todo Brasil
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
