import React from "react";
import { Link } from "react-router-dom";

const Details = () => {
  return (
    <div>
      <div className="myDetails">
        <h3>Developed By: Moin Bhokare</h3>
        <div className="link-section row">
          <Link
            className="col-sm link"
            to="mailto:moinbhokare7@gmail.com"
            target="_blank"
          >
            moinbhokare7@gmail.com
          </Link>
          <Link
            className="col-sm link"
            to="https://github.com/bhokaremoin/AskGPT"
            target="_blank"
          >
            Source Code
          </Link>
          <Link
            className="col-sm link"
            to="https://github.com/bhokaremoin/AskGPT#askgpt"
            target="_blank"
          >
            Documentation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details;
