import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import DynamicSection from "@/components/DynamicSection";
import { getPageSections } from "@/lib/siteConfigManager";
import { PageSection } from "@/types/siteConfig";

const Index = () => {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      // Carregar apenas seções ativas
      const data = await getPageSections(true);
      setSections(data);
    } catch (error) {
      console.error('Erro ao carregar seções:', error);
      // Em caso de erro, usar seções padrão (fallback)
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {sections.length > 0 ? (
          sections.map((section) => (
            <DynamicSection key={section.id} section={section} />
          ))
        ) : (
          <div className="py-20 text-center text-gray-600">
            <p>Nenhuma seção ativa. Configure as seções no painel administrativo.</p>
          </div>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
