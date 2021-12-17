var fs = require('fs')


// let data = fs.readFileSync('readMe.txt', 'utf-8');
// console.log(data)

// fs.writeFileSync('writeMe.txt', data)

fs.readFile('readMe.txt', 'utf-8', function(err, data){
    if(err == null)
        {
            console.log(data); 
            fs.writeFile('writeMe1.txt', data, function(err){
                if(err != null){
                    console.log(err.message)
                }
                else{
                    console.log("File Written Successfully")
                }
            })
        }
    else
        console.log(err.message)
})