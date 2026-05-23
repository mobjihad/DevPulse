export const role = ["contributor", "maintainer"] as const;

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
export type returnedUser = Omit<User, "password">
export type jtwSuitedUser = Omit<User, "password"|"email">

export const itype = ["bug","feature_request"] as const; 
export type issueType = typeof itype[number];

export const issuestatus = ["open","in_progress","resolved"] as const; 
export type issuStatstusType = typeof issuestatus[number];


export type Issues = {

    id: number; 
    title: string; 
    description: string; 
    type: issueType;
    status: issuStatstusType;
    reporter_id: number; 
    created_at: Date ; 
    updated_at: Date ; 
}

export type insertIssueType = Pick<Issues , "title"|"description"|"type"|"reporter_id">