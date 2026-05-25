import app from "./app.js";
import config from "./config/index.js";
import initDb from "./db/index.js";


const main = () =>{

    initDb()
    app.listen(config.port, ()=>{

    console.log(`Server Running on port : ${config.port}`);
})
}

main()