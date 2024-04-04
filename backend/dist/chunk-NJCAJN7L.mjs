import {
  BadRequest
} from "./chunk-UIM3BSHB.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/check-in.ts
import z from "zod";
async function checkIn(app) {
  app.withTypeProvider().get("/attendees/:attendeeId/check-in", {
    schema: {
      summary: "Check-in a event",
      tags: ["check-ins"],
      params: z.object({
        attendeeId: z.coerce.number().int()
      }),
      response: {
        201: z.null()
      }
    }
  }, async (request, reply) => {
    const { attendeeId } = request.params;
    const attendeeCheckIn = await prisma.checkIn.findUnique({
      where: {
        attendeeId
      }
    });
    if (attendeeCheckIn !== null) {
      throw new BadRequest("Attendee already checked in the event");
    }
    await prisma.checkIn.create({
      data: {
        attendeeId
      }
    });
    return reply.status(201).send();
  });
}

export {
  checkIn
};
