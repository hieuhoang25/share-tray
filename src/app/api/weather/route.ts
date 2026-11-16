import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat') || '21.0285';
  const lng = searchParams.get('lng') || '105.8542';

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code&timezone=Asia%2FBangkok`,
      { next: { revalidate: 900 } } // cache 15 minutes
    );

    if (!res.ok) {
      throw new Error('Weather API response error');
    }

    const data = await res.json();
    const temp = Math.round(data.current?.temperature_2m ?? 28);
    const code = data.current?.weather_code ?? 0;
    const isRain = [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code);

    return NextResponse.json({
      temperature: temp,
      weatherCode: code,
      isRain,
      conditionText: isRain ? 'Rain' : temp > 32 ? 'Sunny' : 'Breeze',
      city: 'Hanoi',
    });
  } catch {
    // Fallback if Open-Meteo is unreachable
    return NextResponse.json({
      temperature: 28,
      weatherCode: 0,
      isRain: false,
      conditionText: 'Pleasant breeze',
      city: 'Hanoi',
    });
  }
}
