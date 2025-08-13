
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { imageFileSchema, createSafeError, RateLimiter } from "@/lib/security";
import { useToast } from "@/hooks/use-toast";

const uploadRateLimiter = new RateLimiter(10, 60000); // 10 uploads per minute

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const validateFile = useCallback((file: File): string | null => {
    try {
      imageFileSchema.parse({ file });
      return null;
    } catch (error: any) {
      return createSafeError(error, 'Invalid file');
    }
  }, []);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    
    if (!file) return;

    // Rate limiting check
    if (!uploadRateLimiter.isAllowed('upload')) {
      setError('Too many upload attempts. Please wait before trying again.');
      return;
    }

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);
    console.log('File selected securely:', { 
      name: file.name, 
      size: file.size, 
      type: file.type 
    });
  }, [validateFile]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setError(null);

    const file = event.dataTransfer.files[0];
    if (!file) return;

    // Rate limiting check
    if (!uploadRateLimiter.isAllowed('upload')) {
      setError('Too many upload attempts. Please wait before trying again.');
      return;
    }

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);
    console.log('File dropped securely:', { 
      name: file.name, 
      size: file.size, 
      type: file.type 
    });
  }, [validateFile]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleUpload = useCallback(async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      // TODO: Replace with actual secure upload to Supabase
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate upload
      
      toast({
        title: "Image uploaded successfully",
        description: "AI analysis is processing your plant image.",
      });
      
      console.log('Image uploaded securely for analysis');
    } catch (error) {
      const safeError = createSafeError(error, 'Upload failed. Please try again.');
      setError(safeError);
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  }, [selectedFile, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Plant Image</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">
            Drag and drop an image or click to select
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Supported formats: JPEG, PNG, WebP (max 10MB)
          </p>
          
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            disabled={isUploading}
          />
          
          <label htmlFor="file-upload">
            <Button disabled={isUploading} asChild>
              <span className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Choose Image
              </span>
            </Button>
          </label>
        </div>

        {error && (
          <Alert className="mt-4" variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {selectedFile && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium">Selected file:</p>
            <p className="text-sm text-gray-600">{selectedFile.name}</p>
            <p className="text-xs text-gray-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
            
            <Button 
              onClick={handleUpload}
              disabled={isUploading}
              className="mt-3 w-full"
            >
              {isUploading ? 'Analyzing...' : 'Analyze Plant'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
