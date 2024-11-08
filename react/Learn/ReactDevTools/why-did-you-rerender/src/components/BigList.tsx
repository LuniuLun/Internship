const items = ["Item 1", "Item 2", "Item 3"];

const BigList = () => {
  console.log("BigList is rendering");
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

BigList.whyDidYouRender = true;

export default BigList;
