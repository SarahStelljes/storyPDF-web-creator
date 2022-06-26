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
            default: false
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
            default: false
        }
    ])
    .then(projectData => {
            if(projectData.confirmProjectName){
                projectData = projectData.websiteName;
                return projectData = {
                    owner: ownerData,
                    website: projectData
                };
            } else {
                return promptProjectName(ownerData);
            }
    });
}
const createTemplateOptions = projectData => {
    return inquirer.prompt([
        {
            type: 'rawlist',
            name: 'createOptions',
            message: 'Would you like to choose a template or create your files by yourself?',
            choices: ['Create it Yourself', 'Create and Choose', 'Choose']
        },
        {
            type: 'confirm',
            name: 'confirmCreateChoice',
            message: 'Are you sure you want to choose this?',
            default: false
        }
    ])
    .then(createTemplateOption => {
        if(createTemplateOption.confirmCreateChoice){
            projectData.createOption = createTemplateOption.createOptions;
            console.log(projectData);
            return projectData;
        } else {
            createTemplateOptions(projectData);
        }
    })
    .then(projectData => {
        if(projectData.createOption === 'Create it Yourself'){
            fs.mkdir('./'+projectData.website+'/', err => {
                if(err) throw err;
            });
            process.chdir(projectData.website);
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
            console.log('Made website folders.');
        } else if(projectData.createOption === 'Create and Choose'){
            createAndChooseTemplate(projectData);
        } else if(projectData.createOption === 'Choose'){
            chooseTemplates(projectData);
        }
    });
}
const createAndChooseTemplate = projectData => {
    return inquirer.prompt([
        {
            type: 'checkbox',
            name: 'chosenTemplates',
            message: 'You chose to create at least one file, but you also want choose at least one template. Choose the type of file of said template(s). You can only choose up to two.',
            choices: ['JavaScript', 'HTML', 'CSS']
        },
        {
            type: 'confirm',
            name: 'confirmChosenTemplates',
            message: 'Are you sure you want these templates?',
            default: false
        }
    ])
    .then(theTemplates => {
        if(theTemplates.confirmChosenTemplates){
            projectData.chosenTemplates = theTemplates.chosenTemplates;
            finishTemplateSelection(projectData);
        } else {
            console.log('Recalling list...');
            createAndChooseTemplate(projectData);
        }
    })
};

const finishTemplateSelection = projectData => {
    console.log(projectData);
    // let chosenLength = theTemplates.chosenTemplates.length;
    // if(chosenLength > 2){
    //     console.log('You selected all options. Redirecting website creation path...');
    //     chooseTemplates(projectData);
    // }
    // else{
    //     return theTemplates;
    // }
    // for(let i = 0; i < chosenLength; i++){
    //     if(theTemplates.chosenTemplates[i] === 'JavaScript'){
    //         console.log('You chose JavaScript');
    //     }
    //     if(theTemplates.chosenTemplates[i] === 'CSS'){
    //         console.log('You chose CSS');
    //     }
    //     if(theTemplates.chosenTemplates[i]==='HTML'){
    //         console.log('You chose HTML');
    //     }
    // }
}

const chooseTemplates = projectData =>{
    console.log('All options were chosen');
}
promptUser()
    .then(promptProjectName)
    .then(createTemplateOptions)