import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/a';
import { AddressBookServiceHandlers } from './proto/AddressBookService';
import { Status } from '@grpc/grpc-js/build/src/constants';

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, '../src/a.proto')
);

const personProto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

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

const server = new grpc.Server(); //creating a grpc server

const handler: AddressBookServiceHandlers = {
  AddPerson: (call, callback) => {
    //call is similar to request and callback is similar to response.json()
    let person = {
      name: call.request.name,
      age: call.request.age,
    };
    PERSONS.push(person);
    callback(null, person); //first argument is error and second is response
  },
  GetPersonByName: (call, callback) => {
    let person = PERSONS.find((x) => x.name === call.request.name);
    if (person) {
      callback(null, person);
    } else {
      callback(
        {
          code: Status.NOT_FOUND,
          details: 'not found',
        },
        null
      );
    }
  },
};

//here, we attach the above function as a service to the server
server.addService(personProto.AddressBookService.service, handler);

//binding the server to a port
server.bindAsync(
  '0.0.0.0:50051',
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
