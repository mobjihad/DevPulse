
import  {pool}  from "../../db";
import type { Ruser } from "../../types";
import bcrypt from "bcrypt"

class authService {

    async signup(userData: Ruser & {password: string}){

       
        const {name,email,password,role} = userData

        const hashed_pass = await bcrypt.hash(password,10);
        const queryText = "INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,COALESCE($4::text,'contributor')) RETURNING name,email,role,created_at,updated_at";
        const values = [name,email,hashed_pass,role];
        const user = await pool.query(queryText,values);

        return user.rows[0]; 
        
  
    }




}

export default new authService()