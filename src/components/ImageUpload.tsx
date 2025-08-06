
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera } from "lucide-react";

const ImageUpload = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Plant Image</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">Drag and drop an image or click to select</p>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Choose Image
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
