import { pool } from "../../db";
import type { insertIssueType } from "../../types";


class issueService{

    async createIssues(issue: insertIssueType){

        const {title,description,type, reporter_id} = issue
        
        const queryText = "INSERT INTO issues(title,description, type,reporter_id,status) VALUES($1,$2,$3,$4,'open') RETURNING * "
        const values= [title,description,type,reporter_id]
        const newIssue = await pool.query(queryText,values)
        
        return newIssue
    }

    async getIssuebyID(id:number){

        const queryText = "SELECT * FROM issues WHERE id=$1"
        const values = [id];

        const returnedIssue = await pool.query(queryText,values);

        if(returnedIssue.rows.length===0){
            return null
        }
        return returnedIssue.rows[0]; 
    }

}


export default new issueService() 