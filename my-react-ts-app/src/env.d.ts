/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AWS_S3_HOBBY_CDN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 