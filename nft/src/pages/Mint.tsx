import React, { useState } from 'react';
import Upload from '../components/Upload';
import { mint } from '../utils/web3';
import { Timage, Tmetadata } from '../utils/types';
import { uploadMetaData } from '../apis/pinata';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

const Mint = () => {
  const [img, setImg] = useState<Timage>({ url: '', preview: '' });
  const [metadata, setMetadata] = useState<Tmetadata>({
    name: '',
    discription: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const account = {
    address: sessionStorage.getItem('address') || '',
    privateKey: sessionStorage.getItem('privateKey') || '',
  };

  const handleMetadata = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMetadata({
      ...metadata,
      [e.target.name]: e.target.value,
    });
  };

  const handleMint = async () => {
    setLoading(true);
    try {
      const tokenUri = await uploadMetaData(metadata);
      if (!tokenUri) {
        setLoading(false);
        return;
      }

      const mintNFT = await mint(account, tokenUri);

      if (mintNFT) {
        navigate('/nfts');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (img: Timage) => {
    if (img.preview) {
      setImg(img);
      setMetadata((prevMetadata) => ({
        ...prevMetadata,
        image: img.url,
      }));
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : img.preview ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <img
            src={img.preview}
            alt="Preview"
            style={{ width: '300px', height: 'auto', borderRadius: '5px' }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            {Object.keys(metadata).map(
              (key) =>
                key !== 'image' && (
                  <textarea
                    key={key}
                    name={key}
                    value={metadata[key as keyof typeof metadata]}
                    onChange={handleMetadata}
                    placeholder={`NFT ${key}`}
                    style={{
                      width: '300px',
                      height: '40px',
                      padding: '8px',
                      lineHeight: '24px',
                      fontSize: '16px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      boxSizing: 'border-box',
                      resize: 'none',
                    }}
                  />
                )
            )}
          </div>
          <button
            onClick={handleMint}
            style={{
              height: '40px',
              padding: '8px 20px',
              lineHeight: '24px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: '#007bff',
              color: 'white',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
          >
            Mint
          </button>
        </div>
      ) : (
        <Upload handleImageUpload={handleImageUpload} />
      )}
    </div>
  );
};

export default Mint;
