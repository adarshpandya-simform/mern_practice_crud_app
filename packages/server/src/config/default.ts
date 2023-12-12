import path from 'path';
import { config } from 'dotenv';
import {
  DEFAULT_ACCESS_TOKEN_EXPIRATION,
  DEFAULT_ORIGIN_URL,
  DEFAULT_PORT,
  DEFAULT_REFRESH_TOKEN_EXPIRATION,
} from './constants';

config({ path: path.join(__dirname, '../../.env') });

const customConfig = {
  port: DEFAULT_PORT,
  accessTokenExpiresIn: DEFAULT_ACCESS_TOKEN_EXPIRATION,
  refreshTokenExpiresIn: DEFAULT_REFRESH_TOKEN_EXPIRATION,
  origin: DEFAULT_ORIGIN_URL,

  dbUri: process.env.MONGODB_URI as string,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY as string,
};

export default customConfig;
