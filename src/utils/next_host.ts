export const IS_SERVER_ENV = typeof window === 'undefined'
export function getHostPath() {

}

export const BASE_PATH = IS_SERVER_ENV ? ('dev' === process.env.NEXT_PUBLIC_ENV ? process.env.NEXT_PUBLIC_DEV_BASE_URL : "https://oda-dev.vercel.app") : ""
