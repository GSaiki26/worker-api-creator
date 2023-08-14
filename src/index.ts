// Libs
import { readFileSync } from "fs";

import * as grpc from "@grpc/grpc-js";

import * as messages from "./proto/worker_pb";
import * as services from "./proto/worker_grpc_pb";

// Data
const CARDID = process.env.CARDID!;
const EMAIL = process.env.EMAIL!;
const FIRSTNAME = process.env.FIRSTNAME!;
const LASTNAME = process.env.LASTNAME!;

const creds = grpc.ChannelCredentials.createSsl(
  readFileSync("./certs/ca.pem"),
  readFileSync("./certs/client.pem.key"),
  readFileSync("./certs/client.pem"),
);

// Code
const client = new services.WorkerServiceClient("worker-api", creds);
const req = new messages.CreateReq()
  .setCardid(CARDID)
  .setEmail(EMAIL)
  .setFirstname(FIRSTNAME)
  .setLastname(LASTNAME);

// Do the request.
client.create(req, (err, res) => {
  if (err) {
    console.error("Couldn't complete the request. " + err);
    return;
  }

  console.info("OK\n" + JSON.stringify(res.toObject().data));
});
