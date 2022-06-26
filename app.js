const inquirer = require('inquirer');
const process = require('process');
const fs = require('fs');
const npm = require('npm-commands');

// begining function
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
// second to first function that is called
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
                promptProjectName(ownerData);
            }
    });
}
// const createTemplateOptions = projectData => {
//     return inquirer.prompt([
//         {
//             type: 'rawlist',
//             name: 'createOptions',
//             message: 'Would you like to choose a template or create your files by yourself?',
//             choices: ['Create it Yourself', 'Choose']
//         },
//         {
//             type: 'confirm',
//             name: 'confirmCreateChoice',
//             message: 'Are you sure you want to choose this?',
//             default: false
//         }
//     ])
//     .then(createTemplateOption => {
//         if(createTemplateOption.confirmCreateChoice){
//             projectData.createOption = createTemplateOption.createOptions;
//             console.log(projectData);
//             return projectData;
//         } else {
//             createTemplateOptions(projectData);
//         }
//     })
//     .then(projectData => {
//         if(projectData.createOption === 'Create it Yourself'){
//             fs.mkdir('./'+projectData.website+'/', err => {
//                 if(err) throw err;
//             });
//             process.chdir(projectData.website);
//             fs.mkdir('./assets/', err => {
//                 if(err) throw err;
//             });
//             process.chdir('assets');
//             fs.mkdir('./js/', err=>{
//                 if(err) throw err;
//             });
//             fs.mkdir('./css/', err=>{
//                 if(err) throw err;
//             });
//             fs.mkdir('./website-imgs/', err=>{
//                 if(err) throw err;
//             });
//             console.log('Made website folders.');
//         } else if(projectData.createOption === 'Choose'){
//             chooseTemplates(projectData);
//         }
//     });
// }

// third to first function called
const chooseTemplates = projectData =>{;
    return inquirer.prompt([
        {
            type: 'rawlist',
            name: 'templateType',
            message: 'Choose a template type.',
            choices: ['default', 'custom']
        },
        {
            type: 'confirm',
            name: 'confirmTemplate',
            message: 'Are you sure you want this template type?',
            default: false
        }
    ])
    .then(templateTypeData=>{
        if(templateTypeData.confirmTemplate){
            projectData.template = templateTypeData.templateType;
            if(templateTypeData.templateType === 'custom'){
                customTemplate(projectData);
            } else if(templateTypeData.templateType === 'default'){
                defaultTemplate(projectData);
            }
        } else {
            chooseTemplates(projectData);
        }
    });
}

///// types of templates
// custom template function
const customTemplate = projectData => {
    return inquirer.prompt([
        {
            type: 'rawlist',
            name: 'customType',
            message: 'You chose the custom template! Do you want to make a create story-outline website, create story-website, or create full website?',
            choices: ['outline', 'story', 'full']
        },
        {
            type: 'confirm',
            name: 'confirmCustomType',
            message: 'Are you sure?',
            default: false
        }
    ])
    .then(customTypeData => {
        if(customTypeData.confirmCustomType){
            if(customTypeData.customType === 'outline'){
                projectData.websiteType = 'outline';
            } else if (customTypeData.customType === 'story'){
                projectData.websiteType = 'story';
            } else if (customTypeData.customType === 'full'){
                projectData.websiteType = 'full';
            }
            nameFilesCustom(projectData);
        } else {
            customTemplate(projectData);
        }
    });
}

// default template function
const defaultTemplate = projectData => {
    return inquirer.prompt([
        {
            type: 'rawlist',
            name: 'defaultType',
            message: 'You chose the default template! Do you want to make a create story-outline website, create story-website, or create full website?',
            choices: ['outline', 'story', 'full']
        },
        {
            type: 'confirm',
            name: 'confirmDefaultType',
            message: 'Are you sure?',
            default: false
        }
    ])
    .then(defaultTypeData => {
        if(defaultTypeData.confirmDefaultType){
            if(defaultTypeData.defaultType === 'outline'){
                projectData.websiteType = 'outline';
            } else if (defaultTypeData.defaultType === 'story'){
                projectData.websiteType = 'story';
            } else if (defaultTypeData.defaultType === 'full'){
                projectData.websiteType = 'full';
            }
            nameFiles(projectData);
        } else {
            defaultTemplate(projectData);
        }
    });
}

