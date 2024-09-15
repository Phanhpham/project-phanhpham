export interface Product{
    id: number,
      productname:string ,
      img: string,
      price: number,
      stock: number,
      category: string,
      created_at:string,
      updated_at: string,
}

export interface Cart{
  id: number,
  idUser: number,
  product: {
    id: number,
    productname:string ,
    img: string,
    price: number,
    stock: number,
  }
}