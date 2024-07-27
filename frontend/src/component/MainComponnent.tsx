
// import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { Button } from './Button.tsx';
// import JSZip from 'jszip';
// import './MainComponent.css'; 

// interface MainComponentProps {
//   defaultConversion: string;
//   convertHeading: string;
// }


// export default function MainComponent(props: MainComponentProps) { 

//   const [conversionType, setConversionType] = useState<string>(props.defaultConversion);
//   console.log(conversionType,"defualtConversion  Main component"); 
//   const [selectedButton, setSelectedButton] = useState<string>(props.defaultConversion);  
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [convertedFiles, setConvertedFiles] = useState<File[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const round2Ref = useRef<HTMLDivElement | null>(null); 


//   // useEffect(() => {
//   //   // Set the initial conversion type after the component mounts
//   //   setConversionType(props.defaultConversion);
//   //   setSelectedButton(props.defaultConversion);
//   // }, [conversionType]); 

//   const getFileType = (mimeType: string) => {
//     if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//       return 'DOCX';
//     } else {
//       return mimeType.split('/').pop()?.toUpperCase() || '';
//     }
//   };

//   const handleFileRemove = (event: React.MouseEvent, index: number) => {
//     event.stopPropagation();
//     const updatedFiles = [...selectedFiles];
//     updatedFiles.splice(index, 1);
//     setSelectedFiles(updatedFiles);
//     const updatedConvertedFiles = [...convertedFiles];
//     updatedConvertedFiles.splice(index, 1);
//     setConvertedFiles(updatedConvertedFiles);
//   };

//   const handleFileDownload = (event: React.MouseEvent, file: File | null) => {
//     event.stopPropagation();
//     if (!file) {
//       console.error('Invalid file for download.');
//       return;
//     }
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(file);
//     link.download = file.name;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const downloadAll = () => {
//     if (convertedFiles.length === 0) {
//       console.warn('No converted files to download.');
//       return;
//     }
//     const zip = new JSZip();
//     convertedFiles.forEach((file, index) => {
//       zip.file(`converted_file_${index + 1}`, file);
//     });
//     zip.generateAsync({ type: 'blob' })
//       .then((blob) => {
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = 'converted_files.zip';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       })
//       .catch((error) => {
//         console.error('Error generating zip file:', error);
//       });
//   };

//   const createFileFromBlob = (blob: Blob, fileName: string): File => {
//     const file = new File([blob], fileName, { type: blob.type });
//     return file;
//   };

//   const onDrop = useCallback(async (acceptedFiles: File[]) => {
//     if (!conversionType) {
//       window.alert('Please select a conversion type.');
//       return;
//     }
//     let filteredFiles: File[] = [];
//     if (conversionType === 'avif2png' || conversionType === 'avif2jpg') {
//       filteredFiles = acceptedFiles.filter(file => {
//         const fileExtension = file.name.split('.').pop()?.toLowerCase();
//         return fileExtension === 'avif';
//       });
//     } else {
//       filteredFiles = acceptedFiles.filter(file => {
//         const fileExtension = file.name.split('.').pop()?.toLowerCase();
//         const selectedFormat = conversionType.split('2')[0]?.toLowerCase();
//         return fileExtension === selectedFormat;
//       });
//     }
//     if (filteredFiles.length === 0) {
//       window.alert(`No ${conversionType === 'avif2png' ? 'AVIF' : conversionType} files dropped. Please drop a valid file.`);
//       return;
//     }
//     setSelectedFiles(prevFiles => [...prevFiles, ...filteredFiles]);
//     if (round2Ref.current) {
//       round2Ref.current.scrollLeft = round2Ref.current.scrollWidth;
//     }
//     if (conversionType) {
//       try {
//         const latestAcceptedFile = filteredFiles[filteredFiles.length - 1];
//         setLoading(true);
//         const response = await apiCall(latestAcceptedFile, conversionType);
//         const formData = new FormData();
//         const fileNameWithoutExtension = latestAcceptedFile.name.replace(/\.[^/.]+$/, "");
//         const convfile = createFileFromBlob(response, fileNameWithoutExtension);
//         formData.append('file', convfile);
//         setConvertedFiles(prevConvertedFiles => [...prevConvertedFiles, convfile]);
//         setLoading(false);
//         if (round2Ref.current) {
//           round2Ref.current.scrollLeft = round2Ref.current.scrollWidth;
//         }
//       } catch (error) {
//         console.error('Conversion error:', error);
//       }
//     }
//     const timeoutId = setTimeout(() => {
//       setLoading(false);
//     }, 520000);
//     return () => clearTimeout(timeoutId);
//   }, [conversionType, setConvertedFiles, setSelectedFiles, setLoading]);

//   const clearQueue = () => {
//     setSelectedFiles([]);
//     setConvertedFiles([]);
//   };

