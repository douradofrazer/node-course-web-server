const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();    

hbs.registerPartials(__dirname+"/views/partials")
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

//middleware function
app.use((req, res, next)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{

    });
    next();
});

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

app.get('/',(req,res)=> {
//    res.send('Hello world!')
/*       res.send({
          name:'frazer',
          hobbies : ['gaming','reading','coding']
      }) */
      res.render('home.hbs',{
          pageTitle : 'Home Page',
          bodyTitle : 'Welcome to Node.js Server',
          content : 'This is some content for you to read for no good reason.'
      });
});

app.get('/about',(req,res)=> {
        res.render('about.hbs',{
            pageTitle : 'About Page'
        });
    })

app.get('/contact',(req,res) => {
        res.render('contact.hbs',{
            pageTitle : 'Contact Us',
            address : '1219 N 13th St, Kansas City, KS 66102, USA',
            phone : '1234567891'
        });
});

app.get('/bad',(req,res)=> {
          res.send({
              error :'Bad Request',
              message : 'Ooops something went wrong!'
          })
    });

app.listen(port,()=>console.log(`Example app listening on port ${port}!`));