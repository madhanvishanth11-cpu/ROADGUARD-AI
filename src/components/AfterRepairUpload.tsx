import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface AfterRepairUploadProps {
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
}

export const AfterRepairUpload: React.FC<AfterRepairUploadProps> = ({ onUpload, isUploading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const VALID_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const validateAndSetFile = (selectedFile: File) => {
    setError('');
    
    if (!VALID_TYPES.includes(selectedFile.type)) {
      setError('Invalid file format. Please upload JPG, PNG, or WEBP.');
      return;
    }
    
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('Image is too large. Maximum size is 10MB.');
      return;
    }

    setFile(selectedFile);
    
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!file) return;
    try {
      await onUpload(file);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:bg-green-50 hover:border-green-400 transition-colors"
        >
          <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-3 group-hover:text-green-500 transition-colors" />
          <p className="text-sm font-bold text-gray-700">Click to upload After-Repair Image</p>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP up to 10MB</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 group aspect-video">
            <img src={preview} alt="After repair preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
              <button 
                onClick={clearFile} 
                disabled={isUploading}
                className="bg-white text-red-600 font-bold px-4 py-2 rounded-lg hover:bg-red-50 flex items-center gap-2"
              >
                <X className="w-4 h-4" /> Remove Image
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleSubmit}
            disabled={isUploading || !file}
            className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Uploading Evidence...
              </>
            ) : (
              <>
                <ImageIcon className="w-5 h-5" /> Confirm & Upload Evidence
              </>
            )}
          </button>
        </div>
      )}
      <input 
        type="file" 
        accept="image/jpeg, image/jpg, image/png, image/webp" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
      />
    </div>
  );
};
