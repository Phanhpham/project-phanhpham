export interface Admin{
    id:number,
    user_id:number,
    user_name:string,
    email:string,
    fullName:string,
    status:boolean,
    role:boolean,
    avatar:string,
    phoneNumber:string,
    address:string,
    create_at:string,
    update_at:string,
}

export interface AddUser{
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}