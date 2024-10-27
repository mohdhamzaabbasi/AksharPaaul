const express=require("express");
const app=express();
let port=8080;
const path=require("path");
const over=require("method-override");
app.use(over("_method"));
app.listen(port,()=>{
});
app.use(express.urlencoded({extended : true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
const mysql = require('mysql2');
const { count, Console } = require("console");
const connection=mysql.createConnection({
host: 'localhost',
user: 'root',
database: 'info',
password: 'Hamzalfs@7086'
});
let q="USE AP";
try{
    connection.query(q,(err,res)=>{
        if(err)
        {
            throw err; 
        }
        console.log("started!!");
    });
} catch{
    console.log("eRROR");
}
app.get("/",(req,res)=>{
    
});   
app.post("/dash",(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    let q=`SELECT * FROM teachers where email='${email}' AND password_hash='${password}'`;
    try{
        connection.query(q,(err,resp)=>{
            if(err)
            {
                throw err; 
            }
            if(resp.length==0)
            {
                res.render("wrongip.ejs");
                return;
            }
            let teacherData=resp[0];
            res.render("dashboard.ejs",{teacherData});
        });
    }catch{
        console.log("eRROR");
    }
});
app.post("/take",(req,res)=>{
    let school_id=req.body.school_id;
    let q=`SELECT * FROM classes where school_id='${school_id}'`;
    try{
        connection.query(q,(err,resp)=>{
            res.render("takeattendance.ejs",{resp});
        });
    }catch{
        console.log("eRROR");
    }
});
app.post("/takeatt",(req,res)=>{
    let class_id=req.body.class_id;
    let q=`SELECT * FROM students where class_id='${class_id}'`;
    try{
        connection.query(q,(err,resp)=>{
            res.render("Takerollcall.ejs",{resp});
        });
    }catch{
        console.log("eRROR");
    }
});
app.post("/submitted",(req,res)=>{
    let data=req.body;
    const dataArray = Object.entries(data).map(([key, value]) => {
        return { key, value };
    });
    let l=dataArray.length;
    let class_id=dataArray[0].value;
    const now=new Date();
    let session_id=class_id+now;
    let qt=`INSERT INTO session (session_id, class_id, attendance_date) VALUES ('${session_id}', ${class_id}, '${now}')`;
    try{
        connection.query(qt,(err,resp)=>{
            console.log("session created!!");
        });
    }catch{
        console.log("eRROR");
    }
    for(let i=1;i<l;i++){
        let q=`INSERT INTO att (session_id, roll_no, status) VALUES ('${session_id}', '${dataArray[i].key}', '${dataArray[i].value}')`;
        try{
            connection.query(q,(err,resp)=>{
                console.log(dataArray[i].key+"-->"+dataArray[i].value);
            });
        }catch{
            console.log("eRROR");
        }
    }
    res.redirect("/");
});

app.post("/modify",(req,res)=>{
    let school_id=req.body.school_id;
    console.log(school_id);
    let q=`SELECT * FROM session inner join classes on session.class_id=classes.class_id where school_id=${school_id}`;
    try{
        connection.query(q,(err,resp)=>{
            res.render("Modify.ejs",{resp});
        });
    }catch{
        console.log("eRROR");
    }
});

app.post("/finalmod",(req,res)=>{
    let session_id=req.body.session_id;
    console.log(session_id);
    let q=`select * from att inner join students on att.roll_no=students.roll_no where session_id="${session_id}"`;
    try{
        connection.query(q,(err,resp)=>{
            res.render("Modrollcall.ejs",{resp});
        });
    }catch{
        console.log("eRROR");
    }
});

app.post("/modsubmitted",(req,res)=>{
    let session_id=req.body.session_id;
    let data=req.body;
    const dataArray = Object.entries(data).map(([key, value]) => {
        return { key, value };
    });
    let l=dataArray.length;
    let qt=`delete from att where session_id="${session_id}"`;
    try{
        connection.query(qt,(err,resp)=>{
            console.log("session deleted!!");
        });
    }catch{
        console.log("eRROR");
    }
    for(let i=1;i<l;i++){
        let q=`INSERT INTO att (session_id, roll_no, status) VALUES ('${session_id}', '${dataArray[i].key}', '${dataArray[i].value}')`;
        try{
            connection.query(q,(err,resp)=>{
                console.log(dataArray[i].key+"-->"+dataArray[i].value);
            });
        }catch{
            console.log("eRROR");
        }
    }
    res.redirect("/");
});

app.post("/view",(req,res)=>{
    let school_id=req.body.school_id;
    console.log(school_id);
    res.render("ViewOption.ejs",{school_id});
});

app.post("/viewByClass",(req,res)=>{
    let school_id=req.body.school_id;
    console.log(school_id);
    let q=`select * from session inner join classes on session.class_id=classes.class_id where school_id=${school_id}`;
    try{
        connection.query(q,(err,resp)=>{
            res.render("ViewClass.ejs",{resp});
        });
    }catch{
        console.log("eRROR");
    }
});
app.post("/finalView",(req,res)=>{
    let session_id=req.body.session_id;
    console.log(session_id);
    console.log("LLL")
    let q=`select * from att inner join students on att.roll_no=students.roll_no where session_id="${session_id}"`;
    try{
        connection.query(q,(err,resp)=>{
            res.render("View.ejs",{resp});
        });
    }catch{
        console.log("eRROR");
    }
});
app.post("/viewByStudent",(req,res)=>{
    let school_id=req.body.school_id;
    console.log(school_id);
    let q=`SELECT * FROM classes where school_id='${school_id}'`;
    try{
        connection.query(q,(err,resp)=>{
            res.render("ViewClassStu.ejs",{resp});
        });
    }catch{
        console.log("eRROR");
    }
});

app.post("/viewatt",(req,res)=>{
    let class_id=req.body.class_id;
    let q=`SELECT * FROM students where class_id='${class_id}'`;
    try{
        connection.query(q,(err,resp)=>{
            res.render("ViewStu.ejs",{resp});
        });
    }catch{
        console.log("eRROR");
    }
});

app.post("/stuProfile",(req,res)=>{
    let roll_no=req.body.roll_no;
    let name=req.body.name;
    console.log(name);
    let q=`SELECT * FROM att where roll_no='${roll_no}'`;
    try{
        connection.query(q,(err,resp)=>{
            let conducted=0;
            let attended=0;
            let absent=0;
            for(each of resp)
            {
                conducted++;
                if(each.status=="present")
                {
                    attended++;
                }
                else
                {
                    absent++;
                }
            }
            let arr=[conducted,attended,roll_no,name];
            res.render("StudentRecord.ejs",{arr});
        });
    }catch{
        console.log("eRROR");
    }
});