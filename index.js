#!/usr/bin/env node
import inquirer from "inquirer";
;
let users = [
    { userID: "Shaheer",
        userPin: 2008,
    },
    {
        userID: "Shahan",
        userPin: 2017,
    },
    {
        userID: "Hassan",
        userPin: 2019,
    },
];
let balance = Math.floor((Math.random() * 100000));
let answers1;
let answers2;
startLoop();
async function startLoop() {
    await getUserID();
    do {
        await getTransaction();
        var again = await inquirer.prompt([
            {
                type: "list",
                name: "restart",
                choices: ['Yes', 'No'],
                message: "DO YOU WANT TO CONTINUE :",
            }
        ]);
    } while (again.restart == 'Yes');
}
async function getUserID() {
    answers1 = await inquirer.prompt([
        {
            type: "input",
            name: "userID",
            message: "Please enter your User ID :"
        },
        {
            type: "input",
            name: "userPin",
            message: "Please enter your UserPin :"
        },
    ]);
    await checkUserID(answers1.userID, answers1.userPin);
}
async function checkUserID(userID, userPin) {
    let condition = false;
    for (let i = 0; i < users.length; i++) {
        if (userID === users[i].userID && userPin === users[i].userPin) {
            condition = true;
            break;
        }
    }
    if (condition) {
        console.log(`Invalid userID or PIN.Try Again !.`);
        await getUserID();
    }
}
async function getTransaction() {
    answers2 = await inquirer.prompt([
        {
            type: "list",
            name: "accountType",
            choices: ["Current", "Saving"],
            message: "Please Select Account Type:"
        },
        {
            type: "list",
            name: "transType",
            choices: ["Fast Cash", "Withdraw"],
            message: "Please Select Transaction Type:",
        },
        {
            type: "list",
            name: "amount",
            choices: [5000, 10000, 15000, 20000, 25000],
            message: `Please Select Your Amount (Current Balance is ${balance}): `,
            when(answers2) {
                return answers2.transType == "Fast Cash";
            }
        },
        {
            type: "input",
            name: "amount",
            message: `Please Select Your Amount (Current Balance is ${balance}): `,
            when(answers2) {
                return answers2.transType == "Withdraw";
            }
        }
    ]);
    if (answers1.userID && answers1.userPin) {
        if (answers2.amount <= balance) {
            if (answers2.amount <= balance) {
                balance -= answers2.amount;
                console.log(`Your Current Balance Is :${balance}`);
            }
            else {
                console.log(`Insifficiant Balance ${balance}`);
            }
        }
    }
}
