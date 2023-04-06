import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import axios from "axios";

function App() {
  const [pdfPath, setPdfDoc] = useState("");
  const createPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 30;
    page.drawText("Creating PDFs in JavaScript is awesome!", {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });

    const pdfBytes = await pdfDoc.save();
    const bytes = new Uint8Array(pdfBytes);
    const blob = new Blob([bytes], { type: "application/pdf" });
    const docUrl = URL.createObjectURL(blob);

    setPdfDoc(docUrl);
  };

  const injectDataInPdf = async () => {
    //const url = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
    const url =
      "https://cors-anywhere.herokuapp.com/https://github.com/Medmly20208/recipeApp/files/11165208/Formulaire.F4_230405_231831.pdf";
    const existingPdfBytes = await fetch(url, {
      method: "GET",
      Origin:
        "https://github.com/Medmly20208/recipeApp/files/11165208/Formulaire.F4_230405_231831.pdf",
    }).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    //const pdfDoc = await PDFDocument.load(base64);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    firstPage.drawText("This text was added with JavaScript!", {
      x: 90,
      y: height / 2 - 100,
      size: 10,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
    });

    const pdfBytes = await pdfDoc.save();
    const bytes = new Uint8Array(pdfBytes);
    const blob = new Blob([bytes], { type: "application/pdf" });
    const docUrl = URL.createObjectURL(blob);

    setPdfDoc(docUrl);
  };

  return (
    <div className="App">
      <h1>PDF generator</h1>
      <button onClick={injectDataInPdf}>Generate Pdf</button>
      <iframe
        src={pdfPath}
        style={{ width: "350px", height: "350px" }}
      ></iframe>
    </div>
  );
}

export default App;
