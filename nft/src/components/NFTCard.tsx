import { Tnft } from '../utils/types';
import Loading from '../components/Loading';

const NFTCard = ({ nft }: { nft: Tnft }) => {
  return (
    <div
      style={{
        border: '2px solid #ccc',
        borderRadius: '10px',
        padding: '15px',
        textAlign: 'center',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
        width: '250px',
        minWidth: '200px',
        wordBreak: 'break-word',
        overflow: 'hidden',
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {nft.image ? (
        <img
          src={nft.image}
          alt={nft.name}
          style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
        />
      ) : (
        <Loading />
      )}
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '10px 0' }}>
        {nft.name}
      </h3>
      <p style={{ fontSize: '14px', color: 'gray' }}>{nft.discription}</p>
      <p style={{ fontSize: '12px', color: '#666' }}>Token ID: {nft.tokenId}</p>
      <p
        style={{
          fontSize: '12px',
          color: '#666',
          wordBreak: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        Owner: {nft.owner}
      </p>
      <p
        style={{
          fontSize: '12px',
          color: '#666',
          wordBreak: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        Contract: {nft.contract}
      </p>
      <p style={{ fontSize: '12px', color: '#666' }}>Network: {nft.network}</p>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Symbol: {nft.symbol || ''}
      </p>
    </div>
  );
};

export default NFTCard;
