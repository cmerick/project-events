import {
  registerForEvent
} from "./chunk-JTYJCLFP.mjs";
import {
  errorHandler
} from "./chunk-SRM3JHFM.mjs";
import {
  checkIn
} from "./chunk-NJCAJN7L.mjs";
import {
  createEvent
} from "./chunk-J77ZY3YV.mjs";
import "./chunk-4O7WQOKQ.mjs";
import {
  getAttendeeBadge
} from "./chunk-3XYNUQXM.mjs";
import {
  getEventAttendees
} from "./chunk-G3BYVBFD.mjs";
import {
  getEvent
} from "./chunk-2HV2IBHT.mjs";
import "./chunk-UIM3BSHB.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import fastify from "fastify";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xF5es da API para o back-end da aplica\xE7\xE3o pass.in contruida durante o NLW Unite",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running");
});
