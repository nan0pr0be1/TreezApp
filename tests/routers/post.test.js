const request = require("supertest");
const app = require("../../app");
describe("Post Inventory", () => {
  it("should create a new post",  async () => {
    await request(app)
      .post("/inventories/")
      .send({
        name: "testname",
        description: "desc",
        priceInCents: "3435",
        quantity: "343"
      })
      .expect("Content-Type", /json/)
      .expect(201);
    
  });
});

describe("Post Order", () => {
  it("should create a new post", async () => {
    await request(app)
      .post("/orders/")
      .send({
        email: "testfF@gmail.com",
        orderDate: "2020 Jan 23",
        orderStatus: "Recieved",
        inventories: [
          {
            name: "name",
            description: "desc",
            priceInCents: 245,
            quantity: 22,
            _id: "5e2a7e9d8411523ca77e35f6",
            __v: 0
          },
          {
            name: "name1",
            description: "desc1",
            priceInCents: 24,
            quantity: 3,
            _id: "5e2a7f0d0ca3233cd98cd386",
            __v: 0
          }
        ]
      })
      .expect("Content-Type", /json/)
      .expect(201);
  });
});

