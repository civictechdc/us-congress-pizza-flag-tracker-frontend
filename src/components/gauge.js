import style from "../style/gauge.module.css"
import React from "react";

const Gauge = (props) => {

    const status = props;
    const tracker = []; 

    for(let i = 1; i <= status.props; i++){

        let number = i;
        tracker.push(number)
    }
    

    return(
        <>  
        {status.props < 9 ?(
             <div className={style.gauge}>
                {tracker.map( (number, index) => (
                
                        <div className={style.gaugeItem} key={index}>
                            <p className={style.gaugeNumber}>{number}</p>
                        </div>
                    
                ))}
            </div>
        ) : (
            <div className={style.gaugeCancel}>
                <p className={style.cancel}>Canceled</p>
            </div>
        )}
           
            
            {/* 
            <div>
                <meter className={style.meter} min="0" max="9"
                    low="3" high="7"  value={status.props}></meter>
            </div>
            */}
        </>
    )
};

export default Gauge;