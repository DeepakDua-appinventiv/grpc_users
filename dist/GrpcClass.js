"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcClass = void 0;
const grpc_js_1 = require("@grpc/grpc-js");
const proto_loader_1 = require("@grpc/proto-loader");
const path_1 = __importDefault(require("path"));
const rxjs_1 = require("rxjs");
class GrpcClass {
    constructor(protoFileName, packageName) {
        this.loadProtoFile(protoFileName, packageName);
    }
    loadProtoFile(protoFileName, packageName) {
        console.log(__dirname, `../protos/product.proto`);
        const packageDef = (0, proto_loader_1.loadSync)(path_1.default.join(__dirname, `../protos/product.proto`));
        const grpcObject = (0, grpc_js_1.loadPackageDefinition)(packageDef);
        this.package = grpcObject[packageName];
    }
    invokeService(service, method, payload) {
        try {
            return new rxjs_1.Observable((subscriber) => {
                service[method](payload, (err, res) => {
                    if (err) {
                        subscriber.error(err);
                    }
                    else {
                        subscriber.next(res);
                    }
                });
            });
        }
        catch (err) {
            console.log("Error occurs ", err);
            throw err;
        }
    }
}
exports.GrpcClass = GrpcClass;
//# sourceMappingURL=GrpcClass.js.map