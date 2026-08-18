export async function generateAudioNarration(data: {
  provenanceNote: string;
  artisanName: string;
  craftTradition: string;
}): Promise<{ audioUrl: string }> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // Warm storytelling voice 'Rachel'

  if (apiKey) {
    try {
      const textToSpeechPrompt = `Welcome to Haath. Story of ${data.craftTradition} handcrafted by ${data.artisanName}. ${data.provenanceNote}`;
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: textToSpeechPrompt,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.65,
            similarity_boost: 0.85,
          },
        }),
      });

      if (response.ok) {
        const audioBuffer = await response.arrayBuffer();
        const base64Audio = Buffer.from(audioBuffer).toString('base64');
        return { audioUrl: `data:audio/mp3;base64,${base64Audio}` };
      }
    } catch (err) {
      console.warn('ElevenLabs API call error, using fallback audio:', err);
    }
  }

  // Fallback demo audio narration URL (warm Google sound effect audio file)
  return {
    audioUrl: "https://actions.google.com/sounds/v1/speech/greeting.ogg"
  };
}
