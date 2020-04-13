import defaultsDeep from 'lodash/defaultsDeep';
import czechMessages from 'ra-language-czech';
import englishMessages from 'ra-language-english';

export default defaultsDeep(
  {
    resources: {
      helpers: {
        name: 'Dobrovolníci',
        fields: {
          callSign: 'Číslo',
          activity: 'Aktivita',
          name: 'Jméno',
          distance: 'Vzd. (m)',
          firstName: 'Jméno',
          lastName: 'Příjmení',
          email: 'Email',
          phoneNumber: 'Telefon',
          address: 'Adresa',
          region: 'Oblast',
          isActive: 'Je k dispozici',
          note: 'Poznámka',
          provideIds: 'Nabízí',
        },
      },
      clients: {
        name: 'Klienti',
        fields: {
          firstName: 'Jméno',
          lastName: 'Příjmení',
          yearOfBirth: 'Rok narození',
          age: 'Věk',
          email: 'Email',
          phoneNumber: 'Telefon',
          note: 'Poznámka',
          disease: 'Nemoc / Postižení',
          address: 'Adresa',
          region: 'Oblast',
        },
      },
      requirements: {
        name: 'Požadavky',
        fields: {
          address: 'Adresa',
          client: 'Klient',
          createdAt: 'Datum vytvoření',
          demands: 'Poptávka',
          helper: 'Dobrovolník',
          note: 'Poznámka',
          disease: 'Nemoc / Postižení',
          phoneNumber: 'Telefonní číslo',
          region: 'Oblast',
          status: 'Stav',
          supervisor: 'Správce',
          supplyDate: 'Termín',
          supplyDateDelay: 'Termín',
          traveledDistance: 'Ujeté kilometry',
        },
        statuses: {
          new: 'Otevřeno',
          processing: 'Dobrovolník',
          done: 'Vyřešeno',
          canceled: 'Zrušeno',
        },
        supplyDateDelays: {
          today: 'Dnes',
          tomorrow: 'Zítra',
          later: 'Jindy',
        },
        actions: {
          addDemand: 'Přidat poptávku',
          removeDemand: 'Odebrat poptávku',
          assign: 'Přiřadit',
          chooseHelper: 'Vybrat dobrovolníka',
          cancel: 'Označit jako zrušené',
          done: 'Označit jako vyřešené',
        },
      },
      demands: {
        statuses: {
          new: 'Požadavek',
          submitted: 'Řeší se',
          done: 'Hotovo',
          canceled: 'Zrušeno',
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
        close: 'Zavřít',
      },
      validation: {
        phone: 'Musí být platné telefonní číslo',
      },
    },
  },
  czechMessages,
  englishMessages,
);
