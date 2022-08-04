import style from "../style/gauge.module.css";
import React from "react";

const Gauge = (props) => {
  const statusesUpToAndIncludingCurrent = props.statuses.filter(
    (n) => n.sequence_num <= props.status
  );

  return (
    <>
      {props.status < 8 ? (
        <div className={style.gauge}>
          {statusesUpToAndIncludingCurrent.map(
            ({ sequence_num, status_code }, index) => (
              <div
                className={style.gaugeItem}
                key={index}
                style={{ zIndex: 100 - index }}
              >
                {sequence_num === props.status && (
                  <p className={style.gaugeNumber}>{sequence_num}</p>
                )}
                <p className={style.gaugeCode}>
                  {sequence_num}.{" "}
                  {status_code && status_code.replace(/_/g, " ")}
                </p>
              </div>
            )
          )}
        </div>
      ) : props.status > 8 ? (
        <div className={style.gaugeCancel}>
          <p className={style.cancel}>Canceled</p>
        </div>
      ) : (
        <div className={style.gaugeDone}>
          <p className={style.done}>Complete</p>
        </div>
      )}
    </>
  );
};

export default Gauge;
