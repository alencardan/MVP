import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  getFoods,
  getFoodById,
  createFood,
  updateFoodStatus,
  createReservation,
  getReservationsByReceiver,
  getReservationsByFood,
  updateReservationStatus,
  getUserCredits,
  initializeUserCredits,
  updateUserCredits,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Food management
  foods: router({
    list: publicProcedure
      .input(
        z.object({
          category: z.string().optional(),
          status: z.string().optional(),
        })
      )
      .query(async ({ input }) => {
        return await getFoods({
          category: input.category,
          status: input.status,
        });
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getFoodById(input.id);
      }),

    create: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          description: z.string().optional(),
          category: z.string(),
          quantity: z.string(),
          expiryDate: z.date().optional(),
          location: z.string(),
          latitude: z.string().optional(),
          longitude: z.string().optional(),
          imageUrl: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.userType !== "donor" && ctx.user?.role !== "admin") {
          throw new Error("Only donors can create food listings");
        }

        const food = await createFood({
          donorId: ctx.user.id,
          name: input.name,
          description: input.description,
          category: input.category,
          quantity: input.quantity,
          expiryDate: input.expiryDate,
          location: input.location,
          latitude: input.latitude,
          longitude: input.longitude,
          imageUrl: input.imageUrl,
          status: "available",
        });

        // Award credits for donation
        const credits = await getUserCredits(ctx.user.id);
        if (credits) {
          await updateUserCredits(ctx.user.id, {
            credits: credits.credits + 10,
            foodsDonated: credits.foodsDonated + 1,
            impactScore: credits.impactScore + 10,
          });
        }

        return food;
      }),

    updateStatus: protectedProcedure
      .input(
        z.object({
          foodId: z.number(),
          status: z.enum(["available", "reserved", "donated", "expired"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const food = await getFoodById(input.foodId);
        if (!food) throw new Error("Food not found");
        if (food.donorId !== ctx.user?.id && ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }

        await updateFoodStatus(input.foodId, input.status);
        return { success: true };
      }),

    myListings: protectedProcedure.query(async ({ ctx }) => {
      return await getFoods({ donorId: ctx.user?.id });
    }),
  }),

  // Reservations
  reservations: router({
    create: protectedProcedure
      .input(z.object({ foodId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.userType !== "receiver" && ctx.user?.role !== "admin") {
          throw new Error("Only receivers can make reservations");
        }

        const food = await getFoodById(input.foodId);
        if (!food) throw new Error("Food not found");
        if (food.status !== "available") throw new Error("Food not available");

        const reservation = await createReservation({
          foodId: input.foodId,
          receiverId: ctx.user.id,
          status: "pending",
        });

        // Update food status
        await updateFoodStatus(input.foodId, "reserved");

        return reservation;
      }),

    getMyReservations: protectedProcedure.query(async ({ ctx }) => {
      return await getReservationsByReceiver(ctx.user?.id || 0);
    }),

    updateStatus: protectedProcedure
      .input(
        z.object({
          reservationId: z.number(),
          status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const reservations = await getReservationsByReceiver(ctx.user?.id || 0);
        const reservation = reservations.find(r => r.id === input.reservationId);

        if (!reservation) throw new Error("Reservation not found");

        await updateReservationStatus(input.reservationId, input.status);

        // Award credits when reservation is completed
        if (input.status === "completed") {
          const credits = await getUserCredits(ctx.user?.id || 0);
          if (credits) {
            await updateUserCredits(ctx.user?.id || 0, {
              credits: credits.credits + 5,
              foodsReceived: credits.foodsReceived + 1,
              impactScore: credits.impactScore + 5,
            });
          }

          // Update food status
          const food = await getFoodById(reservation.foodId);
          if (food) {
            await updateFoodStatus(reservation.foodId, "donated");
          }
        }

        return { success: true };
      }),
  }),

  // User credits and gamification
  credits: router({
    getMyCredits: protectedProcedure.query(async ({ ctx }) => {
      let credits = await getUserCredits(ctx.user?.id || 0);
      if (!credits) {
        credits = await initializeUserCredits(ctx.user?.id || 0);
      }
      return credits;
    }),

    getLeaderboard: publicProcedure.query(async ({ ctx }) => {
      // This is a simplified version - in production you'd want pagination
      const allFoods = await getFoods({ status: "donated" });
      return allFoods.slice(0, 10);
    }),
  }),
});

export type AppRouter = typeof appRouter;
