import { NextRequest, NextResponse } from 'next/server';
import { prisma, memoryStore } from '@/lib/prisma';

export async function GET() {
  try {
    let artisans: any[] = [];
    try {
      artisans = await prisma.artisanProfile.findMany({
        include: { products: true }
      });
    } catch {
      artisans = memoryStore.artisans;
    }
    return NextResponse.json(artisans);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newArtisan = {
      id: `artisan_${Date.now()}`,
      userId: body.userId || `user_artisan_${Date.now()}`,
      name: body.name || 'Master Artisan',
      craftTradition: body.craftTradition || 'Madhubani Painting',
      regionState: body.regionState || 'Bihar',
      district: body.district || 'Madhubani',
      yearsActive: Number(body.yearsActive) || 10,
      languagesSpoken: body.languagesSpoken || ['Hindi'],
      bio: body.bio || 'Dedicated Indian craftsperson creating traditional handcrafted goods.',
      voiceIntroUrl: body.voiceIntroUrl || null,
      isVerified: true,
      avatarUrl: body.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      createdAt: new Date().toISOString()
    };

    try {
      const created = await prisma.artisanProfile.create({
        data: newArtisan as any
      });
      return NextResponse.json(created, { status: 201 });
    } catch {
      memoryStore.artisans.push(newArtisan as any);
      return NextResponse.json(newArtisan, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
