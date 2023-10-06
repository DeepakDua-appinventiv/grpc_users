import express from "express";
import { GrpcClass } from "./GrpcClass";
import * as grpc from "@grpc/grpc-js";

const app = express();
const port = 3001;

app.get("/getUser", async (req, res) => {
  res.send({uid: "u1", name: "Deepak"});
});

app.get("/getProduct", async (req, res) => {
  console.log("gp called")
  const gp = new GetProduct();
  const data = await gp.getProduct();
  res.send(data);
});

const server = new grpc.Server();

class GetProduct extends GrpcClass {
  private service!: any;
  constructor() {
    super("product.proto", "product");
    this.loadService();
  }

  loadService() {
    this.service = new this.package.ProductService(
      "0.0.0.0:7000",
      grpc.credentials.createInsecure()
    );
  }

   async getProduct() {
    try {
      const data = await new Promise((resolve, reject) => {
        this.service.GetProduct(null, (err, response) => {
          if (err) {
            console.log(err)

            reject(err);
          } else {
            console.log(response)
            resolve(response);
          }
        });
      });
      return data
    } catch (err) {
      return err;
    }
  }
}

app.listen(port, () => {
  console.log(`API Gateway is running on http://localhost:${port}`);
});
