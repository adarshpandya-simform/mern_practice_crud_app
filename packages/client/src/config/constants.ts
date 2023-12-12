import { config } from 'dotenv';

config();

export const ENDPOINT_URL = 'http://localhost:8000/api/trpc';
export const CLOUDINARY_URL = process.env.CLOUDINARY_ASSET_UPLOAD_URL as string;
