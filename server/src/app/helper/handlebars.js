 const { create } = require('express-handlebars');
 

const hbs = create({
    extname: '.hbs',
    // Specify helpers which are only registered on this instance.
    helpers: {
        formatDateTime: (date) =>{
            return date.toLocaleString();
        },
        formaTime: (time)=>{
            return time.getHours() + ':' + time.getMinutes()
        },
        formatDate: (date) =>{
            return date.toLocaleDateString();
        }

    }
});

module.exports = hbs;