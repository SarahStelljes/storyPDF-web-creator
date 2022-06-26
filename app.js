const inquirer = require('inquirer');
const process = require('process');
const fs = require('fs');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'websiteOwner',
            message: 'Who owns this website? (required)',
            validate: ownerInput => {
                if(ownerInput){
                    return true;
                } else {
                    console.log('You must enter a name for the website owner!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmOwner',
            message: 'Are you sure this is the correct name of the owner? The name could refer to a business.',
            default: true
        }
    ])
    .then(ownerData => {
        if(ownerData.confirmOwner){
            ownerData = ownerData.websiteOwner;
            return ownerData;
        } else {
            return promptUser();
        }
    });
}
const promptProjectName = ownerData => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'websiteName',
            message: 'What is the name of this website? Note: This will also be the name of the folder, so use underscores (_) and/or dashes (-) when necessary. (required)',
            validate: projectName =>{
                if(projectName){
                    return true;
                } else {
                    console.log('You need to name the project!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmProjectName',
            message: 'Are you sure about this name?',
            default: true
        }
    ])
    .then(projectData => {
            if(projectData.confirmProjectName){
                projectData = projectData.websiteName;
                fs.mkdir('./'+projectData+'/', err => {
                    if(err) throw err;
                    console.log('Made website folder');
                });
                if(fs.existsSync(projectData)){
                    process.chdir(projectData);
                    fs.mkdir('./assets/', err => {
                        if(err) throw err;
                    });
                    process.chdir('assets');
                    fs.mkdir('./js/', err=>{
                        if(err) throw err;
                    });
                    fs.mkdir('./css/', err=>{
                        if(err) throw err;
                    });
                    fs.mkdir('./website-imgs/', err=>{
                        if(err) throw err;
                    });
                }
                return projectData = {
                    owner: ownerData,
                    website: projectData
                };
            } else {
                return promptProjectName(ownerData);
            }
    });
}
promptUser()
    .then(promptProjectName)
    .then(projectData => {
        console.log(projectData);
    });