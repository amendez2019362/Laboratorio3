import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from '../middlewares/validate-fields.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { existenCompany } from "../helpers/db-validators.js";
import { companyPost, companyPut, generateExcelReport, getCompanyAZ, getCompanyByCategory, getCompanyByYear, getCompanyZA } from "./company.controller.js";

const router = Router();

router.post(
    "/",
    [
        validateJWT,
        check("name", "Required name company").not().isEmpty(),
        check("name").custom(existenCompany),
        check("impact", "Required field").not().isEmpty(),
        check("category", "Required field").not().isEmpty(),
        check("years", "Years of the company").not().isEmpty(),
        validateFields
    ], companyPost
);

router.put(
    "/",
    [
        validateJWT,
        check("name", "Required name company").not().isEmpty(),
        check("impact", "Required field").not().isEmpty(),
        check("category", "Required field").not().isEmpty(),
        check("years", "The years of the company are required").not().isEmpty(),
        validateFields
    ], companyPut
);

router.get(
    "/years",
    validateJWT,
    getCompanyByYear
);

router.get(
    "/A-Z",
    validateJWT,
    getCompanyAZ
);

router.get(
    "/Z-A",
    validateJWT,
    getCompanyZA
);

router.get(
    "/category",
    validateJWT,
    getCompanyByCategory
);

router.get(
    "/report",
    validateJWT,
    generateExcelReport
);

export default router;