import React from "react";
import Carousel from "../components/carousel";
import flag from "../components/images/us-capitol-flag-6240878.jpg";

const styles = {
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: "5%",
  },
  flexItem: {
    flex: 1,
  },
};

const Welcome = () => {
  return (
    <>
      <h2 style={{ margin: "auto", width: "50%", textAlign: "center" }}>
        Welcome Page!
      </h2>
      <br></br>
      <Carousel />
      <div style={styles.flexContainer}>
        <img
          style={styles.flexItem}
          src={flag}
          alt={"Capital Flag"}
          width="500"
        ></img>
        <div style={styles.flexItem}>
          <h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel
            eros finibus, finibus nisl condimentum, accumsan enim. Curabitur
            dictum elit sapien, ac varius nisi aliquam ac. In nibh odio,
            fringilla in mi nec, tincidunt fermentum enim. Quisque sed augue
            pretium, laoreet nibh ut, hendrerit nulla. Vestibulum commodo tempor
            dui a maximus. Cras nec aliquet massa. Duis condimentum est turpis,
            et dignissim lacus lobortis in.
          </h4>
          <h4>
            Nunc eu odio at massa feugiat accumsan. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae; Aenean ut
            tincidunt neque. Aliquam erat volutpat. Praesent dignissim id nisl
            vel accumsan. Sed suscipit a lorem vel efficitur. Nam tristique nunc
            nisl, vel aliquam orci gravida et. Etiam est nunc, dapibus a neque
            a, congue malesuada nisi. Nulla dignissim pellentesque hendrerit.
            Quisque lectus tellus, elementum nec commodo sed, imperdiet eget
            odio. Donec ac ex id elit pretium finibus. Mauris ac lectus magna.
            Praesent lectus nulla, consectetur non nisl eu, viverra maximus
            massa.
          </h4>
        </div>
      </div>
    </>
  );
};

export default Welcome;
