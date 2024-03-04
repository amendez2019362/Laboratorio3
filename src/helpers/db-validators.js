import Company from "../company/company.model.js";

export const existenCompany = async (name = '') => {
    const existenCompany = await Company.findOne({ name });
    if (existenCompany) {
        throw new Error(`Business with name ${name} already exists on DB`);
    }
}