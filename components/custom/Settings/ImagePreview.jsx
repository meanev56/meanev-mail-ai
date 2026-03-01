import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react';

function ImagePreview({ value, label, onHandleInputChange }) {
  return (
    <div>
      <label>{label}</label>
      <Image
        src={value}
        alt="image"
        className="w-full h-37.5 object-contain border rounded-xl"
      />
      <Input
        value={value}
        onChange={(e) => onHandleInputChange(e.target.value)}
        className="mt-2"
      />
    </div>
  );
}

export default ImagePreview;
