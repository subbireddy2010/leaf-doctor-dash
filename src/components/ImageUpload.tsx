import { useState, useRef } from "react";
import { Upload, Camera, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Security constants
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_DIMENSIONS = 4096; // pixels
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

  const validateFile = (file: File): string | null => {
    // File size validation
    if (file.size > MAX_FILE_SIZE) {
      return `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
    }

    // MIME type validation
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Only JPEG, PNG, and WebP images are allowed';
    }

    // File extension validation
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return 'Invalid file extension. Only .jpg, .jpeg, .png, .webp are allowed';
    }

    return null;
  };

  const validateImageDimensions = (img: HTMLImageElement): string | null => {
    if (img.width > MAX_DIMENSIONS || img.height > MAX_DIMENSIONS) {
      return `Image dimensions must not exceed ${MAX_DIMENSIONS}x${MAX_DIMENSIONS} pixels`;
    }
    return null;
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (!file) return;

    try {
      // Validate file
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        toast({
          variant: "destructive",
          title: "Invalid file",
          description: validationError,
        });
        return;
      }

      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        
        // Create image element to validate dimensions
        const img = new Image();
        img.onload = () => {
          const dimensionError = validateImageDimensions(img);
          if (dimensionError) {
            setError(dimensionError);
            toast({
              variant: "destructive",
              title: "Invalid image dimensions",
              description: dimensionError,
            });
            return;
          }
          
          setSelectedImage(result);
          toast({
            title: "Image uploaded successfully",
            description: "Your plant image is ready for analysis",
          });
        };
        
        img.onerror = () => {
          setError("Invalid image file. Please select a valid image.");
          toast({
            variant: "destructive",
            title: "Invalid image",
            description: "The selected file is not a valid image",
          });
        };
        
        img.src = result;
      };

      reader.onerror = () => {
        setError("Failed to read the file. Please try again.");
        toast({
          variant: "destructive",
          title: "File read error",
          description: "Failed to read the file. Please try again.",
        });
      };

      reader.readAsDataURL(file);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast({
        variant: "destructive",
        title: "Upload error",
        description: "An unexpected error occurred during file upload",
      });
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Upload Plant Image
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {!selectedImage ? (
          <div 
            className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">
              Drop your plant image here
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse files
            </p>
            <Button variant="outline">
              Choose File
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={selectedImage} 
                alt="Selected plant" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={clearImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Plant Health"}
            </Button>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleImageSelect}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
};

export default ImageUpload;