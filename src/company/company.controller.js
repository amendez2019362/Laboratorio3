import { response, request } from "express";
import Company from "./company.model.js";
import excel from 'excel4node';

export const companyPost = async (req, res) => {
    try {
        const { name, impact, category, years, } = req.body;
        const userId = req.user._id;
        const company = new Company({ name, impact, category, years, userId });
        const message = (`The company ${name} was added`)

        company.save();

        res.status(200).json({
            message
        });

    } catch (e) {

        console.log("Errors in the require")
        console.log(e)

    }
}

export const companyPut = async (req, res) => {
    try {
        const { __v, _id, status, name, ...rest } = req.body;

        const company = await Company.findOne({ name });

        if (!company) {
            return res.status(404).json({
                msg: 'Company not found..'
            });
        }

        if (!company.status) {
            return res.status(404).json({
                msg: 'company not found.'
            });
        }

        Object.assign(company, rest);

        await company.save();

        res.status(200).json({
            msg: 'Updated successfully'
        });

    } catch (e) {
        console.error(e)
        res.status(500).json({
            msg: 'Error processing request'
        });
    }
}

export const getCompanyByYear = async (req, res) => {
    try {

        let { startYear, endYear } = req.query;

        if (!startYear) {
            startYear = endYear;
        };

        if (!endYear) {
            endYear = startYear;
        };

        const query = {
            years: {
                $gte: startYear,
                $lte: endYear
            }
        };

        const company = await Company.find(query).exec();

        res.status(200).json({
            company
        });

    } catch (e) {
        res.status(500).json({
            msg: error.msg
        });

    }
}

export const getCompanyAZ = async (req, res) => {

    try {

        const company = await Company.find().sort({ name: 1 });
        res.status(200).json(company);

    } catch (e) {
        console.error("Could not sort:", e)
        res.status(500).json({ error: "Internal Server Error" })
    };
}

export const getCompanyZA = async (req, res) => {

    try {
        const company = await Company.find().sort({ name: -1 });
        res.status(200).json(
            company
        );

    } catch (e) {
        console.error("Could not sort:", e)
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export const getCompanyByCategory = async (req, res) => {

    try {

        let { category } = req.query;
        const company = await Company.find({ category });

        res.status(200).json({
            msg: `Companies with Category ${category}:`,
            company,

        });

    } catch (e) {
        console.error("Company category not found:", e)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const generateExcelReport = async (req, res) => {
    try {
        const company = await Company.find();
        const wb = new excel.Workbook();
        const ws = wb.addWorksheet('Company Report');

        const headers = ['Name', 'Impact', 'Category', 'Years'];
        headers.forEach((header, index) => {
            ws.cell(1, index + 1).string(header);
        });

        company.forEach((company, rowIndex) => {
            ws.cell(rowIndex + 2, 1).string(company.name);
            ws.cell(rowIndex + 2, 2).string(company.impact);
            ws.cell(rowIndex + 2, 3).string(company.category);
            ws.cell(rowIndex + 2, 4).number(company.years);
        });

        const buffer = await wb.writeToBuffer();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Companies_Report.xlsx');

        res.send(buffer);

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}