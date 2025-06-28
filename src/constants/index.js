import path from 'node:path';

export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const TEMPLATES_DIR = path.resolve('src', 'templates');

export const TEMP_UPLOAD_DIR = path.resolve('src', 'temp');

export const UPLOAD_DIR = path.resolve('src', 'upload');

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

export const SWAGGER_PATH = path.resolve('docs', 'swagger.json');
