import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors';

import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod'
import fastify from 'fastify';
import { createEvent } from './routes/create-event';
import { registerForEvent } from './routes/register-for-event';
import { getEvent } from './routes/get-event';
import { getAttendeeBadge } from './routes/get-attendee-badge';
import { checkIn } from './routes/check-in';
import { getEventAttendees } from './routes/get-event-attendees';
import { errorHandler } from './error-handler';



const app = fastify()

app.register(fastifyCors, {
    origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'pass.in',
            description: 'Especificações da API para o back-end da aplicação pass.in contruida durante o NLW Unite',
            version: '1.0.0',
        },
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
})

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.setErrorHandler(errorHandler)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
    console.log("HTTP server running")
})

function gerarSlug(texto: string): string {
    return texto
        .normalize('NFD') // Separa os acentos dos caracteres
        .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
        .replace(/[^a-zA-Z0-9 ]/g, '') // Remove os símbolos
        .trim() // Remove espaços do início e do fim
        .replace(/\s+/g, '-') // Substitui espaços por hífens
        .toLowerCase(); // Converte para minúsculas
}