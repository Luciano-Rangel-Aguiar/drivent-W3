import { prisma } from "@/config";
import faker from "@faker-js/faker";

export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    }
  });
}

export async function createRoomWithHotelId(hotelId: number) {
  return await prisma.room.create({
    data: {
      name: faker.datatype.number({ min: 1, max: 300 }).toString(),
      capacity: faker.datatype.number({ min: 1, max: 5 }),
      hotelId: hotelId,
    }
  });
}
