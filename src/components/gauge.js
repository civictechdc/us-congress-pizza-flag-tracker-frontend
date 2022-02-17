import style from "../style/gauge.module.css"
import React from "react";

const Gauge = (props) => {

    
    const tracker = []; 

    for(let i = 1; i <= props.status; i++){

        let number = i;
        tracker.push(number)
    }
    

    return(
        <>  
        {props.status < 8 ?(
             <div className={style.gauge}>
                {tracker.map( (number, index) => (
                
                        <div className={style.gaugeItem} key={index}>
                            <p className={style.gaugeNumber}>{number}</p>
                            {number == props.status ?(
                                <p className={style.gaugeCode}>{props.code}</p>
                            ):(
                                <p></p>
                            )}
                        </div>
                    
                ))}
            </div>
        ) : (
            props.status > 8 ?(
                <div className={style.gaugeCancel}>
                    <p className={style.cancel}>Canceled</p>
                </div>
            ):(
                <div className={style.gaugeDone}>
                    <p className={style.done}>Complete</p>
                </div>
            )
        )}
           
            
           
        </>
    )
};

export default Gauge;