//   const handleConversionButtonClick = (type: string) => {
//     setSelectedButton(type);
//     setConversionType(type);
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   const scrollLeft = () => {
//     if (round2Ref.current) {
//       round2Ref.current.style.scrollBehavior = 'smooth';
//       round2Ref.current.scrollLeft -= 100;
//     }
//   };

//   const scrollRight = () => {
//     if (round2Ref.current) {
//       round2Ref.current.style.scrollBehavior = 'smooth';
//       round2Ref.current.scrollLeft += 100;
//     }
//   };

//   return (
//     <div className="MainC"> 
//       <h1 className='main_heading'>{props.convertHeading}</h1>
//       <div className='mobileselect'> 
//         <div className='select' style={{ textAlign: 'center' }}>
//           <select
//             value={conversionType?.split('2')[0] || ''}
//             onChange={(e) => handleConversionButtonClick(`${e.target.value}2${conversionType?.split('2')[1]}`)}
//             style={{
//               backgroundColor: 'transparent',
//               border: 'none',
//               outline: 'none',
//               color: 'white',
//               textAlign: 'center',
//               fontWeight: 'bold',
//             }}
//           >
//             <option value="">Select Format</option>
//             <option value="avif" style={{ color: 'black' }}>Avif</option>
//             {/* <option value="jpg" style={{ color: 'black' }}>JPG</option>
//             <option value="webp" style={{ color: 'black' }}>WebP</option>
//             <option value="word" style={{ color: 'black' }}>Word</option>
//             <option value="jpeg" style={{ color: 'black' }}>JPEG</option>
//             <option value="pdf" style={{ color: 'black' }}>PDF</option>
//             <option value="avif" style={{ color: 'black' }}>AVIF</option> */}
//           </select>
//         </div>
//         <span>To</span>
//         <div className='select'  style={{ textAlign: 'center' }}>
//           <select
//             value={conversionType?.split('2')[1] || ''}
//             onChange={(e) => setConversionType(`${conversionType?.split('2')[0]}2${e.target.value}`)}
//             style={{
//               backgroundColor: 'transparent',
//               border: 'none',
//               outline: 'none',
//               color: 'white',
//               textAlign: 'center',
//               fontWeight: 'bold',
//             }}
//           >
//             <option value="">Select Format</option>
//             <option value="png" style={{ color: 'black' }}>PNG</option>
//             <option value="jpg" style={{ color: 'black' }}>JPG</option>
//             {/* <option value="webp" style={{ color: 'black' }}>WebP</option>
//             <option value="word" style={{ color: 'black' }}>Word</option>
//             <option value="jpeg" style={{ color: 'black' }}>JPEG</option>
//             <option value="pdf" style={{ color: 'black' }}>PDF</option> */}
//           </select>
//         </div>
//       </div>
//       <div className="ButtonsR">
//         <Button
//           text='Avif to PNG'
//           onClick={() => handleConversionButtonClick('avif2png')}
//           isSelected={selectedButton === 'avif2png'}
//           onSelect={() => setSelectedButton('avif2png')}
//         />
//         <Button
//           text='Avif to JPG'
//           onClick={() => handleConversionButtonClick('avif2jpg')}
//           isSelected={selectedButton === 'avif2jpg'}
//           onSelect={() => setSelectedButton('avif2jpg')}
//         />
//       </div>
//       <div className="RoundBox">
//         <p>
//           <span style={{ fontWeight: 'bold' }}>Drag and Drop</span> your files here
//         </p>
//         <div className="Upload" {...getRootProps()}>
//           <div className="pt1">
//             <img style={{ filter: "invert(100%)" }} src='./assets/arrow.svg' alt="cross" />
//           </div>
//           <div className="pt2">
//             <span>Upload Here</span>
//           </div>
//           <input {...getInputProps()} />
//         </div>
//         <div className="SndPart">
//           <div className="bt1"  onClick={scrollLeft}><img src="./assets/left.png" alt="" /></div>
//           <div {...getRootProps()} className="Round2" ref={round2Ref}>
//             {loading && (                   
//               <div className="linear-loader"></div>
//             )}
//             {convertedFiles.map((file, index) => (
//               <div className='File' key={index}  >
//                 <div className='r1' style={{display:"flex",justifyContent:"space-around", overflow:"none", position:"relative"}}>
//                   <span className='filetop'>{file.name}</span>
//                   <div className='crossbtn' onClick={(event) => handleFileRemove(event, index)}>
//                     <img src='/assets/cross.svg' alt="cross icon" />
//                   </div>
//                 </div>
//                 <span className='filemid'>{getFileType(file.type)}</span>
//                 <div className='filedown' style={{cursor:'pointer'}} onClick={(event) => handleFileDownload(event, file)}>
//                   <span>Download</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="bt2" onClick={scrollRight}><img src="./assets/right.png" alt="" /></div>
//         </div>
//         <div className="Upload"  onClick={clearQueue}>
//           <div className="pt1" style={{ backgroundColor: 'red' }}>
//             <img style={{ filter: "invert(100%)", height: "35px" }} src='./assets/cross.svg' alt="cross" />
//           </div>
//           <div className="pt2" style={{ backgroundColor: 'red' }}>
//             <span>Clear Queue</span>
//           </div>
//         </div>
//       </div>
//       <div className="Download" style={{ display: 'flex', flexDirection: 'row' }}>
//         <div className="pt1" style={{ backgroundColor: 'black' }}>
//           <img style={{ filter: "invert(100%)", transform: "rotate(180deg)" }} src='./assets/arrow.svg' alt="downward arrow" />
//         </div>
//         <div className="pt2" style={{ backgroundColor: 'black'}} onClick={downloadAll}>
//           <span style={{ color: 'white' }}>Download All</span>
//         </div>
//         <div className='counter1'>
//           <span>{convertedFiles.length}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function createFileFromBlob(blob: Blob, originalFileName: string): File {
//   const file = new File([blob], originalFileName, { type: blob.type });
//   return file;
// }

// const apiCall = async (file: File, conversionType: string) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('conversionType', conversionType);
//     const response = await fetch(`http://universitystuffhub.com/convert/${conversionType}`, {
//       method: 'POST',     
//       body: formData,
//     });
//     if (!response.ok) {
//       throw new Error('API call failed');
//     }
//     const originalFileName = file.name;
//     const blob = await response.blob();
//     const convertedFile = createFileFromBlob(blob, originalFileName);
//     return convertedFile;
//   } catch (error) {
//     console.error('API call error:', error);
//     throw error;
//   }
// };


// import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { Button } from './Button.tsx';
// import JSZip from 'jszip';
// import './MainComponent.css'; 

// interface MainComponentProps {
//   defaultConversion: string;
//   convertHeading: string;
// }


// export default function MainComponent(props: MainComponentProps) { 

//   const [conversionType, setConversionType] = useState<string>(props.defaultConversion);
//   console.log(conversionType,"defualtConversion  Main component"); 
//   const [selectedButton, setSelectedButton] = useState<string>(props.defaultConversion);  
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [convertedFiles, setConvertedFiles] = useState<File[]>([]);
//   const [loading, setLoading] = useState<boolean>(false); 
//   const round2Ref = useRef<HTMLDivElement | null>(null); 

//   console.log(selectedFiles);
//   console.log(convertedFiles);

//   // useEffect(() => {
//   //   // Set the initial conversion type after the component mounts
//   //   setConversionType(props.defaultConversion);
//   //   setSelectedButton(props.defaultConversion);
//   // }, [conversionType]); 

//   const getFileType = (mimeType: string) => {
//     if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//       return 'DOCX';
//     } else {
//       console.log(mimeType);
//       if(mimeType === 'image/jpeg') return 'JPG';
//       return mimeType.split('/').pop()?.toUpperCase() || '';
//     }
//   };

//   const handleFileRemove = (event: React.MouseEvent, index: number) => {
//     event.stopPropagation();
//     const updatedFiles = [...selectedFiles];
//     updatedFiles.splice(index, 1);
//     setSelectedFiles(updatedFiles);
//     const updatedConvertedFiles = [...convertedFiles];
//     updatedConvertedFiles.splice(index, 1);
//     setConvertedFiles(updatedConvertedFiles);
//   };

//   const handleFileDownload = (event: React.MouseEvent, file: File | null) => {
//     event.stopPropagation();
//     if (!file) {
//       console.error('Invalid file for download.');
//       return;
//     }
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(file);
//     link.download = file.name;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // const downloadAll = () => {
//   //   if (convertedFiles.length === 0) {
//   //     console.warn('No converted files to download.');
//   //     return;
//   //   }
//   //   const zip = new JSZip();
//   //   convertedFiles.forEach((file, index) => {
//   //     zip.file(`converted_file_${index + 1}`, file);
//   //   });
//   //   zip.generateAsync({ type: 'blob' })
//   //     .then((blob) => {
//   //       const link = document.createElement('a');
//   //       link.href = URL.createObjectURL(blob);
//   //       link.download = 'converted_files.zip';
//   //       document.body.appendChild(link);
//   //       link.click();
//   //       document.body.removeChild(link);
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error generating zip file:', error);
//   //     });
//   // };
//   const downloadAll = () => {
//     if (convertedFiles.length === 0) {
//       console.warn('No converted files to download.');
//       return;
//     }
    
//     const zip = new JSZip();
  
//     convertedFiles.forEach((file, index) => {
//       console.log(file.type); 
//       const fileExtension = file.type.split('/').pop();
//       console.log(fileExtension,"file.name");
//       zip.file(`converted_file_${index + 1}.${fileExtension}`, file);
//     });
  
//     zip.generateAsync({ type: 'blob' })
//       .then((blob) => {
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = 'converted_files.zip';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       })
//       .catch((error) => {
//         console.error('Error generating zip file:', error);
//       });
//   };

