const TELEGRAM_API_URL = 'https://api.telegram.org';

function formatTelegramMessage({ name = '', contact = '', message = '' }) {
  return [
    'Новая заявка с сайта arTami',
    name.trim() ? `Имя: ${name.trim()}` : null,
    contact.trim() ? `Контакт для ответа: ${contact.trim()}` : null,
    'Сообщение:',
    message.trim(),
  ]
    .filter(Boolean)
    .join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return res.status(500).json({ error: 'Telegram integration is not configured' });
  }

  const { name = '', contact = '', message = '' } = req.body ?? {};

  if (!message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const telegramResponse = await fetch(
    `${TELEGRAM_API_URL}/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: formatTelegramMessage({ name, contact, message }),
      }),
    },
  );

  if (!telegramResponse.ok) {
    const telegramError = await telegramResponse.text();

    return res.status(502).json({
      error: 'Telegram delivery failed',
      details: telegramError,
    });
  }

  return res.status(200).json({ ok: true });
}
