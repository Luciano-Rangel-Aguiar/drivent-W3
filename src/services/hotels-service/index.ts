import { notFoundError, paymentRequiredError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if(!enrollment) {
    throw notFoundError;
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if(!ticket) {
    throw notFoundError;
  }

  if(ticket.status ===  "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw paymentRequiredError;
  }

  const hotels = await hotelRepository.findHotels();
  
  if(hotels.length === 0) {
    throw notFoundError;
  }

  return hotels;
}

async function getHotelWhitRooms(userId: number, hotelId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if(!enrollment) {
    throw notFoundError;
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if(!ticket) {
    throw notFoundError;
  }

  if(ticket.status ===  "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw paymentRequiredError;
  }

  const hotel = await hotelRepository.findRoomsByHotelId(hotelId);
  
  if(hotel.Rooms.length === 0) {
    throw notFoundError;
  }

  return hotel;
}

const hotelService = {
  getHotels,
  getHotelWhitRooms
};

export default hotelService;
