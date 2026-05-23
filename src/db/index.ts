
import {Pool} from "pg"
import config from "../config";

export const pool = new Pool({

    connectionString: config.connection_string 
}); 

const initDb = async() => {

            try {

                await pool.query(`
                    
                    CREATE TABLE IF NOT EXISTS users(
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(20) NOT NULL DEFAULT 'contributor',
                    created_at TIMESTAMP DEFAULT NOW(),
                    updated_at TIMESTAMP DEFAULT NOW()
                    
                    )
                    `)

                await pool.query(`
                  
                    CREATE TABLE IF NOT EXISTS issues(
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(150) NOT NULL,
                    description TEXT NOT NULL,
                    type VARCHAR(40) NOT NULL,
                    status VARCHAR(30) NOT NULL DEFAULT 'open',
                    reporter_id INT NOT NULL,
                    created_at TIMESTAMP DEFAULT NOW(),
                    updated_at TIMESTAMP DEFAULT NOW()
                    )
                    `)

                    console.log("Database Connected")
                

            }catch(err){

                console.log(err); 
            }

}

export default initDb