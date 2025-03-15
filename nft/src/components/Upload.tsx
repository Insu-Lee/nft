import React, { useState } from 'react';
import { uploadFileToIPFS } from '../apis/pinata';
import { Timage } from '../utils/types';

interface UploadProps {
  handleImageUpload: (img: Timage) => void;
}

const Upload: React.FC<UploadProps> = ({ handleImageUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    formData.append('network', 'public');

    try {
      const result = await uploadFileToIPFS(formData);
      handleImageUpload({
        url: result,
        preview: preview,
      });
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('파일 업로드 실패!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '300px',
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            style={{ width: '300px', height: 'auto', borderRadius: '5px' }}
          />
        ) : (
          <input type="file" onChange={handleFileChange} />
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{
            height: '40px',
            padding: '8px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: uploading ? '#ccc' : '#007bff',
            color: 'white',
            cursor: uploading ? 'not-allowed' : 'pointer',
          }}
        >
          {uploading ? '업로드 중...' : '파일 업로드'}
        </button>
      </div>
    </div>
  );
};

export default Upload;
