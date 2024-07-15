// object
class Car {
  constructor({ name = "Ford Ranger 2023", door = 4, price = "10000 USD", customerInfo = {} }) {
    this.name = name;
    this.door = door;
    this.price = price;
    this.customerInfo = customerInfo;
  }
}
// service
class ServiceLogistics {
  transportClass = Car;
  getTransport = (customerInfo) => {
    return new this.transportClass(customerInfo);
  };
}

const carService = new ServiceLogistics();
console.log(
  "CarService: ",
  carService.getTransport({ customerInfo: { name: "Duc Van", cargoVolume: "100 kg" } })
);

// option 1
class Truck {
  constructor({ name = "Container 2023", door = 16, price = "100000 USD", customerInfo = {} }) {
    this.name = name;
    this.door = door;
    this.price = price;
    this.customerInfo = customerInfo;
  }
}

carService.transportClass = Truck;
console.log(
  "TruckService: ",
  carService.getTransport({ customerInfo: { name: "Kieu Nhi", cargoVolume: "50 kg" } })
);

// option 2
class TruckService extends ServiceLogistics {
  transportClass = Truck;
}

const truckService = new TruckService();
console.log(
  "TruckService::Class::: ",
  carService.getTransport({ customerInfo: { name: "Tan Vu", cargoVolume: "70 kg" } })
);
