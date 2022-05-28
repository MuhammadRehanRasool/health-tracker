import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <Link to={props.link} className="text-decoration-none">
      <div className="card bg-light" style={{ width: "18rem" }}>
        <div className="card-body px-5 py-4">
          <h5 className="card-title">{props.title}</h5>
          <h6 className="mt-4 card-subtitle mb-2 text-muted">
          {props.kinds}
          </h6>
          <h6 className="mt-2 card-subtitle mb-2 text-muted">{props.tagline}</h6>
        </div>
      </div>
    </Link>
  );
}
