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

    async getAllIssues(sortMethod?:string, issueType?:string, issueStatus?:string){ 


        const queryText = "SELECT * FROM issues"
        const returnedIssues = await pool.query(queryText)
        const finalResults = []
        if(returnedIssues.rows){
            
            const issues= returnedIssues.rows 

            for( const issue of issues){ 
            const reporter = await pool.query(`SELECT name,id,role FROM users WHERE id=$1`,[issue.reporter_id])

                
            const {reporter_id: _,created_at, updated_at,  ...coreData} = issue

            finalResults.push({
                ...coreData,
                reporter:reporter.rows[0],
                created_at,
                updated_at
            })
            }
        }else {

            return null
        }
        return finalResults
        
      

      
    }

}


export default new issueService() 