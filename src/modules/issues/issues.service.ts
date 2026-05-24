import { pool } from "../../db";
import type { insertIssueType, updateIssueType } from "../../types";


class issueService{

    async createIssues(issue: insertIssueType){

        const {title,description,type, reporter_id} = issue
        
        const queryText = "INSERT INTO issues(title,description, type,reporter_id,status) VALUES($1,$2,$3,$4,'open') RETURNING * "
        const values= [title,description,type,reporter_id]
        const newIssue = await pool.query(queryText,values)
        
        return newIssue.rows[0]
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


        let queryText = "SELECT * FROM issues"

        if(sortMethod && sortMethod=="newest"){
            queryText = queryText + " ORDER BY updated_at DESC"
        }else if(sortMethod && sortMethod=="oldest"){
            queryText=queryText+" ORDER BY updated_at ASC"
        }

        console.log(queryText)
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

    async updateIssue(payload : updateIssueType , id:number){

        const {title,description,type} = payload

        const queryText = "UPDATE issues SET title=$1 , description=$2,type=$3, updated_at =NOW() WHERE id=$4 RETURNING *"
        const values = [title,description,type,id]

        const updatedIssue = await pool.query(queryText, values)


        return updatedIssue.rows[0]
       

    }

    async deleteIssues(id:number){

        const queryText = "DELETE FROM issues WHERE id=$1"
        const values= [id]

        const result = await pool.query(queryText,values)
        return result.rowCount;
    }

}


export default new issueService() 