//   const createFileFromBlob = (blob: Blob, fileName: string): File => {
//     const file = new File([blob], fileName, { type: blob.type });
//     return file;
//   };

//   // const onDrop = useCallback(async (acceptedFiles: File[]) => {
//   //   if (!conversionType) {
//   //     window.alert('Please select a conversion type.');
//   //     return;
//   //   }
//   //   let filteredFiles: File[] = [];
//   //   if (conversionType === 'avif2png' || conversionType === 'avif2jpg') {
//   //     filteredFiles = acceptedFiles.filter(file => {
//   //       const fileExtension = file.name.split('.').pop()?.toLowerCase();
//   //       return fileExtension === 'avif';
//   //     });
//   //   } else {
//   //     filteredFiles = acceptedFiles.filter(file => {
//   //       const fileExtension = file.name.split('.').pop()?.toLowerCase();
//   //       const selectedFormat = conversionType.split('2')[0]?.toLowerCase();
//   //       return fileExtension === selectedFormat;
//   //     });
//   //   }
//   //   if (filteredFiles.length === 0) {
//   //     window.alert(`No ${conversionType === 'avif2png' ? 'AVIF' : conversionType} files dropped. Please drop a valid file.`);
//   //     return;
//   //   }
//   //   setSelectedFiles(prevFiles => [...prevFiles, ...filteredFiles]);
//   //   if (round2Ref.current) {
//   //     round2Ref.current.scrollLeft = round2Ref.current.scrollWidth;
//   //   }
//   //   if (conversionType) {
//   //     try {
//   //       const latestAcceptedFile = filteredFiles[filteredFiles.length - 1];
//   //       setLoading(true);
//   //       const response = await apiCall(latestAcceptedFile, conversionType);
//   //       const formData = new FormData();
//   //       const fileNameWithoutExtension = latestAcceptedFile.name.replace(/\.[^/.]+$/, "");
//   //       const convfile = createFileFromBlob(response, fileNameWithoutExtension);
//   //       formData.append('file', convfile);
//   //       setConvertedFiles(prevConvertedFiles => [...prevConvertedFiles, convfile]);
//   //       setLoading(false);
//   //       if (round2Ref.current) {
//   //         round2Ref.current.scrollLeft = round2Ref.current.scrollWidth;
//   //       }
//   //     } catch (error) {
//   //       console.error('Conversion error:', error);
//   //     }
//   //   }
//   //   const timeoutId = setTimeout(() => {
//   //     setLoading(false);
//   //   }, 520000);
//   //   return () => clearTimeout(timeoutId);
//   // }, [conversionType, setConvertedFiles, setSelectedFiles, setLoading]);

