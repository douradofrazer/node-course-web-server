const express = require('express');
const hbs = require('hbs');

let app = express();

hbs.registerPartials(__dirname+"/views/partials")
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

//middleware function
app.use((req, res, next)=>{
    let now = new Date().toString();

    console.log(`${now}: ${req.method} ${req.url}`);
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

app.get('/bad',(req,res)=> {
          res.send({
              error :'Bad Request',
              message : 'Ooops something went wrong!'
          })
    });

app.listen(3000,()=>console.log('Example app listening on port 3000!'));