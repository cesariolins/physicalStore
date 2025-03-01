"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cepValidation_1 = require("../models/cepValidation");
const router = express_1.default.Router();
router.get('/lojas', cepValidation_1.cepValidation);
exports.default = router;
