'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import userRoutes from '../src/user/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import companyRoutes from '../src/company/company.routes.js';
import { dbConnection } from './mongo.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.viewUserPath = '/ControlEmpresas/v1/user/viewUser';
        this.loginPath = '/ControlEmpresas/v1/login';
        this.newCompanyPath = '/ControlEmpresas/v1/company/newCompany';
        this.editCompanyPath = '/ControlEmpresas/v1/company/editCompany';
        this.getCompanyByYear = '/ControlEmpresas/v1/company/getCompany';
        this.getCompanyAZ = '/ControlEmpresas/v1/company/getCompany';
        this.getCompanyZA = '/ControlEmpresas/v1/company/getCompany';
        this.getCompanyByCategory = '/ControlEmpresas/v1/company/getCompany'
        this.reportExcelPath = '/ControlEmpresas/v1/company';

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }

    routes(){
        this.app.use(this.viewUserPath, userRoutes);
        this.app.use(this.loginPath, authRoutes);
        this.app.use(this.newCompanyPath, companyRoutes);
        this.app.use(this.editCompanyPath, companyRoutes)
        this.app.use(this.getCompanyByYear, companyRoutes);
        this.app.use(this.getCompanyByCategory, companyRoutes); 
        this.app.use(this.getCompanyAZ, companyRoutes);
        this.app.use(this.getCompanyZA, companyRoutes);
        this.app.use(this.reportExcelPath, companyRoutes)
    }
}

export default Server;