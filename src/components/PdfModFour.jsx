import React from 'react'
import { useState,useRef } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const pdfModFour = () => {
    const [pdfPath, setPdfDoc] = useState("");
  const [theme,settheme] = useState("")
  const [date,setdate] = useState("")
  const [firstNamebenficiare,setFirstNamebenificiare] = useState("")
  const [secondNamebenficiare,setSecondNamebenificiare] = useState("")
  const [cin,setcin] = useState("")
  const [cnss,setCnss] = useState("")
  

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

  


  const injectData = async ()=>{
    const url =
      "https://cors-anywhere.herokuapp.com/https://github.com/Medmly20208/recipeApp/files/11171368/mohamed.moulay.pdf";
    const existingPdfBytes = await fetch(url, {
      method: "GET",
      Origin:
        "https://github.com/Medmly20208/recipeApp/files/11171368/mohamed.moulay.pdf",
    }).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    //const pdfDoc = await PDFDocument.load(base64);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    firstPage.drawText(theme, {
      x: 90,
      y: height-220,
      size: 10,
      font: helveticaFont,
      
    });

    firstPage.drawText(date, {
      x: 300,
      y: height-220,
      size: 10,
      font: helveticaFont,
      
    });

    firstPage.drawText(secondNamebenficiare,{
      x: 90,
      y: height-252,
      size: 10,
      font: helveticaFont,
      
    });

    firstPage.drawText( firstNamebenficiare, {
      x: 300,
      y: height-252,
      size: 10,
      font: helveticaFont,
      
    });

    firstPage.drawText(cnss, {
      x: 300,
      y: height-285,
      size: 10,
      font: helveticaFont,
      
    });
    firstPage.drawText(cin, {
      x: 90,
      y: height-285,
      size: 10,
      font: helveticaFont,
      
    });
    const pdfBytes = await pdfDoc.save();
    const bytes = new Uint8Array(pdfBytes);
    const blob = new Blob([bytes], { type: "application/pdf" });
    const docUrl = URL.createObjectURL(blob);

    setPdfDoc(docUrl);
  }

  return (
    <div>
        <h1>PDF generator</h1>
      <div>
        <input type="text" placeholder="theme" onChange={(event)=>settheme(event.target.value)}/>
        <input type="date" placeholder="date" onChange={(event)=>setdate(event.target.value)}/>
        <input type="text" placeholder="first name benificiare" onChange={(event)=>setFirstNamebenificiare(event.target.value)}/>
        <input type="text" placeholder="second name benificiare" onChange={(event)=>setSecondNamebenificiare(event.target.value)}/>
        <input type="text" placeholder="cin" onChange={(event)=>setcin(event.target.value)}/>
        <input type="text" placeholder="cnss" onChange={(event)=>setCnss(event.target.value)}/>

      </div>
      <button onClick={injectData}>Generate Pdf</button>
      <iframe
        src={pdfPath}
        style={{ width: "500px", height: "500px" }}
      ></iframe>
    </div>
  )
}

export default pdfModFour