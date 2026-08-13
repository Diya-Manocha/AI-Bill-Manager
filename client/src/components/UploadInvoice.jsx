import React, { useState } from 'react';
import { UploadCloud, File, X } from 'lucide-react';

const UploadInvoice = () => {
  const [file, setFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-border shadow-sm flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-[400px]">
      <h2 className="text-2xl font-bold text-text-main mb-6">Upload Invoice</h2>
      
      {!file ? (
        <div 
          className="w-full h-full border-2 border-dashed border-primary/30 rounded-2xl flex flex-col items-center justify-center bg-primary-light/30 hover:bg-primary-light/50 transition-colors cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload').click()}
        >
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleChange}
          />
          <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4 text-primary">
            <UploadCloud size={32} />
          </div>
          <p className="text-text-main font-semibold text-lg mb-2">Click to upload or drag and drop</p>
          <p className="text-text-muted text-sm">PDF, PNG, JPG or JPEG (max. 10MB)</p>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex items-center p-4 bg-primary-light/20 rounded-xl border border-primary/20 w-full mb-6">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center text-primary mr-4">
              <File size={24} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-text-main font-semibold truncate">{file.name}</p>
              <p className="text-text-muted text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button 
              onClick={clearFile}
              className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <button className="bg-primary text-white py-3 px-8 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-[0_4px_14px_rgba(107,78,255,0.4)] w-full">
            Process Invoice
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadInvoice;
