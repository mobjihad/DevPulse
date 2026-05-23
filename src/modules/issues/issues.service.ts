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

}


export default new issueService() 