import { useLayoutEffect } from 'react';
import ContactHub from '../components/ContactHub';

export default function ContactsPage() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page contacts-page">
      <div className="contacts-page__frame">
        <section className="contacts-hero">
          <div className="journal-copy">
            <span className="eyebrow">Контакты</span>
            <h1>Связаться со мной</h1>
            <p>
              Здесь собраны все каналы связи. Можно сразу перейти в нужный
              сервис или скопировать контакт в один клик. Я открыта к
              сотрудничеству, участию в проектах и новым творческим задачам.
            </p>
          </div>
        </section>

        <ContactHub theme="light" className="contacts-page__hub" />
      </div>
    </main>
  );
}
