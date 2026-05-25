
import  {pool}  from "../../db/index.js";
import type { returnedUser, Ruser } from "../../types/index.js";
import bcrypt from "bcrypt"

class authService {

    async signup(userData: Ruser & {password: string}){

       
        const {name,email,password,role} = userData

        const hashed_pass = await bcrypt.hash(password,10);
        const queryText = "INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,COALESCE($4::text,'contributor')) RETURNING id,name,email,role,created_at,updated_at";
        const values = [name,email,hashed_pass,role];
        const user = await pool.query(queryText,values);

        return user.rows[0]; 
        
  
    }

    async login(userData: {email: string , password: string}) : Promise<returnedUser | null >{

        const {email, password} = userData; 

        const queryText = " SELECT * FROM users WHERE email=$1";
        const values = [email]

        const user = await pool.query(queryText,values);

        if(user.rows.length===0){
            return null;
        }

        const dbUser = user.rows[0] 
       
        const isValid = await bcrypt.compare(password, dbUser.password);

        const {password: _, ...ruser} = dbUser 
       
        return isValid? ruser : null; 




    }

    async findUserById(id: number){

        const queryText = "SELECT * FROM users WHERE id=$1";
        const values = [id];
        const user = await pool.query(queryText,values);

        if(user.rows.length===0){
            return null;
        }
        
        return user.rows[0]

    }

}

export default new authService()