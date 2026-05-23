export const role = ["contributor", "maintainer"];

export type Role =typeof role[number]; 



export type User = {

 id: number; 
 name: string; 
 email: string;
 password: string;
 role?: Role; 
 created_at: Date ; 
 updated_at: Date;

}

export type Ruser = Omit<User, "id"|"password"| "created_at" | "updated_at">