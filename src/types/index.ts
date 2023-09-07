export interface Product {
    id: string
   title: string,
    description: string,
    category: string
    unit: string
    img?: string
    price: number
    status: string
    createdAt: Date
}

export interface Category {
    id: string
    name: string,
    description: string,
    unit: string
    status: string
    createdAt: Date
}

export interface Banners {
    name: string
    id: string
    status: string
    createdAt: Date
}

export interface Payments {
    name: string
    id: string
    status: string
    refNo: string
    amount: number
    createdAt: Date
    packageId: string
}



export interface Packages {
    name: string
    id: string
    price: number
    createdAt: Date
    staus?: string
}

export interface Users {
    name: string
    id: string
    email:string
    role:'user' | 'vendor' | 'su' | 'admin'
    createdAt: Date
    staus?: string
    phone:string
    password:string
}

export interface Activation {
   id:string
   accountId:string
   createdAt:Date
}