import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_routes/bad-request";

export async function getEventAttendees(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/events/:eventId/attendees', {
        schema: {
            summary: 'Get event attendees',
            tags: ['events'],
            params: z.object({
                eventId: z.string().uuid(),
            }),
            querystring: z.object({
                query: z.string().nullish(),
                pageIndex: z.string().nullable().default('0').transform(Number)
            }),
            response: {
                200: z.object({
                    attendees: z.array(
                        z.object(({
                            id: z.number(),
                            nome: z.string(),
                            email: z.string().email(),
                            createdAt: z.date(),
                            checkedInAt: z.date().nullable()
                        }))
                    )
                })
            }

        }
    }, async (request, reply) => {
        const { eventId } = request.params
        const { pageIndex, query } = request.query

        const attendees = await prisma.attendee.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                createdAt: true,
                checkIn: {
                    select: {
                        createdAt: true
                    }
                }

            },
            where: query ? { eventId: eventId, nome: { contains: query } } : { eventId: eventId },
            take: 10,
            skip: pageIndex * 10,
            orderBy: {
                createdAt: 'desc'
            }
        })

        if (attendees === null) {
            throw new BadRequest("No attendees found")
        }

        return reply.send({
            attendees: attendees.map((attendee) => {
                return {
                    id: attendee.id,
                    nome: attendee.nome,
                    email: attendee.email,
                    createdAt: attendee.createdAt,
                    checkedInAt: attendee.checkIn?.createdAt ?? null,
                }
            })
        })
    })
}