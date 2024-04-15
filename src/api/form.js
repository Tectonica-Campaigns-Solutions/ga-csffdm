/*
const { google } = require('googleapis');

exports.handler = async (event) => {
  try {
    const { nombre, email, country, consent } = JSON.parse(event.body);

    
    const auth = new google.auth.GoogleAuth({
      keyFile: '../utils/csffdm-61e1a823f4e2.json',
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.SPREADSHEET_ID;

    const range = 'A2:D4'; // Cambia el rango según tus necesidades
    const data = [[nombre, email, country, consent]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: { values: data },
    });
    

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Datos enviados correctamente.' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Ocurrió un error al enviar los datos.' }),
    };
  }
};
*/