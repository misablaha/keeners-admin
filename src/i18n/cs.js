import defaultsDeep from 'lodash/defaultsDeep';
import czechMessages from 'ra-language-czech';
import englishMessages from 'ra-language-english';

export default defaultsDeep(
  {
    resources: {
      helpers: {
        name: 'Dobrovolníci',
        fields: {
          activity: 'Aktivita',
          name: 'Jméno',
          distance: 'Vzd. (m)',
          firstName: 'Jméno',
          lastName: 'Příjmení',
          email: 'Email',
          phoneNumber: 'Telefon',
          address: 'Adresa',
          isActive: 'Je k dispozici',
          note: 'Poznámka',
          provideIds: 'Nabízí',
        },
      },
      recipients: {
        name: 'Klienti',
        fields: {
          firstName: 'Jméno',
          lastName: 'Příjmení',
          yearOfBirth: 'Rok narození',
          age: 'Věk',
          email: 'Email',
          phoneNumber: 'Telefon',
          note: 'Poznámka',
          address: 'Adresa',
        },
      },
      requirements: {
        name: 'Požadavky',
        fields: {
          address: 'Adresa',
          createdTime: 'Datum vytvoření',
          demands: 'Požadavek',
          helper: 'Dobrovolník',
          note: 'Poznámka',
          phoneNumber: 'Telefonní číslo',
          recipient: 'Klient',
          status: 'Stav',
          supervisor: 'Správce',
          supplyDate: 'Termín',
        },
        statuses: {
          open: 'Otevřeno',
          assign: 'Dobrovolník',
          done: 'Vyřešeno',
          cancel: 'Zrušeno',
        },
        actions: {
          assign: 'Přiřadit',
          cancel: 'Označit jako zrušené',
          done: 'Označit jako vyřešené',
        },
        filters: {
          createdTimeGte: 'Ode dne',
        },
      },
      services: {
        name: 'Služby',
        fields: {
          name: 'Název',
          note: 'Poznámka',
          isInternal: 'Řeší se centrálně',
        },
      },
      supervisors: {
        name: 'Supervisoři',
        fields: {
          name: 'Jméno',
        },
      },
    },
    ra: {
      action: {
        search: 'Hledat',
      },
      validation: {
        phone: 'Musí být platné telefonní číslo',
      },
    },
  },
  czechMessages,
  englishMessages,
);
