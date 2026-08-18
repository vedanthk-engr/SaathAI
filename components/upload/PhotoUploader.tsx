'use client';

import React, { useState } from 'react';
import { UploadCloud, X, Image as ImageIcon, Sparkles, CheckCircle } from 'lucide-react';

interface PhotoUploaderProps {
  onPhotosChanged: (photoUrls: string[]) => void;
  maxPhotos?: number;
}

export default function PhotoUploader({
  onPhotosChanged,
  maxPhotos = 5
}: PhotoUploaderProps) {
  const [photos, setPhotos] = useState<string[]>([
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Madhubani_art.jpg/800px-Madhubani_art.jpg"
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result && photos.length < maxPhotos) {
            const updated = [...photos, reader.result as string];
            setPhotos(updated);
            onPhotosChanged(updated);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    onPhotosChanged(updated);
  };

  return (
    <div className="p-6 rounded-2xl bg-white border-2 border-stone-200 shadow-sm space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-stone-800 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-terracotta" />
          Product Craft Photos (Up to {maxPhotos})
        </label>
        <span className="text-xs text-stone-500 font-mono">
          {photos.length} / {maxPhotos} uploaded
        </span>
      </div>

      {/* Drag & Drop Area */}
      <label className="block border-2 border-dashed border-stone-300 hover:border-terracotta rounded-xl p-6 text-center cursor-pointer bg-stone-50/50 hover:bg-stone-50 transition-all">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <UploadCloud className="w-8 h-8 text-stone-400 mx-auto mb-2" />
        <p className="text-sm font-medium text-stone-700">Drag & drop craft photos, or <span className="text-terracotta underline font-semibold">browse</span></p>
        <p className="text-xs text-stone-400 mt-1">High resolution clear photos yield best GPT-4o Vision analysis</p>
      </label>

      {/* Thumbnails grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-5 gap-3 pt-2">
          {photos.map((url, index) => (
            <div key={index} className="relative group rounded-lg overflow-hidden border border-stone-200 aspect-square bg-stone-100">
              {/* eslint-disable-next-html-element-suppression */}
              <img src={url} alt={`Product craft photo ${index + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 bg-stone-900/80 hover:bg-red-600 text-white p-1 rounded-full opacity-90 transition-all"
                title="Remove photo"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
