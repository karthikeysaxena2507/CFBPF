const residencyStatuses = [
    "Australian Citizen",
    "Permanent Resident",
    "Temporary Visa",
    "NewZealand Citizen"
];

const livingStatuses = [
    "Owner without Mortgage",
    "Owner with Mortgage",
    "Renting But Own Property",
    "Renting",
    "Living with Parents",
    "Boarding",
];

const employmentStatuses = [
    "Full Time",
    "Part Time",
    "Self Employed",
    "Casual",
    "Contractor",
    "Unemployed",
    "Pension"
];

const employments = [
    "Full Time",
    "Part Time",
    "Self Employed",
    "Casual",
    "Contract"
]

const stateValues = [
    "NSW",
    "ACT",
    "NT",
    "SA",
    "TAS",
    "VIC",
    "WA",
    "QLD"
];

const relationshipStatuses = [
    "Married",
    "Single",
    "Widow",
    "Defacto",
    "Separated",
    "Divorced"
]

const frequencies = [
    "Monthly",
    "Weekly",
    "Fortnightly",
    "Annually"
]

const genderValues = [
    "Male", 
    "Female",
    "Other"
]

const loanRates = [];
for (let i = 0; i <= 50; i += 5) loanRates.push(i);

const count = [];
for (let i = 1; i <= 10; i++) count.push(i);

const scenarios = [
    "Prime",
    "Mid-Prime",
    "Sub-Prime/unfit",
    "Part 9 Debt"
];

const dataMap = new Map();
dataMap.set("Mid-Prime", {
    firstName: "Samuel",
    lastName: "Johnson",
    gender: "Male",
    streetNumber: 145,
    streetName: "Ann",
    streetType: "ST",
    suburb: "Brisbane City",
    state: "QLD",
    postCode: "4000"
});

dataMap.set("Sub-Prime/unfit", {
    firstName: "Penny",
    lastName: "White",
    gender: "Female",
    streetNumber: 17,
    streetName: "Lindsay",
    streetType: "CT",
    suburb: "Melton",
    state: "VIC",
    postCode: "3337"
});

dataMap.set("Prime", {
    firstName: "Dean",
    lastName: "Williams",
    gender: "Male",
    streetNumber: 167,
    streetName: "The Eesplanade",
    streetType: "ST",
    suburb: "Torquay",
    state: "VIC",
    postCode: "3228"
});

dataMap.set("Part 9 Debt", {
    firstName: "Carrie",
    lastName: "Lee",
    gender: "Female",
    streetNumber: 2,
    streetName: "Halton",
    streetType: "ST",
    suburb: "Balcatta",
    state: "WA",
    postCode: "6021"
});

const BACKEND_URL = "https://cf-brokerage.herokuapp.com";
// const BACKEND_URL = "http://localhost:9000";
const HASH_KEY = "Consumer Finance";

export {
    residencyStatuses,
    livingStatuses,
    employmentStatuses,
    stateValues,
    loanRates,
    relationshipStatuses,
    count,
    dataMap,
    genderValues,
    employments,
    frequencies,
    scenarios,
    BACKEND_URL,
    HASH_KEY
}