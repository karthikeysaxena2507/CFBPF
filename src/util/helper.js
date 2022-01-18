const data = require("./data");

const getMonthlyIncome = (income, frequency) => {
    let monthlyIncome = income;
    switch(frequency) {
        case data.frequencies[1]: // WEEKLY
            monthlyIncome = Math.floor((income * 52) / 12);
            break;
        case data.frequencies[2]: // FORTNIGHTLY
            monthlyIncome = Math.floor((income * 26) / 12);
            break;
        case data.frequencies[3]: // ANNUALLY
            monthlyIncome = Math.floor(income / 12);
            break;
        default:
    }
    return Number(monthlyIncome);
}

export {
    getMonthlyIncome
}