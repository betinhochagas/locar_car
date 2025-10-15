import VehicleCard from "./VehicleCard";
import mobiImg from "@/assets/mobi.jpg";
import kwidImg from "@/assets/kwid.jpg";
import unoImg from "@/assets/uno.jpg";
import onixImg from "@/assets/onix.jpg";
import golImg from "@/assets/gol.jpg";
import voyageImg from "@/assets/voyage.jpg";
import sanderoImg from "@/assets/sandero.jpg";
import versaImg from "@/assets/versa.jpg";

const VehicleCatalog = () => {
  const vehicles = [
    {
      name: "Fiat Mobi",
      price: "R$650",
      image: mobiImg,
      features: ["Econômico", "Ar Condicionado", "Direção Hidráulica", "Perfeito para cidade"],
    },
    {
      name: "Renault Kwid",
      price: "R$650",
      image: kwidImg,
      features: ["Compacto", "Baixo consumo", "Moderna tecnologia", "Fácil manuseio"],
    },
    {
      name: "Fiat Uno",
      price: "R$650",
      image: unoImg,
      features: ["Confiável", "Peças acessíveis", "Ótimo custo-benefício", "Espaçoso"],
    },
    {
      name: "Chevrolet Onix",
      price: "R$700",
      image: onixImg,
      features: ["Modelo popular", "Conforto superior", "Tecnologia moderna", "Bom desempenho"],
    },
    {
      name: "VW Gol",
      price: "R$700",
      image: golImg,
      features: ["Líder de vendas", "Confiabilidade", "Manutenção fácil", "Design moderno"],
    },
    {
      name: "VW Voyage",
      price: "R$700",
      image: voyageImg,
      features: ["Sedan espaçoso", "Porta-malas amplo", "Conforto extra", "Elegante"],
    },
    {
      name: "Renault Sandero",
      price: "R$700",
      image: sanderoImg,
      features: ["Versátil", "Espaço interno", "Design arrojado", "Bom desempenho"],
    },
    {
      name: "Nissan Versa",
      price: "R$700",
      image: versaImg,
      features: ["Sedan premium", "Espaço superior", "Tecnologia avançada", "Conforto total"],
    },
  ];

  return (
    <section id="locacao" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Nossos <span className="text-primary">Veículos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o veículo ideal para trabalhar com aplicativos. Todos revisados e prontos para rodar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <VehicleCard {...vehicle} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Todos os valores são por semana. Consulte condições especiais para períodos mais longos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VehicleCatalog;
