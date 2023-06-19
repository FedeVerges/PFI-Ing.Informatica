import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

// Define font files
const fonts = {
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  },
  MyFont: {
    normal: './src/assets/fonts/Darker_Grotesque/DarkerGrotesque-Medium.ttf',
    bold: './src/assets/fonts/Darker_Grotesque/DarkerGrotesque-Bold.ttf'
  }
};

class PdfService {
  private static instance: PdfService;

  public static get Instance(): PdfService {
    return PdfService.instance || (PdfService.instance = new this());
  }
  printer: PdfPrinter;

  constructor() {
    this.printer = new PdfPrinter(fonts);
  }

  createPdf(docDefinition: TDocumentDefinitions): Promise<string> {
    try {
      const pdfDoc = this.printer.createPdfKitDocument(docDefinition);

      let chunks: any[] = [];
      let result: Buffer;

      pdfDoc.on('data', (chunk) => {
        chunks.push(chunk);
      });

      const pr = new Promise<string>((resolve) => {
        pdfDoc.on('end', () => {
          result = Buffer.concat(chunks);
          resolve(result.toString('base64'));
        });
      });

      pdfDoc.end();

      return pr;
    } catch (err) {
      throw err;
    }
  }
}
export const pdfService = PdfService.Instance;
