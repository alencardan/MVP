import { mockDataStore } from "./mockData";

// User functions
export async function upsertUser(user: any): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const existing = mockDataStore.getUserByOpenId(user.openId);
  if (!existing) {
    mockDataStore.addUser({
      openId: user.openId,
      name: user.name || null,
      email: user.email || null,
      loginMethod: user.loginMethod || null,
      userType: user.userType || "receiver",
      role: user.role || "user",
      organizationName: user.organizationName || null,
      phone: user.phone || null,
      address: user.address || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    });
  }
}

export async function getUserByOpenId(openId: string) {
  return mockDataStore.getUserByOpenId(openId);
}

// Food queries
export async function getFoods(filters?: { category?: string; status?: string; donorId?: number }) {
  return mockDataStore.getFoods(filters);
}

export async function getFoodById(id: number) {
  return mockDataStore.getFoodById(id);
}

export async function createFood(data: any) {
  return mockDataStore.addFood({
    donorId: data.donorId,
    name: data.name,
    description: data.description || null,
    category: data.category,
    quantity: data.quantity,
    location: data.location,
    latitude: data.latitude || null,
    longitude: data.longitude || null,
    imageUrl: data.imageUrl || null,
    status: data.status || "available",
    expiryDate: data.expiryDate || null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export async function updateFoodStatus(foodId: number, status: string) {
  mockDataStore.updateFoodStatus(foodId, status);
}

// Reservation queries
export async function createReservation(data: any) {
  return mockDataStore.addReservation({
    foodId: data.foodId,
    receiverId: data.receiverId,
    status: data.status || "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export async function getReservationsByReceiver(receiverId: number) {
  return mockDataStore.getReservationsByReceiver(receiverId);
}

export async function getReservationsByFood(foodId: number) {
  return mockDataStore.getReservationsByFood(foodId);
}

export async function updateReservationStatus(reservationId: number, status: string) {
  mockDataStore.updateReservationStatus(reservationId, status);
}

// User credits queries
export async function getUserCredits(userId: number) {
  return mockDataStore.getUserCredits(userId);
}

export async function initializeUserCredits(userId: number) {
  return mockDataStore.initializeUserCredits(userId);
}

export async function updateUserCredits(userId: number, updates: any) {
  mockDataStore.updateUserCredits(userId, updates);
}