/////
// name custom files function
const nameFilesCustom = projectData => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'jsFileName',
            message: 'Name your JavaScript file. Do not worry about the .js part, we will add that ourselves.'
        },
        {
            type: 'input',
            name: 'cssFileName',
            message: 'Name your CSS file. Do not worry about the .css part.'
        },
        {
            type: 'confirm',
            name: 'confirmFileNames',
            message: 'Look over the names you typed. Are you sure this is what you want?',
            default: true
        }
    ])
    .then(fileNameData => {
        if(fileNameData.confirmFileNames){
            projectData.jsFileName = fileNameData.jsFileName;
            projectData.cssFileName = fileNameData.cssFileName;
            chooseFileDirectory(projectData);
        } else {
            nameFilesCustom(projectData);
        }
    })
}
// name files function
const nameFiles = projectData => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'jsFileName',
            message: 'Name your JavaScript file. Do not worry about the .js part, we will add that ourselves.'
        },
        {
            type: 'input',
            name: 'cssFileName',
            message: 'Name your CSS file. Do not worry about the .css part.'
        },
        {
            type: 'input',
            name: 'htmlFileName',
            message: 'Name your html file. Do not worry about the .html part. *Note: this is not for the index.html.'
        },
        {
            type: 'confirm',
            name: 'confirmFileNames',
            message: 'Look over the names you typed. Are you sure this is what you want?',
            default: true
        }
    ])
    .then(fileNameData => {
        if(fileNameData.confirmFileNames){
            projectData.jsFileName = fileNameData.jsFileName;
            projectData.cssFileName = fileNameData.cssFileName;
            projectData.htmlFileName = fileNameData.htmlFileName;
            chooseFileDirectory(projectData);
        } else {
            nameFiles(projectData);
        }
    })
}

const chooseFileDirectory = projectData => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'dir',
            message: 'Enter a save path. *Note: typically you would start off with "C:", but this may not always be the case.'
        },
        {
            type: 'confirm',
            name: 'confirmDir',
            message: 'Double check to make sure this is the correct directory. Do you wish to continue?'
        }
    ])
    .then(dirData => {
        if(dirData.confirmDir){
            if(dirData.dir.includes('\\')){
                const search = '\\';
                const replaceWith = '/';
                projectData.fileDir = dirData.dir.split(search).join(replaceWith);
            }
            if(projectData.template === 'custom'){
                createCustomFiles(projectData);
            } else {
                continueCreating(projectData);
            }
        }
    })
}

// const chooseFileTypes = projectData =>{
//     return inquirer.prompt([
//         {
//             type: 'checkbox',
//             name: 'chosenTemplates',
//             message: 'Choose the type of file of the template you want.',
//             choices: ['JavaScript', 'HTML', 'CSS']
//         },
//         {
//             type: 'confirm',
//             name: 'confirmChosenTemplates',
//             message: 'Are you sure you want these templates?',
//             default: false
//         }
//     ])
//     .then(fileData => {
//         projectData.fileTypes = [];
//         let chosenLength = fileData.chosenTemplates.length
//         for(let i = 0; i < chosenLength; i++){
//             if(fileData.chosenTemplates[i]==='JavaScript'){
//                 projectData.fileTypes.push(projectData.template+'.js');
//             } else if (fileData.chosenTemplates[i] === 'HTML'){
//                 projectData.fileTypes.push(projectData.template+'.html');
//             } else if (fileData.chosenTemplates[i] === 'CSS'){
//                 projectData.fileTypes.push(projectData.template+'.css');
//             }
//         }
//         console.log(projectData);
//         console.log(projectData.fileTypes);
//     });
// }
promptUser()
    .then(promptProjectName)
    .then(chooseTemplates)