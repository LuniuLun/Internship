import { useState } from "react";
import { sculptureList } from "../data";

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  let hasPre = index - 1 >= 0;
  let hasNext = index + 1 < sculptureList.length;
  let sculpture = sculptureList[index];

  function handlePreviousClick() {
    if (hasPre) setIndex(index - 1);
  }

  function handleNextClick() {
    if (hasNext) setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  return (
    <section>
      <button onClick={handlePreviousClick} disabled={!hasPre}>
        Previous
      </button>
      <button onClick={handleNextClick} disabled={!hasNext}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>{showMore ? "Hide" : "Show"} details</button>
      {showMore && <p>{sculpture.description}</p>}
      <br />
      <img src={sculpture.url} alt={sculpture.alt} />
    </section>
  );
}
