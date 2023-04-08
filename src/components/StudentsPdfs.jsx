import React from 'react'
import { useState,useRef } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const StudentsPdfs = () => {
    const [pdfPath, setPdfDoc] = useState([]);
    const [pdfModFour, setpdfModFour] = useState([]);
  const [theme,settheme] = useState("")
  const [date,setdate] = useState("")
  const [company,setCompany] = useState("")
  const [dates,setDates] = useState([])  
  const studentFirstName = useRef()
  const studentLastName = useRef()
  const cin = useRef()
  const cnss = useRef()
  const [students,setStudents]=useState([])

 
  
  const injectStudentData = async ()=>{
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
        x:190,
        y: height-248,
        size: 10,
        font: helveticaFont,
      
    });

    firstPage.drawText(dates.join(" / "), {
      x: 200,
      y: height-261,
      size: 10,
      font: helveticaFont,
      
    });


    firstPage.drawText( company, {
      x:160,
      y: height-233,
      size: 10,
      font: helveticaFont,
      
    });

    let rowHeight =  height-293
    for(let i=0 ;i<students.length ;i++){
    rowHeight = rowHeight-40
    console.log(rowHeight)
    firstPage.drawText( students[i].studentFirstName, {
        x:95,
        y: rowHeight,
        size: 10,
        font: helveticaFont,    
      }); 
      firstPage.drawText( students[i].studentLastName, {
        x:95,
        y: rowHeight+10,
        size: 10,
        font: helveticaFont,    
      });
      firstPage.drawText( students[i].cin, {
        x:190,
        y: rowHeight,
        size: 10,
        font: helveticaFont, 
      }); 
      firstPage.drawText( students[i].cnss, {
        x:260,
        y: rowHeight,
        size: 10,
        font: helveticaFont,

      }); 
    }

    const pdfBytes = await pdfDoc.save();
    const bytes = new Uint8Array(pdfBytes);
    const blob = new Blob([bytes], { type: "application/pdf" });
    const docUrl = URL.createObjectURL(blob);

    setPdfDoc((prev)=>[...prev,docUrl]);
  }
  const changeDate = (event)=>{
    setDates((prev)=>[...prev,event.target.value])
}

  const deletedate = (value)=>{
    const filtreDate = [...dates];
    filtreDate.splice(filtreDate.indexOf(value),1)
    setDates(filtreDate)
  }

  const addStudent = ()=>{
    
    const studentData = {
        studentFirstName:studentFirstName.current.value,
        studentLastName:studentLastName.current.value,
        cin:cin.current.value,
        cnss:cnss.current.value
    }

    setStudents((prev)=>[...prev,studentData])
  }
  
  const generateFFourDoc = async (student)=>{
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
    firstPage.drawText(theme, {
      x: 90,
      y: height-220,
      size: 10,
      font: helveticaFont, 
    });
    firstPage.drawText(dates[dates.length-1], {
      x: 75,
      y: height-740,
      size: 10,
      font: helveticaFont,
      
    });
    firstPage.drawText(dates.join(' '), {
        x: 300,
        y: height-220,
        size: 10,
        font: helveticaFont,
        
      });

    firstPage.drawText(student.studentFirstName,{
      x: 90,
      y: height-252,
      size: 10,
      font: helveticaFont,
      
    });

    firstPage.drawText(student.studentLastName, {
      x: 300,
      y: height-252,
      size: 10,
      font: helveticaFont,
      
    });

    firstPage.drawText(student.cnss, {
      x: 300,
      y: height-285,
      size: 10,
      font: helveticaFont,
      
    });
    firstPage.drawText(student.cin, {
      x: 90,
      y: height-285,
      size: 10,
      font: helveticaFont,
      
    });
    const pdfBytes = await pdfDoc.save();
    const bytes = new Uint8Array(pdfBytes);
    const blob = new Blob([bytes], { type: "application/pdf" });
    const docUrl = URL.createObjectURL(blob);

    setpdfModFour((prev)=>[...prev,docUrl])
  }
   
  const generateStudentDocs = async ()=>{
   for(let student of students){
    await generateFFourDoc(student)
   }
  }

  const gerenrateConsultingDoc = async ()=>{
   for(let student of students){
    await generateFFourDoc(student)
   }
  }

  return (
    <div>
        <h1>Students data</h1>
      <div>
       <input type="text" placeholder="entreprise" onChange={(event)=>setCompany(event.target.value)}/>
        <input type="text" placeholder="théme de formation" onChange={(event)=>settheme(event.target.value)}/>
        <input type="date" placeholder="date de formation"  onChange={changeDate}/>
         {dates.map((date,index)=>{
            
          
            return <div key={index}>
                    <p key={index}>{date}</p>
                   <button onClick={()=>deletedate(date)}>delete</button>
            </div> 
         })}
       

      </div>
      <div>
        <input type="text" placeholder="first name" ref={studentFirstName}/>
        <input type="text" placeholder='second name' ref={studentLastName}/>
        <input type="text" placeholder="cin" ref={cin}/>
        <input type="text" placeholder="cnss" ref={cnss}/>
      <button onClick={addStudent}>Add student</button>
      </div>
      {
        students.map((student,index)=>{
            
            return <div key={index}>{student.studentFirstName} {student.studentLastName} {student.cin} {student.cnss}</div>
        })
      }

      <button onClick={injectStudentData}>Generate Pdf</button>
{
  pdfPath.map((path)=>{
    return <iframe
        src={path}
        style={{ width: "500px", height: "500px" }}
      ></iframe>
  })
}
     
      <button onClick={generateStudentDocs}>Generate pdf Modéle F4</button>
      {
        pdfModFour.map((doc,index)=>{
           return <iframe
            src={doc}
            key={index}
            style={{ width: "500px", height: "500px" }}
          ></iframe> 
        })
      }
    </div>
  )
}

export default StudentsPdfs