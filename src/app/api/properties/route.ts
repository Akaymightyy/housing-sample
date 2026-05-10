import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const type = searchParams.get('type') || '';
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : 0;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : Infinity;
    const featured = searchParams.get('featured');

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { location: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (location) {
      where.location = { contains: location };
    }

    if (type) {
      where.type = type;
    }

    if (minPrice > 0 || maxPrice < Infinity) {
      where.price = { gte: minPrice };
      if (maxPrice < Infinity) {
        (where.price as Record<string, number>).lte = maxPrice;
      }
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const properties = await db.property.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, price, location, type, bedrooms, bathrooms, description, images, featured } = body;

    if (!title || !price || !location || !type || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: title, price, location, type, description' },
        { status: 400 }
      );
    }

    const property = await db.property.create({
      data: {
        title,
        price: parseInt(price),
        location,
        type,
        bedrooms: parseInt(bedrooms) || 0,
        bathrooms: parseInt(bathrooms) || 0,
        description,
        images: Array.isArray(images) ? JSON.stringify(images) : images || '[]',
        featured: featured === true || featured === 'true',
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}
