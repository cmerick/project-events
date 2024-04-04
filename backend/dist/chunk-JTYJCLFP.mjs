import {
  BadRequest
} from "./chunk-UIM3BSHB.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/register-for-event.ts
import { z } from "zod";
async function registerForEvent(app) {
  app.withTypeProvider().post("/events/:eventId/attendees", {
    schema: {
      summary: "Register in a event",
      tags: ["attendees"],
      body: z.object({
        nome: z.string().min(4),
        email: z.string().email()
      }),
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        201: z.object({
          attendeeId: z.number()
        })
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const {
      nome,
      email
    } = request.body;
    const attendeeFromEmail = await prisma.attendee.findUnique({
      where: {
        eventId_email: {
          email,
          eventId
        }
      }
    });
    if (attendeeFromEmail !== null) {
      throw new BadRequest("This email is already registered for this event");
    }
    const [ammountOfAttendeesForEvent, event] = await Promise.all([
      prisma.attendee.count({
        where: {
          eventId
        }
      }),
      prisma.event.findUnique({
        where: {
          id: eventId
        }
      })
    ]);
    if (event?.maximumAttendees && ammountOfAttendeesForEvent >= event?.maximumAttendees) {
      throw new Error("This event has exceeded the maximum number of participants");
    }
    const attendee = await prisma.attendee.create({
      data: {
        nome,
        email,
        eventId
      }
    });
    return reply.status(201).send({ attendeeId: attendee.id });
  });
}

export {
  registerForEvent
};
