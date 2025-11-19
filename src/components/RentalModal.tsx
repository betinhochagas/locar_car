import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircle, Loader2 } from "lucide-react";
import logo from "@/assets/logo.svg";
import { getVehicles } from "@/lib/vehicleManager";
import { Vehicle } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

interface RentalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RentalModal = ({ open, onOpenChange }: RentalModalProps) => {
  const { getConfig } = useSiteConfig();
  const siteName = getConfig('site_name', 'Sistema');
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle: "",
  });
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // Carregar veículos disponíveis
  useEffect(() => {
    if (open) {
      loadVehicles();
    }
  }, [open]);

  const loadVehicles = async () => {
    setLoading(true);
    try {
      const data = await getVehicles();
      const availableVehicles = data.filter((v) => v.available);
      setVehicles(availableVehicles);

      if (availableVehicles.length === 0) {
        toast({
          title: "Aviso",
          description: "No momento não há veículos disponíveis.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os veículos disponíveis.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação
    if (!formData.name || !formData.phone || !formData.email || !formData.vehicle) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    // Encontrar o nome do veículo
    const selectedVehicle = vehicles.find((v) => v.id === formData.vehicle);
    const vehicleName = selectedVehicle?.name || formData.vehicle;

    // Montar mensagem para WhatsApp
    const message = `🚗 *Solicitação de Aluguel - ${siteName}*

👤 *Nome:* ${formData.name}
📱 *Telefone:* ${formData.phone}
📧 *E-mail:* ${formData.email}
🚙 *Veículo Desejado:* ${vehicleName}

_Mensagem enviada através do site ${siteName}_`;

    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5547984485492?text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, "_blank");

    // Resetar formulário e fechar modal
    setTimeout(() => {
      setFormData({ name: "", phone: "", email: "", vehicle: "" });
      setSubmitting(false);
      onOpenChange(false);
      
      toast({
        title: "Sucesso!",
        description: "Você será redirecionado para o WhatsApp.",
      });
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
        {/* Cabeçalho Fixo */}
        <DialogHeader className="sticky top-0 bg-background z-10 pb-4 border-b">
          <div className="flex items-center justify-center mb-2">
            <img src={logo} alt={siteName} className="h-12 w-auto" />
          </div>
          <DialogTitle className="text-center text-xl">
            Aluguel de Veículos
          </DialogTitle>
          <p className="text-center text-sm text-muted-foreground">
            Preencha seus dados e escolha o veículo ideal para você
          </p>
        </DialogHeader>

        {/* Conteúdo Rolável */}
        <div className="flex-1 overflow-y-auto pr-2">
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="rental-name">Nome Completo *</Label>
              <Input
                id="rental-name"
                type="text"
                placeholder="Digite seu nome completo"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Telefone */}
            <div className="space-y-2">
              <Label htmlFor="rental-phone">Telefone *</Label>
              <Input
                id="rental-phone"
                type="tel"
                placeholder="(47) 98448-5492"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            {/* E-mail */}
            <div className="space-y-2">
              <Label htmlFor="rental-email">E-mail *</Label>
              <Input
                id="rental-email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            {/* Veículo */}
            <div className="space-y-2">
              <Label htmlFor="rental-vehicle">Veículo Desejado *</Label>
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2 text-sm text-muted-foreground">
                    Carregando veículos...
                  </span>
                </div>
              ) : vehicles.length === 0 ? (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  Nenhum veículo disponível no momento.
                  <br />
                  Entre em contato para mais informações.
                </div>
              ) : (
                <Select
                  value={formData.vehicle}
                  onValueChange={(value) =>
                    setFormData({ ...formData, vehicle: value })
                  }
                  required
                >
                  <SelectTrigger id="rental-vehicle">
                    <SelectValue placeholder="Selecione um veículo" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.name} - {vehicle.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Botão de Envio */}
            <Button
              type="submit"
              className="w-full"
              disabled={submitting || loading || vehicles.length === 0}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Falar com um Consultor
                </>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RentalModal;
