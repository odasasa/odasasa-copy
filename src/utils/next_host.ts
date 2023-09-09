export const IS_SERVER_ENV = typeof window === 'undefined'
export function getHostPath() {

}

export const BASE_PATH = IS_SERVER_ENV ? ('dev' === process.env.NEXT_PUBLIC_ENV ? "http://localhost:3000" : "https://oda-dev.vercel.app") : ""
