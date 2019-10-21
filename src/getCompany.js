import axios from 'axios';

const apiUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';
const key = '9aeb07af8cfb97c3d52d485974f52984fb732670';
const config = {
  headers: {
    Authorization: `Token ${key}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const parseResponse = (response) => {
  const { data } = response.data.suggestions[0];
  const adress = data.address.value;
  const { ogrn } = data;
  const { inn } = data;
  const name = data.name.full_with_opf;
  const date = data.state.registration_date;
  return {
    inn,
    adress,
    ogrn,
    name,
    date,
  };
};

export default async (inn) => {
  const query = { query: inn, type: 'LEGAL' };
  const response = await axios.post(apiUrl, query, config);
  return parseResponse(response);
};
