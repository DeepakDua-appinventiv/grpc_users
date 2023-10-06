"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GrpcClass_1 = require("./GrpcClass");
const grpc = __importStar(require("@grpc/grpc-js"));
const app = (0, express_1.default)();
const port = 3001;
app.get("/getUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ uid: "u1", name: "Deepak" });
}));
app.get("/getProduct", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("gp called");
    const gp = new GetProduct();
    const data = yield gp.getProduct();
    res.send(data);
}));
const server = new grpc.Server();
class GetProduct extends GrpcClass_1.GrpcClass {
    constructor() {
        super("product.proto", "product");
        this.loadService();
    }
    loadService() {
        this.service = new this.package.ProductService("0.0.0.0:7000", grpc.credentials.createInsecure());
    }
    getProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield new Promise((resolve, reject) => {
                    this.service.GetProduct(null, (err, response) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        else {
                            console.log(response);
                            resolve(response);
                        }
                    });
                });
                return data;
            }
            catch (err) {
                return err;
            }
        });
    }
}
app.listen(port, () => {
    console.log(`API Gateway is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map