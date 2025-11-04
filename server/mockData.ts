// Mock data store - all data is stored in memory
// This will be reset when the server restarts

export interface User {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  loginMethod: string | null;
  role: "user" | "admin";
  userType: "admin" | "donor" | "receiver";
  organizationName: string | null;
  phone: string | null;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastSignedIn: Date;
}

export interface Food {
  id: number;
  donorId: number;
  name: string;
  description: string | null;
  category: string;
  quantity: string;
  location: string;
  latitude: string | null;
  longitude: string | null;
  imageUrl: string | null;
  status: "available" | "reserved" | "donated" | "expired";
  expiryDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reservation {
  id: number;
  foodId: number;
  receiverId: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCredit {
  id: number;
  userId: number;
  credits: number;
  foodsDonated: number;
  foodsReceived: number;
  impactScore: number;
  createdAt: Date;
  updatedAt: Date;
}

class MockDataStore {
  private users: Map<number, User> = new Map();
  private foods: Map<number, Food> = new Map();
  private reservations: Map<number, Reservation> = new Map();
  private userCredits: Map<number, UserCredit> = new Map();
  private nextUserId = 1;
  private nextFoodId = 1;
  private nextReservationId = 1;
  private nextCreditId = 1;

  // Users
  addUser(user: Omit<User, "id">): User {
    const id = this.nextUserId++;
    const newUser = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  getUserByOpenId(openId: string): User | undefined {
    return Array.from(this.users.values()).find((u) => u.openId === openId);
  }

  getUserById(id: number): User | undefined {
    return this.users.get(id);
  }

  // Foods
  addFood(food: Omit<Food, "id">): Food {
    const id = this.nextFoodId++;
    const newFood = { ...food, id };
    this.foods.set(id, newFood);
    return newFood;
  }

  getFoodById(id: number): Food | undefined {
    return this.foods.get(id);
  }

  getFoods(filters?: { category?: string; status?: string; donorId?: number }): Food[] {
    let result = Array.from(this.foods.values());

    if (filters?.category) {
      result = result.filter((f) => f.category === filters.category);
    }
    if (filters?.status) {
      result = result.filter((f) => f.status === filters.status);
    }
    if (filters?.donorId) {
      result = result.filter((f) => f.donorId === filters.donorId);
    }

    return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  updateFoodStatus(foodId: number, status: string): void {
    const food = this.foods.get(foodId);
    if (food) {
      food.status = status as any;
      food.updatedAt = new Date();
    }
  }

  // Reservations
  addReservation(reservation: Omit<Reservation, "id">): Reservation {
    const id = this.nextReservationId++;
    const newReservation = { ...reservation, id };
    this.reservations.set(id, newReservation);
    return newReservation;
  }

  getReservationsByReceiver(receiverId: number): Reservation[] {
    return Array.from(this.reservations.values()).filter((r) => r.receiverId === receiverId);
  }

  getReservationsByFood(foodId: number): Reservation[] {
    return Array.from(this.reservations.values()).filter((r) => r.foodId === foodId);
  }

  updateReservationStatus(reservationId: number, status: string): void {
    const reservation = this.reservations.get(reservationId);
    if (reservation) {
      reservation.status = status as any;
      reservation.updatedAt = new Date();
    }
  }

  // User Credits
  getUserCredits(userId: number): UserCredit | undefined {
    return Array.from(this.userCredits.values()).find((c) => c.userId === userId);
  }

  initializeUserCredits(userId: number): UserCredit {
    const existing = this.getUserCredits(userId);
    if (existing) return existing;

    const id = this.nextCreditId++;
    const newCredit: UserCredit = {
      id,
      userId,
      credits: 0,
      foodsDonated: 0,
      foodsReceived: 0,
      impactScore: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.userCredits.set(id, newCredit);
    return newCredit;
  }

  updateUserCredits(userId: number, updates: Partial<Omit<UserCredit, "id" | "userId" | "createdAt" | "updatedAt">>): void {
    const credit = this.getUserCredits(userId);
    if (credit) {
      Object.assign(credit, updates);
      credit.updatedAt = new Date();
    }
  }
}

export const mockDataStore = new MockDataStore();