//   const onDrop = useCallback(async (acceptedFiles: File[]) => {
//     if (!conversionType) {
//       window.alert('Please select a conversion type.');
//       return;
//     }

//     const convertedFilesArray: File[] = [];
//     setLoading(true);

//     for (const file of acceptedFiles) {
//       try {
//         const response = await apiCall(file, conversionType);
//         const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
//         const convertedFile = createFileFromBlob(response, fileNameWithoutExtension);
//         convertedFilesArray.push(convertedFile);
//       } catch (error) {
//         console.error('Conversion error:', error);
//       }
//     }

//     setConvertedFiles(prevConvertedFiles => [...prevConvertedFiles, ...convertedFilesArray]);
//     setSelectedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
//     setLoading(false);
//   }, [conversionType, setSelectedFiles, setConvertedFiles, setLoading]);

//   // const { getRootProps, getInputProps } = useDropzone({ onDrop }); 

//   const clearQueue = () => {
//     setSelectedFiles([]);
//     setConvertedFiles([]);
//   };

//   const handleConversionButtonClick = (type: string) => {
//     setSelectedButton(type);
//     setConversionType(type);
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   const scrollLeft = () => {
//     if (round2Ref.current) {
//       round2Ref.current.style.scrollBehavior = 'smooth';
//       round2Ref.current.scrollLeft -= 100;
//     }
//   };

//   const scrollRight = () => {
//     if (round2Ref.current) {
//       round2Ref.current.style.scrollBehavior = 'smooth';
//       round2Ref.current.scrollLeft += 100;
//     }
//   };

//   return (
//     <div className="MainC"> 
//       <h1 className='main_heading'>{props.convertHeading}</h1>
//       <div className='mobileselect'> 
//         <div className='select' style={{ textAlign: 'center' }}>
//           <select
//             value={conversionType?.split('2')[0] || ''}
//             onChange={(e) => handleConversionButtonClick(`${e.target.value}2${conversionType?.split('2')[1]}`)}
//             style={{
//               backgroundColor: 'transparent',
//               border: 'none',
//               outline: 'none',
//               color: 'white',
//               textAlign: 'center',
//               fontWeight: 'bold',
//             }}
//           >
//             <option value="">Select Format</option>
//             <option value="avif" style={{ color: 'black' }}>Avif</option>
//             {/* <option value="jpg" style={{ color: 'black' }}>JPG</option>
//             <option value="webp" style={{ color: 'black' }}>WebP</option>
//             <option value="word" style={{ color: 'black' }}>Word</option>
//             <option value="jpeg" style={{ color: 'black' }}>JPEG</option>
//             <option value="pdf" style={{ color: 'black' }}>PDF</option>
//             <option value="avif" style={{ color: 'black' }}>AVIF</option> */}
//           </select>
//         </div>
//         <span>To</span>
//         <div className='select'  style={{ textAlign: 'center' }}>
//           <select
//             value={conversionType?.split('2')[1] || ''}
//             onChange={(e) => setConversionType(`${conversionType?.split('2')[0]}2${e.target.value}`)}
//             style={{
//               backgroundColor: 'transparent',
//               border: 'none',
//               outline: 'none',
//               color: 'white',
//               textAlign: 'center',
//               fontWeight: 'bold',
//             }}
//           >
//             <option value="">Select Format</option>
//             <option value="png" style={{ color: 'black' }}>PNG</option>
//             <option value="jpg" style={{ color: 'black' }}>JPG</option>
//             {/* <option value="webp" style={{ color: 'black' }}>WebP</option>
//             <option value="word" style={{ color: 'black' }}>Word</option>
//             <option value="jpeg" style={{ color: 'black' }}>JPEG</option>
//             <option value="pdf" style={{ color: 'black' }}>PDF</option> */}
//           </select>
//         </div>
//       </div>
//       <div className="ButtonsR">
//         <Button
//           text='Avif to PNG'
//           onClick={() => handleConversionButtonClick('avif2png')}
//           isSelected={selectedButton === 'avif2png'}
//           onSelect={() => setSelectedButton('avif2png')}
//         />
//         <Button
//           text='Avif to JPG'
//           onClick={() => handleConversionButtonClick('avif2jpg')}
//           isSelected={selectedButton === 'avif2jpg'}
//           onSelect={() => setSelectedButton('avif2jpg')}
//         />
//       </div>
//       <div className="RoundBox">
//         <p>
//           <span style={{ fontWeight: 'bold' }}>Drag and Drop</span> your files here
//         </p>
//         <div className="Upload" {...getRootProps()}>
//           <div className="pt1">
//             <img style={{ filter: "invert(100%)" }} src='./assets/arrow.svg' alt="cross" />
//           </div>
//           <div className="pt2">
//             <span>Upload Here</span>
//           </div>
//           <input {...getInputProps()} />
//         </div>
//         <div className="SndPart">
//           <div className="bt1"  onClick={scrollLeft}><img src="./assets/left.png" alt="" /></div>
//           <div {...getRootProps()} className="Round2" ref={round2Ref}>
//             {loading && (                   
//               <div className="linear-loader"></div>
//             )}
//             {convertedFiles.map((file, index) => (
//               <div className='File' key={index}  >
//                 <div className='r1' style={{display:"flex",justifyContent:"space-around", overflow:"none", position:"relative"}}>
//                   <span className='filetop'>{file.name}</span>
//                   <div className='crossbtn' onClick={(event) => handleFileRemove(event, index)}>
//                     <img src='/assets/cross.svg' alt="cross icon" />
//                   </div>
//                 </div>
//                 {/* {console.log(file.type)} */}
//                 <span className='filemid'>{getFileType(file.type)}</span>
//                 <div className='filedown' style={{cursor:'pointer'}} onClick={(event) => handleFileDownload(event, file)}>
//                   <span>Download</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="bt2" onClick={scrollRight}><img src="./assets/right.png" alt="" /></div>
//         </div>
//         <div className="Upload"  onClick={clearQueue}>
//           <div className="pt1" style={{ backgroundColor: 'red' }}>
//             <img style={{ filter: "invert(100%)", height: "35px" }} src='./assets/cross.svg' alt="cross" />
//           </div>
//           <div className="pt2" style={{ backgroundColor: 'red' }}>
//             <span>Clear Queue</span>
//           </div>
//         </div>
//       </div>
//       <div className="Download" style={{ display: 'flex', flexDirection: 'row' }}>
//         <div className="pt1" style={{ backgroundColor: 'black' }}>
//           <img style={{ filter: "invert(100%)", transform: "rotate(180deg)" }} src='./assets/arrow.svg' alt="downward arrow" />
//         </div>
//         <div className="pt2" style={{ backgroundColor: 'black'}} onClick={downloadAll}>
//           <span style={{ color: 'white' }}>Download All</span>
//         </div>
//         <div className='counter1'>
//           <span>{convertedFiles.length}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function createFileFromBlob(blob: Blob, originalFileName: string): File {
//   const file = new File([blob], originalFileName, { type: blob.type });
//   return file;
// }

// const apiCall = async (file: File, conversionType: string) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('conversionType', conversionType);
//     // const response = await fetch(`http://universitystuffhub.com/convert/${conversionType}`, {
//     //   method: 'POST',     
//     //   body: formData,
//     // });
//     const response = await fetch(`http://127.0.0.1:5000/convert/${conversionType}`, {
//       method: 'POST',     
//       body: formData,
//     });
//     // 
//     if (!response.ok) {
//       throw new Error('API call failed');
//     }
//     const originalFileName = file.name;
//     const blob = await response.blob();
//     const convertedFile = createFileFromBlob(blob, originalFileName);
//     return convertedFile;
//   } catch (error) {
//     console.error('API call error:', error);
//     throw error;
//   }
// };




import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './Button.tsx';
import JSZip from 'jszip';
import './MainComponent.css'; 

interface MainComponentProps {
  defaultConversion: string;
  convertHeading: string;
}


export default function MainComponent(props: MainComponentProps) { 

  const [conversionType, setConversionType] = useState<string>(props.defaultConversion);
  console.log(conversionType,"defualtConversion  Main component"); 
  const [selectedButton, setSelectedButton] = useState<string>(props.defaultConversion);  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false); 
  const round2Ref = useRef<HTMLDivElement | null>(null); 

  // console.log(selectedFiles);
  // console.log(convertedFiles);

  // useEffect(() => {
  //   // Set the initial conversion type after the component mounts
  //   setConversionType(props.defaultConversion);
  //   setSelectedButton(props.defaultConversion);
  // }, [conversionType]); 

  const getFileType = (mimeType: string) => {
    if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return 'DOCX';
    } else {
      console.log(mimeType);
      if(mimeType === 'image/jpeg') return 'JPG';
      return mimeType.split('/').pop()?.toUpperCase() || '';
    }
  };

  const handleFileRemove = (event: React.MouseEvent, index: number) => {
    event.stopPropagation();
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    const updatedConvertedFiles = [...convertedFiles];
    updatedConvertedFiles.splice(index, 1);
    setConvertedFiles(updatedConvertedFiles);
  };

  const handleFileDownload = (event: React.MouseEvent, file: File | null) => {
    event.stopPropagation();
    if (!file) {
      console.error('Invalid file for download.');
      return;
    }
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const downloadAll = () => {
  //   if (convertedFiles.length === 0) {
  //     console.warn('No converted files to download.');
  //     return;
  //   }
  //   const zip = new JSZip();
  //   convertedFiles.forEach((file, index) => {
  //     zip.file(`converted_file_${index + 1}`, file);
  //   });
  //   zip.generateAsync({ type: 'blob' })
  //     .then((blob) => {
  //       const link = document.createElement('a');
  //       link.href = URL.createObjectURL(blob);
  //       link.download = 'converted_files.zip';
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     })
  //     .catch((error) => {
  //       console.error('Error generating zip file:', error);
  //     });
  // };
  const downloadAll = () => {
    if (convertedFiles.length === 0) {
      console.warn('No converted files to download.');
      return;
    }
    
    const zip = new JSZip();
  
    convertedFiles.forEach((file, index) => {
      console.log(file.type); 
      const fileExtension = file.type.split('/').pop();
      console.log(fileExtension,"file.name");
      zip.file(`converted_file_${index + 1}.${fileExtension}`, file);
    });
  
    zip.generateAsync({ type: 'blob' })
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'converted_files.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error generating zip file:', error);
      });
  };

  const createFileFromBlob = (blob: Blob, fileName: string): File => {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  };

  // const onDrop = useCallback(async (acceptedFiles: File[]) => {
  //   if (!conversionType) {
  //     window.alert('Please select a conversion type.');
  //     return;
  //   }
  //   let filteredFiles: File[] = [];
  //   if (conversionType === 'avif2png' || conversionType === 'avif2jpg') {
  //     filteredFiles = acceptedFiles.filter(file => {
  //       const fileExtension = file.name.split('.').pop()?.toLowerCase();
  //       return fileExtension === 'avif';
  //     });
  //   } else {
  //     filteredFiles = acceptedFiles.filter(file => {
  //       const fileExtension = file.name.split('.').pop()?.toLowerCase();
  //       const selectedFormat = conversionType.split('2')[0]?.toLowerCase();
  //       return fileExtension === selectedFormat;
  //     });
  //   }
  //   if (filteredFiles.length === 0) {
  //     window.alert(`No ${conversionType === 'avif2png' ? 'AVIF' : conversionType} files dropped. Please drop a valid file.`);
  //     return;
  //   }
  //   setSelectedFiles(prevFiles => [...prevFiles, ...filteredFiles]);
  //   if (round2Ref.current) {
  //     round2Ref.current.scrollLeft = round2Ref.current.scrollWidth;
  //   }
  //   if (conversionType) {
  //     try {
  //       const latestAcceptedFile = filteredFiles[filteredFiles.length - 1];
  //       setLoading(true);
  //       const response = await apiCall(latestAcceptedFile, conversionType);
  //       const formData = new FormData();
  //       const fileNameWithoutExtension = latestAcceptedFile.name.replace(/\.[^/.]+$/, "");
  //       const convfile = createFileFromBlob(response, fileNameWithoutExtension);
  //       formData.append('file', convfile);
  //       setConvertedFiles(prevConvertedFiles => [...prevConvertedFiles, convfile]);
  //       setLoading(false);
  //       if (round2Ref.current) {
  //         round2Ref.current.scrollLeft = round2Ref.current.scrollWidth;
  //       }
  //     } catch (error) {
  //       console.error('Conversion error:', error);
  //     }
  //   }
  //   const timeoutId = setTimeout(() => {
  //     setLoading(false);
  //   }, 520000);
  //   return () => clearTimeout(timeoutId);
  // }, [conversionType, setConvertedFiles, setSelectedFiles, setLoading]);

  // const onDrop = useCallback(async (acceptedFiles: File[]) => {
  //   if (!conversionType) {
  //     window.alert('Please select a conversion type.');
  //     return;
  //   }

  //   const convertedFilesArray: File[] = [];
  //   setLoading(true);

  //   for (const file of acceptedFiles) {
  //     try {
  //       const response = await apiCall(file, conversionType);
  //       const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
  //       const convertedFile = createFileFromBlob(response, fileNameWithoutExtension);
  //       convertedFilesArray.push(convertedFile);
  //     } catch (error) {
  //       console.error('Conversion error:', error);
  //     }
  //   }

  //   setConvertedFiles(prevConvertedFiles => [...prevConvertedFiles, ...convertedFilesArray]);
  //   setSelectedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  //   setLoading(false);
  // }, [conversionType, setSelectedFiles, setConvertedFiles, setLoading]);


  type ConversionType = 'png2jpg' | 'jpg2png';

