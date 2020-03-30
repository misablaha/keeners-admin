import defaultsDeep from 'lodash/defaultsDeep';
import czechMessages from 'ra-language-czech';
import englishMessages from 'ra-language-english';

export default defaultsDeep(
  {
    resources: {
      helpers: {
        name: 'Dobrovolník',
        fields: {
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
        name: 'Klient',
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
      services: {
        name: 'Služby',
        fields: {
          name: 'Název',
          note: 'Poznámka',
          isInternal: 'Řeší se centrálně',
        },
      },
      supervisors: {
        name: 'Supervisor',
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
