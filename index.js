// Your code here
const createEmployeeRecord = (punchCard) => {

    let [firstName, familyName, title, payPerHour] = punchCard;

    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    }

}


const createEmployeeRecords = (employeeArray) => {
    let returnArray = [];
    employeeArray.forEach(employee => {
        returnArray.push(createEmployeeRecord(employee));
    });
    return returnArray;
}


const createTimeInEvent = (employeeObj, dateStamp) => {
    employeeObj.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10),
    })

    return employeeObj;
}


const createTimeOutEvent = (employeeObj, dateStamp) => {
    employeeObj.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10),
    })

    return employeeObj;
}


const hoursWorkedOnDate = (employeeObj, dateSpec) => {

    let inDay = employeeObj.timeInEvents.find(element => element.date === dateSpec);
    let outDay = employeeObj.timeOutEvents.find(element => element.date === dateSpec);

    return (outDay.hour - inDay.hour) / 100;

}


const wagesEarnedOnDate = (employeeObj, dateSpec) => {
    return hoursWorkedOnDate(employeeObj, dateSpec) * employeeObj.payPerHour;
}


const allWagesFor = (employeeObj) => {
    let wages = 0;
    employeeObj.timeInEvents.forEach(event => {
        wages += wagesEarnedOnDate(employeeObj, event.date);

    });
    return wages;
}


const calculatePayroll = (employeeArray) => {

    let payroll = 0;

    employeeArray.forEach(employee => {
        payroll += allWagesFor(employee);
    });

    return payroll;

}