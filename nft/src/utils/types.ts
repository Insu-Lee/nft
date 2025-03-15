export interface Timage {
  url: string;
  preview: string | null;
}

export interface Tmetadata {
  name: string;
  discription: string;
  image: string;
}

export interface Taccount {
  address: string;
  privateKey: string;
}

export interface Tnft {
  tokenId: number;
  owner: string;
  contract: string;
  tokenURI: string;
  network: string;
  name: any;
  image: any;
  discription: any;
  symbol: void | [] | (unknown[] & []);
}
