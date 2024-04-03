import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import fastify from 'fastify';
import { createEvent } from './routes/create-event';
import { registerForEvent } from './routes/register-for-event';
import { getEvent } from './routes/get-event';
import { getAttendeeBadge } from './routes/get-attendee-badge';
import { checkIn } from './routes/check-in';
import { getEventAttendees } from './routes/get-event-attendees';



const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.listen({ port: 3333 }).then(() => {
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