import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { uploadImage, validateImage } from '@/lib/uploadManager';
import { getAuthHeader } from '@/lib/authManager';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

const ImageUpload = ({ label, value, onChange, placeholder }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar imagem
    const validation = validateImage(file);
    if (!validation.valid) {
      toast.error(validation.error || 'Arquivo inválido');
      return;
    }

    try {
      setUploading(true);

      // Fazer upload usando o uploadManager
      const imageUrl = await uploadImage(file, { 
        type: 'section',
        requireAuth: true 
      });

      // Atualizar com URL da imagem
      onChange(imageUrl);
      toast.success('Imagem enviada com sucesso!');

    } catch (error) {
      console.error('Erro no upload:', error);
      const message = error instanceof Error ? error.message : 'Erro ao enviar imagem';
      toast.error(message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
    toast.success('Imagem removida');
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {/* Campo de texto para URL manual */}
      <div className="flex gap-2">
        <Input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || '/caminho/imagem.jpg'}
          className="flex-1"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Enviando...' : 'Upload'}
        </Button>
      </div>

      {/* Preview da imagem */}
      {value && (
        <div className="relative mt-2 border rounded-lg overflow-hidden">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999"%3EImagem%3C/text%3E%3C/svg%3E';
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Instruções */}
      <p className="text-xs text-muted-foreground">
        <ImageIcon className="w-3 h-3 inline mr-1" />
        Clique em Upload ou cole a URL. Formatos: JPG, PNG, WebP (máx 5MB)
      </p>
    </div>
  );
};

export default ImageUpload;
