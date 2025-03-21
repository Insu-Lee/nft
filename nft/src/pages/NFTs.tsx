import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { getNfts } from '../utils/web3';
import { Tnft } from '../utils/types';
import NFTCard from '../components/NFTCard';

const NFTs = () => {
  const address = sessionStorage.getItem('address') || '';

  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState<Tnft[]>([]);

  useEffect(() => {
    const handleNFTs = async () => {
      setLoading(true);

      try {
        const nfts = await getNfts(address);
        setNfts(nfts);
      } catch (error) {
        console.error('NFT 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    handleNFTs();
  }, [address]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h2>NFT 목록</h2>
          {nfts.length === 0 ? (
            <p>아직 보유한 NFT가 없습니다.</p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '30px',
                justifyContent: 'center',
                alignItems: 'start',
                padding: '20px',
              }}
            >
              {nfts.map((nft, index) => (
                <NFTCard key={index} nft={nft} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NFTs;
