import path from 'path';
import * as grpc from '@grpc/grpc-js';
import { GrpcObject, ServiceClientConstructor } from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, '../src/a.proto')
);

const personProto = grpc.loadPackageDefinition(packageDefinition);

const PERSONS = [
  {
    name: 'harkirat',
    age: 45,
  },
  {
    name: 'raman',
    age: 45,
  },
];

//@ts-ignore
function addPerson(call, callback) { //call => similar to request | callback => similar to response.json()
  console.log(call);
  let person = {
    name: call.request.name,
    age: call.request.age,
  };
  PERSONS.push(person); //storing in an in-memory array
  callback(null, person); //sending back response. first argument is error and second is response
}

const server = new grpc.Server();

server.addService((personProto.AddressBookService as ServiceClientConstructor).service, { addPerson: addPerson });

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
});
