import React,{useEffect,useState,useCallback} from "react";
import axios from 'axios';
import Navbar from "../components/navbar";
import Quagga from "@ericblade/quagga2"

export default function Home(){
    const [isStart,set_isStart]=useState(false);
    const [barcode,set_barcode]=useState('');

    const _onDetected= res =>{
        set_barcode(res.codeResult.code);
        set_isStart(false)
    }

    const startScanner=useCallback(()=>{
        set_barcode('');
        Quagga.init(
            {
                inputStream:{
                    type: 'LiveStream',
                    target:document.querySelector('#scanner-container'),
                    constraints: {
                        facingMode: 'environment'
                    }
                },
                numOfWorkers: navigator.hardwareConcurrency,
                locate: true,
                frequency: 1,
                debug: {
                    drawBoundingBox: true,
                    showFrequency: true,
                    drawScanline: true,
                    showPattern: true
                },
                multiple: false,
                locator: {
                    halfSample: false,
                    patchSize: 'medium',
                    debug: {
                        showCanvas: true,
                        showPatches: false,
                        showFoundPatches: true,
                        showSkeleton: true,
                        showLabels: false,
                        showPatchLabels: true,
                        showRemainingPatchLabels: false,
                        boxFromPatches: {
                            showTransformed: false,
                            showTransformedBox: false,
                            showBB: false
                        }
                    }
                },
                decoder: {
                    readers: ['upc_reader']
                }
            },
            err => {
                if(err){
                    return console.log(err);
                }
                Quagga.start();
            }
        );
        Quagga.onDetected(_onDetected);
        
    },[]);

    const stopScanner = ()=>{
        Quagga.offProcessed();
        Quagga.offDetected();
        Quagga.stop();
    }

     useEffect(()=>{
        if(isStart)  startScanner();
        else stopScanner();
    },[isStart,startScanner])

    axios.get('http://localhost:3004/Hoy')
         .catch((err)=>{
            console.log(err)
         })



    return (
        <div>
            <Navbar/>
            <div className="container">
                <h6 className="">My Cart</h6>
                <i>nothing added yet</i>
                <p className="mt-2"><b>Total: </b><i>Ksh. 00.00</i></p>
                
                <hr/>
                <button className="btn btn-warning" onClick={()=>set_isStart(!isStart)}>
                    {isStart ? 'stop scanning' : 'start scanning'}
                </button>
                {isStart && <React.Fragment>
                    <div id="scanner-container"/>
                    
                </React.Fragment>}
                <span>barcode:{barcode}</span>
            </div>
            
        </div>
    )
}