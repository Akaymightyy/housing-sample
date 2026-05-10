import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const properties = [
  {
    title: "Luxury 5-Bedroom Detached Duplex in Lekki Phase 1",
    price: 350000000,
    location: "Lekki, Lagos",
    type: "sale",
    bedrooms: 5,
    bathrooms: 6,
    description: "An exquisite 5-bedroom detached duplex situated in the prestigious Lekki Phase 1. This property features modern architecture, spacious rooms, a swimming pool, well-manicured garden, boys' quarters, and 24/7 security. Located in a serene estate with excellent infrastructure and proximity to top schools, shopping malls, and restaurants.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop"
    ]),
    featured: true
  },
  {
    title: "Modern 3-Bedroom Apartment in Victoria Island",
    price: 45000000,
    location: "Victoria Island, Lagos",
    type: "sale",
    bedrooms: 3,
    bathrooms: 3,
    description: "A stunning 3-bedroom apartment in the heart of Victoria Island with breathtaking lagoon views. Fully furnished with premium finishes, modern kitchen, spacious living area, and access to gym, pool, and concierge services. Perfect for professionals seeking luxury living in Lagos' prime business district.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop"
    ]),
    featured: true
  },
  {
    title: "4-Bedroom Terrace Duplex for Rent in Ikoyi",
    price: 12000000,
    location: "Ikoyi, Lagos",
    type: "rent",
    bedrooms: 4,
    bathrooms: 4,
    description: "Elegantly designed 4-bedroom terrace duplex available for rent in the upscale Ikoyi neighborhood. Features include a modern kitchen, ample parking space, fitted wardrobes, prepaid meter, and 24/7 security. Located close to prime amenities including supermarkets, restaurants, and international schools.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
    ]),
    featured: true
  },
  {
    title: "Executive 6-Bedroom Mansion in Maitama, Abuja",
    price: 280000000,
    location: "Maitama, Abuja",
    type: "sale",
    bedrooms: 6,
    bathrooms: 7,
    description: "A grand 6-bedroom mansion in the prestigious Maitama district of Abuja. This property boasts luxurious finishes, a large compound with ample parking, swimming pool, modern kitchen, home office, gym room, and staff quarters. Located in a quiet, secure neighborhood with diplomatic missions nearby.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop"
    ]),
    featured: true
  },
  {
    title: "Spacious 3-Bedroom Flat in Gwarinpa, Abuja",
    price: 2500000,
    location: "Gwarinpa, Abuja",
    type: "rent",
    bedrooms: 3,
    bathrooms: 3,
    description: "A well-maintained 3-bedroom flat in the family-friendly Gwarinpa estate. Features include spacious rooms, modern kitchen with cabinets, POP ceiling, tiled floors, prepaid electricity, ample parking, and 24/7 security. Close to schools, mosques, churches, and shopping centers.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop"
    ]),
    featured: true
  },
  {
    title: "5-Bedroom Semi-Detached Duplex in Asokoro, Abuja",
    price: 180000000,
    location: "Asokoro, Abuja",
    type: "sale",
    bedrooms: 5,
    bathrooms: 5,
    description: "A beautiful 5-bedroom semi-detached duplex in the serene Asokoro district. Features include a modern kitchen, spacious bedrooms with en-suite bathrooms, family lounge, ample parking for 4 cars, boys' quarters, and landscaped gardens. Located near the ECOWAS secretariat and major embassies.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
    ]),
    featured: true
  },
  {
    title: "Modern 2-Bedroom Apartment in Ajah, Lagos",
    price: 1800000,
    location: "Ajah, Lagos",
    type: "rent",
    bedrooms: 2,
    bathrooms: 2,
    description: "A modern and affordable 2-bedroom apartment in the rapidly developing Ajah area. Features include fitted kitchen, spacious living area, POP ceiling, prepaid meter, and adequate water supply. Located close to the Lekki-Epe expressway with easy access to Lagos Island and Victoria Island.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop"
    ]),
    featured: false
  },
  {
    title: "4-Bedroom Bungalow in Akure, Ondo State",
    price: 35000000,
    location: "Akure, Ondo State",
    type: "sale",
    bedrooms: 4,
    bathrooms: 3,
    description: "A well-built 4-bedroom bungalow on a spacious plot of land in the quiet Alagbaka area of Akure. Features include modern finishes, spacious compound, gate house, borehole water supply, and adequate parking space. Perfect for families looking for a peaceful residential environment in Akure.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
    ]),
    featured: false
  },
  {
    title: "Luxury 3-Bedroom Penthouse in Ikeja GRA, Lagos",
    price: 95000000,
    location: "Ikeja, Lagos",
    type: "sale",
    bedrooms: 3,
    bathrooms: 4,
    description: "A stunning penthouse apartment in the prestigious Ikeja GRA. Features include a rooftop terrace, panoramic city views, premium Italian marble floors, smart home automation, and concierge services. Located minutes from the Murtala Muhammed International Airport and Ikeja City Mall.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop"
    ]),
    featured: false
  },
  {
    title: "5-Bedroom Detached House with Pool in Port Harcourt",
    price: 120000000,
    location: "Port Harcourt, Rivers State",
    type: "sale",
    bedrooms: 5,
    bathrooms: 5,
    description: "An impressive 5-bedroom detached house in the GRA Phase 2 area of Port Harcourt. This property features a private swimming pool, landscaped garden, modern kitchen, spacious rooms with air conditioning, boys' quarters, and 24/7 security. Located in a serene environment with good road network.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
    ]),
    featured: false
  },
  {
    title: "3-Bedroom Service Apartment for Rent in Wuse 2, Abuja",
    price: 4800000,
    location: "Wuse 2, Abuja",
    type: "rent",
    bedrooms: 3,
    bathrooms: 3,
    description: "A fully serviced 3-bedroom apartment in the bustling Wuse 2 district of Abuja. Features include 24/7 electricity, cleaning service, internet, satellite TV, gym access, and secure parking. Ideal for expatriates and business professionals visiting or working in Abuja.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop"
    ]),
    featured: false
  },
  {
    title: "4-Bedroom Block of Flats in Lekki Ajah, Lagos",
    price: 85000000,
    location: "Lekki, Lagos",
    type: "sale",
    bedrooms: 4,
    bathrooms: 4,
    description: "A well-structured 4-bedroom block of flats on a full plot of land along the Lekki-Ajah expressway. This is an excellent investment property with existing tenants. Each flat features 3 bedrooms, modern kitchen, spacious living room, and parking space. Great rental yield potential.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
    ]),
    featured: false
  }
];

async function main() {
  console.log("Seeding database...");
  
  // Clear existing properties
  await db.property.deleteMany();
  
  for (const property of properties) {
    await db.property.create({ data: property });
    console.log(`Created: ${property.title}`);
  }
  
  console.log(`\nSeeded ${properties.length} properties successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
