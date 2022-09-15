import React from "react";
import styles from "../../style/welcome.module.css";

const WelcomeText = () => {
  return (
    <section className={styles.textContainer}>
      <div className={styles.textInnerContainer}>
        <h4>
          Frustrated{" "}
          <a href="https://msacaphill.my.canva.site/">
            Modernization Staff Association
          </a>{" "}
          contributors pitched and designed this app after one too many wasted
          hours searching the halls of Congress for a lost flag. They know their
          time can be better spent helping constituents. The app shows these
          Congressional staffers a flag orders' journey, like the one you see
          when you order a pizza.
        </h4>
        <br />
        <h4>
          Any resident in a USA congressional district can order an American
          flag from their House representative or from one of their Senators.
        </h4>
        <br />
        <h4>
          Many agencies come together to deliver the flag service. A flag starts
          with their constituents' payment then goes across several internal
          agencies. On request, that flag can even be flown at the US Capitol
          and validated by certificate. Right now, flag orders take months to go
          from payment to delivery. Partly, the wait is due to the flag flying
          timeline, but not always. Orders are often waylaid by ambiguities in
          the six agency office handoffs. That means wasted staffer followup and
          further delays.
        </h4>
        <br />
        <h4>
          The app here proposes to ask the agency employees who box the flag for
          their help to print and add QR code stickers. Then at each step, we
          would ask the next employees to confirm a flag box's arrival by
          scanning that sticker. House district staffers won't lose track of
          flags anymore. Whenever updates happen, the app clarifies who last
          scanned it, and where the flag is. That means the beloved flag service
          works better for everyone.
        </h4>
        <br />
        <h4>
          This app is a collaboration between{" "}
          <a href="https://codefordc.org/">Code For DC</a> and the{" "}
          <a href="https://msacaphill.my.canva.site/">
            Modernization Staff Association
          </a>
          .
        </h4>
      </div>
    </section>
  );
};

export default WelcomeText;