const supportedFormats: { [key in ConversionType]: string[] } = {
  'png2jpg': ['png'],
  'jpg2png': ['jpg', 'jpeg'],
};

   
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!conversionType) {
      window.alert('Please select a conversion type.');
      return;
    }
  
    // Check if adding the new files will exceed the limit
    if (selectedFiles.length + acceptedFiles.length > 20) {
      window.alert('Maximum of 20 files can be uploaded.');
      return;
    }

    console.log(`Conversion Type: ${conversionType}`);
  // console.log(`Allowed Extensions: ${allowedExtensions}`);
  
    // // Ensure conversionType is a valid key in supportedFormats
    const validConversionType = conversionType as ConversionType;
    const allowedExtensions = supportedFormats[validConversionType] || [];

    // // Log the conversion type and allowed extensions
  
  
    // // Filter files based on allowed types
    const filteredFiles = acceptedFiles.filter(file => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      return allowedExtensions.includes(fileExtension || '');
    });
  
    // Filter out invalid files
    const invalidFiles = acceptedFiles.filter(file => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      return !allowedExtensions.includes(fileExtension || '');
    });
  
    if (invalidFiles.length > 0) {
      window.alert('Some files are not valid for the selected conversion type.');
      // Optionally, you could handle invalid files here, e.g., removing them from the UI
    }
  
    if (filteredFiles.length === 0) {
      window.alert(`No valid files to process. Please upload files with the correct format for ${conversionType}.`);
      return;
    } 
  
    setLoading(true);
  
    for (const file of acceptedFiles) {
      try {
        const response = await apiCall(file, conversionType);
        const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
        const convertedFile = createFileFromBlob(response, fileNameWithoutExtension);
        setConvertedFiles(prevConvertedFiles => [...prevConvertedFiles, convertedFile]);
        setSelectedFiles(prevFiles => [...prevFiles, file]);
      } catch (error) {
        console.error('Conversion error:', error);
      }
    }
  
    setLoading(false);
  }, [conversionType, selectedFiles, setSelectedFiles, setConvertedFiles, setLoading]);
  

  // const { getRootProps, getInputProps } = useDropzone({ onDrop }); 

  const clearQueue = () => {
    setSelectedFiles([]);
    setConvertedFiles([]);
  };

  const handleConversionButtonClick = (type: string) => {
    setSelectedButton(type);
    setConversionType(type);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const scrollLeft = () => {
    if (round2Ref.current) {
      round2Ref.current.style.scrollBehavior = 'smooth';
      round2Ref.current.scrollLeft -= 100;
    }
  };

  const scrollRight = () => {
    if (round2Ref.current) {
      round2Ref.current.style.scrollBehavior = 'smooth';
      round2Ref.current.scrollLeft += 100;
    }
  };

  return (
    <div className="MainC"> 
      <h1 className='main_heading'>{props.convertHeading}</h1>
      <div className='mobileselect'> 
        <div className='select' style={{ textAlign: 'center' }}>
          <select
            value={conversionType?.split('2')[0] || ''}
            onChange={(e) => handleConversionButtonClick(`${e.target.value}2${conversionType?.split('2')[1]}`)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            <option value="">Select Format</option>
            <option value="avif" style={{ color: 'black' }}>PNG</option>
            <option value="jpg" style={{ color: 'black' }}>JPG</option>
            {/* <option value="webp" style={{ color: 'black' }}>WebP</option>
            <option value="word" style={{ color: 'black' }}>Word</option>
            <option value="jpeg" style={{ color: 'black' }}>JPEG</option>
            <option value="pdf" style={{ color: 'black' }}>PDF</option>
            <option value="avif" style={{ color: 'black' }}>AVIF</option> */}
          </select>
        </div>
        <span>To</span>
        <div className='select'  style={{ textAlign: 'center' }}>
          <select
            value={conversionType?.split('2')[1] || ''}
            onChange={(e) => setConversionType(`${conversionType?.split('2')[0]}2${e.target.value}`)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            <option value="">Select Format</option>
            <option value="png" style={{ color: 'black' }}>PNG</option>
            <option value="jpg" style={{ color: 'black' }}>JPG</option>
            {/* <option value="webp" style={{ color: 'black' }}>WebP</option>
            <option value="word" style={{ color: 'black' }}>Word</option>
            <option value="jpeg" style={{ color: 'black' }}>JPEG</option>
            <option value="pdf" style={{ color: 'black' }}>PDF</option> */}
          </select>
        </div>
      </div>
      <div className="ButtonsR">
        <Button
          text='Png to JPG'
          onClick={() => handleConversionButtonClick('png2jpg')}
          isSelected={selectedButton === 'png2jpg'}
          onSelect={() => setSelectedButton('avif2png')}
        />
        <Button
          text='Jpg to Png'
          onClick={() => handleConversionButtonClick('jpg2png')}
          isSelected={selectedButton === 'jpg2png'}
          onSelect={() => setSelectedButton('avif2jpg')} 
        /> 
      </div>
      <div className="RoundBox">
        <p>
          <span style={{ fontWeight: 'bold' }}>Drag and Drop</span> your files here
        </p>
        <div className="Upload" {...getRootProps()}>
          <div className="pt1">
            <img style={{ filter: "invert(100%)" }} src='./assets/arrow.svg' alt="cross" />
          </div>
          <div className="pt2">
            <span>Upload Here</span>
          </div>
          <input {...getInputProps()} />
        </div>
        <div className="SndPart">
          <div className="bt1"  onClick={scrollLeft}><img src="./assets/left.png" alt="" /></div>
          <div {...getRootProps()} className="Round2" ref={round2Ref}>
            {loading && (                   
              <div className="linear-loader"></div>
            )}
            {convertedFiles.map((file, index) => (
              <div className='File' key={index}  >
                <div className='r1' style={{display:"flex",justifyContent:"space-around", overflow:"none", position:"relative"}}>
                  <span className='filetop'>{file.name}</span>
                  <div className='crossbtn' onClick={(event) => handleFileRemove(event, index)}>
                    <img src='/assets/cross.svg' alt="cross icon" />
                  </div>
                </div>
                {/* {console.log(file.type)} */}
                <span className='filemid'>{getFileType(file.type)}</span>
                <div className='filedown' style={{cursor:'pointer'}} onClick={(event) => handleFileDownload(event, file)}>
                  <span>Download</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bt2" onClick={scrollRight}><img src="./assets/right.png" alt="" /></div>
        </div>
        <div className="Upload"  onClick={clearQueue}>
          <div className="pt1" style={{ backgroundColor: 'red' }}>
            <img style={{ filter: "invert(100%)", height: "35px" }} src='./assets/cross.svg' alt="cross" />
          </div>
          <div className="pt2" style={{ backgroundColor: 'red' }}>
            <span>Clear Queue</span>
          </div>
        </div>
      </div>
      <div className="Download" style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="pt1" style={{ backgroundColor: 'black' }}>
          <img style={{ filter: "invert(100%)", transform: "rotate(180deg)" }} src='./assets/arrow.svg' alt="downward arrow" />
        </div>
        <div className="pt2" style={{ backgroundColor: 'black'}} onClick={downloadAll}>
          <span style={{ color: 'white' }}>Download All</span>
        </div>
        <div className='counter1'>
          <span>{convertedFiles.length}</span>
        </div>
      </div>
    </div>
  );
}

function createFileFromBlob(blob: Blob, originalFileName: string): File {
  const file = new File([blob], originalFileName, { type: blob.type });
  return file;
}

const apiCall = async (file: File, conversionType: string) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('conversionType', conversionType);
    // const response = await fetch(`http://universitystuffhub.com/convert/${conversionType}`, {
    //   method: 'POST',     
    //   body: formData,
    // }); 
    const response = await fetch(`http://127.0.0.1:5000/convert/${conversionType}`, { 
      method: 'POST',     
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('API call failed');
    }
    const originalFileName = file.name;
    const blob = await response.blob();
    const convertedFile = createFileFromBlob(blob, originalFileName);
    return convertedFile;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};
