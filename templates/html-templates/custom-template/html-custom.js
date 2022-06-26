module.exports = projectData => {
    const { owner, website, } = projectData;
    
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${website}</title>
    </head>
    <body>
    <!-- Owner name: ${owner} -->
        
    </body>
    </html>
    `
}